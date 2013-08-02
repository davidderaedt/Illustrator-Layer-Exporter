/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $ */

var composer = (function () {
    "use strict";

    var comp = {};
    
    /**    
     * Creates a composition of text and images from a JSON data file
     * @param {string} pDataURL URL of the JSON data file
     * @param {string} imgFolder URL of the image folder
     * @param {object} target jquery handle to the target dom element
     * @param {function} cb Callback executed when elements are all created, 
     where an array of created elements is passed
     */
    
    function create(pDataURL, imgFolder, $target, cb) {
        var list = [];

        $.getJSON(pDataURL, function (data) {

            $target.css("width", data.width);
            $target.css("height", data.height);

            var count = data.layers.length;
            var i;
            for (i = count - 1; i >= 0; i--) {
                var obj = data.layers[i];
                if (obj.visible === false) {
                    continue;
                }
                var $el;
                // Use naming convention to use text instead of images
                var useText = (obj.name.indexOf("-txt") > -1);

                if (obj.text && useText) {
                    var pTag =  "<p>" + obj.text + "</p>\n";
                    $el = $(pTag);
                    var cssObj = {
                        "font-size": obj.fontSize + "px",
                        "font-family": obj.fontFamily,
                        "color": obj.fontColor,
                        "width": parseInt(obj.width, 10) * 1.05//hack to slightly increase width
                    };
                    $el.css(cssObj);
                } else {
                    var imgTag =  "<img src=\"" + imgFolder + obj.filename + "\"/>\n";
                    $el = $(imgTag);
                }
                $target.append($el);
                $el.css("position", "absolute");
                $el.css("left", obj.x + "px");
                $el.css("top", obj.y + "px");

                $el.data = obj;

                list.push($el);
            }
            
            cb(list, data);
        });
    }

    comp.create = create;
    
    return comp;
}());
