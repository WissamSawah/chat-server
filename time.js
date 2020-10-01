const time = {
    getDateTime: function() {
        var date = new Date();
        var hour = date.getHours();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var min  = date.getMinutes();
        var sec  = date.getSeconds();
        var day  = date.getDate();

        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;
        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;

        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    },

    getTimeOfDay: function() {
        var date = new Date();
        var hour = date.getHours();
        var min  = date.getMinutes();

        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;

        return hour + ":" + min;
    }
};

module.exports = time;
