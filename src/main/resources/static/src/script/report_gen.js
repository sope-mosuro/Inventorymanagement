


// ================ GENERATE REPORT FUNCTION FOR USER-PAGE-->  Transaction HISTORY  ==================

   document.getElementById('run-report').addEventListener('click', async () => {
       const reportType = document.getElementById('report-select').value;
       const tbody = document.getElementById('invTableBody');
       const wrapper = document.querySelector('.tabular--wrapper');
       const title = document.querySelector('.report-title');
       const tableHead = document.getElementById('invTableHead');

       tbody.innerHTML = '';
       tableHead.innerHTML = '';
       wrapper.style.display = 'none';

       try {
           if (reportType === 'item-category') {
               const response = await fetch("http://localhost:8080/api/report/history");
               if (!response.ok) throw new Error('Failed to fetch report data');
               const reportData = await response.json();

               title.textContent = 'Transaction History Report';
               tableHead.innerHTML = `
                 <th>Date</th>
                 <th>Customer</th>
                 <th>Items</th>
                 <th>Qty</th>
                 <th>Total</th>
                 <th>Payment</th>
               `;

               reportData.forEach(sale => {
                   const row = document.createElement('tr');
                   row.innerHTML = `
                       <td>${new Date(sale.saleDate).toLocaleDateString()}</td>
                       <td>${sale.customer}</td>
                       <td>${sale.saleItems.map(item => item.productName).join(', ')}</td>
                       <td>${sale.saleItems.reduce((sum, item) => sum + item.quantity, 0)}</td>
                       <td>${sale.totalCost.toFixed(2)}</td>
                       <td>${sale.paymentMethod}</td>
                   `;
                   tbody.appendChild(row);
               });

               wrapper.style.display = 'block';
           }

           else if (reportType === 'cogs-rate') {
               const response = await fetch("http://localhost:8080/api/report/inventory-valuation");
               if (!response.ok) throw new Error('Failed to fetch valuation report');
               const data = await response.json();

                   if (!Array.isArray(data) || data.length === 0) {
                       title.textContent = 'No valuation data available.';
                       return;
                   }

                   title.textContent = 'Inventory Valuation Report';
                   tableHead.innerHTML = `
                     <th>Product</th>
                     <th>Remaining Stock</th>
                     <th>Total Sold</th>
                     <th>Total Revenue</th>
                     <th>COGS</th>
                     <th>Gross Profit</th>
                   `;

                   data.forEach(item => {
                       const row = document.createElement('tr');
                       row.innerHTML = `
                         <td>${item.productName || 'N/A'}</td>
                         <td>${item.remainingStock ?? 0}</td>
                         <td>${item.totalSold ?? 0}</td>
                         <td>${(item.totalRevenue ?? 0).toFixed(2)}</td>
                         <td>${(item.cogs ?? 0).toFixed(2)}</td>
                         <td>${(item.grossProfit ?? 0).toFixed(2)}</td>
                       `;
                       tbody.appendChild(row);
                   });

                   wrapper.style.display = 'block';

           }

           else if (reportType === 'kpi-data') {
               alert('Inventory Transaction Report is currently disabled for maintenance.');
           }

           else {
               alert('Please select a supported report type.');
           }

       } catch (error) {
           console.error('Error generating report:', error);
           alert('Error generating report!');
       }
   });



    // ================ DOWNLOAD USER GENERATED REPORT  ==================

      document.getElementById('downloadRPT').addEventListener('click', () => {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          const tableBody = [];
          const rows = document.querySelectorAll('#invTableBody tr');
          const reportType = document.getElementById('report-select').value;

          if (rows.length === 0) {
              alert('No data to export!');
              return;
          }

          rows.forEach(row => {
              const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
              tableBody.push(rowData);
          });

          let headers = [];
          let title = '';
          let filename = '';

          switch (reportType) {
              case 'item-category':
                  headers = [['Date', 'Customer', 'Items', 'Qty', 'Total', 'Payment']];
                  title = 'Transaction History Report';
                  filename = 'TransactionReport';
                  break;
              case 'cogs-rate':
                  headers = [['Product', 'Remaining Stock', 'Total Sold', 'Total Revenue', 'COGS', 'Gross Profit']];
                  title = 'Inventory Valuation Report';
                  filename = 'InventoryValuationReport';
                  break;
              case 'kpi-data':
                  alert('This report is currently unavailable for download.');
                  return;
              default:
                  alert('Please select a valid report before downloading.');
                  return;
          }

          doc.text(title, 14, 15);
          doc.autoTable({
              startY: 20,
              head: headers,
              body: tableBody,
              theme: 'striped',
              styles: { fontSize: 10 },
              headStyles: { fillColor: [52, 152, 219] }
          });

          doc.save(`${filename}_${new Date().toISOString().slice(0, 10)}.pdf`);
      });


// ===================================  GENERATOR  ===================================================




