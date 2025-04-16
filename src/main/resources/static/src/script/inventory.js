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
  });







