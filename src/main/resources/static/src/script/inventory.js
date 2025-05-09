
//      inventory section script

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



      // ========== ADMIN REPORT GENERATION ==========

          document.getElementById('R-report')?.addEventListener('click', async () => {
            const reportType = document.getElementById('admin-select')?.value;
            const tbody = document.getElementById('AdminTableBody');
            const tableHead = document.getElementById('AdminTableHead');
            const title = document.querySelector('.report-title');
            const wrapper = document.querySelector('.tabular--wrapper');

            console.log('Report type selected:', reportType);
            if (!tbody || !tableHead || !title || !wrapper) {
              console.error('DOM elements missing.');
              return;
            }

            // Clear previous content
            tbody.innerHTML = '';
            tableHead.innerHTML = '';
            wrapper.style.display = 'none';

            try {
              if (reportType === 'item-spool') {
                const response = await fetch("http://localhost:8080/api/report/history");
                if (!response.ok) throw new Error('Failed to fetch transaction report');

                const data = await response.json();
                console.log('Fetched transaction history:', data);

                if (!Array.isArray(data) || data.length === 0) {
                  title.textContent = 'No transaction data available.';
                  return;
                }

                title.textContent = 'Transaction History Report';
                tableHead.innerHTML = `
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Sales Rep</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                `;

                data.forEach(sale => {
                  const items = Array.isArray(sale.saleItems) ? sale.saleItems : [];
                  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
                  const productNames = items.map(item => item.productName).join(', ');
                  const row = document.createElement('tr');
                  row.innerHTML = `
                    <td>${new Date(sale.saleDate).toLocaleDateString()}</td>
                    <td>${sale.customer || 'N/A'}</td>
                    <td>${productNames || 'N/A'}</td>
                    <td>${sale.salesRep || 'N/A'}</td>
                    <td>${totalQuantity}</td>
                    <td>${(sale.totalCost ?? 0).toFixed(2)}</td>
                    <td>${sale.paymentMethod || 'N/A'}</td>
                  `;
                  tbody.appendChild(row);
                });

                wrapper.style.display = 'block';

              } else if (reportType === 'value-spool') {
                const response = await fetch("http://localhost:8080/api/report/inventory-valuation");
                const data = await response.json();
                console.log('value-spool body:', data);

                alert('This Report is currently disabled for maintenance.');

                /*
                title.textContent = 'Inventory Valuation Report';
                tableHead.innerHTML = `
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Unit Price</th>
                  <th>Total Value</th>
                `;
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.stock}</td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>${(item.stock * item.unitPrice).toFixed(2)}</td>
                  `;
                  tbody.appendChild(row);
                });
                wrapper.style.display = 'block';
                */

              } else if (reportType === 'inventory-spool') {
                const startDate = document.getElementById('startDateInput').value;
                const endDate = document.getElementById('endDateInput').value;
                const source = document.getElementById('sourceInput').value;
                const destination = document.getElementById('destinationInput').value;

                const payload = {
                  startDate,
                  endDate,
                  source,
                  destination
                };

                try {
                  const response = await fetch("http://localhost:8080/api/report/inventory-transactions", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                  });

                  if (!response.ok) throw new Error('Failed to fetch inventory transactions');

                  const data = await response.json();
                  console.log('response body:', data);

                  alert('This Report is currently disabled for maintenance.');

                  /*
                  title.textContent = 'Inventory Transaction Report';
                  tableHead.innerHTML = `
                    <th>Date</th>
                    <th>Item</th>
                    <th>Action</th>
                    <th>Quantity</th>
                    <th>Performed By</th>
                  `;
                  data.forEach(txn => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                      <td>${new Date(txn.date).toLocaleDateString()}</td>
                      <td>${txn.itemName}</td>
                      <td>${txn.action}</td>
                      <td>${txn.quantity}</td>
                      <td>${txn.performedBy}</td>
                    `;
                    tbody.appendChild(row);
                  });
                  wrapper.style.display = 'block';
                  */

                } catch (err) {
                  console.error('Inventory-spool fetch error:', err);
                  alert('Error generating Inventory Transaction report.');
                }
              }

            } catch (err) {
              console.error('Report generation failed:', err);
              alert('Something went wrong while generating the report.');
            }
          });


      // ========== ADMIN REPORT PDF EXPORT ==========

      const reportHeaders = {
          'item-spool': ['Transaction Date', 'Customer', 'Seller', 'Product', 'Quantity', 'Price', 'Payment Method'],
          'value-spool': ['Item', 'Stock Available', 'Unit Price', 'Total Value'],
          'inventory-spool': ['Date', 'Product', 'Action', 'Quantity Changed', 'Performed By']
      };
      document.getElementById('downloadRT')?.addEventListener('click', () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          const tableBody = [];
          const rows = document.querySelectorAll('#AdminTableBody tr');
          const selectedReport = document.getElementById('admin-select').value;

          if (!selectedReport || !reportHeaders[selectedReport]) {
              alert('Select a valid report first!');
              return;
          }
          if (rows.length === 0) {
              alert('No data to export!');
              return;
          }
          rows.forEach(row => {
              const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
              tableBody.push(rowData);
          });
          const headers = [reportHeaders[selectedReport]];
          const reportTitleMap = {
              'item-spool': 'Transaction Report (Admin)',
              'value-spool': 'Inventory Valuation Report',
              'inventory-spool': 'Inventory Transactions Report'
          };
          doc.text(reportTitleMap[selectedReport] || 'Report', 14, 15);
          doc.autoTable({
              startY: 20,
              head: headers,
              body: tableBody,
              theme: 'striped',
              styles: { fontSize: 10 },
              headStyles: { fillColor: [255, 165, 0] } // orange theme
          });

          doc.save(`${reportTitleMap[selectedReport].replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`);

      });

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

