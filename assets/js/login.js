$(function() {
    // 1. 切换登录框与注册框
    $('#link_reg').on('click', function() {
        $('.login-box').hide().next().show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide().prev().show()
    })


    // 2.设置注册与登录页面的校验规则
    // 从layui中获取form对象
    var form = layui.form

    // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 获取注册表单的密码框值
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致！'
            }
        }

    })

    // 3.表单注册提交事件：
    $('#form_reg').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()

        // 发送ajax注册请求
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                // 自动跳转到登录页面
                $('#link_login').trigger('click')

                // 重置空form表单
                $('#form_reg')[0].reset()
            }
        })
    })

    // 4.登录功能
    $('#form_login').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
            // 发送ajax请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            // {
            //     username: $('.login-box [name=username]').val(),
            //     password: $('.login-box [name=password]').val()
            // }
            success: function(res) {
                //错误判断
                if (res.status !== 0) return layer.msg(res.message)
                    //登录提示
                layer.msg(res.message)
                    //保存token
                localStorage.setItem('token', res.token)
                    //页面跳转
                location.href = "/index.html"
            }
        })
    })

})