document.addEventListener('DOMContentLoaded', () => {

    // ===================== SET DEFAULT DATE =====================
    const setDefaultDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        document.getElementById('saleDate').value = `${yyyy}-${mm}-${dd}`;
    };
    setDefaultDate();
    // =================== END DEFAULT DATE =======================


    // ================== PRODUCT SECTION ==================

    let allProducts = []; // Cache products globally

    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:8080/api/sales-rep");
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            // Cache only the product part
            allProducts = data.map(item => item.product).filter(Boolean);

            const productSelect = document.getElementById('product');
            productSelect.innerHTML = '<option value="">Select Product</option>';

            // Prevent duplicates if multiple sales-rep entries refer to the same product
            const uniqueProducts = {};
            allProducts.forEach(product => {
                if (!uniqueProducts[product.id]) {
                    const option = document.createElement('option');
                    option.value = product.id; // safer to use ID as value
                    option.textContent = product.name;
                    productSelect.appendChild(option);
                    uniqueProducts[product.id] = true;
                }
            });

        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    fetchProducts();

    // ================== PRODUCT SECTION End ==================

    // ================ PRICE SYNC BASED ON SELECTED PRODUCT ==================

    const productSelect = document.getElementById('product');
    const quantityField = document.getElementById('quantity');
    const priceField = document.getElementById('price');

    // Helper: Get selected product by ID
    function getSelectedProduct() {
        const selectedId = parseInt(productSelect.value);
        return allProducts.find(p => p.id === selectedId);
    }

    // Update price when product changes
    productSelect.addEventListener('change', function () {
        const selectedProduct = getSelectedProduct();
        if (selectedProduct) {
            const quantity = parseInt(quantityField.value) || 1;
            priceField.value = (selectedProduct.price * quantity).toFixed(2);
        } else {
            priceField.value = '';
        }
    });

    // Update price when quantity changes
    quantityField.addEventListener('input', function () {
        const selectedProduct = getSelectedProduct();
        if (selectedProduct) {
            const quantity = parseInt(this.value) || 0;
            priceField.value = (selectedProduct.price * quantity).toFixed(2);
        }
    });

    // ======================= END PRICE SYNC ==================

    // ===================== CUSTOMER DROPDOWN ====================
    const customerSelect = document.getElementById('existingCustomer');

    async function fetchCustomers() {
        try {
            const response = await fetch("http://localhost:8080/api/customers/all-customers");
            if (!response.ok) throw new Error('Failed to fetch customers');

            console.log("customers", response);

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
            const local = JSON.parse(localStorage.getItem('localCustomers') || '[]');
            if (local.length > 0) {
                console.warn('Loading local customers into dropdown');
                local.forEach(customer => {
                    const option = document.createElement('option');
                    option.value = customer.id || customer.name;
                    option.textContent = customer.name;
                    customerSelect.appendChild(option);
                });
            }
        }
    }
    fetchCustomers();
    // ================ END CUSTOMER DROPDOWN =====================

    // ===================== CUSTOMER TYPE SWITCH =================
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
            } else {
                document.getElementById(`${target}Customer`).classList.add('active');
            }
        });
    });
    // ================ END CUSTOMER TYPE SWITCH ==================

    // ===================== MODAL CONTROL ========================
    const modal = document.getElementById('newCustomerModal');
    const closeModal = document.querySelector('.sales-modal-close');

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    // =================== END MODAL CONTROL =======================

    // ===================== NEW CUSTOMER SUBMIT ===================
    document.getElementById('newCustomerForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const phone = document.getElementById('customerPhone').value;

        const fallbackInsert = () => {
            const localId = `local-${Date.now()}`;
            const option = document.createElement('option');
            option.value = localId;
            option.textContent = name;
            customerSelect.appendChild(option);
            customerSelect.value = option.value;

            const existing = JSON.parse(localStorage.getItem('localCustomers') || '[]');
            existing.push({ id: localId, name, email, phone });
            localStorage.setItem('localCustomers', JSON.stringify(existing));

            console.warn('Backend failed. Customer saved locally.');
        };

        try {
            const response = await fetch("http://localhost:8080/api/customers/create-customer", {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            });

            if (!response.ok) throw new Error('Failed to add customer');
            const data = await response.json();

            if (!data.token) throw new Error("No token received");

            const option = document.createElement('option');
            option.value = data.id || name;
            option.textContent = name;
            customerSelect.appendChild(option);
            customerSelect.value = option.value;

        } catch (error) {
            console.error('Error adding customer:', error);
            fallbackInsert();
        }

        modal.style.display = 'none';
        e.target.reset();
    });

    // ================= END NEW CUSTOMER SUBMIT ===================




    // ===================== SALES FORM SUBMIT =====================
    const salesForm = document.getElementById('salesForm');
    const salesTable = document.getElementById('salesTableBody');

    salesForm.addEventListener('submit', async (e) => {
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

            if (!selectedOption || selectedOption.value === "") {
                alert('Please select a valid customer!');
                return;
            }

            customerValue = selectedOption.textContent;
        } else {
            customerValue = document.getElementById('customerName')?.value.trim();
            if (!customerValue) {
                alert('Please enter a customer name!');
                return;
            }
        }

        if (!item) return alert('Please select a product!');
        if (!quantity || isNaN(quantity) || quantity <= 0) return alert('Enter valid quantity!');
        if (!price || isNaN(price) || price <= 0) return alert('Enter valid price!');

        // Append to table
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
        setDefaultDate();


               });

    // =================== END SALES FORM SUBMIT ===================

    // ===================== POST SALES DATA =======================

    document.getElementById('postbutton').addEventListener('click', async () => {
        const rows = document.querySelectorAll('#salesTableBody tr');
        if (rows.length === 0) {
            alert('No sales records to post!');
            return;
        }

        // Grouping sales under one transaction
        const firstRow = rows[0].querySelectorAll('td');
        const paymentMethod = firstRow[5].textContent;
        const customerName = firstRow[1].textContent;

        // Try to find the actual customerId from the dropdown
        const customerSelect = document.getElementById('existingCustomer');
        const selectedCustomer = Array.from(customerSelect.options).find(
            opt => opt.textContent === customerName
        );

        const customerId = selectedCustomer?.value;

        if (!customerId || customerId.startsWith('local-')) {
            alert('Only registered customers can be used for sales posting!');
            return;
        }

        const items = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            const productName = cells[2].textContent;
            const quantity = parseInt(cells[3].textContent);

            const product = allProducts.find(p => p.name === productName);
            if (!product) {
                throw new Error(`Product not found: ${productName}`);
            }

            return {
                quantity: quantity,
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    stock: product.stock
                }
            };
        });


       const saleDate = firstRow[0].textContent; // Get sale date from table row

     const salePayload = {
         customerId: customerId,
         paymentMethod: paymentMethod.toUpperCase(),
         saleDate: new Date(saleDate).toISOString(),
         items: items
     };

    console.log('posting sales entry:', salePayload)

        try {
            const response = await fetch("http://localhost:8080/api/sales/create", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(salePayload)
            });

            if (!response.ok) throw new Error('Failed to post sales data');

            alert('Sales posted successfully!');
            salesTable.innerHTML = '';

        } catch (error) {
            console.error('Error posting sales:', error);
            alert('Error posting sales!');
        }
    });

    // =================== END POST SALES DATA =====================

    // ================ REPORT DOWNLOAD FUNCTION  ==================

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




});
