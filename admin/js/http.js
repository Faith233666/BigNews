// /* 沙箱模式 */
// (function(w){
//     var baseURL = 'http://localhost:8080/api/v1'
//     var BigNew = {
//         baseURL:baseURL,//基地址
//         user_login:      baseURL + '/admin/user/login',//用户登录
//         user_info:       baseURL + '/admin/user/info',//用户信息
//         user_detail:     baseURL + '/admin/user/detail',//用户详情
//         user_edit:       baseURL + '/admin/user/edit',//用户编辑
//         category_list:   baseURL + '/admin/category/list',//文章类别查询
//         category_add:    baseURL + '/admin/category/add',//文章类别新增
//         category_search: baseURL + '/admin/category/search',//文章类别搜索
//         category_edit:   baseURL + '/admin/category/edit',//文章类别编辑
//         category_delete: baseURL + '/admin/category/delete',//文章类别删除
//         article_query:   baseURL + '/admin/article/query',//文章搜索
//         article_publish: baseURL + '/admin/article/publish',//文章发布
//         article_search:  baseURL + '/admin/article/search',//文章信息查询
//         article_edit:    baseURL + '/admin/article/edit',//文章编辑
//         article_delete:  baseURL + '/admin/article/delete',//文章删除
//         comment_list:    baseURL + '/admin/comment/search',//文章评论列表
//         comment_pass:    baseURL + '/admin/comment/pass',//文章评论通过
//         comment_reject:  baseURL + '/admin/comment/reject',//文章评论不通过
//         comment_delete:  baseURL + '/admin/comment/delete',//文章评论删除
//     };

//     //暴露接口
//     w.BigNew = BigNew;
// })(window);
(function (global) {
    //为ajax请求设置默认值
    $.ajaxSetup({
        //后台管理系统需要添加请求头token，他是用户唯一的身份标识
        headers: {
            Authorization: localStorage.getItem('token')
        },
        error: function () {
            $('.modal').modal();
            $('.modal-body').html('登录已失效，请重新登录！')
            //登录失败时的模态框点击事件
            $('.gotologin').click(function () {
                window.location.href = 'login.html';
            })
        }
    })
    //登录失败时的模态框样式
    $('.gotologin').mouseenter(function () {
        $(this).css({
            backgroundColor: 'blue',
            color: 'white'
        });
    })
    //登录失败时的模态框样式
    $('.gotologin').mouseleave(function () {
        $(this).css({
            backgroundColor: 'blue',
            color: 'white'
        });
    })
    //接口地址封装
    const urls = 'http://localhost:8080/api/v1';
    const bigNew = {
        user_login: `${urls}/admin/user/login`,
        user_info: `${urls}/admin/user/info`,
        user_detail: `${urls}/admin/user/detail`, //用户详情
        user_edit: `${urls}/admin/user/edit`, //用户编辑
        category_list: `${urls}/admin/category/list`, //文章类别查询
        category_add: `${urls}/admin/category/add`, //文章类别新增
        category_search: `${urls}/admin/category/search`, //文章类别搜索
        category_edit: `${urls}/admin/category/edit`, //文章类别编辑
        category_delete: `${urls}/admin/category/delete`, //文章类别删除
        article_query: `${urls}/admin/article/query`, //文章搜索
        article_publish: `${urls}/admin/article/publish`, //文章发布
        article_search: `${urls}/admin/article/search`, //文章信息查询
        article_edit: `${urls}/admin/article/edit`, //文章编辑
        article_delete: `${urls}/admin/article/delete`, //文章删除
        comment_list: `${urls}/admin/comment/search`, //文章评论列表
        comment_pass: `${urls}/admin/comment/pass`, //文章评论通过
        comment_reject: `${urls}/admin/comment/reject`, //文章评论不通过
        comment_delete: `${urls}/admin/comment/delete`, //文章评论删除
    }
    global.bigNew = bigNew;
})(window)