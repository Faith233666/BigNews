$(function () {
  //获取用户信息
  $.ajax({
    type: "get",
    url: "http://localhost:8080/api/v1/admin/user/info",
    //后台管理系统需要添加请求头token，他是用户唯一的身份标识
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (response) {
      //当获取信息成功的时候替换网页信息
      if (response.code == 200) {
        //替换图片，并集选择器
        $('.user_info img,.user_center_link img').attr({
          src: response.data.userPic
        })
        //替换名字
        $('.user_info strong').html(response.data.nickname);
      }
    }
  });
  //退出登录，删除token，并跳回登录页
  $('.logout').click(function () {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  })
})