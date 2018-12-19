var INPUT_UTIL = {
    /**
     * 判断是否为空,为空返回"",不为空返回paraValue
     */
    replaceNull: function (paraValue){
        if(paraValue==null||paraValue==""||paraValue==undefined||paraValue=="null"||paraValue=="undefined"){
            return "";
        }else if(JSON.stringify(paraValue)=="{}"){
            return "";
        }else{
            return paraValue;
        }
    },
    /**判断是否为空
     * 为空返回true
     * 不为空返回false
     */
    isNull: function (str) {
        if (str==null || str=="" || str=="null" || str==undefined || str=="undefined"){
            return true;
        }
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    },
    /**
     *用途：检查输入字符串是否符合正整数格式
     */
    isNumber: function (s) {
        var regu = "^[0-9]+$";
        var re = new RegExp(regu);
        if (s.search(re) != -1) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 去除左右两边空格
     */
    trim: function (s) {
        if(s==null){
            return "";
        }else{
            return s.replace(/(^s*)|(s*$)/g, "");
        }
    },
    /**
     * 自动替换input输入只允许输入整数和浮点数
     * @param oInput
     */
    checkInputFloat: function (oInput) {
        if ('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/, '')) {
            oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
        }
    },
    /**
     * 自动替换input输入只允许输入整数
     * @param oInput
     */
    checkInputInt: function (oInput) {
        oInput.value = oInput.value.replace(/\D/g, '');
    },
    /**
     * 自动替换input输入只允许数字和字母
     * @param oInput
     */
    checkInputIntChar: function (oInput) {
        oInput.value = oInput.value.replace(/[^\w]/ig, '');
    },
    /**
     * 自动替换input值,只允许输入两位小数,大多数用于金钱验证
     */
    checkInputMoney: function (oInput) {
        oInput.value = oInput.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
        oInput.value = oInput.value.replace(/^\./g, "");  //验证第一个字符是数字而不是.
        oInput.value = oInput.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        oInput.value = oInput.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        oInput.value = oInput.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    },
    /**
     * 文本框根据输入内容自适应高度
     * @param                {HTMLElement}        输入框元素,必选
     * @param                {Number}                设置光标与输入框保持的距离(默认0),可选
     * @param                {Number}                设置最大高度(可选),可选
     */
    autoTextarea : function (elemId, extra, maxHeight) {
        var elem = document.getElementById(elemId);
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function (type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function (name) {
                var val = elem.currentStyle[name];

                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                };

                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));

        elem.style.resize = 'none';

        var change = function () {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) {
                return;
            }
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            };
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    }
};
