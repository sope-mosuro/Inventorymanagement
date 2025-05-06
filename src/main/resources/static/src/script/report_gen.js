


// ================ REPORT DOWNLOAD FUNCTION(PDF)--> FROM SALES PAGE  ==================

    document.getElementById('downloadPDF').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const tableBody = [];
        const rows = document.querySelectorAll('#salesTableBody tr');

        if (rows.length === 0) {
            alert('No data to export!');
            return;
        }

        rows.forEach(row => {
            const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
            tableBody.push(rowData);
        });

        const headers = [['Sale Date', 'Customer', 'Product', 'Quantity', 'Price', 'Payment Method', 'Status']];

        doc.text('Sales Data Report', 14, 15);
        doc.autoTable({
            startY: 20,
            head: headers,
            body: tableBody,
            theme: 'striped',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [52, 152, 219] } // Nice blue header
        });

        doc.save(`SalesReport_${new Date().toISOString().slice(0, 10)}.pdf`);
    });