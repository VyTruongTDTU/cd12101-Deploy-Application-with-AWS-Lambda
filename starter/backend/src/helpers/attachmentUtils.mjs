const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const s3 = new XAWS.S3({ signatureVersion: 'v4' });

const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

export function getSignedUrl(todoId) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId,
        Expires: urlExpiration
    });
}
