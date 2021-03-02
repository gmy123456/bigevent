$(function(){
    //获取用户基本信息
    getUserinfo()

    //实现退出功能
    //给退出的超链接注册一个点击事件
    $('.tuichu').click(function(){
        // console.log('123');
        //设置一个弹出框
        var layer = layui.layer
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            
            layer.close(index);
          });
    })
})

function getUserinfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            // console.log(res.data);
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            //渲染用户头像 封装函数  然后调用
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     // console.log(res);
        //     //请求完成后做一些事情
        //     //判断是否获取到数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         //做一些事情
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//renderAvatar 渲染用户头像函数
function renderAvatar(user){
    //获取用户名
    var name = user.nickname || user.username
    //渲染到用户名
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    //按需渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-ataver').hide()
    }else{
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-ataver').show().html(first)
    }
}