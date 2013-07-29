/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $ */

(function () {
    "use strict";
    
    function createComposition(pURL, $target) {
    
        $.getJSON(pURL, function (data) {
            $target.css("width", data.width);        
            var count = data.layers.length;
            var i;
            for (i = count - 1; i >= 0; i--) {
                var obj = data.layers[i];
                if(obj.visible == false) continue;
                var $el ;
                if(obj.text){
                    var pTag =  "<p>"+ obj.text + "</p>\n";
                    $el = $(pTag);                  
                    $el.css("font-size", obj.fontSize + "px");
                    $el.css("font-family", obj.fontFamily);
                    $el.css("color",  obj.fontColor);                        
                } else {
                    var imgTag =  "<img class='showtime' src=\"img/" + obj.filename + "\"/>\n";
                    $el = $(imgTag);   
                }
                $target.append($el);
                $el.css("position", "absolute");
                $el.css("left", obj.x + "px");
                $el.css("top", obj.y + "px");                
            }
        
        });    
    }
    
    
    $(function () {
        
        createComposition('img/data.json', $('#container'));
        
    });
    
}());