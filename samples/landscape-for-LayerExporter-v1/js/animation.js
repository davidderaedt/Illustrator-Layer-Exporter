/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global document, $, composer */

(function () {
    "use strict";

    $(function () {
        
        function onCompReady() {
            $("#container").addClass("animate");
        }

        composer.create('img/data.json', 'img/', $('#container'), function (list) {
            setTimeout(onCompReady, 500);
        });
     
        $("body").click(function (){
            playPause();
        });
        
        function playPause() {
            vendorPlayPause("-moz-");
            vendorPlayPause("-webkit-");
        }
        
        function vendorPlayPause(prefix) {
            var animState = $("#container img").css(prefix + "animation-play-state");
            var newState = (animState=="paused")? "running":"paused";
            $("#container img").css(prefix + "animation-play-state", newState);        
        }

    });

}());