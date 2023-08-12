import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3a6e57576000d4",
                pass: "21d4c1e2e188ca"
            }
        });

        const html = `
            <p>
                Click 
                <a href="${process.env.DOMAIN}/${ 
                        emailType === 'VERIFY'?
                        'verifyemail':
                        'resetpassword' 
                    }?token=${hashedToken}">
                    here
                </a>
                to ${ emailType === 'VERIFY'?'Verify your email':'Reset your password' }
                <br/>
                Or, paste the following link in your browser:
                <br/>
                ${process.env.DOMAIN}/${ 
                    emailType === 'VERIFY'?
                    'verifyemail':
                    'resetpassword' 
                }?token=${hashedToken}
            </p>
        `
        const mailOptions = {
            from: 'app.admin@gmail.com',
            to: email,
            subject: (emailType === 'VERIFY') ? 'Verify your email' : 'Reset your password',
            html
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}