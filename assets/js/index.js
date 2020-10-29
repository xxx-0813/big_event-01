//入口函数
$(function() {
    //1.获取用户信息
    getUserInfo()

    //2.点击退出按钮，实现退出功能
    layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 框架询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 2.1 清除本地token
            localStorage.removeItem('token')

            // 2.2 退出首页到登录页
            location.href = "/login.html"
            layer.close(index);
        });

    })
})

//1.1 封装获取用户信息函数
function getUserInfo() {
    //发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        //注意是headers
        //统一配置了请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            //判断获取用户信息状态
            if (res.status !== 0) return layer.msg('获取用户信息失败！')

            // 渲染用户信息
            renderAvatar(res.data)
        }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    //1.获取用户昵称
    var name = user.nickname || user.username

    // 2.用户头像
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3.头像
    // 有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 无头像
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }


}