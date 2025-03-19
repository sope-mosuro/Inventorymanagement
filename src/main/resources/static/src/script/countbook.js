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


// sales page entry
document.getElementById("salesForm").addEventListener("submit", function(event) {
event.preventDefault();

// get input values from tables
let productName = document.getElementById("productName").value;
let quantity = document.getElementById("quantity").value;
let price = document.getElementById("price").value;
let customer = document.getElementById("customer").value;
let saleDate = document.getElementById("saleDate").value;
let paymentMethod = document.getElementById("paymentMethod").value;
let saleStatus = document.getElementById("saleStatus").value;


let salesTableBody = document.getElementById("salesTableBody");

// make a new row auto
let newRow = document.createElement("tr");
newRow.innerHTML = `
<td>${saleDate}</td>
<td>${productName}</td>
<td>${quantity}</td>
<td>₦${price}</td>
<td>${customer}</td>
<td>${paymentMethod}</td>
<td>${saleStatus}</td>
`;

salesTableBody.appendChild(newRow);

document.getElementById("salesForm").reset();         });   //reset form after

//inventory page

document.getElementById("invForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let stockqty = document.getElementById("stkqty").value;
    let amountpaid = document.getElementById("amt").value;
    let supplier = document.getElementById("supplier").value;
    let productid = document.getElementById("productid").value;
    let buyDate = document.getElementById("buyDate").value;
    let transStatus = document.getElementById("transStatus").value;

    let invTableBody = document.getElementById("invTableBody");

    let invnewRow = document.createElement("tr");
    invnewRow.innerHTML = `
    <td>${buyDate}</td>
    <td>${productid}</td>
    <td>${stockqty}</td>
    <td>₦${amountpaid}</td>
    <td>${supplier}</td>
    <td>${transStatus}</td>
    `;

    invTableBody.appendChild(invnewRow);

    document.getElementById("invForm").reset();      });

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


document.querySelectorAll('.has-dropdown > a').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); 
      this.parentElement.classList.toggle('active');
    });
  });
  
  // Add event listeners to the dropdown items for page switching
  document.querySelectorAll('.dropdown-menu li').forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation(); 
      this.closest('.has-dropdown').classList.remove('active');
      let target = this.getAttribute('data-target');

      // Calls functions for page switching
      console.log("Switching page to:", target);
    });
  });

















  