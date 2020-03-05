$(function () {
  const articleId = +location.search.split('=')[1];

  function amend() {
    const fd = new FormData(this.form);
    const htmlstr = tinymce.activeEditor.getContent();
    fd.append('state', '已发布');
    fd.append('content', htmlstr);
    $.ajax({
      type: "post",
      url: bigNew.article_publish,
      data: fd,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      }
    });
  }

  function draft() {
    const fd = new FormData(this.form);
    const htmlstr = tinymce.activeEditor.getContent();
    fd.append('state', '草稿');
    fd.append('content', htmlstr);
    $.ajax({
      type: "post",
      url: bigNew.article_publish,
      data: fd,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        console.log(response);
      }
    });
  }
  $.ajax({
    type: 'get',
    url: bigNew.category_list,
    dataType: "json",
    success: function (response) {
      if (response.code == 200) {
        const htmlstr = template('category', response);
        $('.category').html(htmlstr);
      }
    }
  });

  function date() {
    jeDate('#mydate', {
      format: 'YYYY-MM-DD'
    });
  }
  date();
  $('#inputCover').change(function () {
    const img = this.files[0];
    const url = URL.createObjectURL(img);
    $('.article_cover').prop('src', url);
  })
  $('.btn-release').click(function (e) {
    e.preventDefault();
    amend.call(this);
    alert('成功');
    window.location.href = 'article_list.html';
  })
  $('.btn-draft').click(function (e) {
    e.preventDefault();
    draft.call(this);
    alert('成功');
    window.location.href = 'article_list.html';
  })

})