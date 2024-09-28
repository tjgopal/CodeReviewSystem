import {Resend} from 'resend'
const resend= new Resend(process.env.RESEND_API_KEY)
export const sendEmailVerification= async ( email:string,token:string)=>{
    try {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href='${confirmLink}'>here</a> to confirm</p>`,
        });
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }



}