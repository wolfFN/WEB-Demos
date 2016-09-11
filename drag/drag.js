/**
 * Created by zwj on 2015/7/2.
 */

var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    //sign whether mousedown is on "bar" or not
    flag: false
};

//do the drag operation
function startDrag(bar, target) {
    params.left = target.offset().left;
    params.top = target.offset().top;

    bar.mousedown(function (event) {
        params.flag = true;
        params.currentX = event.clientX;
        params.currentY = event.clientY;
    });

    $(document).mouseup(function () {
        params.flag = false;
        params.left = target.offset().left;
        params.top = target.offset().top;
    });

    $(document).mousemove(function (event) {
        if (params.flag) {
            var disX = event.clientX - params.currentX;
            var disY = event.clientY - params.currentY;
            target.offset({left: parseInt(params.left) + disX, top: parseInt(params.top) + disY});
        }
    });
}


var oBox = $("#box");
var oBar = $("#bar");
startDrag(oBar, oBox);
