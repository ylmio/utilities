// 查询窗口滚动条的位置
//window.pageXOffset 返回文档在当前窗口的左上角水平方向滚动的像素
//window.pageYOffset 返回文档在当前窗口的左上角垂直方向滚动的像素
// 所有的主流浏览器均支持pageXOffset 和 pageYOffset 属性
// IE8及更早IE版本不支持此属性，但可以使用document.documentElement.scrollTop和document.documentElement.scrollLeft属性



//以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w){

        //使用指定的窗口，如果不带参数则使用当前窗口
    var w=w||window;

        // 除了IE8及更早IE版本，其他主流浏览器均能用
    if(w.pageXOffset!=null)return{
        x:w.pageXOffset,
        y:w.pageYOffset,
    }


        // 对标准模式下的IE(或任何浏览器)
    var d=w.document;
    if(document.compatMode=="CSS1Compat")return{
        x:d.documentElement.scrollLeft,
        y:d.documentElement.scrollTop,
    }


        //对怪异模式下的浏览器
    return {
        x:d.body.scrollLeft,
        y:d.body.scrollTop
    }

}
