

document.addEventListener("DOMContentLoaded", async () => {


  // Open modals
  document.querySelectorAll('button[data-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialogId = btn.getAttribute('data-dialog');
      const modal = document.getElementById(dialogId);
      if (modal) modal.classList.remove('hidden');
    });
  });


  // Fetch product data once
  const productDropdowns = document.querySelectorAll('.productid');

    try {
      const response = await fetch('http://localhost:8080/api/admin/products/all-products');
      if (!response.ok) throw new Error('Failed to fetch product list');

      const products = await response.json();
      productDropdowns.forEach(select => {
        // Clear existing options first
        select.innerHTML = '';

        // Populate with product options

        const defaultOption = document.createElement('option');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = 'Select a product';
        select.appendChild(defaultOption);

        products.forEach(product => {
          const option = document.createElement('option');
          option.value = product.name;
          option.textContent = product.name;
          select.appendChild(option);
        });
      });

    } catch (error) {
      console.error('Error loading product names:', error);
      productDropdowns.forEach(select => {
        const fallbackOption = document.createElement('option');
        fallbackOption.value = '';
        fallbackOption.textContent = 'Error loading products';
        select.appendChild(fallbackOption);
      });
    }

// call to user creation function
const userForm = document.getElementById("userForm");

  if (userForm) {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleUserFormSubmission(userForm);
    });
  }

// call to warehouse creation function
const warehouseForm = document.getElementById("warehouseForm");
if (warehouseForm) {
  warehouseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleWarehouseFormSubmission(warehouseForm);
  });
}

  // Close modals
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.classList.add('hidden');
    });
  });

  // Close modal when clicking outside the content
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

});


//  User creation handler
async function handleUserFormSubmission(form) {

    console.log("getting deets");

  const formData = new FormData(form);
  const name = formData.get("name")?.trim();
  const email = formData.get("email")?.trim();
  const role = formData.get("role");

  if (!name || !email || !["ADMIN", "SALES_REP"].includes(role)) {
    return;
  }

  console.log("generating and encoding password");

  const tempPassword = Math.random().toString(36).slice(-8) + "A1";
  const payload = {
    name,
    email,
    role,
    password: tempPassword
  };
        console.log("Sending payload:", payload);
  try {
    const res = await fetch("http://localhost:8080/api/admin/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const contentType = res.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");
    const result = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      console.error("Backend error:", result);
      alert(typeof result === "string" ? `Error: ${result}` : "Error creating user.");
      return;
    }
    alert("User created successfully!");
    form.reset();
    form.closest(".modal")?.classList.add("hidden");
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Something went wrong. Please check your connection or try again later.");
  }
}

//  WareHouse creation handler
async function handleWarehouseFormSubmission(form) {

    console.log("getting deets");

  const formData = new FormData(form);
  const name = formData.get("name")?.trim();
  const location = formData.get("location")?.trim();

  if (!name || !location) {
    alert("Please fill in all fields.");
    return;
  }
  const payload = {
    name,
    location,
    low_stock: 25 // default threshold
  };
  console.log("show me payload:", payload);
  try {
    const res = await fetch("http://localhost:8080/api/admin/warehouses/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const contentType = res.headers.get("Content-Type");
    const isJson = contentType && contentType.includes("application/json");
    const result = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      console.error("Backend error:", result);
      alert(typeof result === "string" ? `Error: ${result}` : "Failed to create warehouse.");
      return;
    }
    alert("Warehouse created successfully!");
    form.reset();
    form.closest(".modal")?.classList.add("hidden");
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Something went wrong. Please try again later.");
  }
}



