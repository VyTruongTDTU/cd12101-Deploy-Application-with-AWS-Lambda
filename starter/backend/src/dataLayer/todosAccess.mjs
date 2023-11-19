import { DynamoDB } from '@aws-sdk/client-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { createLogger } from '../utils/logger.mjs';

const documentClient = AWSXRay.captureAWSv3Client(new DynamoDB());
const docClient = DynamoDBDocument.from(documentClient);


const logger = createLogger('TodosAccess');
const todosTable = process.env.TODOS_TABLE;

export async function getTodoAccess(userId) {
    logger.info(`getTodoAccess start with userId ${userId}`);

    const params = {
        TableName: todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const newTodo = await docClient.query(params);

    return newTodo.Items;
}

export async function createTodoAccess(todo) {
    logger.info(`createTodoAccess start with todo ${JSON.stringify(todo)}`);

    const params = {
        TableName: todosTable,
        Item: todo
    };

    return await docClient.put(params);
}

export async function updateTodoAccess(todoId, userId, todoUpdate) {
    logger.info(`updateTodoAccess start with todoId ${todoId}, userId ${userId}`);

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId
        },
        UpdateExpression: "set #todoName = :todoName, dueDate = :dueDate, done = :done",
        ExpressionAttributeNames: { '#todoName': "name" },
        ExpressionAttributeValues: {
            ":todoName": todoUpdate.name,
            ":dueDate": todoUpdate.dueDate,
            ":done": todoUpdate.done
        },
        ReturnValues: "ALL_NEW"
    };

    return await docClient.update(params);
}

export async function deleteTodoAccess(todoId, userId) {
    logger.info(`deleteTodoAccess start with todoId ${todoId}, userId ${userId}`);

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId
        },
    };

    return await docClient.delete(params);
}

export async function updateAttachmentAccess(todoId, userId, attachmentUrl) {
    logger.info(`updateAttachmentAccess start with todoId ${todoId}, userId ${userId}, attachmentUrl ${attachmentUrl}`);

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId
        },
        UpdateExpression: "set attachmentUrl = :url",
        ExpressionAttributeValues: {
            ":url": attachmentUrl
        },
        ReturnValues: "ALL_NEW"
    };

    return await docClient.update(params);
}

