// The build system won't allow me to import these scripts and all I got was this
// lousy file. I'm using JS to load the scripts from CDN.
function subvert() {
    var source = ['//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
              '//cdnjs.cloudflare.com/ajax/libs/string.js/3.1.1/string.min.js', 
              '//cdnjs.cloudflare.com/ajax/libs/prism/0.0.1/prism.min.js'];

    var head = document.getElementsByTagName('head')[0];

    for ( var i = 0; i < source.length; i++ ) {
       var script= document.createElement('script');
       script.type= 'text/javascript';
       script.src= source[i];
       head.appendChild(script);
    }
};
// Load button-builder from github if you can't get it in time. 
document.addEventListener("DOMContentLoaded", function(event) { 
    dojo.create("script", { type: "text/javascript", src: "//etitolo.github.io/wsi-button-builder/js/button-builder.js"}, dojo.body(), "after");
});
