
function tabs() {
    var tabNumber = document.querySelectorAll(".tabs a");
    var tabContent = document.querySelectorAll(".tabContent div");
    
    for (i=0; i < tabNumber.length; i++) {
        var el = tabNumber[i];
        el.addEventListener("click", toggleCurrentTab, false);
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
        var tabId = e.currentTarget.getAttribute("role");
        var tabSelected = document.querySelector("."+tabId);
        
        e.currentTarget.classList.add("current");
        tabSelected.classList.add("current");
    }
}
tabs();


