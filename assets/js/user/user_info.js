$(function () {
    const form = layui.form
    const layer = layui.layer

    //获取用户信息，将其赋值到表单上
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 成功之后将得到的信息渲染到页面
                renderInfo(res.data)
            }
        })
    }

    // 渲染页面
    function renderInfo(data) {
        // $('[name=username]').attr('placeholder', data.username)
        // $('[name=nickname]').attr('placeholder', data.nickname)
        // $('[name=email]').attr('placeholder', data.email)
        // $('[name=id]').attr('placeholder', data.id)

        // 也可以通过layui 框架的form.val 来全部赋值
        form.val('formUserInfo', data)
    }

    // 为表单绑定submit事件，提交修改客户信息的请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layer.msg('修改失败！')
                layer.msg('修改成功！')
                // 调用index 的获取用户信息的方法
                window.parent.getUserInfo()
            }
        })
    })



})