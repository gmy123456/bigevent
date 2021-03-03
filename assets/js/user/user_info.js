$(function () {
    //获取用户基本信息
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义验证规则
        nickname: [
            /^[\S]{1,6}$/
            , '昵称长度必须在1到6个字符之间'
        ],
        //   email:function(value,item){

        //   }

    })
    initUserInfo()
//重置个人信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //更新个人信息
    //监听表单的提交信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                //做一些事情
                if(res.status !== 0){
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                //注意：<iframe> 中的子页面，如果想要调用父页面中的方法，使用 window.parent 即可。
                window.parent.getUserinfo()
            }
        })
    })

})

function initUserInfo() {
    var form = layui.form
    var layer = layui.layer
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status === 1) {
                return layer.msg('获取数据失败！')
            }
            // console.log(res);
            // $('#dlmc').val(res.data.username)
            //使用layui的form.val()快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}

// function xiuGai() {
//     //发起请求 更新用户信息
//     $.ajax({
//         type: 'POST',
//         url: '/my/userinfo',
//         data: {
//             id: '',
//             nickname: '',
//             email: ''
//         },
//         success: function (res) {
//             // console.log(res);
//             //做一些事情
//         }
//     })
// }