$(function(){
    $('.login-box .zhuce').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.reg-box .denglu').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    
})