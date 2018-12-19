var checkPhone = function (phone) {
    var re = new RegExp(/^\d{11}$/);
    if (!re.test(phone)) {
        return false;
    }
    return true;
}
