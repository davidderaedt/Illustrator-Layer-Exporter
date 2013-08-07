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
        
        loadJSXFile("/jsx/exportLayerAndData.jsxbin");
        
        $("#btn_debug").click(showDevTools);
        $("#btn_reload").click(reloadPanel);
        
        $("#btn_dest").click(function () {
            csInterface.evalScript("$._ext.selectDestination()", function (destPath) {
                $("#destLabel").html(destPath);
            });
        });
                
        $("#btn_exec").click(function () {
            var exportType = $('input:radio[name=group1]:checked').val();
            var precision = $('#svgPrecision').val();
            var outlineFonts = $('#svgFont').is(':checked');
            var embedImages = $('#svgEmbed').is(':checked');
            var jpgquality = $('#jpgquality').val();
            
            
            var code = '$._ext.exportLayers("' + exportType + '", ' + precision + ', ' + outlineFonts + ', ' + embedImages + ', ' + jpgquality + ');';
            
            console.log(code);
            
            csInterface.evalScript(code, function (destPath) {
                $("#destLabel").html(destPath);
            });
        });
    }
        
    init();

}());
    
