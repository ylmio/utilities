var AjaxObj = function () {

};
AjaxObj.prototype.init = function (type, url, data, success, err, contentType) {
    this.type = type;
    this.url = url;
    this.data = data;
    this.succ = succ;
    this.err = err;
    this.contentType = contentType == "" ? "application/x-www-form-urlencoded;charset=utf-8" : contentType;
    return this;
};

$(function () {
    AjaxObj.prototype.callAjax = function () {
        $.ajax({
            type: this.type,
            url: this.url,
            contentType: this.contentType,
            async: true,
            data: this.data,
            dataType: "json",
            crossDomain: true == !(document.all),
            beforeSend: function () {
                //弹出遮罩层
                DIALOG_UTIL.showTypeDialog("loading", "");
                //取消遮罩层
                // DIALOG_UTIL.hideDialog("", "loading");
                //错误提示
                // DIALOG_UTIL.showTypeDialog("error", "Ajax请求失败!");
            },
            success: this.succ,
            error: this.err,
            complete: function () {
                DIALOG_UTIL.hideDialog("", "loading");
            }
        })
    };

    AjaxObj.prototype.callAjax1 = function () {
        $.ajax({
            type: this.type,
            url: this.url,
            contentType: this.contentType,
            async: false,
            data: this.data,
            dataType: "json",
            crossDomain: true == !(document.all),
            beforeSend: function () {
                //弹出遮罩层
                DIALOG_UTIL.showTypeDialog("loading", "");
                //取消遮罩层
                // DIALOG_UTIL.hideDialog("", "loading");
                //错误提示
                // DIALOG_UTIL.showTypeDialog("error", "Ajax请求失败!");
            },
            success: this.succ,
            error: this.err,
            complete: function () {
                DIALOG_UTIL.hideDialog("", "loading");
            }
        })
    }
});
