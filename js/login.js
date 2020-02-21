/**
 * Created by box on 2017/2/22.
 */

//存储用户信息
function login() {
    $('.mySubmit').click(function () {
        console.log('login');
    });
}
$(function () {
    // 通过封装了 jquery验证码组件
    $('#mpanel').codeVerify({
        type: 1,
        width: '80px',
        height: '30px',
        fontSize: '14px',
        codeLength: 4,
        btnId: 'login',
        ready: function () {
        },
        success: function () {
            alert('验证匹配！');
            // 获取用户名和密码
            // 用户名
            var get_input_user_name = $('.textBorder')[0].value;
            // 密码
            var get_input_user_pass = $('.textBorder')[1].value;
            // 判空
            if (get_input_user_name == '' || get_input_user_pass == '') {
                alert('用户名或者密码不能为空');
                return;
            }
            // 拼接发送请求的url
            var urlString = baseUrl + port + '/login';
            // 利用ajax技术 向服务器 post 用户名和密码
            /*
            //ajax文档以及使用 https://www.javascriptcn.com/chm/zepto/#$.ajax 
            $.ajax({
                url : urlString,
                // 请求类型是POST还是GET
                type : 'POST',
                // 异步还是同步 默认是异步，false表示同步
                async: true,
                // 发送数据
                data: {
                    uname: get_input_user_name, upw: get_input_user_pass
                },
                // 超时时间
                timeout: 5000,
                // 返回数据类型json数据
                dataType: 'json',
                // 成功返回处理
                success: function (data, textStatus, jqXHR) {
                    //解析json数据
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    // 模拟服务器返回成功
                    var uid = 'admin';
                    var upass = 'admin';
                    // 将用户id存放到本地
                    save_value_to_storage('USERID',uid);
                    // 跳转
                    window.location.href = 'index.html';
                },
                // 错误返回
                error: function (xhr, textStatus) {
                    console.log('错误');
                    console.log(xhr);
                    console.log(textStatus);
                }
            });
            */
            // 模拟服务器返回成功
            var uid = $('.textBorder')[0].value;
            var upass = 'admin';
            //保存到本地
            save_value_to_storage('USERID', uid);
            // 跳转指定页面
            window.location.href = 'index.html';

        },
        error: function () {
            alert('验证码不匹配！');
        }
    });
    // 动态设置验证码样式
    $('.varify-input-code').attr('placeholder', '验证码');
    $('.varify-input-code').css('text-indent', '10px');
});