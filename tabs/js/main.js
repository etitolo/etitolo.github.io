
function tabs() {
    var tabNumber = document.querySelectorAll(".tabs a");
    var tabContent = document.querySelectorAll(".tabContent div");

    for (i=0; i < tabNumber.length; i++) {
        var el = tabNumber[i];
        tabNumber[i].setAttribute("data-tab", "tab-" + i);
        el.addEventListener("click", toggleCurrentTab, false);
    }
    for (i=0; i < tabContent.length; i++) {
        tabContent[i].classList.add("tab-" + i);
    }
    
    function toggleCurrentTab(e) {
        for (i=0; i < tabNumber.length; i++) {
            var removeCurrent = tabNumber[i];
            removeCurrent.classList.remove("current");
        }
        for (i=0; i < tabContent.length; i++) {
            var removeCurrentContent = tabContent[i];
            removeCurrentContent.classList.remove("current");
        }

        var tabId = $(this).attr('data-tab');
        $("."+tabId).addClass('current');
        
        e.currentTarget.classList.add("current");
    }
}
tabs();


