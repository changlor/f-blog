import moment from 'moment';

//转化时间为m月d日y年格式
const formatTime = function (time) {
    return moment.unix(time).format('MM 月 DD 日 YYYY 年');
}

export default {
    formatTime: formatTime,
}