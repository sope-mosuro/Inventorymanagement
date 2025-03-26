/*fetch from windows*/
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-6QGQLGFBMJ');
/*Dialog box for first div*/
document.getElementById("dialog1").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("srrank").style.display = "flex";
});

document.querySelector(".close-btn").addEventListener("click", function() {
    document.getElementById("srrank").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("srrank")) {
        document.getElementById("srrank").style.display = "none";
    }
});
/*Dialog box for Second div*/
document.getElementById("dialog2").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("untsld").style.display = "flex";
});

document.querySelector(".close-btn2").addEventListener("click", function() {
    document.getElementById("untsld").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("untsld")) {
        document.getElementById("untsld").style.display = "none";
    }
});
/*Dialog box for third div*/
document.getElementById("dialog3").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("whrank").style.display = "flex";
});

document.querySelector(".close-btn3").addEventListener("click", function() {
    document.getElementById("whrank").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("whrank")) {
        document.getElementById("whrank").style.display = "none";
    }
});
/*Dialog box for forth div*/
document.getElementById("dialog4").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("prdrank").style.display = "flex";
    });

    document.querySelector(".close-btn4").addEventListener("click", function() {
        document.getElementById("prdrank").style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === document.getElementById("prdrank")) {
            document.getElementById("prdrank").style.display = "none";
        }
    });
/*Dialog box for fifth div*/
document.getElementById("dialog5").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("stock").style.display = "flex";
    });

    document.querySelector(".close-btn5").addEventListener("click", function() {
        document.getElementById("stock").style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === document.getElementById("stock")) {
            document.getElementById("stock").style.display = "none";
        }
    });
/*Dialog box for sixth div*/
document.getElementById("dialog6").addEventListener("click", function(event) {
            event.preventDefault();
            document.getElementById("transfer").style.display = "flex";
        });

        document.querySelector(".close-btn6").addEventListener("click", function() {
            document.getElementById("transfer").style.display = "none";
        });

        window.addEventListener("click", function(event) {
            if (event.target === document.getElementById("transfer")) {
                document.getElementById("transfer").style.display = "none";
            }
        });


/*Dialog box for seventh div*/
document.getElementById("dialog7").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("active").style.display = "flex";
});

document.querySelector(".close-btn7").addEventListener("click", function() {
    document.getElementById("active").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("active")) {
        document.getElementById("active").style.display = "none";
    }
});


/*Dialog box for eighth div*/
document.getElementById("dialog8").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("config").style.display = "flex";
});

document.querySelector(".close-btn8").addEventListener("click", function() {
    document.getElementById("config").style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("config")) {
        document.getElementById("config").style.display = "none";
    }
});

/*Slide navigation switch script*/
        document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            let target = this.getAttribute("data-target");
            sections.forEach(section => {
                section.style.display = section.id === target.replace('#','') ? "block" : "none"; 
            });
            menuItems.forEach(menuItem => {
menuItem.classList.remove("active");
});
this.classList.add("active");     });   });  });
//    Log Out Alert 
document.querySelector('.logout').addEventListener("click", function(){
var c = confirm ('Are you sure you want to logout?\nClick "ok" to logout');
});



    // Dialog for User Management
function showDialog(dialogId) {
    document.getElementById(dialogId).style.display = "flex";
}

// Close button
function closeDialog(event) {
    if (event.target.classList.contains("close-btn9")) {
        event.target.closest(".dialog-box").style.display = "none";
    }
}
// Event Listeners
document.getElementById("addUserBtn").addEventListener("click", () => showDialog("addUserDialog"));
document.getElementById("removeUserBtn").addEventListener("click", () => showDialog("removeUserDialog"));
document.getElementById("activationSetupBtn").addEventListener("click", () => showDialog("activationDialog"));

document.querySelectorAll(".close-btn9").forEach(button => {
    button.addEventListener("click", closeDialog);
});


//inventory section script

  document.addEventListener('DOMContentLoaded', function() {
    // Fetch inventory items from the backend
    // Endpoint: GET /api/inventory
    fetch('/api/inventory')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#inventory-table tbody');
            data.forEach(item => {
                const row = `<tr>
                    <td>${item.simpleCode}</td>
                    <td>${item.description}</td>
                    <td>${item.description2}</td>
                    <td>${item.notes}</td>
                    <td>${item.group}</td>
                    <td>${item.itemCategory}</td>
                </tr>`;
                tbody.innerHTML += row;
            });
        });




    // Add item button click event   removed!!
    // Endpoint: POST /api/inventory


    // Run report button click event
    // Endpoint: GET /api/reports/{reportType}
    document.getElementById('run-report').addEventListener('click', function() {
        const reportType = document.getElementById('report-select').value;
        fetch(`/api/reports/${reportType}`)
            .then(response => response.json())
            .then(data => {
                console.log('Report data:', data);
                // Handle report data display
            });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const reportWrapper = document.querySelector('.tabular--wrapper');
    const tbody = document.getElementById('invTableBody');

    document.getElementById('run-report').addEventListener('click', function() {
        const reportType = document.getElementById('report-select').value;

        // Endpoint: GET /api/reports/${reportType}
        fetch(`/api/reports/${reportType}`)
            .then(response => response.json())
            .then(newData => {
                if(reportType === 'inventory-summary') {
                    // Append new data to existing entries
                    newData.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.date}</td>
                            <td>${item.product}</td>
                            <td>${item.quantity}</td>
                            <td>${item.amount}</td>
                            <td>${item.supplier}</td>
                            <td>${item.status}</td>
                        `;
                        tbody.appendChild(row);
                    });

                    // Show the report table if hidden
                    if(reportWrapper.style.display === 'none') {
                        reportWrapper.style.display = 'block';
                    }
                }
            })
            .catch(error => console.error('Error fetching report:', error));
    });
});


// Sales Form Submission (Updated)
document.addEventListener('DOMContentLoaded', () => {
    const salesForm = document.getElementById('salesForm');
    const salesTable = document.getElementById('salesTableBody');

    salesForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const item = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        const saleDate = document.getElementById('saleDate').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        // Determine customer value
        let customerValue = '';
        const existingCustomerOption = document.querySelector('.customer-option[data-option="existing"]');
        if (existingCustomerOption && existingCustomerOption.classList.contains('active')) {
            customerValue = document.getElementById('existingCustomer').value;
        } else {
            customerValue = document.getElementById('manualCustomer').value;
        }

        // Validate inputs
        if (!item || item === "") {
            alert('Please select a product!');
            return;
        }
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            alert('Please enter a valid quantity!');
            return;
        }
        if (!price || isNaN(price) || price <= 0) {
            alert('Price is not valid!');
            return;
        }

        // Create table row
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

        // Append the new row to the sales table
        salesTable.appendChild(newRow);

        // Reset the form
        salesForm.reset();
    });
});

    document.addEventListener('DOMContentLoaded', function() {
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

        // Form submit handler
        document.getElementById('salesForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from actually submitting
            setDefaultDate();

            // if we want to keep user-selected date, remove the setdefaultdate line above
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
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
    });

/* Sales page modifications */

document.addEventListener('DOMContentLoaded', () => {
    // Customer Selection Logic
    const customerOptions = document.querySelectorAll('.customer-option');
    const customerInputs = document.querySelectorAll('.customer-input');

    customerOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active states
            customerOptions.forEach(o => o.classList.remove('active'));
            customerInputs.forEach(i => i.classList.remove('active'));

            // Set active state
            option.classList.add('active');
            const target = option.dataset.option;

            if(target === 'new') {
                document.getElementById('newCustomerModal').style.display = 'block';
                return;
            }

            document.getElementById(`${target}Customer`).classList.add('active');
        });
    });

    // Modal Handling
    const modal = document.getElementById('newCustomerModal');
    const closeModal = document.querySelector('.sales-modal-close');

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // New Customer Form Handling
    document.getElementById('newCustomerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value;

        // Add to existing customers
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        document.getElementById('existingCustomer').appendChild(option);

        // Reset and close
        modal.style.display = 'none';
        e.target.reset();
    });

    // Sales Form Submission
    document.getElementById('salesForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Get customer value based on selection
        let customerValue = '';
        if(document.querySelector('.customer-option[data-option="existing"]').classList.contains('active')) {
            customerValue = document.getElementById('existingCustomer').value;
        } else {
            customerValue = document.getElementById('manualCustomer').value;
        }

    });
});











  