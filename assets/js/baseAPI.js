$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    //统一为有权限的接口设置headers请求头
    //做if判断  判断是否是有权限的接口
    if(options.url.indexOf('/my') !== -1){
        options.headers={
                Authorization:localStorage.getItem('token')||''
            }
    }
    //全局统一挂载complete函数
    options.complete=function(res){
        // console.log(res);
        //请求完成后做一些事情
        //判断是否获取到数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            //做一些事情
            //强制清空token
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})