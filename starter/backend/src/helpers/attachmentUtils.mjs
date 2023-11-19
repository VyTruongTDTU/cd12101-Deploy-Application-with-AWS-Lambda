import { getSignedUrl as s3getSignedUrl} from '@aws-sdk/s3-request-presigner'


const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

export function getSignedUrl(todoId) {
    return s3getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: urlExpiration
    });
}
