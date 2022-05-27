const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDI_BLUE_API_KEY;

module.exports.SendMail = (address,subject,message,username)=> {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        sender: { email: "strativ@jobtest.com" },
        to: [
            {
                email: `${address}`,
                name: `${username}`,
            },
        ],
        subject: `${subject}`,
        textContent: `${message}`,
    };
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (response) {
            return true;
        },
        function (error) {
            return error;
        }
    )
}

