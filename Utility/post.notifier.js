const cron = require('node-cron');

const RunTaskScheduler = (minute,hour,
                        day_of_month,month,day_of_week,methodToRun,postId)=>{
                            
                            cron.schedule(`${minute} ${hour} ${day_of_month} ${month} ${day_of_week}`,()=>{
                                methodToRun(postId);
                            })

}

module.exports = {
    RunTaskScheduler
}