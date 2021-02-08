$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 全局统一如果没有token值，跳转至login页面，通过complete完成
    options.complete = function (res) {
        if (res.responseJSON.status === 1 || !localStorage.getItem('token')) {
            location.href = '/login.html'
            localStorage.removeItem('token')
        }
    }
})