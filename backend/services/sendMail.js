const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// const { OAuth2 } = google.auth;
// const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  // MAILING_SERVICE_CLIENT_ID,
  // MAILING_SERVICE_CLIENT_SECRET,
  // MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

// const oauth2Client = new OAuth2(
//   MAILING_SERVICE_CLIENT_ID,
//   MAILING_SERVICE_CLIENT_SECRET,
//   MAILING_SERVICE_REFRESH_TOKEN,
//   OAUTH_PLAYGROUND
// );

const sendEmail = (to, url, txt) => {
  // oauth2Client.setCredentials({
  //   refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  // });

  // const accessToken = oauth2Client.getAccessToken();
  // const smtpTransport = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: SENDER_EMAIL_ADDRESS,
  //     clientId: MAILING_SERVICE_CLIENT_ID,
  //     clientSecret: MAILING_SERVICE_CLIENT_SECRET,
  //     refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
  //     accessToken,
  //   },
  // });

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "techtechlms@gmail.com",
      pass: "rbzgfbylpeevqbmr",
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "TNT Shop",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Webshop Group.</h2>
            <p>Congratulations! You're almost set to start using Webshop Group✮.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    // console.log('sww', infor);
    return infor;
  });
};

const thankEmail = (to, url, txt, orderDetailHTML, orderTotalPrice) => {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "techtechlms@gmail.com",
      pass: "rbzgfbylpeevqbmr",
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "TNT Shop",
    html: `<div style="padding:0;margin:0">
    <div>
        <div style="height: 280px; color: black !important;">
            <img style="width: 100%; height: 100%;"
                src="https://i.pinimg.com/originals/ec/e9/3c/ece93ca911ae55f73b250aec2ead1c4a.jpg">
            </img>
        </div>
        <div style="padding: 0 0 0 0; height:100%;  background-color: rgb(241, 241, 241);">
            <div  style="background-color: #fff; margin: 0 24% 0 24%; padding: 0 4% 0 4%;">
                <div
                    style="overflow: hidden; height: 56px; text-align:center; overflow-wrap: break-word; font-size: 40px; font-weight: bold; color: rgb(255, 115, 80); font-family: cursive;">
                    ~~~~~~~~~~~~~~~~~~~~~~~~</div>
                <div
                    style="text-align:center; font-size: 40px; font-weight: bold; color: rgb(255, 115, 80); font-family: cursive;">
                    Thank U for ordering with us</div>
                <div >
                    <div style="text-align:center; font-size: 40px; font-weight: bold; color: rgb(255, 115, 80); font-family: cursive;">
                        ~~~~~~~~~~</div>
                    <div style="text-align:center; font-size: 20px; font-weight: bold; color: rgb(255, 115, 80); font-family: cursive;">
                        (´｡✪ω✪｡｀)</div>
                    <div style="text-align:center; font-size: 40px; font-weight: bold; color: rgb(255, 115, 80); font-family: cursive;">
                        ~~~~~~~~~</div>
                </div>
                
            </div>
        </div>
    </div>
    <div>
        <div style="height:100%; background-color: rgb(241, 241, 241);">
            <div
                style=" overflow: hidden; margin: 0 24% 0 24%; padding: 0 4% 0 4%; text-align:left; font-size: 20px; font-family: cursive;  background-color: rgb(255, 255, 255);">
                <p>Dear Customer,</p>
                <p>Thank you for your order! °˖✧◝(⁰▿⁰)◜✧˖°</p>
                <p>You can look forward to your order being shipped within the next 5-7 business days.</p>
                <p>If you have any questions or concerns about this order, feel free to reach out to our Customer
                    Service anytime 9AM-5PM, Monday-Friday. Be sure to have the order number handy so we can help you
                    even faster!</p>
                <p>We hope you enjoy your purchase!</p>
                <table style="border:0.5px; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th
                            style="border:0.5px; border:solid; border-color:rgb(124, 124, 124); text-align: center; color: black; font-family: cursive">
                            Your item</th>
                        <th
                            style="border:0.5px; border:solid; border-color:rgb(124, 124, 124); text-align: center; color: black; font-family: cursive">
                            Total cost</th>
                    </tr>
                    ${orderDetailHTML}
                    <tr>
                        <td style="border:0.5px; border:solid; border-color:rgb(124, 124, 124); width: 106px; text-align: center; font-weight: bold;">
                            Total Price
                        </td>
                        <td style="border:0.5px; border:solid; border-color:rgb(124, 124, 124); width: 106px; text-align: center; font-weight: bold;">
                          ${orderTotalPrice}
                        </td>
                    </tr>
                </table>
                <p>Kind regards,</p>
                <p>TNT Shop</p>
                <p></p>
            </div>
        </div>
    </div>
</div>`,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    // console.log('sww', infor);
    return infor;
  });
};
module.exports = { sendEmail, thankEmail };
