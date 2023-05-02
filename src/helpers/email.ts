import express from 'express'
import path from 'path'
import fs from 'fs'
import { createTransport, SentMessageInfo } from 'nodemailer'
import { emailCredentials } from '../configs/config'
import { emailMessageContent } from './emailMessageContent'
import handlebars from 'handlebars'

interface EmailBodyInterface {
    returnEmail: string
    sendConfirmationEmail: boolean
    emailMessage: string
    senderName: string
    emailSubject: string
}

export const sendEmail = async (req: express.Request) => {
    const { emailSubject, returnEmail, sendConfirmationEmail, senderName, emailMessage } = req.body as EmailBodyInterface
    const transporter = createTransport({ ...emailCredentials })

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

    let response: any

    const contactSubmission = fs.readFileSync(path.join(__dirname, '../html/contact-form-submission.hbs')).toString()
    const submissionTemplate = handlebars.compile(contactSubmission)

    const message = {
        from: returnEmail,
        to: 'contact@taydenflitcroft.com',
        subject: 'Contact Request Form Submitted',
        html: submissionTemplate({ copyrightDate, date: formattedDate, emailMessage, emailSubject, returnEmail, senderName })
    }

    await transporter.sendMail(message)
        .then ((mailRes: SentMessageInfo) => response = mailRes)
        .catch(err => response = err)

    if (sendConfirmationEmail) {
        const contactEmailConfirmation = fs.readFileSync(path.join(__dirname, '../html/contact-email-confirmation.hbs')).toString()
        const confirmationTemplate = handlebars.compile(contactEmailConfirmation)
        const returnSenderMessage = {
            from: 'contact@taydenflitcroft.com',
            to: returnEmail,
            subject: 'Copy of Tayden Flitcroft\'s Contact Request Form',
            html: confirmationTemplate({ senderName, date: formattedDate, emailMessage, copyrightDate })
        }

        await transporter.sendMail(returnSenderMessage)
            .catch((err) => err)
    }

    return response
}
