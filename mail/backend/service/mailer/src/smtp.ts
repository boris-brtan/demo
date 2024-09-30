import fs from 'fs'
import ini from 'ini'
import pug from 'pug'
import { createTransport } from 'nodemailer'
import { mailEntry } from './model/generated/mailer_pb'

export async function send(data: mailEntry.AsObject) {
    const info = await createTransport(
        ini.parse(fs.readFileSync('config.ini', 'utf-8'))
    ).sendMail({
        from: data.sender,
        to: data.recipient,
        subject: data.subject,
        cc: data.cc,
        html: pug.renderFile('src/templates/basic.pug', {
            ...data
        }),
    })

    console.log('Message sent: %s', info.messageId)
}
