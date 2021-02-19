const layer = layui.layer

// 发起请求，获取用户信息，通过得到的信息来切换显示用户的头像和昵称
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success(res) {
            // console.log(res);
            if (res.status !== 0) return layer.msg('获取失败！')
            // layer.msg('获取成功！')
            // 获取成功后，将信息渲染到页面
            renderAvatar(res.data)
        }
    })
}

// 渲染页面方法
function renderAvatar(data) {
    // 声明变量存储用户名，如果有昵称就写上昵称，如果没有，就写上用户名
    const wel = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp&nbsp' + wel)

    // 首先判断有没有图片头像，没有就用文本头像
    // 将tex-avatar 中写入昵称或用户名的首字母，大写
    if (data.user_pic == null) {
        $('.tex-avatar').html(wel[0].toUpperCase()).show()
        $('.pic-avatar').hide()

    } else {
        $('.tex-avatar').hide()
        $('.pic-avatar').attr('src', data.user_pic).show()
    }
}

// 退出功能
$('.tuichu').on('click', function () {
    // 跳出提示框，清空token，跳转至login页面
    layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
        //do something
        location.href = '/login.html'
        localStorage.removeItem('token')
        layer.close(index);
    });

})