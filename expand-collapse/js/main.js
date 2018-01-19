function expandCollapse(){
    let header = document.querySelectorAll(".header");
    let content = document.querySelectorAll(".content-container");
    
    for (let i=0; i< header.length; i++) {
        header[i].addEventListener("click", function() {
            window.setTimeout(function(){
                content[i].classList.toggle("hide");
            }, 500);
            content[i].classList.toggle("expanded");
            header[i].classList.toggle("expanded");
            if (content[i].classList.contains("expanded")) {
                content[i].classList.remove("collapsed");
            } else {
                content[i].classList.add("collapsed");
            }
        });
    };
};
expandCollapse();