import axios, { AxiosRequestConfig } from 'axios'
import { FormFields } from './component/util'

export interface Attachment {
    /**
     * Name of processed attachment.
     */
    filename: string
    /**
     * https://api.escuelajs.co/api/v1/files/{@link filename}.
    */
    location: string
    /**
     * Original name of uploaded attachment.
     */
    originalname: string
    /**
     * Mimetype of image or pdf attachment.
     */
    type: string
}

/**
 * Submits mail to endpoint.
 *
 * @param data valid {@link FormFields} data of mail message
 */
export async function send(data: FormFields) {
    return axios.post('https://dummyjson.com/http/200', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
    })
}

/**
 * Uploads file to endpoint and stores its data for further use.
 *
 * @param file input from file html component
 * @param onUploadProgress callback for progress visualisation
 */
export async function upload(file: File, onUploadProgress: AxiosRequestConfig['onUploadProgress']) {
    const formData = new FormData()
    formData.append('file', file)

    return await axios.post('/upload', formData, {
        baseURL: 'https://api.escuelajs.co/api/v1/files',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    })
}
