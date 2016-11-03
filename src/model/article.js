//加载父模块
import { Parent, Func, Api } from './Base';

/*
 * @description: Articel模型类，提供对文章的curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Article {
    /*
     * @description: 获取文章
     * @subscription: viewpost
     * @callback: 获取文章数据并赋值
     */
    static getPost (page) {
        //获取文章id
        const postId = page.$route.params.id;
        //获取接口信息
        const api = new Api({ postId: postId });
        const url = api.getPost;
        //调用父模块get方法
        Parent.get(url, '', (res) => {
            if (res.success) {
                page.post = res.data;
                //对文章正文进行渲染
                page.post.body = Func.parseMarkdown(page.post.body);
            }
        });
    }

    /*
     * @description: 获取分类文章
     * @subscription: viewposts
     * @callback: 获取文章数据并赋值
     */
    static getPosts (page) {
        //获取文章id
        const pageName = page.name;
        //获取接口信息
        const api = new Api({ pageName: pageName });
        const url = api.getPosts;
        //调用父模块get方法
        Parent.get(url, '', (res) => {
            if (res.success) {
                page.posts = res.data;
                //对文章正文进行渲染
                //input.post.body = Func.parseMarkdown(input.post.body);
            }
        });
    }
}

export default Article;