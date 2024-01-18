import express from 'express'
import path from 'path'
import fs from 'fs'
import { createTransport, SentMessageInfo } from 'nodemailer'
import handlebars from 'handlebars'

export interface EmailBodyInterface {
    returnEmail: string
    sendConfirmationEmail: boolean
    emailMessage: string
    senderName: string
    emailSubject: string
}

export const sendEmail = async (request: express.Request<EmailBodyInterface>): Promise<SentMessageInfo> => {
    const { emailSubject, returnEmail, sendConfirmationEmail, senderName, emailMessage } = request.body

    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: +(process.env.EMAIL_PORT as string),
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const date = new Date()

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    let hour = date.getHours()
    const minute = date.getMinutes().toString().padStart(2, '0')

    const amOrPm = hour >= 12 ? 'PM' : 'AM'

    if (hour > 12) {
        hour = hour - 12
    } else if (hour === 0) {
        hour = 12
    }

    const formattedDate = `${month}/${day}/${year} at ${hour}:${minute} ${amOrPm}`

    const copyrightDate = date.getFullYear()

    const contactSubmission = fs.readFileSync(path.join(__dirname, '../html/contact-form-submission.hbs')).toString()
    const submissionTemplate = handlebars.compile(contactSubmission)

    const message = {
        from: process.env.EMAIL_USERNAME,
        to: 'contact@taydenflitcroft.com',
        subject: 'Contact Request Form Submitted',
        html: submissionTemplate({ copyrightDate, date: formattedDate, emailMessage, emailSubject, returnEmail, senderName })
    }

    try {
        const sentMailResponse = await transporter.sendMail(message)

        if (sendConfirmationEmail && sentMailResponse.accepted) {
            const contactEmailConfirmation = fs.readFileSync(path.join(__dirname, '../html/contact-email-confirmation.hbs')).toString()
            const confirmationTemplate = handlebars.compile(contactEmailConfirmation)
            const returnSenderMessage = {
                from: 'contact@taydenflitcroft.com',
                to: returnEmail,
                subject: 'Copy of Tayden Flitcroft\'s Contact Request Form',
                html: confirmationTemplate({ senderName, date: formattedDate, emailMessage, copyrightDate })
            }

            await transporter.sendMail(returnSenderMessage)
                .catch((err) => console.error(err))
        }

        return sentMailResponse

    } catch (error) {
        console.error(error)
    }

}
