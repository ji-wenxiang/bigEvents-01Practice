$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token'),
        }
    }

    // 全局统一如果没有token值，跳转至login页面，通过complete完成
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = '/login.html'
            localStorage.removeItem('token')
        }
    }
})