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

function switchToSlide(targetId) {
    // Clean the ID (remove # if present)
    targetId = targetId.replace('#', '');

    // Show the right section
    document.querySelectorAll(".section").forEach(section => {
        section.style.display = section.id === targetId ? "block" : "none";
    });

    // Update menu item active states
    document.querySelectorAll(".menu li").forEach(menuItem => {
        const target = menuItem.getAttribute("data-target").replace('#', '');
        menuItem.classList.toggle("active", target === targetId);
    });
}

// Click handler
document.querySelectorAll(".menu li").forEach(item => {
    item.addEventListener("click", function() {
        const target = this.getAttribute("data-target");
        switchToSlide(target);
        // Optional: update the URL hash for browser nav/bookmarking
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


document.addEventListener("click", function() {
   const target = this.getAttribute("data-target");
     switchToSlide(target);
            });







     });


//    Log Out Alert
document.querySelector('.logout').addEventListener("click", function(){
var c = confirm ('Are you sure you want to logout?\nClick "ok" to logout');
});





















  