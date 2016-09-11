/**
 * Created by YYQ on 2015/6/8.
 */

var textInput = document.getElementById("textInput");
var words;

$.ajax({
    url: "suggestions.txt",
    type: "get",
    //data:{},
    //dataType:"json",
    success: function (data) {
        words = data.split('\n');
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Cannot load suggestion file!")
    }
});


$("#textInput").bind("keydown keyup keypress focus cut paste", function () {
    var str = textInput.value;
    var result = "";
    for (var n in words) {
        if (str.length < 1) {
            break;
        }
        if (words[n].search(str) != -1) {
            result += '<li><a href="#">';
            result += words[n];
            result += '</a></li>';
        }
    }
    if (result.length > 0) {
        $("div").addClass("open");
        $("ul").html(result);
    }
});


$("#textInput").bind("blur", function () {
    $("div").removeClass("open");
});