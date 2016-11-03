//基础父模块
import { Parent, Func, Api } from './Base';

/*
 * @description: Comment模型类，提供对评论curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Comment {
    /*
     * @description: 创建一个新评论
     */
    static createComment (input, callback) {
        //获取所需的变量
        const [postId, nickname, email, website, content] = [
            input.postId,
            input.nickname,
            input.email,
            input.website,
            input.content,
        ];
        //如果nickname为空，返回不能为空
        if (Parent.empty(nickname)) {
            callback.before(Parent.response([false, '请输入用户名OoO']));
            return false;
        }
        //如果email为空，返回不能为空
        if (Parent.empty(email)) {
            callback.before(Parent.response([false, '请输入邮箱OoO']));
            return false;
        }
        //如果content为空，返回不能为空
        if (Parent.empty(content)) {
            callback.before(Parent.response([false, '说点什么吧OoO']));
            return false;
        }
        callback.before(Parent.response([true]));
        //组装数据
        let comment = {
            postId: postId,
            nickname: nickname,
            email: email,
            website: website,
            content: content,
        };
        //获取接口信息
        const api = new Api({ postId: postId });
        const uri = api.createComment;
        //调用父类post方法发送post数据
        Parent.post(uri, comment, (res) => {
            //回调结果
            callback.after(res);
        });
    }

    /*
     * @description: 获取文章评论
     * @subscription: viewpost, commentsturnpage
     * @callback: 获取文章评论数据并赋值
     */
    static getComments (page) {
        //获取文章id
        const postId = page.$route.params.id;
        //获得当前评论页码
        const currentPage = page.currentPage;
        //获取评论页评论数
        const pageSize = page.pageSize;
        //组装携带参数
        const params = {
            currentPage: currentPage,
            pageSize: pageSize,
        };
        //获取接口信息
        const api = new Api({ postId: postId });
        const uri = api.getComments;
        //调用父类get方法
        Parent.get(uri, params, (res) => {
            if (res.success) {
                page.comments = res.data.comments;
                page.commentsCount = res.data.commentsCount;
                page.hasComment = res.data.comments.length > 0;
            }
        });
    }
}

export default Comment;