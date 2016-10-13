'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//引入配置文件
import Api from '../common/api.js';
import Data from '../common/data.js';
//Comment模型类
class Comment {
    //param [array] input --包括五个参数
    //param [int]    postId   --新建评论的文章id
    //param [string] nickname --评论者的昵称
    //param [string] email    --评论者的邮箱
    //param [string] website  --评论者的网址
    //param [string] content  --评论者的正文
    //return [boolean] res --返回评论新建成功与否状态
    static createComment (input, callback) {
        //获取所需的变量
        const [postId, nickname, email, website, content] = [
            input.postId,
            input.nickname,
            input.email,
            input.website,
            input.content,
        ];
        //获取接口信息
        const api = new Api({ postId: postId });
        //如果nickname为空，返回不能为空
        if (empty(nickname)) {
            callback({ success: false, msg: '请输入用户名OoO' });
            return false;
        }
        //如果email为空，返回不能为空
        if (empty(email)) {
            callback({ success: false, msg: '请输入邮箱OoO' });
            return false;
        }
        //如果content为空，返回不能为空
        if (empty(content)) {
            callback({ success: false, msg: '说点什么吧OoO' });
            return false;
        }
        //组装数据
        let formData = new FormData();
        formData.append('articleId', postId);
        formData.append('nickname', nickname);
        formData.append('email', email);
        formData.append('website', website);
        formData.append('content', content);
        //发送数据
        Parent.post(api.postComment, formData, (res) => {
            //回调结果
            callback(res);
        });
    }

    //param [array] input --包括一个参数
    //param [int]    postId --需要获取评论的文章id
    //return [array] res --返回选取文章的评论
    static getComments (input, callback) {
        //获取所需的变量
        const [postId] = [
            input.postId
        ];
        //获取配置信息
        const setting = new Data({ postId: postId });
        //获取接口信息
        const api = new Api({ postId: postId });
        //获取数据
        Parent.get(api.getComments, '', (res) => {
            //回调结果
            callback(res);
        });
    }
}

export default Comment;