//加载父模块
import { Parent, Func, Php, Api } from './Base';

/*
 * @description: Articel模型类，提供对文章的curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Article {
    static createPost (page) {
        //获取所属页面id
        const pageId = page.pageId;
        //获取文章标题
        const title = page.title;
        //获取文章正文
        const content = typeof page.content == 'string' ? page.content.trim() : '';
        //如果正文为空或者空字符，打回
        if (Php.empty(content)) {
            console.log('正文不能为空OoO');
            return false;
        }
        //获取文章标签
        const tags = page.tags;
        //组装数据
        const post = {
            pageId: pageId,
            title: title,
            content: content,
            tags: tags,
        };
        //获取接口信息
        const api = new Api({
            pageId: pageId,
        });
        const url = api.createPost;
        Parent.fetch(url, 'post', post).then((res) => {
            console.log(res);
        });
    }

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
        Parent.fetch(url, 'get').then((res) => {
            if (res.success) {
                page.post = res.data;
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
        Parent.fetch(url, 'get').then((res) => {
            if (res.success) {
                page.posts = res.data;
            }
        });
    }
}

export default Article;