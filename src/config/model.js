export default {
    models: ['Article', 'Comment', 'Auth'],
    subscriptions: {
        'viewpost': {
            Article: 'getPost',
            Comment: 'getComments',
        },
        'viewposts': {
            Article: 'getPosts',
        },
        'submitpost': {
            Article: 'createPost',
        },
        'commentsturnpage': {
            Comment: 'getComments',
        },
        'signin': {
            Auth: 'signin',
        },
    },
}