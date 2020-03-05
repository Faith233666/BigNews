// $(function () {
//   let page = 1;
//   let type = "";
//   let state = "";
//   let perpage = 10;

//   function category() {
//     $.ajax({
//       type: "get",
//       url: bigNew.category_list,
//       dataType: "json",
//       success: function (response) {
//         const htmlstr = template('category', response);
//         $('#selCategory').html(htmlstr);
//       }
//     });
//   }
//   category();

//   function reload() {
//     $.ajax({
//       type: "get",
//       url: bigNew.article_query,
//       data: {
//         type: type,
//         state: state,
//         page: page,
//         perpage: perpage
//       },
//       dataType: "json",
//       success: function (response) {
//         const htmlstr = template('list', response.data);
//         $('tbody').html(htmlstr);
//         Pagination(response);
//       }
//     });
//   }
//   reload();

//   function ajaxRequest() {
//     $.ajax({
//       type: "get",
//       url: bigNew.article_query,
//       data: {
//         type: type,
//         state: state,
//         page: page,
//         perpage: perpage
//       },
//       dataType: "json",
//       success: function (response) {
//         const htmlstr = template('list', response.data);
//         $('tbody').html(htmlstr);
//       }
//     })
//   }

//   function Pagination(res) {
//     $('#pagination-demo').twbsPagination('destroy');
//     $('#pagination-demo').twbsPagination({
//       totalPages: res.data.totalPage,
//       visiblePages: 7,
//       startPage: page,
//       first: '首页',
//       prev: '上一页',
//       next: '下一页',
//       last: '最后一页',
//       onPageClick: function (event, clickPage) {
//         page = clickPage;
//         ajaxRequest()
//       }
//     });
//   }
//   $('#btnSearch').click(function (e) {
//     e.preventDefault();
//     type = $('#selCategory').val().trim();
//     state = $('#selStatus').val().trim();
//     page = 1;
//     reload();
//   })
// })
$(function () {
  //设置全局变量
  let page = 1;
  let type = "";
  let state = "";
  let perpage = 10;
  //初始化select标签的值并渲染到页面上
  function category() {
    $.ajax({
      type: "get",
      url: bigNew.category_list,
      dataType: "json",
      success: function (response) {
        const htmlstr = template('category', response);
        $('#selCategory').html(htmlstr);
      }
    });
  }
  //调用select标签初始化方法
  category();

  //文章列表数据获取
  function reload() {
    $.ajax({
      type: "get",
      url: bigNew.article_query,
      data: {
        type: type,
        state: state,
        page: page,
        perpage: perpage
      },
      dataType: "json",
      success: function (response) {
        const htmlstr = template('list', response.data);
        $('tbody').html(htmlstr);
        const total = response.data.totalPage;
        //在分页插件中定义两个实参，total总页数和page页码
        //在第二次调用的时候，改变为当前点击的页码
        Pagination(total, page);
      }
    });
  }
  reload();

  function Pagination(total, startPage) {
    $('#pagination-demo').twbsPagination('destroy');
    $('#pagination-demo').twbsPagination({
      totalPages: total,
      visiblePages: 7,
      //startPage属于局部变量，不受全局page的影响
      startPage: startPage,
      first: '首页',
      prev: '上一页',
      next: '下一页',
      last: '最后一页',
      //当页码点击时候触发的回调函数
      //分页插件会自动触发一次startPage当前页
      onPageClick: function (event, clickPage) {
        //改变了全局的page，但是startPage这时候还是之前的，不受全局page的影响
        page = clickPage;
        //当前页码和点击页码不同时，才刷新页面，不然就会一直点击第一页和获取第一页的页码
        if (startPage != clickPage) {
          reload();
        }
      }
    });
  }
  $('#btnSearch').click(function (e) {
    e.preventDefault();
    //获取select标签的内容
    type = $('#selCategory').val().trim();
    state = $('#selStatus').val().trim();
    //将页码设回1
    page = 1;
    reload();
  })
  $('tbody').on('click', '.delete', function () {
    $.ajax({
      type: "post",
      url: bigNew.article_delete,
      data: {
        id: $(this).attr('data-id')
      },
      dataType: "json",
      success: function (response) {
        if (response.code == 204) {
          if ($('tbody tr').length == 1) {
            page--;
          }
          reload();
        }
      }
    });
  })
})