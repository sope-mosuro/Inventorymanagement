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












  