// 开发环境地址
baseUrl = 'http://ajax.frontend.itheima.net'
    // 测试环境地址
    // baseUrl = 'http://ajax.frontend.itheima.net'
    // 生产环境地址
    // baseUrl = 'http://ajax.frontend.itheima.net'

//$.ajaxPrefilter()要绑定在所有ajax之前
// 会在ajax请求执行后再触发，执行完毕后，ajax请求才会继续发送
$.ajaxPrefilter(function(options) {
    options.url = baseUrl + options.url
})