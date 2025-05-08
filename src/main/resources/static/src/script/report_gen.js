


// ================ GENERATE REPORT FUNCTION FOR USER-PAGE-->  Transaction HISTORY  ==================

    document.getElementById('run-report').addEventListener('click', async () => {
        const reportType = document.getElementById('report-select').value;

        if (reportType !== 'item-category') {
            alert('Only Sales Report is currently supported.');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/report/history");
            if (!response.ok) throw new Error('Failed to fetch report data');

            const reportData = await response.json();

            const tbody = document.getElementById('invTableBody');
            tbody.innerHTML = ''; // Clear any previous data

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

            document.querySelector('.tabular--wrapper').style.display = 'block';
            document.querySelector('.report-title').textContent = 'Transaction History Report';

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

            if (rows.length === 0) {
                alert('No data to export!');
                return;
            }
            rows.forEach(row => {
                const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
                tableBody.push(rowData);
            });

            const headers = [['Transaction Date', 'Customer', 'Product', 'Quantity', 'Price', 'Payment Method']];
            doc.text('Transaction Report', 14, 15);
            doc.autoTable({
                startY: 20,
                head: headers,
                body: tableBody,
                theme: 'striped',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [52, 152, 219] } // Nice blue header
            });

            doc.save(`TransactionReport_${new Date().toISOString().slice(0, 10)}.pdf`);

        });







