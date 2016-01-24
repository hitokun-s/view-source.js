var vs = (function(){
    var scriptPath = document.currentScript.src;
    var baseDir = scriptPath.substring(0, scriptPath.lastIndexOf("/") + 1);

    var deleteIndent = function (text) {
        var lines = text.split("\n");
        if (lines[0].trim().length === 0) {
            lines.shift();
        }
        var indent = lines[0].length - lines[0].trim().length;
        return lines.map(function (v) {
            return v.substr(indent);
        }).join("\n");
    }

    var applyCss = function(path){
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: path
        }).appendTo("head");
    }

    var self = {
        on:(function() {
            var onHandler = function(){};
            return function(fn){
                if(fn && $.isFunction(fn)){
                    onHandler = fn;
                    return;
                }
                onHandler();
                $("#btn-vs").text("Hide Source");
                $(".vs-out").show(500);
            }
        })(),
        off:(function() {
            var offHandler = function(){};
            return function(fn){
                if(fn && $.isFunction(fn)){
                    offHandler = fn;
                    return;
                }
                offHandler();
                $("#btn-vs").text("View Source");
                $(".vs-out").hide(500);
            }
        })(),
        toggle:(function(){
            var isOn = $(".vs-out").is(':visible');
            return function(){
                isOn ? this.off() : this.on();
                isOn = !isOn;
            }
        })()
    }
    $(function () {
        // create 'view source' button
        $("<button id='btn-vs'>view source</button>").click(function(){self.toggle();}).appendTo($("body"));

        applyCss(baseDir + "css/view-source.css");
        applyCss(baseDir + "rainbow/css/github.css");
        $.ajax({
            url: baseDir + "rainbow/js/rainbow-custom.min.js",
            dataType: "script",
            success: function () {

                $(".vs").each(function (i, v) {
                    var kind = "";
                    switch (v.tagName.toLowerCase()) {
                        case "script":
                            kind = "javascript";
                            break;
                        case "style":
                            kind = "css";
                            break;
                        default:
                            kind = "html";
                    }
                    Rainbow.color(deleteIndent($(v).html()), kind, function (highlighted_code) {
                        var elm = $("<div class='vs-out'><p class='vs-type'>" + kind + "</p><pre></pre></div>");
                        elm.find("pre").html(highlighted_code);
                        $(v).after(elm);
                    });
                });
            }
        });
    });
    return self;
})();



