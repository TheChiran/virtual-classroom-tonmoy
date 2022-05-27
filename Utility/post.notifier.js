const cron = require('node-cron');

const RunTaskScheduler = (minute,hour,
                        day_of_month,month,day_of_week,methodToRun,postId,classroomId,deadline_date,time)=>{
    cron.schedule(`${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`,()=>{
        methodToRun(postId,classroomId,deadline_date,time);
    })

}

module.exports = {
    RunTaskScheduler
}