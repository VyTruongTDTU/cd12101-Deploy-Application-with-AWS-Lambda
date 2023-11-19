
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs';
import { createTodo } from '../../bussinessLayer/todos.mjs';

const handler = middy(async (event) => {
    const newTodo = JSON.parse(event.body);
    const userId = getUserId(event);
    const newItem = await createTodo(userId, newTodo);

    return {
        statusCode: 200,
        body: JSON.stringify({
            item: newItem
        }),
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
