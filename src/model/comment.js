//基础父模块
import Base from './Base';
const Parent = new Base();
//加载依赖模块
import Api from '../common/Api';
import Data from '../common/Data';

/*
 * @description: Comment模型类，提供对评论curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Comment {
    /*
     * @description: 创建一个新评论
     * param [array] input --包括五个参数
     * param [int]    postId   --新建评论的文章id
     * param [string] nickname --评论者的昵称
     * param [string] email    --评论者的邮箱
     * param [string] website  --评论者的网址
     * param [string] content  --评论者的正文
     * return [boolean] res --返回评论新建成功与否状态
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
     * param [array] input --包括一个参数
     * param [int] postId --需要获取评论的文章id
     * param [int] currentPage --需要获取评论的页码
     * param [int] pageSize --需要获取评论页码评论显示数
     * return [array] res --返回选取文章的评论
     */
    static getComments (input, callback) {
        //获取所需的变量
        const [postId, currentPage, pageSize] = [
            input.postId,
            input.currentPage,
            input.pageSize,
        ];
        //组装携带参数
        const params = {
            currentPage: currentPage,
            pageSize: pageSize,
        };
        //获取配置信息
        const setting = new Data({ postId: postId });
        //获取接口信息
        const api = new Api({ postId: postId });
        const uri = api.getComments;
        //调用父类get方法获取get数据
        Parent.get(uri, params, (res) => {
            //回调结果
            callback(res);
        });
    }
}

export default Comment;