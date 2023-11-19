import * as uuid from 'uuid'

import {
  getTodoAccess,
  createTodoAccess,
  updateTodoAccess,
  deleteTodoAccess,
  updateAttachmentAccess
} from '../dataLayer/todosAccess.mjs';
import { getSignedUrl } from '../helpers/attachmentUtils.mjs';

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
  const url = `https://${bucketName}.s3.amazonaws.com/${todoId}`;
  const attachmentUrl = getSignedUrl(todoId);

  await updateAttachmentAccess(todoId, userId, url);

  return attachmentUrl;
}

