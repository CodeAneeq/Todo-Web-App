import { todoModel } from "../models/todo.model.js";

const addTodo = async (req, res) => {
    try {
        let { text } = req.body;

        if (!text) {
            return res.status(400).json({ status: "failed", message: "Text is required" });
        }
        const newTodo = await todoModel({
            text
        })
        await newTodo.save();
        res.status(201).json({ status: "success", message: "Todo added successfully", data: newTodo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
}

const getTodos = async (req, res) => {
    try {
        let todos = await todoModel.find();
        res.status(200).json({ status: "success", message: "Todos fetch successfully", data: todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
}

const delTodo = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(400).json({ status: "failed", message: "id is required" });
        }
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ status: "failed", message: "todo is not found" });
        }
        await todoModel.findByIdAndDelete(id);
        res.status(201).json({ status: "success", message: "todo deleted successfully", data: todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
}

const editTodo = async (req, res) => {
    try {
        let id = req.params.id;
        const { text } = req.body;
        if (!id) {
            return res.status(400).json({ status: "failed", message: "id is required" });
        }
        if (!text) {
            return res.status(400).json({ status: "failed", message: "text is required" });
        }
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ status: "failed", message: "todo is not found" });
        }
        await todoModel.findByIdAndUpdate(id, { text });
        res.status(201).json({ status: "success", message: "Todo edited successfully", data: todo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
}

const changeStatus = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            res.status(400).json({ status: "failed", message: "id is required" });
        }
        let { status } = req.body;
        if (!status) {
            res.status(400).json({ status: "failed", message: "status is required" });
        }
        const todo = await todoModel.findById(id);
        if (!todo) {
            res.status(404).json({ status: "failed", message: "todo not found" });
        }
        todo.status = status;
        await todo.save()
        res.status(201).json({ status: "success", message: "status change successfully", data: todo });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
}

const searchTodo = async (req, res) => {
    try {
        let { title } = req.query;
        if (!title) {
            const todos = await todoModel.find({});
            return res.status(200).json({ status: "success", message: "todos fetch successfully", data: todos });
        }
        const todos = await todoModel.find({
            text: { $regex: title, $options: "i" },
        });
        res.status(200).json({ status: "success", message: "search todo fetch successfully", data: todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "failed", message: "Internal Server Error"});
    }
}

export { addTodo, getTodos, delTodo, editTodo, changeStatus, searchTodo }