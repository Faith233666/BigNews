$(function () {
  //获取到信息
  $.ajax({
    type: "get",
    url: bigNew.user_detail,
    success: function (response) {
      //遍历response对象，并统一把里面的数据给到表单元素
      for (let key in response.data) {
        $(`input.${key}`).val(response.data[key]);
      }
      //单独更改图片的src地址
      $('img.user_pic').prop('src', response.data.userPic);
    }
  });
  //获取图片预览图
  $('#exampleInputFile').change(function () {
    //获取到本地缓存的图片地址
    const urls = URL.createObjectURL(this.files[0]);
    //给img设置url
    $('.user_pic').prop('src', urls);
  })
  //更改信息
  $('.btn-edit').click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: bigNew.user_edit,
      //PS：每个表单元素，都可以通过this.form获取它所在的表单域元素
      data: new FormData(this.form),
      // 不需要要自动添加 contentType 请求头，fd 对象有自己的请求头
      contentType: false,
      // 不需要把 fd 对象转换成字符串
      processData: false,
      success: function (response) {
        if (response.code == 200) {
          alert('修改成功');
          //修改父元素的头像
          if ($('.user_pic').prop('src') != window.parent.$('.user_info img').prop('src')) {
            //window.parent获取到iframe的父元素，更改父元素的图片
            window.parent.$('.user_info img').prop({
              src: URL.createObjectURL(document.querySelector('#exampleInputFile').files[0])
            })
            //window.parent获取到iframe的父元素，更改父元素的图片
            window.parent.$('.user_center_link img').prop({
              src: URL.createObjectURL(document.querySelector('#exampleInputFile').files[0])
            })
          }
          //修改父元素的姓名
          const name = $('.nickname').val().trim();
          window.parent.$('.user_info strong').text(name);
        }
      }
    });
  })
})