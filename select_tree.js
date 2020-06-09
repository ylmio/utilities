// 就是定义一个匿名函数function($)，函数要求传入的类型是jquery对象。


(function ($) {
    "use strict";

    var CON_TYPE_NULL = "请选择";
    var BASEHtml = "<div class=\"dropdown\"><button class=\"btn dropdown-toggle form-control\" type=\"button\" data-toggle=\"dropdown\" data-ztree=\"check\" id=\"btnType\"> <span >请选择类别</span> <span class=\"caret\"></span></button> <div class=\"panel dropdown-menu selecttree\"> <div class=\"panel-body\"> <ul class=\"ztree\" ></ul></div><div class=\"panel-footer\"> <div class=\"btn-group btn-group-justified\"><a class=\"btn\" id=\"btnCancel\">取消</a><a class=\"btn btn-success\" id=\"btnOK\">确定</a></div></div></div></div>";
    var BASEHTML = `
        <div class="dropdown">
            <button 
            id="btnType" 
            class="btn dropdown-toggle form-control"
            type="button" 
            data-toggle="dropdown" 
            data-ztree="check">
                <span>请选择类别</span>
                <span class="caret"></span>
            </button>
            <div class="panel dropdown-menu selecttree">
            <div>
            
</div>
</div>
        </div>
    `


})(jquery);
