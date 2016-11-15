export default {
    router: {
        't/:id(post)': 'page/post',
        'daily': 'page/daily',
        'home': 'page/home',
        'index': 'admin/index',
    },
    custom: ['page/daily', 'page/home', 'page/post'],
    admin: ['admin/index'],
}
