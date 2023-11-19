
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../bussinessLayer/todos.mjs';
import { getUserId } from '../utils.mjs';

const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);

    await deleteTodo(todoId, userId);

    return {
        statusCode: 200,
        body: ""
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
