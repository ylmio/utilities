/**
 * html5自带缓存系统
 *
 */
var CACHE_UTIL = {
    prefix: [],
    setItem: function (type, key, value) {
        if (type == "session") {
            this.setSessionItem(key, value);
        } else if (type == "local") {
            this.setLocalItem(key, value);
        }
    },
    getItem: function (type, key) {
        if (type == "session") {
            return this.getSessionItem(key);
        } else if (type == "local") {
            return this.getLocalItem(key);
        }
    },
    setJsonItem: function (type, key, json) {
        var value = JSON.stringify(json);
        this.setItem(type, key, value);
    },
    getJsonItem: function (type, key) {
        var value = this.getItem(type, key);
        if (value) {
            return JSON.parse(value);
        } else {
            return "";
        }
    },
    setLocalItem: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    setbothItem: function (key, value) {
        window.sessionStorage.setItem(key, value);
        window.localStorage.setItem(key, value);
    },
    setSessionItem: function (key, value) {
        window.sessionStorage.setItem(key, value);
    },
    getLocalItem: function (key) {
        return window.localStorage.getItem(key);
    },
    getSessionItem: function (key) {
        return window.sessionStorage.getItem(key);
    },
    removeLocalItem: function (key) {
        window.localStorage.removeItem(key);
    },
    removeSessionItem: function (key) {
        window.sessionStorage.removeItem(key);
    },
    clearLocalData: function () {
        window.localStorage.clear();
    },
    clearSessionData: function () {
        window.sessionStorage.clear();
    }
};
