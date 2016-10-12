'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//引入配置文件
import Api from '../common/api.js';
import Data from '../common/data.js';
//Comment模型类
class Comment {
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
        Parent.post(api.postComment, formData, callback);
    }
    static getComments (input, callback) {
        const [postId] = [input.postId];
        //获取配置信息
        const setting = new Data({ postId: postId });
        //获取接口信息
        const api = new Api({ postId: postId });
        Parent.get(api.getComments, '', (response) => {
            const res = response.data;
            callback({ comments:res });
        });
    }
}

export default Comment;