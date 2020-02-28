$(function () {
  //获取用户信息
  $.ajax({
    type: "get",
    url: bigNew.user_info,
    beforeSend: function () {
      NProgress.start();
    },
    complete: function () {
      NProgress.done();
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