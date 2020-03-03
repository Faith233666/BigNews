$(function () {
  //page变量提取出来
  let page = 1;
  // 页面渲染封装
  function reload() {
    $.ajax({
      type: "get",
      url: bigNew.comment_list,
      data: {
        page: page,
        perpage: 10
      },
      dataType: "json",
      success: function (response) {
        if (response.code == 200) {
          const htmltr = template('list', response.data);
          $('tbody').html(htmltr);
        }

      }
    });
  }
  reload();
  $('.pagination li.page').click(function (e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    page = $(this).text();
    if (page == 1) {
      $('.prev').addClass('disabled');
    } else if (page == 7) {
      $('.next').addClass('disabled');
    } else {
      $('.prev').removeClass('disabled');
      $('.next').removeClass('disabled');
    }
    reload();
  })
  $('.prev').click(function (e) {
    e.preventDefault();
    if (page == 1) {
      $(this).addClass('disabled');
      page = 1;
      reload();
    } else {
      $(this).removeClass('disabled');
      page--;
      $('.pagination li.page').eq(page - 1).addClass('active').siblings().removeClass('active');
      reload();
    }
  })
  $('.next').click(function (e) {
    e.preventDefault();
    if (page == 7) {
      $(this).addClass('disabled');
      page = 7;
      reload();
    } else {
      $(this).removeClass('disabled');
      page++;
      $('.pagination li.page').eq(page - 1).addClass('active').siblings().removeClass('active');
      reload();
    }
  })
  $('.first').click(function (e) {
    e.preventDefault();
    page = 1;
    $('.pagination li.page').eq(page - 1).addClass('active').siblings().removeClass('active');
    reload();
  })
  $('.last').click(function (e) {
    e.preventDefault();
    page = 7;
    $('.pagination li.page').eq(page - 1).addClass('active').siblings().removeClass('active');
    reload();
  })
  $('tbody').on('click', '.btn-info', function () {
    $.ajax({
      type: "post",
      url: bigNew.comment_pass,
      data: {
        id: $(this).attr('data-id')
      },
      dataType: "json",
      success: function (response) {
        if (response.code == 200) {
        console.log('审批通过');
        reload();
        }
      }
    });
  })
  $('tbody').on('click', '.btn-warning', function () {
    $.ajax({
      type: "post",
      url: bigNew.comment_reject,
      data: {
        id: $(this).attr('data-id')
      },
      dataType: "json",
      success: function (response) {
        if (response.code == 200) {
        console.log('拒绝通过');
        reload();
        }
      }
    });
  })
  $('tbody').on('click', '.btn-danger', function () {
    $.ajax({
      type: "post",
      url: bigNew.comment_delete,
      data: {
        id: $(this).attr('data-id')
      },
      dataType: "json",
      success: function (response) {
        if (response.code == 200) {
          console.log('删除');
          reload();
        }

      }
    });
  })
})