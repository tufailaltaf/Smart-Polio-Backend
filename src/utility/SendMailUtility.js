//External Lib Import
const nodemailer = require("nodemailer");
const {google} = require('googleapis');
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL)
OAuth2_client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const SendMailUtility = async (emailTo, emailText, emailSubject,Attachments) => {
  const accessToken = OAuth2_client.getAccessToken()
  let transporter = await nodemailer.createTransport({
  service: "gmail",
  auth:{
    type:"OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken
  }
  });
    // name: "server123.web-hosting.com",
    // host: "server123.web-hosting.com",
    // port: 587,
    // secure: false,
    // auth: {
    //   user: 'testing@goghawelfare.com',
    //   pass: 'TeSplm#1291',
    // },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  // });

  const mailOption = {
    from: `Smart Polio <m.tufail842@gmail.com>`,
    to: emailTo,
    subject: emailSubject,
    html: emailText,
    attachments: [
      {
        path: Attachments
      }
    ]
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });

  // return await transporter.sendMail(mailOption);
};

module.exports = SendMailUtility;
