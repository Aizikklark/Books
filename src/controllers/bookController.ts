import { Request, Response } from 'express';
import pool from '../db';
import { Book } from '../models/book';

export const getBooks = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM books');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения списка книг' });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка получения книги' });
    }
};

export const createBook = async (req: Request, res: Response) => {
    const { title, author, published_date, pages, language, publisher } = req.body as Book;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, published_date, pages, language, publisher) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, published_date, pages, language, publisher]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка создания книги' });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, author, published_date, pages, language, publisher } = req.body as Book;
    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, published_date = $3, pages = $4, language = $5, publisher = $6 WHERE id = $7 RETURNING *',
            [title, author, published_date, pages, language, publisher, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка обновления книги' });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        res.status(200).json({ message: 'Книга удалена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка удаления книги' });
    }
};
