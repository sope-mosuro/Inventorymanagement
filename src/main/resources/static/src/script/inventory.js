//inventory section script

  document.addEventListener('DOMContentLoaded', async function () {
      const reportsSection = document.getElementById('reports-section');
      const reportBody = reportsSection.querySelector('div'); // Where items should be inserted

      try {
          const response = await fetch('http://localhost:8080/api/admin/products/all-products');
          if (!response.ok) throw new Error('Failed to fetch inventory items');

          const data = await response.json();

          // remove placeholder
          reportBody.innerHTML = '';

          if (data.length === 0) {
              reportBody.innerHTML = `<small><em>No items currently available</em></small>`;
              return;
          }

          data.forEach(item => {
              const card = document.createElement('div');
              card.className = 'stock-card';
              card.innerHTML = `
                  <strong>${item.name}</strong>
                  <p>Quantity: <span>${item.stock}</span></p>
              `;
              reportBody.appendChild(card);
          });
      } catch (error) {
          console.error('Error loading inventory:', error);
          reportBody.innerHTML = `<small><em>Could not load items. Try again later.</em></small>`;
      }

      // function for update price
      // Get references

      const productSelect = document.getElementById('changePriceProductSelect');
      const oldPriceInput = document.getElementById('changePriceOldPrice');
      const newPriceInput = document.getElementById('changePriceNewPrice');
      const form = document.getElementById('changePriceForm');
      // Store product data locally after fetch
      let productData = [];

      async function loadProducts() {
        try {
          const response = await fetch("http://localhost:8080/api/admin/products/all-products");
          if (!response.ok) throw new Error('Failed to fetch products');
          productData = await response.json();

          // Populate dropdown dynamically
          productSelect.innerHTML = '<option disabled selected>Select a product</option>';
          productData.forEach(product => {
            const opt = document.createElement('option');
            opt.value = product.name;
            opt.textContent = product.name;
            productSelect.appendChild(opt);
          });
        } catch (err) {
          console.error('Product load error:', err);
          productSelect.innerHTML = '<option>Error loading products</option>';
        }
      }
      await loadProducts();

      // Auto-fill old price on selection
      productSelect.addEventListener('change', function () {
        const selectedName = this.value;
        console.log('Dropdown value selected:', selectedName);

        // See all available product names
        productData.forEach(p => console.log('Available product:', `'${p.name}'`));

        // Try a trimmed, case-insensitive match just in case
        const selectedProduct = productData.find(p =>
          p.name.trim().toLowerCase() === selectedName.trim().toLowerCase()
        );

        console.log('Matched product object:', selectedProduct);

        if (selectedProduct) {
          oldPriceInput.value = selectedProduct.price;
          console.log('Old price set to:', selectedProduct.price);
        } else {
          oldPriceInput.value = '';
          console.warn('No price found for product:', selectedProduct);
        }
      });


      // Handle form submission
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const selectedProduct = productData.find(p => p.name === productSelect.value);
        const newPrice = parseFloat(newPriceInput.value);

        if (!selectedProduct || isNaN(newPrice)) {
          alert('Invalid product or price.');
          return;
        }
        try {
          const res = await fetch(`http://localhost:8080/api/admin/products/${selectedProduct.id}/update-price`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ newPrice })
          });
          if (!res.ok) throw new Error('Failed to update price');
          alert('Price updated successfully!');
          form.reset();
          oldPriceInput.value = '';
        } catch (err) {
          console.error('Price update error:', err);
          alert('Something went wrong while updating the price.');
        }
      });


// Open modal on button click
const openDialogBtn = document.getElementById('openChangePriceDialog');
const changePriceModal = document.getElementById('changePriceDialog');

openDialogBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent anchor behavior
  changePriceModal.classList.remove('changePrice-hidden');
});

const closeBtn = document.querySelector('.changePrice-close-btn');

closeBtn.addEventListener('click', () => {
  changePriceModal.classList.add('changePrice-hidden');
});




  });







