

document.addEventListener("DOMContentLoaded", async () => {

  // Handle form submissions
  const formHandlers = [
    { id: "userForm", message: "User Saved!" },
    { id: "warehouseForm", message: "Warehouse Saved!" },
    { id: "salesRepForm", message: "Products Assigned!" },
    { id: "assignuserForm", message: "Products Assigned!" }
  ];

  formHandlers.forEach(({ id, message }) => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(message);
        form.reset();
        form.closest(".modal")?.classList.add("hidden");
      });
    }
  });


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
