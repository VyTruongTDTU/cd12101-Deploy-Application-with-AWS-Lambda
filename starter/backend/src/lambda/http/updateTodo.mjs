
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateTodo } from '../../bussinessLayer/todos.mjs';
import { getUserId } from '../utils.mjs';

const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event);
    const updateTodoData = JSON.parse(event.body);

    await updateTodo(todoId, userId, updateTodoData);

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
