module.exports.SendMail = (address,subject,message,username)=> {
    const mailjet = require ('node-mailjet')
    .connect(`${process.env.mailjet_api}`, `${process.env.mailjet_secret}`)
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "chiran.tonmoy.swe@gmail.com",
            "Name": "Virtual Classroom"
        },
        "To": [
            {
            "Email": `${address}`,
            "Name": `${username}`
            }
        ],
        "Subject": `${subject}`,
        "TextPart": `${subject}`,
        "HTMLPart": `${message}`,
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log('error',err);
        console.log(err.statusCode)
    })

}

