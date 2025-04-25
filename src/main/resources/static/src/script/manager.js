document.addEventListener("DOMContentLoaded", async () => {

  // Open modals
  document.querySelectorAll('button[data-dialog]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dialogId = btn.getAttribute('data-dialog');
      const modal = document.getElementById(dialogId);
      if (modal) modal.classList.remove('hidden');
    });
  });

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

  // Fetch warehouses
  populateWarehouseCards();

  //  Fetch salesReps
  populateSalesRepsCards();


});




// Fetch warehouses and populate buttons in .config-card

async function populateWarehouseCards() {
  const cardContainer = document.querySelector('.button-case');

  try {
    const response = await fetch("http://localhost:8080/api/admin/warehouses");
    const warehouses = await response.json();

    console.log('raw data', warehouses);

    // Clear existing buttons
    const existingButtons = cardContainer.querySelectorAll('button');
    existingButtons.forEach(btn => btn.remove());

    warehouses.forEach(warehouse => {
      const button = document.createElement('button');
      button.textContent = warehouse.name;
      button.classList.add('warehouse-button');
      button.dataset.dialog = 'userDialog';
      button.dataset.id = warehouse.id;

      button.addEventListener('click', async () => {
        console.log(`Clicked: ${warehouse.name} (ID: ${warehouse.id})`);

        const modalTitle = document.querySelector('#userDialog .modal-title');
        const modalBody = document.querySelector('#userDialog .modal-body');

        if (modalTitle) modalTitle.textContent = warehouse.name;

        try {
          // Fetch warehouse product stock data
          const stockRes = await fetch(`http://localhost:8080/api/admin/inventory/warehouse/${warehouse.id}`);
          const stockList = await stockRes.json();

          // Build product table
          const productRows = stockList.map(item => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.quantity}</td>
            </tr>
          `).join('');

          modalBody.innerHTML = `
            <p><strong>Warehouse ID:</strong> ${warehouse.id}</p>
            <p><strong>Location:</strong> ${warehouse.location || 'N/A'}</p>
            <hr/>
            <h3>Stock Details:</h3>
            <table class="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${productRows || '<tr><td colspan="2">No stock data found.</td></tr>'}
              </tbody>
            </table>
          `;

        } catch (err) {
          modalBody.innerHTML = `<p class="text-red-500">Error loading warehouse stock details.</p>`;
          console.error('Stock fetch error:', err);
        }

        const modal = document.getElementById('userDialog');
        if (modal) modal.classList.remove('hidden');
      });

      cardContainer.appendChild(button);
    });

  } catch (error) {
    console.error('Error loading warehouse cards:', error);
    const fallback = document.createElement('button');
    fallback.textContent = 'Error loading warehouses';
    fallback.disabled = true;
    fallback.classList.add('error-btn');
    cardContainer.appendChild(fallback);
  }
}


    // Fetch SalesReps into buttons

async function populateSalesRepsCards() {
  const cardContainer = document.querySelector('.button-case2');

  try {
    const response = await fetch("http://localhost:8080/api/admin/sales-reps");
    const salesReps = await response.json();

    console.log('Fetched Sales Reps:', salesReps);

    // Clear existing buttons
    cardContainer.querySelectorAll('button').forEach(btn => btn.remove());

    salesReps.forEach(salesRep => {
      const button = document.createElement('button');
      button.textContent = salesRep.username;
      button.classList.add('salesReps-button');
      button.dataset.dialog = 'warehouseDialog';
      button.dataset.id = salesRep.id;

      button.addEventListener('click', async () => {
        console.log(`Clicked: ${salesRep.username} (ID: ${salesRep.id})`);

        const modalTitle = document.querySelector('#warehouseDialog .modal-title');
        const modalBody = document.querySelector('#warehouseDialog .modal-body');

        if (modalTitle) modalTitle.textContent = salesRep.username;

        try {
          const stockResponse = await fetch(`http://localhost:8080/api/admin/inventory/sales-reps/${salesRep.id}`);
          const stockList = await stockResponse.json();

          if (!Array.isArray(stockList)) {
            throw new Error('Invalid stock list format');
          }

          const productRows = stockList.map(item => `
            <tr>
              <td>${item.product.name}</td>
              <td>${item.quantity}</td>
            </tr>
          `).join('');

          modalBody.innerHTML = `
            <p><strong>Sales Rep ID:</strong> ${salesRep.id}</p>
            <p><strong>Region:</strong> ${salesRep.region || 'N/A'}</p>
            <hr/>
            <h3>Stock Details:</h3>
            <table class="inventory-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${productRows || '<tr><td colspan="2">No stock data found.</td></tr>'}
              </tbody>
            </table>
          `;

        } catch (err) {
          modalBody.innerHTML = `<p class="text-red-500">Error loading stock details for ${salesRep.username}.</p>`;
          console.error('Stock fetch error:', err);
        }

        const modal = document.getElementById('warehouseDialog');
        if (modal) modal.classList.remove('hidden');
      });

      cardContainer.appendChild(button);
    });

  } catch (error) {
    console.error('Error loading SalesReps cards:', error);
    const fallback = document.createElement('button');
    fallback.textContent = 'Error loading SalesReps';
    fallback.disabled = true;
    fallback.classList.add('error-btn');
    cardContainer.appendChild(fallback);
  }
}
