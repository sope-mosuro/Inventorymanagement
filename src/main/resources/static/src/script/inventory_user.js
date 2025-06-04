
//USER DASHBOARD Section Script

  document.addEventListener('DOMContentLoaded', async function () {

      // Target only the first #reports-section (Items in stock)

      const reportSections = document.querySelectorAll('#reports-section');
      const stockSection = reportSections[0];
      const stockContainer = stockSection.querySelector('div'); // The flex container

      try {
          const response = await fetch('/api/sales-rep');
          if (!response.ok) throw new Error('Failed to fetch inventory items');

          const data = await response.json();

          console.log ("new object:", data);

          // Clear placeholder
          stockContainer.innerHTML = '';

          if (!Array.isArray(data) || data.length === 0) {
              stockContainer.innerHTML = `<small><em>No items currently available</em></small>`;
              return;
          }

          // Loop through data and extract nested product info

          data.forEach(entry => {
              const { product, quantity } = entry;
              if (!product) return;

              const card = document.createElement('div');
              card.className = 'stock-card';
              card.innerHTML = `
                  <strong>${product.name}</strong>
                  <p>Assigned Quantity: <span>${quantity}</span></p>
              `;
              stockContainer.appendChild(card);
          });

      } catch (error) {
          console.error('Inventory fetch failed:', error);
          stockContainer.innerHTML = `<small><em>Error loading items. Please try again later.</em></small>`;
      }




  });








