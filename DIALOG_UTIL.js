var DIALOG_UTIL = {
    /**
     * @param type   弹出框类型
     * @param msg   弹出框提示信息
     * @param callBack(type)   弹出框回调函数(有确认和取消按钮的时候)type为1时候确认 type为0 的时候 取消
     */

    dialog_ids: [],
    dialog_id: "public_dialog",
    showTypeDialog: function (type, msg, callBack,timer) {
        //var dialog_type="";
        var id = this.dialog_id;
        var self = false;
        //处理self值
        if (type == "confirm" || type == "loading" || type == "loading_gif" || type == "loading_progress" || type == "rest.need.reLogin") {
            self = true;
        }
        //处理ID,注意ID不能有.
        if (type == "rest.need.reLogin") {
            id = id + "reLogin";
        }
        //处理生成弹出框html begin
        var htmlcode = "";
        /**
         * info,warning,error,config,loading  中type类型,其它未定义统一other
         */
        if (type == "loading") {
            htmlcode = "<div  id='" + id + "' l_type='" + type + "' class='x-loading-spinner' style='z-index:9999999'>"
                + "<span class='x-loading-top'></span>"
                + "<span class='x-loading-right'></span>"
                + "<span class='x-loading-bottom'></span>"
                + "<span class='x-loading-left'></span>"
                + "</div>";
        } else if (type == "loading_msg") {
            htmlcode = "<div l_type='" + type + "' class='dialog' id='" + id + "' style='padding:20px 0px;'>";
            if (msg && msg != "") {
                htmlcode += "<div class='tip' style='padding:0px 10px;'>" + msg + "</div>";
            }
            htmlcode += "<div class='x-loading-spinner'>"
                + "<span class='x-white-loading-top'></span>"
                + "<span class='x-white-loading-right'></span>"
                + "<span class='x-white-loading-bottom'></span>"
                + "<span class='x-white-loading-left'></span>"
                + "</div>"
                + "</div>";
        } else if (type == "loading_gif") {
            htmlcode = "<div  id='" + id + "' l_type='" + type + "' class='loading_gif'>" + "</div>";
        } else if (type == "loading_progress") {
            htmlcode = "<div  id='" + id + "' l_type='" + type + "' class='loading_progress'><div class='tip'>" + msg + "</div></div>";
        } else if (type == "rest.need.reLogin") {
            htmlcode = "<div l_type='" + type + "'  class='dialog' id='" + id + "'><div class='tip'>" + "需要登陆" + "</div></div>";
        }else if (type == "pass"){
            htmlcode = "<div l_type='" + type + "'  class='dialog' id='" + id + "'><div class='my-tip'><i class=\"icon iconfont icon-duihao\"></i><span class='tip-message'>" + msg + "</span></div><div class='close-dialog'>关闭</div></div>";
        } else {
            if (msg.indexOf("4000210356") > -1) {
                msg = msg.replace("4000210356","<a href='javascript:void(0)'  onclick='tel(4000210356)'>4000210356</a>");
            } else if (msg.indexOf("10010") > -1) {
                msg = msg.replace("10010","<a href='javascript:void(0)' onclick='tel(10010)'>10010</a>");
            }
            htmlcode = "<div l_type='" + type + "'  class='dialog' id='" + id + "'><div class='my-tip'><i class=\"icon iconfont icon-gantanhao\"></i><span class='tip-message'>" + msg + "</span></div><div class='close-dialog'>关闭</div></div>";
        }
        //判重
        var index = this.getRepeatObjIndex(id);
        var flag = true;
        if (index == -1) {
            flag = false;
        }
        if (flag) {
            //移除
            $("#" + id).remove();
            $("body").append(htmlcode);
            this.dialog_ids[index].self = self;
            this.bindDialogClick(id, self);
            this.setDialogCss(id);

            if (type == "loading") {
                if(isNaN(timer))
                    timercheck = setInterval(stopFlower, 90000);
                else
                    timercheck = setInterval(stopFlower, timer);
                //默认60秒后消失菊花转
                var that = this;
                function stopFlower() {
                    clearInterval(timercheck);
                    that.hideDialog("","loading");
                }

            }

        } else {
            $("body").append(htmlcode);
            //处理生成弹出框html end
            this.showDialog(id, self);
        }

        if (type == "confirm") {
            this.createConfirmWindow(id, callBack);
        } else if (type == "rest.need.reLogin") {
            this.createNeedLogin(id);
        }

    },
    createNeedLogin: function (id) {
        var htmlcode = "<div class='btn'><a href='javascript:void(0);' id='button" + id + "'>确 定</a></div>";
        $("#" + id).append(htmlcode);
        $("#button" + id).click(function () {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callMotion("gologinpage", "");
            }
        });
    },
    createConfirmWindow: function (id, callBack) {
        var that = this;
        var htmlcode = "<div class='btn'><a href='javascript:void(0);' id='button" + id + "'>确 定</a> <a href='javascript:void(0)'  class='cancel' id='cnacle" + id + "'>取 消</a></div>";
        $("#" + id).append(htmlcode);
        $("#button" + id).bind("click", function () {
            that.hideDialog(id);
            if (callBack) {
                callBack("1");
            }
        });
        //注册点击取消按钮
        $("#cnacle" + id).bind("click", function () {
            that.hideDialog(id);
            if (callBack) {
                callBack("0");
            }

        });
    },
    /**
     * 创建或显示遮罩层,只未显示的时候dialogId传入“”空字符串
     * @param dialogId
     * @param flag
     */
    createMaskWindow: function (dialogId, flag) {
        var html = "<div  class='cover'></div>";
        var that = this;
        //遮罩层不存在,才会创建
        if ($(".cover").length == 0) {
            $("body").append(html);
        }
        $(".cover").show();
        $("body").css("overflow-y","hidden");
        //点击遮罩层的时候,删除self为false的弹出框
        $(".cover").unbind("click").bind("click", function () {
            //公共的dialog才需要移除
            var flag = that.removeDialogs(that);
            if (flag) {
                that.removeMaskWindow();
            }
        });
    },
    bindDialogClick: function (dialogId, flag) {
        var that = this;
        $("#" + dialogId).unbind("click").bind("click", function () {
            var flag = that.removeDialog(that, dialogId);
            if (flag) {
                that.removeMaskWindow();
            }
        });
    },
    removeDialog: function (that, dialogId) {
        return that._dealDialogs(that, [dialogId]);
    },
    _dealDialogs: function (that, dialog_ids) {
        var tempArr = [];
        for (var i = 0; i < that.dialog_ids.length; i++) {
            var dialogId = that.dialog_ids[i].id;
            var self = that.dialog_ids[i].self;
            var flag = true;
            //slef为true代表自己控制,不对其进行删除和隐藏操作
            if (self) {
                tempArr.push(that.dialog_ids[i]);
                continue;
            }
            //dialog_ids需要清除的dialog的id的集合
            for (var j = 0; j < dialog_ids.length; j++) {
                if (dialog_ids[j] == dialogId) {
                    flag = false;
                    if (that.dialog_id == dialogId) {
                        $("#" + dialogId).remove();
                    } else {
                        $("#" + dialogId).hide();
                    }
                    //如果是公用弹出框则隐藏其它remove,self为false时候代表自动控制
                    break;
                }
            }
            if(flag){
                tempArr.push(that.dialog_ids[i]);
            }
        }
        that.dialog_ids = tempArr;
        return tempArr.length == 0;
    },
    /**
     * 点击遮罩层的时候,移除弹出框
     * @param that
     */
    removeDialogs: function (that) {
        var dialog_ids = [];
        for (var i = 0; i < that.dialog_ids.length; i++) {
            dialog_ids.push(that.dialog_ids[i].id);
        }
        return that._dealDialogs(that, dialog_ids);
    },
    /**
     * 删除遮罩层
     */
    removeMaskWindow: function () {
        $(".cover").remove();
        $("body").css("overflow-y","auto");

    },
    /**
     *判断重复元素的数组下标
     */
    getRepeatObjIndex: function (id) {
        var index = -1;
        for (var i = 0; i < this.dialog_ids.length; i++) {
            if (this.dialog_ids[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    },
    /**
     * 添加obj
     * @param obj
     * @returns {Boolean}
     */
    addDialogIds: function (obj) {
        var index = this.getRepeatObjIndex(obj.id);
        var flag = false;
        if (index == -1) {//没有重复的
            flag = true;
        }

        if (flag) {
            this.dialog_ids.push(obj);
        }
        return flag;
    },
    /**
     * 传入弹出框ID
     * @param id
     * @param self 自己控制弹出框点击边框 false自动控制遮罩和弹出框隐藏,true自己需要回调hideDialog
     */
    showDialog: function (id, self) {

        var flag = this.addDialogIds({id: id, self: !!self});
        //不添加重复的值
        if (!flag) {
            return;
        }
        //生成并显示遮罩层 begin
        this.createMaskWindow(id, flag);
        //end
        //绑定弹出框事件begin
        this.bindDialogClick(id, flag);
        //设置弹出框的css
        this.setDialogCss(id);

        //this.moveDialog(1, id);

    },



    moveDialog:function(type, dialogId){
        var objid="#"+dialogId,
            domove=function(event){
                event.preventDefault();
                dialogHeight=parseInt($(objid).height());
                clientHeight=parseInt($(window).height());
                dialogTop=parseInt($(objid).css("top").replace("px",""));
                if (event.type=="touchstart"){
                    startY=parseInt(event.touches[0].clientY);
                    startX=event.touches[0].clientX;
                };
                if(event.type=="touchend"){
                    if(Math.abs(event.changedTouches[0].clientX-startX)<5&&Math.abs(event.changedTouches[0].clientY-startY)<5){
                        var evt = event || window.event ; //window.event for IE, para e for ff
                        var el = evt.srcTarget || evt.srcElement;
                        setTimeout(function(){
                            if($(el).css("display")!="none"){
                                $(el).click();
                            }
                        },200);
                    }
                }
                if (event.type=="touchmove"){

                    endY=parseInt(event.touches[0].clientY);

                    if (startY>0&&endY>0){
                        offsetY=endY-startY;
                    }
                    if (Math.abs(offsetY)>0){
                        if (offsetY>0){
                            if ((dialogTop+offsetY)>(document.body.scrollTop+clientHeight/5)){
                                dialogTop=document.body.scrollTop+clientHeight/5;
                            }else{
                                dialogTop=dialogTop+offsetY;
                            }
                        }else{
                            if ((dialogTop+dialogHeight+offsetY)<(document.body.scrollTop+clientHeight-clientHeight/5)){
                                dialogTop=(document.body.scrollTop+clientHeight-clientHeight/5)-dialogHeight;
                            }else{
                                dialogTop=dialogTop+offsetY;
                            }
                        }
                        if (clientHeight>dialogHeight){
                            return false;
                        }
                        startY=endY;
                        $(objid).css("top",dialogTop);
                    }
                }
            };
        function eventListener(){
            $("body").on("touchstart",domove);
            $("body").on("touchmove",domove);
            $("body").on("touchend",domove);
        };
        function removeListener(){
            $("body").off("touchstart");
            $("body").off("touchmove");
            $("body").off("touchend");
        };
        if (type){
            eventListener();
        }else{
            removeListener();
        }
    },


    /**
     * 设置弹出框的css,计算居中
     * @param id
     */
    setDialogCss: function (id) {
        $("#" + id).show();

        var div_height = $("#" + id).height();
        var div_width = $("#" + id).width();

        var right = Math.round((document.body.clientWidth - div_width) / 2);


        var scrollTop = document.body.scrollTop;
        var top = Math.round((document.documentElement.clientHeight - div_height*1.5) / 2) + scrollTop;

        //弹出框
        $("#" + id).css({
            'position': 'absolute', 'top': top, 'right': right
        });
    },
    /**
     * 传入弹出框ID
     * @param id
     */
    hideDialog: function (id, type) {
        //如果id没传则默认为公共弹出框ID

        //this.moveDialog(0, id);

        if (!id) {
            id = this.dialog_id;
        }
        var tempArr = [];
        for (var i = 0; i < this.dialog_ids.length; i++) {
            var dialogId = this.dialog_ids[i].id;
            if (id != dialogId) {
                tempArr.push(this.dialog_ids[i]);
            }
        }

        var target = $("#" + id);
        var flag = false;//flag置为true的时候证明确实已经删除或者隐藏
        if (this.dialog_id == id) {
            var l_type = target.attr("l_type");
            //如果传入type
            if (type) {
                //如果传入的type和 当前type相等
                if (type == l_type) {
                    flag = true;
                    target.remove();
                }
            } else {
                flag = true;
                target.remove();
            }
        } else {
            flag = true;
            target.hide();
        }
        if (flag) {
            this.dialog_ids = tempArr;
            if (this.dialog_ids.length == 0) {
                this.removeMaskWindow();
            }
        }

    }
};
