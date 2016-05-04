document.addEventListener("DOMContentLoaded", function(event) {
    //$(document).ready(function() {
    // This extends the removeAttr() method by allowing you to strip out ALL
    // attributes when the parentheses is empty.
    var removeAttr = jQuery.fn.removeAttr;
    jQuery.fn.removeAttr = function() {

      if (!arguments.length) {
        this.each(function() {

          // Looping attributes array in reverse direction
          // to avoid skipping items due to the changing length
          // when removing them on every iteration.
          for (var i = this.attributes.length -1; i >= 0 ; i--) {
            jQuery(this).removeAttr(this.attributes[i].name);
          }
        });

        return this;
      }

      return removeAttr.apply(this, arguments);
    };
    
    // Workaround for FTL barfing when displaying itself as <code>.
    $(".dont-forget").html("[#import '/buttons/_buttons.ftl' as button /]");
    $(".generated-macro code").html("[@button.<span class='macro-output'></span> /]");

    var initialSelect = $(".button-type").val();
    var hrefValue = $(".href-input").val();
    var buttonElement = ".btnPreview .btn";
    var iconElement = ".btnPreview .icon";
    var newLineWithIndent= "\n\040\040\040\040";

    var macroClassStrcture = [{
        value: "default",
        btnClasses: 'btn-primary',
        iconClasses: null
    }, {
        value: "defaultSecondary",
        btnClasses: 'btn-secondary',
        iconClasses: null
    }, {
        value: "defaultFlat",
        btnClasses: 'btn-flat',
        iconClasses: null
    }, {
        value: "directional",
        btnClasses: 'btn-primary',
        iconClasses: 'icon-directional'
    }, {
        value: "directionalSecondary",
        btnClasses: 'btn-secondary',
        iconClasses: 'icon-directional'
    }, {
        value: "directionalFlat",
        btnClasses: 'btn-flat',
        iconClasses: 'icon-directional'
    }];

    for (var i = 0; i < macroClassStrcture.length; i++) {
        var optionArrValue = macroClassStrcture[i].value;
        var optionArrBtnClass = macroClassStrcture[i].btnClasses;
        var optionArrIconClass = macroClassStrcture[i].iconClasses;
        var macroSelected = $(".button-type").val();
        var btnLabelValue = $(".btnLabel").val();
   
        $(".macro-output").text(initialSelect);
        $(".macro-output").text(macroSelected + newLineWithIndent + " buttonLabel='" + btnLabelValue + "'");
        $(buttonElement).text(btnLabelValue);
        if (initialSelect === optionArrValue) {
            $(buttonElement).addClass(optionArrBtnClass);
        }
    }
    
    function buildMacroParams() {
        macroSelected = $(".button-type").val();
        btnLabelValue = $(".btnLabel").val();
        hrefValue = $(".href-input").val();
        buttonClasses = $(".customButtonClasses").val();
        buttonId = $(".buttonId").val();
        tabindex = $(".tabindex").val();
        buttonSize = $(".btnSmall").val();
        isDisabled = $(".buttonAttributeDisabled").val();
        buttonAttributes = $(".attributesInput").val();
        iconDirection = $(".iconDirection").val();
        iconClasses = $(".customIconClasses").val();
        iconSet = $(".iconSet").val();

        // Build out Button Macro and Params 

        if (btnLabelValue !== "") {
            buildLabelParam = newLineWithIndent + " buttonLabel='" + btnLabelValue + "'";
        } else {
            buildLabelParam = "";
        }
        
        if (hrefValue !== "") {
            buildHrefParam = newLineWithIndent + " href='" + hrefValue + "'";
        } else {
            buildHrefParam = "";
        }
        
        if (buttonClasses !== "") {
            buildButtonClassParam = newLineWithIndent + " customButtonClasses='" + buttonClasses + "'" ; 
        } else {
            buildButtonClassParam = "";
        }
        
        if (buttonAttributes !== "") {
            buildButtonAttributesParam = newLineWithIndent + " attributes='" + buttonAttributes + "'" ; 
        } else {
            buildButtonAttributesParam = "";
        }
        
        if (buttonId !== "") {
            buildButtonIdParam = newLineWithIndent + " buttonId='" + buttonId + "'"; 
        } else {
            buildButtonIdParam = "";
        }
        
        if (tabindex !== "") {
            buildButtonTabindexParam = newLineWithIndent + " tabindex='" + tabindex + "'" ;
        } else {
            buildButtonTabindexParam = "";
        }
        
        if ($(".btnSmall:checked").length === 1) {
            buildButtonSizeParam = newLineWithIndent + " buttonSize='" + buttonSize + "'" ;
        } else {
            buildButtonSizeParam = "";
        }
        
        if ($(".buttonAttributeDisabled:checked").length === 1) {
            buildDisabledAttribute = newLineWithIndent + " buttonAttributeDisabled='" + isDisabled + "'" ;
        } else {
            buildDisabledAttribute = "";
        }
        
        if (buttonAttributes !== "") {
            buildButtonAttributes = newLineWithIndent + " attriubutes='" + buttonAttributes + "'" ;
        } else {
            buildButtonAttributes = "";
        }

        if (S(iconSet).contains('default')) {
            buildIconSet = "";
        } else {
            buildIconSet = newLineWithIndent + " iconSet='" + iconSet + "'" ;
        }
        
        if (S(iconDirection).contains('default')) {
            buildIconDirection = "";
        } else {
            buildIconDirection = newLineWithIndent + " iconDirection='" + iconDirection + "'" ;
        }

        if (iconClasses !== "") {
            buildIconClasses = newLineWithIndent + "customIconClasses='" + iconClasses + "'" ;
        } else {
            buildIconClasses = "";
        }
                
        return $(".macro-output").text(macroSelected + buildLabelParam + buildHrefParam + buildButtonClassParam + buildButtonIdParam + buildButtonTabindexParam + buildDisabledAttribute + buildButtonAttributesParam + buildButtonSizeParam + buildIconClasses + buildIconDirection + buildIconSet);
    }

    function buttonChangeEntified() {
        var entify = S($("<div />").append($(buttonElement).clone()).html()).escapeHTML().s;
        $(".btnCode").replaceWith("<code class='btnCode language-markup'>" + entify + "</code>");
        Prism.highlightAll();
    }
    
    function conditionalSpace(pre) {
        if (pre !== "") {
            return " ";
        } else {
            return "";
        }
    }

    function selectMacro() {
        $(".button-type").change(function() {
            $(".macro-output").text(btnLabelValue);
            $(buttonElement).text(btnLabelValue);
            buildMacroParams();
            for (var i = 0; i < this.length; i++) {
                optionArrValue = macroClassStrcture[i].value;
                optionArrBtnClass = macroClassStrcture[i].btnClasses;
                optionArrIconClass = macroClassStrcture[i].iconClasses;

                if (optionArrValue === macroSelected) {
                    $(buttonElement).removeClass().addClass("btn " + optionArrBtnClass);
                    if (optionArrIconClass != null) {
                        $(".iconParams").removeClass("expandable");
                        $(".btn").html(btnLabelValue + "<i class='icon " + optionArrIconClass + "'></i>");
                    } else {
                        $(".icon").detach();
                        $(".iconParams").addClass("expandable");
                    }
                    
                    buttonChangeEntified();
                }
            }
            Prism.highlightAll();
        });
    } selectMacro();
    
   function addButtonLabel() {
      $(".btnLabel").on("keyup", function buttonLabelOut() {
          $(".output-name").val(btnLabelValue);
          buildMacroParams();
          if ($(iconElement).hasClass('icon')) {
                  $(buttonElement).html(btnLabelValue + "<i class='icon " + optionArrIconClass + "'></i>");
              } else {
                  $(buttonElement).html(btnLabelValue);
              }
          buttonChangeEntified();
          Prism.highlightAll();
      });
  }
  addButtonLabel();

    function captureHref() {
        $(".href-input").keyup(function() {
            buildMacroParams();
            if (hrefValue !== "") {
                $(".btnPreview a").attr("href", hrefValue);
            } else {
                $(".btnPreview a").removeAttr("href");
            }
            buttonChangeEntified();
        });
    }

    function buttonIdInput() {
        $(".buttonId").keyup(function() {
            buildMacroParams();
            if (buttonId !== "") {
                $(buttonElement).attr("id", buttonId);
            } else {
                $(buttonElement).removeAttr("id");
            }
            buttonChangeEntified();
        });
    } buttonIdInput();

    
    function captureTabindex() {
        $(".tabindex").keyup(function() {
            buildMacroParams();
            if (tabindex !== "") {
                $(buttonElement).attr("tabindex", tabindex);
            } else {
                $(buttonElement).removeAttr("tabindex");
            }
            buttonChangeEntified();
        });
    } captureTabindex();

    function captureAttributes() {
        $(".attributesInput").change(function() {
            buildMacroParams();
            var re = /^<(a|button) /; 
            var str = $('<div />').append($(buttonElement).clone()).html();
            var rebuildParentOpen = '<div class="generated-markup btnPreview">';
            var rebuildParentClose = S(str).replaceAll('</button>', '</button></div>').s;
            var builda = S(str).replaceAll('<button ', '<button ' + buttonAttributes + " ").s;
            
            if ($('#radio-box-id1').is(':checked') && buttonAttributes !== "") {   
              $(".btnPreview .btn").replaceWith(S(str).replaceAll('<button ', '<button ' + buttonAttributes + " ").s);
            } else if ($('#radio-box-id2').is(':checked') && buttonAttributes !== "")  {
               $(".btnPreview .btn").replaceWith(S(str).replaceAll('<a ', '<a ' + buttonAttributes + " ").s);
            } else {
                $(buttonElement).removeAttr().addClass("btn " + optionArrBtnClass);
            }
            
            Prism.highlightAll();
            buttonChangeEntified();
        });
    } captureAttributes();


    function buttonClassesInput() {
        $(".customButtonClasses").keyup(function() {
            buildMacroParams();
            if (buttonClasses !== "") {
                $(buttonElement).append(function() {
                    $(buttonElement).attr("class", function() {
                        return "btn " + optionArrBtnClass + " " + buttonClasses;
                    });
                });
            } else {
                $(buttonElement).removeAttr("id");
                $(buttonElement).removeClass().addClass("btn " + optionArrBtnClass);
            }
            buttonChangeEntified();
        });
    } buttonClassesInput();
        
    function changeElement() {
        $(".radio-box-input").change(function() {
            buildMacroParams();
            var findAndCloneBtn = $('<div />').append($(buttonElement).clone()).html();
            var btnToA = S(findAndCloneBtn).replaceAll('<button ', '<a ').replaceAll('</button>', '</a>').s;
            var aToBtn = S(findAndCloneBtn).replaceAll('<a ', '<button ').replaceAll('</a>', '</button>').s;
            if ($('#radio-box-id1').is(':checked')) {
                $(".href").toggleClass("expandable");
                $(".btnPreview a").replaceWith(aToBtn);
                $(".btnPreview button").removeAttr("href");
                $(".btnCode").replaceWith("<code class='btnCode language-markup'>" + S(aToBtn).escapeHTML().s + "</code>");
            } else if ($('#radio-box-id2').is(':checked')) {
                $(".href").toggleClass("expandable");
                $(".btnPreview button").replaceWith(btnToA);
                $(".btnPreview a").attr("href", hrefValue);
                captureHref();
                $(".btnCode").replaceWith("<code class='btnCode language-markup'>" + S(btnToA).escapeHTML().s + "</code>");
            }
            buttonChangeEntified();
            Prism.highlightAll();
        });
    } changeElement();
    
    function buttonSize() {
        $(".btnSmall").click(function() {
            buildMacroParams();
            if ($(".btnSmall:checked").length === 1) {
                $(buttonElement).addClass("btn-small");
            } else {
                $(buttonElement).removeClass("btn-small");
            }
            buttonChangeEntified();
        });
    } buttonSize();

    function isButtonDisabled() {
        $(".buttonAttributeDisabled").click(function() {
            buildMacroParams();
            if ($(".buttonAttributeDisabled:checked").length === 1) {
                $(buttonElement).attr("disabled", "disabled");
            } else {
                $(buttonElement).removeAttr("disabled");
            }
            buttonChangeEntified();
        });
    } isButtonDisabled();

function iconCassBuilders() {
        if (S(iconDirection).contains('default')) {
            buildIconDirectionSelector = "";
        } else {
            buildIconDirectionSelector = "icon-directional-" + iconDirection;
        }

        if (S(iconSet).contains('default')) {
            buildIconSetSelector = "";
        } else {
            buildIconSetSelector = "icon-" + iconSet + "-directional";
        }
    }

    function changeIconSelectors() {
        $(".iconDirection, .iconSet").change(function() {
            $(".macro-output").text(macroSelected);
            buildMacroParams();
            iconCassBuilders();
            if (iconDirection !== "default" || iconSet !== "default") {
                $(iconElement).removeClass().addClass("icon " + optionArrIconClass + conditionalSpace(optionArrIconClass) + buildIconDirectionSelector + conditionalSpace(buildIconDirectionSelector) + buildIconSetSelector + conditionalSpace(buildIconSetSelector) + iconClasses);
            } else {
                $(iconElement).removeClass().addClass("icon " + optionArrIconClass + conditionalSpace(optionArrIconClass) + iconClasses);
            }
            buttonChangeEntified();
        });
    }
    changeIconSelectors();

    function iconClassesInput() {
        $(".customIconClasses").keyup(function() {
            buildMacroParams();
            iconCassBuilders();
            if (iconClasses !== "") {
                $(iconElement).append(function() {
                    $(this).attr("class", function() {
                        return "icon " + optionArrIconClass + conditionalSpace(optionArrIconClass) + buildIconDirectionSelector + conditionalSpace(buildIconDirectionSelector) + buildIconSetSelector + conditionalSpace(buildIconSetSelector) + iconClasses;
                    });
                });
            } else {
                $(iconElement).removeClass().addClass("icon " + optionArrIconClass + conditionalSpace(optionArrIconClass) + iconClasses);
            }
            buttonChangeEntified();
        });
    }
    iconClassesInput();

    // When you click on the macro, select all.
    document.getElementById('selectAll').addEventListener('click', function(){
        var range = document.createRange();
        var selection = window.getSelection();
        range.selectNodeContents(document.getElementById('selectAll'));
        
        selection.removeAllRanges();
        selection.addRange(range);
    });
            
    
    // clear the form
    $("#clearForm").click(function() {
        $(".macro-output").text(initialSelect);
        $(".output-name").val(initialSelect);
        $(".macro-output").text(macroSelected + " buttonLabel='" + btnLabelValue + "'");
        $(buttonElement).text(btnLabelValue);
        if (initialSelect === optionArrValue) {
            $(buttonElement).addClass(optionArrBtnClass);
        }
    });
    $("form").submit(function(event) {
        event.preventDefault();
    });
    buttonChangeEntified();
});


// Simple Sticky Menu
var  mn = $(".output-container");
     mns = "output-container-scrolled";
     hdr = $('header').height();

$(window).scroll(function() {
    if( $(this).scrollTop() > hdr ) {
        mn.addClass(mns);
    } else {
        mn.removeClass(mns);
    }
});