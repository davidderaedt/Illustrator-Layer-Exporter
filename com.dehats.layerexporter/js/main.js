/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    // Opens the chrome developer tools in host app
    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }
    
    // Reloads extension panel
    function reloadPanel() {
        location.reload();
    }
    
    // Loads / executes a jsx file
    function loadJSXFile(pPath) {
        var scriptPath = csInterface.getSystemPath(SystemPath.EXTENSION) + pPath;
        csInterface.evalScript('$._ext.evalFile("' + scriptPath + '")');
    }
    
    // Loads / executes all jsx files in the given folder
    function loadJSXFiles(pFolderPath) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + pFolderPath;
        csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
    }
    
    
    
    function init() {
                
        themeManager.init();
        
        
        // Menu mgmt
        var $currentPanel;
        
        function showPanel(pId) {
            console.log("showing "+ pId);
            if($currentPanel) $currentPanel.hide();
            $currentPanel =  $(pId);
            $currentPanel.show();            
        }        
        
        $("#mainPanelBt").click(function(){ showPanel("#mainPanel")});
        $("#optionsPanelBt").click(function(){ showPanel("#optionsPanel")});
        $("#outputPanelBt").click(function(){ showPanel("#outputPanel")});        
        $("#toolsPanelBt").click(function(){ showPanel("#toolsPanel")});
        
        showPanel("#mainPanel");
        
        
        
        // Business logic
        
        loadJSXFile("/jsx/exportLayersAndData.jsxbin");
        loadJSXFile("/jsx/Renamer.jsx");

        
        $("#layer2SVGBt").click(function(){csInterface.evalScript("$.appendToAllLayers('.svg');");});
        $("#layer2PNGBt").click(function(){csInterface.evalScript("$.appendToAllLayers('.png');");});
        $("#layer2JPGBt").click(function(){csInterface.evalScript("$.appendToAllLayers('.jpg');");});
        $("#layer2NoneBt").click(function(){csInterface.evalScript("$.appendToAllLayers('');");});

        $("#items2SVGBt").click(function(){csInterface.evalScript("$.appendToSelNames('.svg');");});
        $("#items2PNGBt").click(function(){csInterface.evalScript("$.appendToSelNames('.png');");});
        $("#items2JPGBt").click(function(){csInterface.evalScript("$.appendToSelNames('.jpg');");});
        $("#items2NoneBt").click(function(){csInterface.evalScript("$.appendToSelNames('');");});
        
        
        $("#newLayerBt").click(function(){loadJSXFile("/jsx/newLayerFromSel.jsx");});
        $("#distribBt").click(function(){loadJSXFile("/jsx/distribSelectionToLayers.jsx");});
        

        $("#helpLink").click(function(){
             window.cep.util.openURLInDefaultBrowser("http://davidderaedt.github.io/AILayerExporterPage/");
        });
        
        
        $("#destBt").click(function () {
            csInterface.evalScript("$._ext.selectDestination()", function (destPath) {
                $("#destLabel").html(destPath);
            });
        });
                
        $("#btn_exec").click(function () {
            var precision = $('#svgPrecision').val();
            var outlineFonts = $('#svgFont').is(':checked');
            var embedImages = $('#svgEmbed').is(':checked');
            var jpgquality = $('#jpgquality').val();
            var toHTML = $('#toHTML').is(':checked');
            var toEdgeAnimate = $('#edgeAnimate').is(':checked');
            var createJSON = $('#jsonCb').is(':checked');
            var sepCSS = $('#sepCSSCb').is(':checked');
            
            var code = '$._ext.exportLayers(' + precision + ', ' + outlineFonts + ', ' + embedImages + ', ' + jpgquality;
            code += ', ' + createJSON + ', ' + toHTML + ', ' + sepCSS + ', ' + toEdgeAnimate + ');';
            
            console.log(code);
            
            csInterface.evalScript(code, function (destPath) {
                $("#destLabel").html(destPath);
            });
        });
    }
        
    init();

}());
    
