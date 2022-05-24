import express from 'express'

export const emailMessageContent = (req: express.Request) => {
    const { emailMessage, emailSubject, returnEmail, senderName } = req.body

    const dateSent = new Date().toUTCString()

    return (
        `<div><strong>Date Sent:</strong> ${dateSent}</div>
        <div><strong>Sender Name:</strong> ${senderName}</div>
        <div><strong>Return Email-Address:</strong> ${returnEmail}</div>
        <div><strong>Subject:</strong> ${emailSubject}</div>
        <div><strong>Message Content:</strong> <br> ${ emailMessage }</div>`
    )
}
