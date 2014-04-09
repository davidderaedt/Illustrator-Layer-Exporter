/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global document, $, Hammer */

(function () {
    "use strict";

    var animationData = {x:0, y:0, time:1};


    function Movable($el) {
        
        this.lastX = this.originX = parseFloat($el.data.x);
        this.lastY = this.originY = parseFloat($el.data.y);
        this.$el = $el;
                
        var self = this;
        var domEl = this.$el[0];
        /*        
        $el.click(function(evt){
            $(".selected").removeClass("selected");
            self.$el.addClass("selected");
        });
        */
        Hammer(domEl).on("drag", function (event) {
            var cssObj = {
                "left": self.lastX + event.gesture.deltaX + "px",
                "top": self.lastY + event.gesture.deltaY + "px"
            };
            $(event.target).css(cssObj);
        });

        Hammer(domEl).on("dragend", function (event) {
            self.lastX = parseFloat(self.$el.css("left"));
            self.lastY = parseFloat(self.$el.css("top"));
            animationData.x = self.lastX-self.originX;
            animationData.y = self.lastY-self.originY;            
        });
    }

    Movable.prototype.sendToOrigin = function () {
        
        var cssObj = {
            "left": this.originX + "px",
            "top": this.originY + "px"
        };
        
        this.$el.css(cssObj);

        this.lastX = this.originX;
        this.lastY = this.originY;
        
    };
    

    $(function () {
            
        var movables = [];        

        composer.create('img/data.json', 'img/', $('#container'), function (list) {
            var n = list.length;
            var i;
            for (i = 0; i < n; i++) {
                var m = new Movable(list[i]);
                movables.push(m);
            }
        });


        $("#originBt").click(function () {           
            var n = movables.length;
            var i;
            for (i = 0; i < n; i++) {
                var m = movables[i];
                m.sendToOrigin();
            }            
        });

        document.ontouchmove = function (event) {
            if(event.target!=document.body) event.preventDefault();
        };

    });

}());