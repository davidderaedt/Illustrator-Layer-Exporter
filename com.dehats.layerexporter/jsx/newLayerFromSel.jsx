#target illustrator

var doc = app.activeDocument;
var layer;

var items = doc.selection;
var n = items.length;
if(n>0) layer = doc.layers.add();

for ( var i = n-1 ; i >=0 ; i--) {
	var item = items[i];	
	item.move(layer,ElementPlacement.PLACEATBEGINNING);
}
