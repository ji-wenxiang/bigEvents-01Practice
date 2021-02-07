// 给注册账号和登录账号，两个链接绑定点击事件，互相切换
// 点击去注册，切换到注册页面，登录页面隐藏
$('.reglink').on('click', function () {
    $('#reg').show()
    $('#login').hide()
})
// 点击去登录，切换到登录页面，注册页面隐藏
$('.loginlink').on('click', function () {
    $('#reg').hide()
    $('#login').show()
})


// 创建正则表达式,运用 layui 里面自带的表单验证方法，需要先导入 form 方法,然后使用他们自带的验证或者自己创建一个，最后需要在表单元素上加上 lay-verify="" 属性值即可
const form = layui.form
const layer = layui.layer

form.verify({
    username: [/^[a-z0-9_-]{3,16}$/, '输入3-16位字符，不包含特殊字符！'],
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
        if (value !== $('#reg [name=password]').val()) {
            return ('两次密码输入不一致')
        }
    }
})

// 发起注册请求,为注册页面绑定submit事件
$('#reg').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data,
        success(res) {
            if (res.status !== 0) return layer.msg('注册失败！')
            // 注册成功之后跳转至登录页面，清空表单值
            layer.msg('注册成功！')
            $('.loginlink').click()
            $('#reg')[0].reset()
        }

    })
})

// 发起登录请求，为登录页面绑定submit事件
$('#login').on('submit', function (e) {
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        method: 'POST',
        url: '/api/login',
        data,
        success(res) {
            if (res.status !== 0) return layer.msg('登录失败！')
            // 成功的话，可以得到token值，跳转至index页面，将其本地存储，留着日后调用，清空表单值
            const token = res.token
            $('#login')[0].reset()
            localStorage.setItem('token', token)
            location.href = '/index.html'
        }
    })
})