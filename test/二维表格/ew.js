/**
 * Created by Administrator on 2016/8/23.
 */
function FixTable(TableID, FixColumnNumber, width, height) {

//第一个参数：table的ID，第二个参数：要锁定的列数目，第三个参数：显示的宽度，第四个参数：显示的高度。

//（一）首先创建上面所诉的框架出来：

    if ($("#" + TableID + "_tableLayout").length != 0) {
        $("#" + TableID + "_tableLayout").before($("#" + TableID));
        $("#" + TableID + "_tableLayout").empty();
    }
    else {
        $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");
    }

    $('<div id="' + TableID + '_tableFix"></div>'
        + '<div id="' + TableID + '_tableHead"></div>'
        + '<div id="' + TableID + '_tableColumn"></div>'
        + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");

    var oldtable = $("#" + TableID);

    var tableFixClone = oldtable.clone(true);
    tableFixClone.attr("id", TableID + "_tableFixClone");
    $("#" + TableID + "_tableFix").append(tableFixClone);

    var tableHeadClone = oldtable.clone(true);
    tableHeadClone.attr("id", TableID + "_tableHeadClone");
    $("#" + TableID + "_tableHead").append(tableHeadClone);

    var tableColumnClone = oldtable.clone(true);
    tableColumnClone.attr("id", TableID + "_tableColumnClone");
    $("#" + TableID + "_tableColumn").append(tableColumnClone);

    $("#" + TableID + "_tableData").append(oldtable);

    $("#" + TableID + "_tableLayout table").each(
        function () {
            $(this).css("margin", "0");
        });

//（二）计算tableFix，tableHead的高度：

    var HeadHeight = $("#" + TableID + "_tableHead thead").height();
    HeadHeight += 2;
    $("#" + TableID + "_tableHead").css("height", HeadHeight);
    $("#" + TableID + "_tableFix").css("height", HeadHeight);

//（三）计算tableFix，tableColumn的宽度：

    var ColumnsWidth = 0;
    var ColumnsNumber = 0;
    $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(
        function () {
            ColumnsWidth += $(this).outerWidth(true);
            ColumnsNumber++;
        });

    ColumnsWidth += 2;
    if ($.browser.msie) {
        switch ($.browser.version) {
            case "7.0":
                if (ColumnsNumber >= 3) ColumnsWidth--;
                break;
            case "8.0":
                if (ColumnsNumber >= 2) ColumnsWidth--;
                break;
        }
    }

    $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);
    $("#" + TableID + "_tableFix").css("width", ColumnsWidth);

//（四）为tableHead和tableColumn添加联动的滚动条事件：

    $("#" + TableID + "_tableData").scroll(
        function () {
            $("#" + TableID + "_tableHead").scrollLeft($("#" + TableID + "_tableData").scrollLeft());
            $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());
        });

//（五）为较小的table修正样式：

    if ($("#" + TableID + "_tableHead").width() > $("#" + TableID + "_tableHead table").width()) {
        $("#" + TableID + "_tableHead").css("width", $("#" + TableID + "_tableHead table").width());
        $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableHead table").width() + 17);
    }

    if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {
        $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());
        $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + 17);
    }

//（六）为整体添加样式，定位：

    $("#" + TableID + "_tableFix").css({
        "overflow": "hidden",
        "position": "relative",
        "z-index": "50",
        "background-color": "Silver"
    });

    $("#" + TableID + "_tableHead").css({
        "overflow": "hidden",
        "width": width - 17,
        "position": "relative",
        "z-index": "45",
        "background-color": "Silver"
    });

    $("#" + TableID + "_tableColumn").css({
        "overflow": "hidden",
        "height": height - 17,
        "position": "relative",
        "z-index": "40",
        "background-color": "Silver"
    });

    $("#" + TableID + "_tableData").css({
        "overflow": "scroll",
        "width": width,
        "height": height,
        "position": "relative",
        "z-index": "35"
    });

    $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableHead").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());
    $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
}