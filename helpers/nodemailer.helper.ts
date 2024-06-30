import doevn from 'dotenv'
import nodemailer from 'nodemailer';
doevn.config();
export const sendOTP = (toEmail:string,subject:string,html:string)=>{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.NODEMAILER_MYEMAIL,
    pass:process.env.NODEMAILER_MYPASSWORD
  }
});

const mailOptions = {
  from:process.env.NODEMAILER_MYEMAIL,
  to: toEmail,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});
}