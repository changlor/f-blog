import Parent from './Parent'

class Post {
    static selectPosts (page, component, id) {
        Parent.get('https://api.github.com/repos/changlor/yuki-blog/issues')
        .then((res) => {
            page.posts = res;
        })
    }
}

export default Post;