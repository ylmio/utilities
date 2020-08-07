//H5自带缓存系统
const CACHE_UTIL = {
    setLocalItem: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    getLocalItem: function (key) {
        return window.localStorage.getItem(key);
    },
    removeLocalItem: function (key) {
        window.localStorage.removeItem(key);
    },
    setSessionItem: function (key, value) {
        window.sessionStorage.setItem(key, value);
    },
    getSessionItem: function (key) {
        return window.sessionStorage.getItem(key);
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
