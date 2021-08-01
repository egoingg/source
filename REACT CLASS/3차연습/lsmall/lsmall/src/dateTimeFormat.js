let dateTimeFormat = {}

//1 yyyyMMddhhmmss 형식의  string 데이터 반환 ( EX : 20210324112500 )
dateTimeFormat.yyyyMMddhhmmss = () => {
    var date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    var hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    var minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();

    var seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    var milliseconds = date.getMilliseconds();
    milliseconds = milliseconds < 10 ? '0' + milliseconds.toString() : milliseconds.toString();

    return year + month + day + hour + minites + seconds + milliseconds;
}

//2 yyyyMMddhhmmss 형식의  string 데이터 반환 ( EX : 2021-03-24 11:25:00 )
dateTimeFormat.yyyyMMddhhmmss_dash = () => {
    var date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    var hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    var minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();

    var seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return year + '-'+ month + '-'+ day + ' '+ hour + ':'+ minites + ':'+ seconds;
}

//3 yyyyMMdd 형식의  string 데이터 반환 ( EX : 20210324 )
dateTimeFormat.yyyyMMdd = () => {
    var date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return year + month + day ;
}

//4 yyyyMMdd 형식의  string 데이터 반환 ( EX : 2021-03-24 )
dateTimeFormat.yyyyMMdd_dash = (dt = new Date()) => {
    //var date = new Date();
    var date = dt;
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    return  year + '-'+ month + '-'+ day;
}

export default dateTimeFormat;