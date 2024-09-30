
import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { MailerService } from './model/generated/mailer_grpc_pb'
import { mailEntry, sendResponse } from './model/generated/mailer_pb'
import { send as sendSmtp } from './smtp'

function send(call: ServerUnaryCall<mailEntry, sendResponse>, callback: sendUnaryData<sendResponse>) {
    sendSmtp(call.request.toObject()).then(() => {
        const response = new sendResponse()
        response.setStatus(true)
        callback(null, response)
    }).catch((error) => {
        callback(error)
    })
}

const server = new Server()
server.addService(MailerService, { send })
server.bindAsync('0.0.0.0:50000', ServerCredentials.createInsecure(), (error, port) => {
    console.log(`listening on port ${port}`)

    if (error) {
        console.error(error)
    }
})
