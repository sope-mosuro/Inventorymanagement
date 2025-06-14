

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productName = document.getElementById('item').value.trim();
        const price = parseFloat(document.getElementById('Price').value);

        // Field validation
        if (!productName) return alert('Product name is required');
        if (isNaN(price) || price <= 0) return alert('Enter a valid price');

        const payload = {
            name: productName,
            price
        };

        try {
            const response = await fetch('/api/admin/products/create', {
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
        window.location.href = 'index.html#stores';
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
