import { credentials, ServiceError } from '@grpc/grpc-js'
import { MailerClient } from './model/generated/mailer_grpc_pb'
import { mailEntry as MailEntry, sendResponse as SendResponse } from './model/generated/mailer_pb'

const MAILER_HOST = process.env.MAILER_HOST ?? 'localhost'

export function send(data: Partial<MailEntry.AsObject>): Promise<SendResponse | ServiceError> {
    const client = new MailerClient(MAILER_HOST + ':50000', credentials.createInsecure())

    const mailEntry = new MailEntry()
    mailEntry.setSubject(data.subject ?? '')
    mailEntry.setSender(data.sender ?? '')
    mailEntry.setRecipient(data.recipient ?? '')
    mailEntry.setBody(data.body ?? '')
    mailEntry.setCc(data.cc ?? '')

    return new Promise((resolve, reject) => {
        client.send(mailEntry, (err, response) => {
            if (err) {
                return reject(err)
            }
            response.setStatus(true)
            resolve(response)
        })
    })
}
