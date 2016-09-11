/**
 * Created by YYQ on 2015/8/22.
 */



(function ($) {
    'use strict';

    var DropDownSelection = function (element) {
        this.element = $(element);
    };

    DropDownSelection.prototype.options = {};

    //store the text-value pairs.
    DropDownSelection.prototype.contents = {};

    DropDownSelection.defaults = {
        title: "前端技能列表",
        content: [{text: 'javascript', value: 'js'}, {text: 'css', value: 'c'},
            {text: 'html5', value: 'h5'}, {text: 'jQuery', value: 'frame'}],
        parse: function (data) {
            return {
                text: data.text,
                value: data.value
            };
        },
        result: []
    };

    DropDownSelection.prototype.init = function (settings) {
        var dropDownMenuStr = "<div id='dropDownMenuHead'  class='closed'><h2>";
        dropDownMenuStr += settings.title;
        dropDownMenuStr += "</h2></div><ul style='display:none'>";
        for (var i in settings.content) {
            var contentData = settings.parse(settings.content[i]);
            this.contents[contentData.text] = contentData.value;
            dropDownMenuStr += "<li><a href='javascript:;'>";
            dropDownMenuStr += contentData.text;
            dropDownMenuStr += "</a></li>";
        }
        dropDownMenuStr += "</ul>";
        this.element.append(dropDownMenuStr);
    };

    DropDownSelection.prototype.eventListener = function () {
        var dropDownMenu = this.element.children("ul");
        var dropDownMenuHead = this.element.children("#dropDownMenuHead");

        //unfold the menu
        dropDownMenuHead.click(function () {
            $(this).toggleClass("open");
            $(this).toggleClass("closed");
            $(this).children("h2").text("");
            dropDownMenu.toggle();
        });

        //add selected item
        dropDownMenu.find("a").click(function () {
            dropDownMenuHead.append("<span class='selectedValue'>" + $(this).text() + "<span class='del'>&times;</span>" + "</span>");
        });

        //remove selected item
        dropDownMenuHead.on('click', '.del', function () {
            $(this).parent().remove();
            return false;
        });

        var self = this;
        //store selected items
        this.element.mouseleave(function () {
            dropDownMenu.hide();
            self.options.result = self.getDropDownSelectionValue();
        });
        return this;
    };

    DropDownSelection.prototype.getDropDownSelectionValue = function () {
        var resultArray = [];
        var textArray = this.element.find(".selectedValue").text().split('×');
        textArray.pop();
        for (var i in textArray) {
            resultArray.push(this.contents[textArray[i]]);
        }
        console.log(resultArray);
        return resultArray;
    };

    // DropDownSelection PLUGIN DEFINITION
    // ===================================

    function Plugin() {
        var parameters = arguments;
        if (typeof parameters[0] == "object") {
            var options = parameters[0];
            var settings = $.extend({}, DropDownSelection.defaults, options);
            var dds = new DropDownSelection(this);
            dds.init(settings);
            dds.eventListener();
            $(this).data("DropDownSelection", dds);
            return $(this);
        } else if (typeof parameters[0] == "string") {

            var data = $(this).data("DropDownSelection");
            switch (parameters[0]) {
                case "getValue":
                {
                    return data.options.result;
                }
                case "setValue" :
                {
                    $(this).empty();
                    options = parameters[1];
                    $(this).dropDownSelection(options);
                }
            }
        } else {
            alert("Wrong Arguments!");
        }
    }

    $.fn.dropDownSelection = Plugin;
    $.fn.dropDownSelection.Constructor = DropDownSelection;


}(jQuery));