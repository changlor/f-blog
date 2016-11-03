export default {
    models: ['Article', 'Comment'],
    router: {
        'viewpost': {
            Article: 'getPost',
            Comment: 'getComments',
        },
        'viewposts': {
            Article: 'getPosts',
        },
        'commentsturnpage': {
            Comment: 'getComments',
        },
    },
}