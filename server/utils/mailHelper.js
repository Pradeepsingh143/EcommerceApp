import transporter from '../config/transporter.config'
import config from '../config/index'

const mailHelper = async(options)=>{
    const message = {
        from: config.SMPT_MAIL_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        // html: "<b>Hello world?</b>", // html body
      };

   await transporter.sendMail(message)
}

export default mailHelper
