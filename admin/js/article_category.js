$(function () {
  //重新获取数据的封装
  function reload() {
    //调用获取数据接口
    $.ajax({
      type: "get",
      url: bigNew.category_list,
      success: function (response) {
        const htmlstr = template('list', response);
        $('tbody').html(htmlstr);
      }
    });
  }
  //重新获取数据的调用
  reload();
  //给模态框的关闭按钮注册点击事件
  $('.modal-footer button').eq(0).click(function () {
    // 隐藏模态框
    $('.modal').modal('hide');
  })
  //给新增分类按钮注册点击事件
  // 模态框显示以及模态框的按钮更改
  $('#xinzengfenlei').click(function () {
    //模态框显示
    $('.modal').modal();
    //给公有按钮设置与点击按钮相同的值，并添加bootstrap的按钮类样式
    $('.modal-footer button').eq(1).text($(this).text().trim()).addClass('btn btn-success');
  })
  //模态框隐藏时触发的事件
  $('.modal').on('hide.bs.modal', function (e) {
    //设置form表单域的重置（清空）
    $('form')[0].reset();
  })
  //事件委托，给动态生成的编辑按钮注册点击事件
  //让模态框显示
  //给模态框的按钮进行更改
  //将tbody内动态生成的内容设置给form表单域里面对应的input
  $('tbody').on('click', '.edit', function () {
    //显示模态框
    $('.modal').modal();
    //给公有按钮设置一个自定义属性data-id，以便后面进行操作，添加bootstrap带有的按钮类样式，并给公有按钮设置与点击按钮相同的值
    $('.modal-footer button').eq(1).text($(this).text().trim()).attr('data-id', $(this).attr('data-id')).addClass('btn btn-info');
    //设置模态框中的input的值
    $('form input').eq(0).val($(this).parents('tr').children().eq(0).text().trim());
    $('form input').eq(1).val($(this).parents('tr').children().eq(1).text().trim());
  })
  //事件委托，给动态生成的删除按钮注册点击事件
  $('tbody').on('click', '.del', function () {
    const cfm = confirm('您确定要删除吗？');
    if (cfm) {
      //调用文章删除的接口
      $.ajax({
        type: "post",
        url: bigNew.category_delete,
        data: {
          id: $(this).attr('data-id')
        },
        dataType: "json",
        success: function (response) {
          //重新获取数据
          reload();
        }
      });
    }
  })
  //给模态框里面的公有按钮注册点击事件
  $('.publicBtn').click(function () {
    //当公有按钮为新增分类时
    if ($(this).text().trim() == '新增分类') {
      //调用新增分类接口
      $.ajax({
        type: "post",
        url: bigNew.category_add,
        data: {
          name: $('form input').eq(0).val(),
          slug: $('form input').eq(1).val(),
        },
        success: function (response) {
          if (response.code == 201) {
            //模态框隐藏
            $('.modal').modal('hide');
            //重新获取数据
            reload();
          }
        }
      })
    }
    //当公有按钮为编辑时 
    else if ($(this).text().trim() == '编辑') {
      //调用编辑接口
      $.ajax({
        type: "post",
        url: bigNew.category_edit,
        data: {
          name: $('form input').eq(0).val(),
          slug: $('form input').eq(1).val(),
          id: $(this).attr('data-id')
        },
        dataType: "json",
        success: function (response) {
          //模态框隐藏
          $('.modal').modal('hide');
          //重新获取数据
          reload();
        }
      });
    }
  })
})