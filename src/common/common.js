class blogCommonApi {
    static getCurrentDate () {
        const monthArr = ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const cT = new Date();
        const month = monthArr[cT.getMonth()];
        let day = cT.getDate() + '';
        const lastIndexOfDay = day.charAt(day.length - 1);
        if (day == '11' || day == '12' || day == '13') {
            day = day + 'th';
        } else {
            switch (lastIndexOfDay) {
                case '1':
                    day = day + 'st';
                break;
                case '2':
                    day = day + 'nd';
                break
                case '3':
                    day = day + 'rd';
                break;
                default :
                    day = day + 'th';
                break;
            }
        }
        return month + ' ' + day;
    }
};

export default blogCommonApi;
