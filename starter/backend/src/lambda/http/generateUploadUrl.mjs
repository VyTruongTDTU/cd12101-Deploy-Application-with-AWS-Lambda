
import middy from '@middy/core';
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { generateUploadUrl } from '../../bussinessLayer/todos.mjs';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger.mjs';


const logger = createLogger('generateUploadUrl');
export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    logger.info(`Generateing update url ${todoId} - ${userId}`);
    const url = await generateUploadUrl(todoId, userId);
    logger.info(`Generated update url ${url}`);

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            uploadUrl: url
        })
    };
  })


module.exports = {
    handler
};
