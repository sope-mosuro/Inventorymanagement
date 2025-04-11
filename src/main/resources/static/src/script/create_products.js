


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productName = document.getElementById('item').value.trim();
        const price = parseFloat(document.getElementById('Price').value);
        const quantity = parseInt(document.getElementById('quantity').value);

        // Field validation
        if (!productName) return alert('Product name is required');
        if (isNaN(price) || price <= 0) return alert('Enter a valid price');
        if (isNaN(quantity) || quantity < 0) return alert('Enter a valid quantity');

        const payload = {
            name: productName,
            price,
            quantity
        };

        try {
            const response = await fetch('http://localhost:8080/api/admin/products/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to create product');

            const result = await response.json();
            alert('Product created successfully!');

            form.reset();

        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.');
        }
    });

    // Cancel button redirects
    document.querySelector('.cancel-button').addEventListener('click', () => {
        window.location.href = 'http://localhost:8080/#';
    });

    // Bulk upload logic
    const importButton = document.getElementById('importButton');
    const fileInput = document.getElementById('bulkUploadInput');

    importButton.addEventListener('click', () => {
        fileInput.click(); // trigger hidden input
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log('📁 File selected:', file.name);

        // TODO: Add actual parsing or uploading logic here
        // Example: use PapaParse or send the file to a backend endpoint
    });
});
