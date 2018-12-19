var CheckNull = function (id, message) {
    var $this = $("#" + id);
    if ($this.val() == null || $this.val() == "") {
        DIALOG_UTIL.showTypeDialog("error", message);
        return true;
    }
    return false;
}
