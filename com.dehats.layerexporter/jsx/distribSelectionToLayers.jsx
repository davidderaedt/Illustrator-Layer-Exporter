// (c) Copyright 2013 Adobe Systems, Inc. All rights reserved.
// author David Deraedt

// Distributes selected items across new layers

#target illustrator

var doc = app.activeDocument;
var items = doc.selection;

var n = items.length;

for ( var i = n-1 ; i >=0 ; i--) {
	
	var item = items[i];
	var layer = doc.layers.add();
	item.move(layer,ElementPlacement.PLACEATBEGINNING);
}

