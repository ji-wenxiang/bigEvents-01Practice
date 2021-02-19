$(function () {
    const layer = layui.layer
    const form = layui.form
    // 表单验证
    form.verify({
        username: [/^[a-z0-9_-]{3,16}$/, '输入3-16位字符，不包含特殊字符！'],
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        editpwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return ('新密码不能与旧密码一致')
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次输入不一致')
            }
        }
    })

    // 监听表单,绑定submit事件，提交修改密码请求
    $('.layui-form').on('submit', function (e) {
        const datas = $(this).serialize()
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: datas,
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改失败！')
                layer.msg('修改成功！')
                // 通过原生dom元素，表单有reset的方法
                $('.layui-form')[0].reset()
                // $('.reset').click()

            }
        })
    })



})