$(function(){
    //为密码框添加校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须为6到12位，且不能出现空格'],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })

    //发起Ajax请求实现重置密码功能
    $('.layui-form').on('submit',function(e){
        
        e.preventDefault()

        //发起Ajax请求 向后台提交数据
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                //做一些事情
                if(res.status !== 0){
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
            }
        });
    })
    //表单重置
    $('.layui-form')[0].reset()
})