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

    /* Slide Navigation Switch */
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

            this.classList.add("active");
        });
    });
});


//    Log Out Alert
document.querySelector('.logout').addEventListener("click", function(){
var c = confirm ('Are you sure you want to logout?\nClick "ok" to logout');
});





















  