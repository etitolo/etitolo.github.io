function expandCollapse(){
    var header = document.querySelector(".header");
    var content = document.querySelector(".content-container");
    
    header.addEventListener("click", function() {
        window.setTimeout(function(){
            content.classList.toggle("hide");
        }, 500);
        content.classList.toggle("expanded");
        header.classList.toggle("expanded");
        if (content.classList.contains("expanded")) {
            content.classList.remove("collapsed");
        } else {
            content.classList.add("collapsed");
        }
    });
};
expandCollapse();