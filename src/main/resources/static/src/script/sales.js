document.addEventListener('DOMContentLoaded', () => {

        // Initialize date once when page loads
        const setDefaultDate = () => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            document.getElementById('saleDate').value = `${yyyy}-${mm}-${dd}`;
        };
        // Set initial default date
        setDefaultDate();

        // Get price data from backend

        var quantityField = document.getElementById('quantity');
        var priceField = document.getElementById('price');
        var quantity =  document.getElementById('quantity').value;
        var price =  (quantity * 2000);
        priceField.value = price;

        // Set and update value
        quantityField.addEventListener('input', function() {
        var quantity = quantityField.value;
        var price = (quantity * 2000);
        priceField.value = price;
      });

    console.log('fetchin gg');

    const customerSelect = document.getElementById('existingCustomer'); // <-- Move this outside fetch

    async function fetchCustomers() {
        try {
            const response = await fetch("http://localhost:8080/api/admin/all-customers");
            if (!response.ok) throw new Error('Failed to fetch customers');

            const customers = await response.json();

            customerSelect.innerHTML = '<option value="">Select Existing Customer</option>';
            customers.forEach(customer => {
                const option = document.createElement('option');
                option.value = customer.id;
                option.textContent = customer.name;
                customerSelect.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching customers:', error);
            console.log('fetching from backend did not work');

            // Load local ones even if fetch fails
            const local = JSON.parse(localStorage.getItem('localCustomers') || '[]');
            if (local.length > 0) {
                console.warn('Loading local customers into dropdown');
                local.forEach(customer => {
                    const option = document.createElement('option');
                    option.value = customer.id || customer.name; // Fallback if id is missing
                    option.textContent = customer.name;
                    customerSelect.appendChild(option);
                });          }       }    }

             fetchCustomers();

    // Customer selection logic
    const customerOptions = document.querySelectorAll('.customer-option');
    const customerInputs = document.querySelectorAll('.customer-input');

    customerOptions.forEach(option => {
        option.addEventListener('click', () => {
            customerOptions.forEach(o => o.classList.remove('active'));
            customerInputs.forEach(i => i.classList.remove('active'));

            option.classList.add('active');
            const target = option.dataset.option;

            if (target === 'new') {
                document.getElementById('newCustomerModal').style.display = 'block';
                return;
            }
            document.getElementById(`${target}Customer`).classList.add('active');
        });
    });

    // Modal close logic
    const modal = document.getElementById('newCustomerModal');
    const closeModal = document.querySelector('.sales-modal-close');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // New customer form submission
    document.getElementById('newCustomerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const phone = document.getElementById('customerPhone').value;

        const customerSelect = document.getElementById('existingCustomer');

        const fallbackInsert = () => {
            const localId = `local-${Date.now()}`;
            const option = document.createElement('option');
            option.value = localId;
            option.textContent = name;
            customerSelect.appendChild(option);
            customerSelect.value = option.value;

            // Save locally as a queue
            const existing = JSON.parse(localStorage.getItem('localCustomers') || '[]');
            existing.push({ id: localId, name, email, phone });
            localStorage.setItem('localCustomers', JSON.stringify(existing));

            console.warn('Backend failed. Customer saved locally and added to dropdown.');
        };

        try {
            const response = await fetch("http://localhost:8080/api/admin/create-customer", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });

            if (!response.ok) throw new Error('Failed to add customer');

            const data = await response.json();

            if (!data.token) throw new Error("No token received from backend");

            console.log('Customer added successfully via API');

            const option = document.createElement('option');
            option.value = data.id || name;
            option.textContent = name;
            customerSelect.appendChild(option);
            customerSelect.value = option.value;

        } catch (error) {
            console.error('Error adding customer:', error);
            fallbackInsert(); // graceful degradation
        }

        // Modal close and form reset always happens
        document.getElementById('newCustomerModal').style.display = 'none';
        e.target.reset();
    });

        // Sales form submission
            const salesForm = document.getElementById('salesForm');
            const salesTable = document.getElementById('salesTableBody');

            salesForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const item = document.getElementById('product').value;
                const quantity = document.getElementById('quantity').value;
                const price = document.getElementById('price').value;
                const saleDate = document.getElementById('saleDate').value;
                const paymentMethod = document.getElementById('paymentMethod').value;

                let customerValue = '';
                const existingCustomerOption = document.querySelector('.customer-option[data-option="existing"]');
                if (existingCustomerOption && existingCustomerOption.classList.contains('active')) {
                    const selectedOption = document.getElementById('existingCustomer').selectedOptions[0];
                    customerValue = selectedOption ? selectedOption.textContent : '';
                } else {
                    customerValue = document.getElementById('customerName')?.value || '';
                }

                if (!item) return alert('Please select a product!');
                if (!quantity || isNaN(quantity) || quantity <= 0) return alert('Enter valid quantity!');
                if (!price || isNaN(price) || price <= 0) return alert('Enter valid price!');

                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${saleDate}</td>
                    <td>${customerValue}</td>
                    <td>${item}</td>
                    <td>${quantity}</td>
                    <td>₦${parseFloat(price).toFixed(2)}</td>
                    <td>${paymentMethod}</td>
                    <td>Completed</td>
                `;
                salesTable.appendChild(newRow);
                salesForm.reset();
            });



//This is the part that assumes the backend API for the sales entry submission.
            // POST sales data to backend when post button is clicked
                        document.getElementById('postbutton').addEventListener('click', async () => {
                            const rows = document.querySelectorAll('#salesTableBody tr');
                            if (rows.length === 0) {
                                alert('No sales records to post!');
                                return;
                            }

                            const salesData = Array.from(rows).map(row => {
                                const cells = row.querySelectorAll('td');
                                return {
                                    saleDate: cells[0].textContent,
                                    customer: cells[1].textContent,
                                    product: cells[2].textContent,
                                    quantity: parseInt(cells[3].textContent),
                                    price: parseFloat(cells[4].textContent.replace('₦', '')),
                                    paymentMethod: cells[5].textContent,
                                    status: cells[6].textContent
                                };
                            });

                            try {
                                const response = await fetch("http://localhost:8080/api/admin/SalesRequest", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(salesData)
                                });

                                if (!response.ok) throw new Error('Failed to post sales data');

                                alert('Sales posted successfully!');


                                document.getElementById('salesTableBody').innerHTML = ''; // Clear table after posting
                            } catch (error) {
                                console.error('Error posting sales:', error);
                                alert('Error posting sales!');
                            }
                        });

});



