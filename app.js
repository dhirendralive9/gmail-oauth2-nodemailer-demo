const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = 'client id';
const CLIENT_SECRET = 'client secret';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'refreshtoken';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'authorised email',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: 'Delta Services <authorised email>',
        to: 'receiver email',
        subject: 'Hello from gmail using API',
        text: 'Hello from gmail email using API',
        html: '<h1>Hello from gmail email using API</h1>',
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

  sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));