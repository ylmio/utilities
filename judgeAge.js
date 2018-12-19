//检测年龄是否小于16岁
var judgeAge = function (inputIdentity) {
    var ageTime = new Date(inputIdentity.substr(6,4)+','+inputIdentity.substr(10,2)+','+inputIdentity.substr(12,2));
    var nowTime = new Date();
    var age = (nowTime - ageTime)/1000/60/60/24/365;

    return 16 - age > 0 ? true : false;
}
