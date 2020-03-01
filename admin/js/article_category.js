$(function () {
  function reload() {
    $.ajax({
      type: "get",
      url: bigNew.category_list,
      success: function (response) {
        const htmlstr = template('list', response);
        $('tbody').html(htmlstr);
      }
    });
  }
  reload();
  $('#xinzengfenlei').click(function (e) {
    e.preventDefault();
    $('.modal').modal();
    $('.modal-footer button').eq(1).text($(this).text().trim()).attr('class', 'btn btn-success');
  })
  $('.modal').on('hide.bs.modal', function (e) {
    $('form')[0].reset();
  })
  $('.add').click(function () {
    $.ajax({
      type: "post",
      url: bigNew.category_add,
      data: {
        name: $('form input').eq(0).val(),
        slug: $('form input').eq(1).val(),
      },
      success: function (response) {
        if (response.code == 201) {
          $('.modal').modal('hide');
          reload();
        }
      }
    })
  })
})