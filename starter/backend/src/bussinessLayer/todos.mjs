import * as uuid from 'uuid'

import {
  getTodoAccess,
  createTodoAccess,
  updateTodoAccess,
  deleteTodoAccess,
  updateAttachmentAccess
} from '../dataLayer/todosAccess.mjs';
import { getUploadUrl, getAttachmentUrl } from '../helpers/attachmentUtils.mjs'

import { createLogger } from '../utils/logger.mjs';
const logger = createLogger('todos');

const bucketName = process.env.ATTACHMENT_S3_BUCKET;

export async function getTodo(userId) {
  const todoList = await getTodoAccess(userId);
  if (todoList.length === 0) {
    return [];
  }
  return await getTodoAccess(userId);
}

export async function createTodo(userId, newTodo) {
  const createdAt = new Date().toISOString();
  const todoId = uuid.v4();

  const newItem = {
    userId,
    todoId,
    createdAt,
    ...newTodo,
    done: false
  };

  await createTodoAccess(newItem);

  return newItem;
}

export async function updateTodo(todoId, userId, updateTodoData) {
  return await updateTodoAccess(todoId, userId, updateTodoData);
}

export async function deleteTodo(todoId, userId) {
  return await deleteTodoAccess(todoId, userId);
}

export async function generateUploadUrl(todoId, userId) {
  logger.info(`Get uploadUrl for todoId ${todoId} of userId ${userId}`)
  const fileId = uuid.v4()
  const uploadUrl = await getUploadUrl(fileId)
  const attachmentUrl = getAttachmentUrl(fileId);

  logger.info(`updateAttachmentAccess ${attachmentUrl}`);
  await updateAttachmentAccess(todoId, userId, attachmentUrl);
  logger.info(`updateAttachmentAccess success`);

  return uploadUrl;
}

