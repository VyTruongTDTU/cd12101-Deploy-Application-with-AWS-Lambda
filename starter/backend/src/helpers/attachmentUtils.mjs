// import { getSignedUrl as s3getSignedUrl} from '@aws-sdk/s3-request-presigner'


// const bucketName = process.env.ATTACHMENT_S3_BUCKET;
// const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

// export function getSignedUrl(todoId) {
//     return s3getSignedUrl('putObject', {
//         Bucket: bucketName,
//         Key: todoId,
//         Expires: urlExpiration
//     });
// }

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createLogger } from '../utils/logger.mjs'
import AWSXRay from 'aws-xray-sdk-core'

const logger = createLogger('fileStorage/attachmentUtils.mjs')

const s3Client = AWSXRay.captureAWSv3Client(new S3Client())
const bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)

export async function getUploadUrl(fileId) {

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: fileId
    })

    const uploadFileUrl = await getSignedUrl(s3Client, command, {
        expiresIn: urlExpiration
    })

    logger.info(`Obtained an uploadUrl = ${uploadFileUrl}`)
    return uploadFileUrl
}

export function getAttachmentUrl(fileId) {
    return `https://${bucketName}.s3.amazonaws.com/${fileId}`
}