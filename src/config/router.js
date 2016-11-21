export default {
    router: {
        '/t/:id(post)': 'page/post',
        '/daily': 'page/daily',
        '/home': 'page/home',
        '/index': 'admin/index',
        '/write': 'admin/write',
        '/log': 'page/log',
    },
    custom: ['page/daily', 'page/home', 'page/post', 'post/log'],
    admin: ['admin/index', 'admin/write'],
}
