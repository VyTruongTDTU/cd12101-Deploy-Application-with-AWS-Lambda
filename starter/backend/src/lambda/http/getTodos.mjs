
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getTodo } from '../../bussinessLayer/todos.mjs';
import { getUserId } from '../utils.mjs';

const handler = middy(async (event) => {
    const userId = getUserId(event);
    const todos = await getTodo(userId);

    return {
        statusCode: 200,
        body: JSON.stringify({ items: todos })
    };
});

handler
    .use(httpErrorHandler())
    .use(
        cors({
            credentials: true
        })
    );

module.exports = {
    handler
};
