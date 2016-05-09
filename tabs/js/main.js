
function tabs() {
    var tabNumber = document.querySelectorAll(".tabs a");
    var tabContent = document.querySelectorAll(".tabContent div");

    for (var i=0; i < tabNumber.length; i++) {
        tabContent[i].classList.add("tab-" + i);
        tabNumber[i].setAttribute("data-tab", "tab-" + i);
    }
    
    $('.tabs a').click(function(){
        var tabId = $(this).attr('data-tab'); 

        $('.tabs a').removeClass('current');
        $('.tabContent div').removeClass('current');

        $(this).addClass('current');
        $("."+tabId).addClass('current');
    }); 
}
tabs();

