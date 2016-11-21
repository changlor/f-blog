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
        'submitcomment': {
            Comment: 'createComment',
        },
        'commentsturnpage': {
            Comment: 'getComments',
        },
        'signin': {
            Auth: 'signin',
        },
        'signout': {
            Auth: 'signout',
        },
    },
}