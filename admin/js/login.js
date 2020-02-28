$(function () {
  $('.input_sub').click(function (e) {
    //禁止form表单的默认跳转行为
    e.preventDefault();
    //获取需要传入的数据
    const user = $('.input_txt').val().trim();
    const pass = $('.input_pass').val().trim();
    //判断账号密码为空的情况
    if (user == "" || pass == "") {
      //bootstrap的模态框
      $('.modal').modal();
      //修改弹框提示
      $('.modal-body').html('用户名和密码不能为空');

    } else {
      $.ajax({
        type: "post",
        url: "http://localhost:8080/api/v1/admin/user/login",
        //需要传入的数据
        data: {
          username: user,
          password: pass,
        },
        success: function (response) {
          if (response.code == 200) {
            //设置token，用户的唯一身份标识
            localStorage.setItem('token', response.token);
            //页面跳转
            window.location.href = 'index.html';
            //表单跳转
            // $('form').prop('action', 'index.html');
            // $('form').submit();
          } else {
            //bootstrap的模态框
            $('.modal').modal();
            //修改弹框提示
            $('.modal-body').html(response.msg);
          }
        }
      });
    }
  })
})