const express = require('express');
require('dotenv').config();
const todos_router = express.Router();
const {
    deleteTodo,
    addTodo,
    getTodoByData,
    getTodos,
    updateTodo,
    updateTodoStatus,
    getTodoByDateAndStatus
} = require('../database/todoQuery');

todos_router.get('/', async (req, res) => {
    try {
        const todos = await getTodos();
        return res.status(200).json({
            status: 'success',
            data: todos,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.get('/Status/:status/Date/:date', async (req, res) => {
    const status = req.params.status;
    const date = req.params.date;

    try {
        const todo = await getTodoByDateAndStatus(date,status);
        return res.status(200).json({
            status: 'success',
            data: todo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.get('/byDate/:date', async (req, res) => {
    const date = req.params.date;
    try {
        const todo = await getTodoByData('due_date',date);
        return res.status(200).json({
            status: 'success',
            data: todo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.get('/byStatus/:status', async (req, res) => {
    const status = req.params.status;
    try {
        const todo = await getTodoByData('status',status);
        return res.status(200).json({
            status: 'success',
            data: todo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.post('/', async (req, res) => {
    const { task_name, description, due_date } = req.body;
    try {
        const todo = await addTodo({ task_name, description, due_date });
        return res.status(200).json({
            status: 'success',
            data: todo,
            message: 'Add todo sucessful',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const todo = await deleteTodo(id);
        return res.status(200).json({
            status: 'success',
            data: todo,
            message: 'Todo deleted successfully!',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});
todos_router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { task_name, description, due_date } = req.body;
    try {
        const todo = await updateTodo(id, { task_name, description, due_date });
        return res.status(200).json({
            status: 'success',
            data: todo,
            message: 'Todo updated sucessfully!',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving todos',
        });
    }
});

todos_router.put("/:id/status", async(req, res) =>{
    const id = parseInt(req.params.id);
    const { status } = req.body;
    try {
        const result = await updateTodoStatus(id, { status });
        return res.status(200).json({
            status: 'success',
            data: result,
            message: "Status updated succesfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error retrieving status',
        });
    }
})

module.exports = todos_router;
