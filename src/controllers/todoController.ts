import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({
      title,
      completed: false,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
