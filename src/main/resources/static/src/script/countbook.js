
/*fetch from windows*/
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-6QGQLGFBMJ');


/*      Logic for grouped dialog boxes       */
document.addEventListener("DOMContentLoaded", function() {
    /* Grouped Dialog Box Logic */
    const dialogIds = [
        "dialog1", "dialog2", "dialog3", "dialog4",
        "dialog5", "dialog6", "dialog7", "dialog8"
    ];
    const modalIds = [
        "srrank", "untsld", "whrank", "prdrank",
        "stock", "transfer", "active", "config"
    ];

    dialogIds.forEach((dialogId, i) => {
        const dialog = document.getElementById(dialogId);
        const modal = document.getElementById(modalIds[i]);
        const closeBtn = document.querySelector(".close-btn" + (i === 0 ? "" : (i+1)));
        if (dialog && modal) {
            dialog.addEventListener("click", function(e) {
                e.preventDefault();
                modal.style.display = "flex";
            });
            if (closeBtn) {
                closeBtn.addEventListener("click", function() {
                    modal.style.display = "none";
                });
            }
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        }
    });

    /*  Loading Spinner */

    window.showSpinner = function (message = 'Loading...') {
        const spinner = document.getElementById('spinner');
        const label = document.getElementById('spinnerLabel');
        if (label) label.textContent = message;
        if (spinner) spinner.classList.remove('hidden');
    };

    window.hideSpinner = function () {
        const spinner = document.getElementById('spinner');
        if (spinner) spinner.classList.add('hidden');
    };

    window.showToast = function (message, type = 'success') {
        const toast = document.getElementById("toast");
        const toastText = document.getElementById("toastText");

        if (!toast || !toastText) return;

        toastText.textContent = message;
        toast.className = type === 'error' ? 'toast error' : 'toast success';
        toast.classList.remove("hidden");

        setTimeout(() => toast.classList.add("hidden"), 3000);
    };

    /* Slide Navigation Switch */
function switchToSlide(targetId) {
    if (!targetId) return;

    // Clean the ID (remove # if present)
    targetId = targetId.replace('#', '');

    // Show the right section
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = section.id === targetId ? "block" : "none";
    });

    // Update menu item active states safely
    document.querySelectorAll(".menu li").forEach(menuItem => {
        const attr = menuItem.getAttribute("data-target");
        if (!attr) return; // skip items with no data-target
        const target = attr.replace('#', '');
        menuItem.classList.toggle("active", target === targetId);
    });
}

// Click handler
document.querySelectorAll(".menu li").forEach(item => {
    item.addEventListener("click", function() {
        const target = this.getAttribute("data-target");
        if (!target) return; // skip click if no data-target
        switchToSlide(target);
        window.location.hash = target.replace('#', '');
    });
});


// On page load (respect hash)
window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
        switchToSlide(hash);
    } else {
        switchToSlide('dashboard'); // fallback default
    }
});

        fetchTopSalesReps();

        fetchWarehouses();

        fetchTopProducts();


// Log out function

        document.querySelector('.logout').addEventListener("click", async function () {
            const confirmLogout = confirm('Are you sure you want to log out?\nClick "OK" to proceed.');
            if (!confirmLogout) return;

            try {
                showSpinner('Logging out...');

                const response = await fetch("/api/auth/logout", {
                    method: 'POST',
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('Logout failed on the server.');

                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '../cBk_login.html';

            } catch (err) {
                console.error('Error during logout:', err);
                showToast('Logout failed. Please try again.', 'error');
            } finally {
                hideSpinner();
            }
        });

     });

    // Dashboard wiring and data fetch functions

    // Sales Rep ranking dialog box using new API
    async function fetchTopSalesReps() {
      try {
        const res = await fetch("/api/report/best-selling-reps");
        const reps = await res.json();
        updateSalesRepSection(reps);
      } catch (err) {
        console.error("Failed to fetch sales reps:", err);
      }
    }

    function updateSalesRepSection(reps) {
      const card = document.querySelector("#dialog1 .amount");
      const list = document.querySelector("#srrank-list");

      if (!card || !list) {
        console.error("Card or modal list element is missing.");
        return;
      }

      // Clear existing values
      const title = card.querySelector(".title");
      const oldValue = card.querySelector(".amount-value");

      if (title) title.textContent = "Top Sales Rep";
      if (oldValue) oldValue.remove();

      // Show only the top rep in the card
      const topRep = reps[0]?.name || "No reps available";
      const summary = document.createElement("span");
      summary.className = "amount-value";
      summary.textContent = topRep;
      card.appendChild(summary);

      // Clear and repopulate the modal list
      list.innerHTML = "";
      reps.slice(0, 4).forEach((rep, index) => {

        if (!rep || !rep.name) return;

        const li = document.createElement("li");
        li.className = "umoptions";
        li.innerHTML = `<strong>${rep.name}</strong>`;
        list.appendChild(li);
      });
    }

    // Warehouse ranking box
    async function fetchWarehouses() {
      try {
        const res = await fetch("/api/admin/warehouses");
        const warehouses = await res.json();
        updateWarehouseSection(warehouses);
      } catch (err) {
        console.error("Failed to fetch warehouses:", err);
      }
    }

    function updateWarehouseSection(warehouses) {
      const card = document.querySelector("#dialog3 .amount");  // update to your actual dialog ID
      const list = document.querySelector("#whrank-list");     // modal list container

      if (!card || !list) {
        console.error("Card or modal list element is missing.");
        return;
      }

      // Reset card
      const title = card.querySelector(".title");
      const oldValue = card.querySelector(".amount-value");

      if (title) title.textContent = "Total Warehouses";
      if (oldValue) oldValue.remove();

      const topWarehouse = warehouses[0]?.name || "No warehouses found";
      const summary = document.createElement("span");
      summary.className = "amount-value";
      summary.textContent = topWarehouse;
      card.appendChild(summary);

      // Reset modal list
      list.innerHTML = "";
      warehouses.slice(0, 4).forEach((warehouse, index) => {

        if (!warehouse || !warehouse.name) return;

        const li = document.createElement("li");
        li.className = "umoptions";
        li.innerHTML = `<strong>${warehouse.name}</strong>`;
        list.appendChild(li);
      });
    }

// Products dialog box
async function fetchTopProducts() {
  try {
    const res = await fetch("/api/report/best-selling-products");
    const products = await res.json();
    updateTopProductsSection(products);
  } catch (err) {
    console.error("Failed to fetch top products:", err);
  }
}

function updateTopProductsSection(products) {
  const card = document.querySelector("#dialog4 .amount");
  const list = document.querySelector("#prdrank-list");

  if (!card || !list) {
    console.error("Card or modal list element is missing for products.");
    return;
  }

  // Clear existing values
  const title = card.querySelector(".title");
  const oldValue = card.querySelector(".amount-value");

  if (title) title.textContent = "Top Product";
  if (oldValue) oldValue.remove();

  // Show only the top product in the card
  const topProduct = products[0]?.name || "No products available";
  const summary = document.createElement("span");
  summary.className = "amount-value";
  summary.textContent = topProduct;
  card.appendChild(summary);

console.log("card value set", topProduct);

console.log("fetching payload:", products);

  // Clear and repopulate the modal list
  list.innerHTML = "";
  products.slice(0, 4).forEach((product, index) => {

    if (!product || !product.name) return;

    const li = document.createElement("li");
    li.className = "umoptions";
    li.innerHTML = `<strong>${product.name}</strong>`;
    list.appendChild(li);
  });
}






















  