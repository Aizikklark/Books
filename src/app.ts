import express from 'express';
import bookRoutes from './routes/bookRoutes';
import dotenv from 'dotenv';

// Загрузка переменных из .env файла в process.env
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
