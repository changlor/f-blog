export default {
    models: ['Welcome', 'Post'],
    subscriptions: {
        'say': {
            Welcome: 'say',
        },
        'viewPosts': {
            Post: 'selectPosts',
        }
    }
}
