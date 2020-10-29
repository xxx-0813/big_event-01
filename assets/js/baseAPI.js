// 开发环境地址
baseUrl = 'http://ajax.frontend.itheima.net'
    // 测试环境地址
    // baseUrl = 'http://ajax.frontend.itheima.net'
    // 生产环境地址
    // baseUrl = 'http://ajax.frontend.itheima.net'

//$.ajaxPrefilter()要绑定在所有ajax之前
// 执行完毕后，ajax请求才会继续发送
$.ajaxPrefilter(function(options) {
    // 1.
    options.url = baseUrl + options.url

    //2.统一为有权限的接口添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3.登录拦截:未登录无法访问有权限接口
    options.complete = function(res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 3.1清空token
            localStorage.removeItem('token')

            // 3.2跳转登录页
            location.href = '/login.html'
        }

    }

})