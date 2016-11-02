export default {
    models: ['Article', 'Comment'],
    router: {
        'viewpost': {
            Article: 'getPost',
            //Comment: 'getComments',
        },
    },
}