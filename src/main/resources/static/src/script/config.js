

document.addEventListener("DOMContentLoaded", async () => {

  // Open modals
  document.querySelectorAll('button[data-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialogId = btn.getAttribute('data-dialog');
      const modal = document.getElementById(dialogId);
      if (modal) modal.classList.remove('hidden');
    });
  });

  // Fetch products to dropdowns
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

// Fetch Sales Reps
const salesRepDropdowns = document.querySelectorAll('.salesrep');
try {
  const response = await fetch("http://localhost:8080/api/admin/all-users");
  if (!response.ok) throw new Error('Failed to fetch sales rep list');
  const salesReps = await response.json();
  console.log('Sales Reps:', salesReps);
  salesRepDropdowns.forEach(select => {
    // Clear existing options
    select.innerHTML = '';
    // Default option
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select a Sales Rep';
    select.appendChild(defaultOption);

    // Populate with sales rep options
    salesReps.forEach(salesRep => {
      const option = document.createElement('option');
      console.log(salesRep);
      option.value = salesRep.username;
      option.textContent = salesRep.username;
      select.appendChild(option);
    });
  });
} catch (error) {
  console.error('Error loading sales rep names:', error);
  salesRepDropdowns.forEach(select => {
    const fallbackOption = document.createElement('option');
    fallbackOption.value = '';
    fallbackOption.textContent = 'Error loading sales reps';
    select.appendChild(fallbackOption);
  });
}

// call to Assign products from Global to Warehouses
    setupWarehouseAssignmentForm();

// Fetch warehouses
    populateWarehouseDropdowns();

// call to Assign products from Warehouses to SalesRep
    setupSalesRepAssignmentForm();

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
  console.log("generating password");
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
    lowStockThreshold: 25 // default threshold
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

// Assign products from Global to warehouse
function setupWarehouseAssignmentForm() {
  const form = document.getElementById('salesRepForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = form.querySelector('.productid').value;
    const warehouseName = form.querySelector('.warehouse-select').value;
    const quantity = parseInt(form.querySelector('input[type="number"]').value, 10);

    if (!productName || !warehouseName || isNaN(quantity) || quantity <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }
    const payload = {
                    productName,
                    warehouseName,
                    quantity
                    };
    try {
      const response = await fetch("http://localhost:8080/api/admin/inventory/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to assign product to warehouse');
      const data = await response.json();
      alert(`Success: ${data.message || 'Product assigned to warehouse successfully.'}`);
      form.reset();
    } catch (error) {
      console.error('Assignment error:', error);
      alert('Error: Could not assign product. Check console for details.');
    }
  });
}
// Assign products from warehouse to sales rep
function setupSalesRepAssignmentForm() {
  const form = document.getElementById('assignuserForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = form.querySelector('.productid').value;
    const warehouseName = form.querySelector('.warehouse-select').value;
    const salesRepName = form.querySelector('.salesrep').value;
    const quantity = parseInt(form.querySelector('input[type="number"]').value, 10);

    if (!productName || !warehouseName || !salesRepName || isNaN(quantity) || quantity <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const payload = {
      productName,
      warehouseName,
      salesRepName,
      quantity
    };
    try {
      const response = await fetch("http://localhost:8080/api/admin/inventory/assign", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to assign product to sales rep');
      const data = await response.json();
      alert(`Success: ${data.message || 'Product assigned to sales rep successfully.'}`);
      form.reset();
    } catch (error) {
      console.error('Assignment error:', error);
      alert('Error: Could not assign product. Check console for details.');
    }
  });
}

// fetch warehouses function
async function populateWarehouseDropdowns() {
  const warehouseDropdowns = document.querySelectorAll('.warehouse-select');
  try {
    const response = await fetch("http://localhost:8080/api/admin/warehouses");
    const rawText = await response.text();  // <-- fetch raw response
    console.log("RAW WAREHOUSE RESPONSE:", rawText);

    // Parse it
    const warehouses = JSON.parse(rawText);

    warehouseDropdowns.forEach(select => {
      select.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.disabled = true;
      defaultOption.selected = true;
      defaultOption.textContent = 'Select a warehouse';
      select.appendChild(defaultOption);

      warehouses.forEach(warehouse => {
        const option = document.createElement('option');
        option.value = warehouse.name;
        option.textContent = warehouse.name;
        select.appendChild(option);
      });
    });
  } catch (error) {
    console.error('Error loading warehouse names:', error);
    warehouseDropdowns.forEach(select => {
      const fallbackOption = document.createElement('option');
      fallbackOption.value = '';
      fallbackOption.textContent = 'Error loading warehouses';
      select.appendChild(fallbackOption);
    });
  }
}


























