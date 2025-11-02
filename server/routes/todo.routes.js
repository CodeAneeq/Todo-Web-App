import express from 'express';
import { addTodo, changeStatus, delTodo, editTodo, getTodos, searchTodo } from '../controller/todos.controller.js';

const route = express.Router();

route.post('/add-todo', addTodo);
route.get('/get-todos', getTodos);
route.get('/search-todo', searchTodo);
route.delete('/del-todo/:id', delTodo);
route.post('/change-todo-status/:id', changeStatus);
route.patch('/edit-todo/:id', editTodo);

export default route