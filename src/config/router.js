export default {
    router: {
        '/t/:id(post)': 'page/post',
        '/daily': 'page/daily',
        '/home': 'page/home',
        '/index': 'admin/index',
        '/write': 'admin/write',
    },
    custom: ['page/daily', 'page/home', 'page/post'],
    admin: ['admin/index', 'admin/write'],
}
