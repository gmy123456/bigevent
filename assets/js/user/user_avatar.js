$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //更换裁剪的图片
    //为上传按钮注册点击事件
    $('#upload').on('click', function () {
        $('#file').click()
    })
    $('#file').change(function (e) {
        //拿到用户选择的文件
        var file = e.target.files[0]
        //根据选择的文件，创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file)
        //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)

    })

    //为确定按钮注册点击事件
    $('#btnupload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //发起Ajax请求提交图片数据到后台
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                window.parent.getUserinfo()
            }
        })
    })
})