import Joi from 'joi'
import { Attachment } from '../api'

export interface FormFields {
    /**
     * Subject of email message.
     */
    subject: string
    /**
     * Email address of receiver.
     */
    receiver: string
    /**
     * Carbon-copy receiver email address.
     */
    cc: string
    /**
     * Body text of email message.
     */
    body: string
    /**
     * Attachments of email message.
     * @example signature image or additional document.
     */
    attachments: Attachment[] | File[]
}

export const MB = 1024 ** 2
export const ATTACHMENTS_LIMIT = 5

const joiString = Joi.string().empty('')
export const validationSchema = Joi.object<FormFields>({
    subject: joiString.min(5).required(),
    receiver: joiString.email({ tlds: {} }).required(),
    cc: joiString.email({ multiple: true, tlds: {} }),
    body: joiString.min(10).required(),
    attachments: Joi.custom((files: FileList, helpers) => {
        if (files.length > ATTACHMENTS_LIMIT) {
            return helpers.error('attachment.size', { ATTACHMENTS_LIMIT })
        }
        for (const file of files) {
            if (file.size > MB) {
                return helpers.error('attachment.filesize')
            }
        }

        return [...files]
    }, 'attachments validation').messages({
        'attachment.size': 'Maximal limit of {{#ATTACHMENTS_LIMIT}} attachments exceeded',
        'attachment.filesize': 'Maximal filesize 1 MB for one attachment exceeded',
    }),
})
