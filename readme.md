Проект: "Библиотека книг"
Описание проекта:
Проект представляет собой API для управления библиотекой книг. API поддерживает следующие функции:

Создание новой книги (POST /api/books).
Получение списка всех книг (GET /api/books).
Получение информации о конкретной книге по ID (GET /api/books/:id).
Обновление информации о книге (PUT /api/books/:id).
Удаление книги (DELETE /api/books/:id).

Каждая книга будет иметь следующие свойства:

id (уникальный идентификатор, генерируется автоматически)
title (название книги)
author (автор книги)
published_date (дата публикации)
pages (количество страниц)
language (язык книги)
publisher (издатель)
Шаги по созданию проекта:
Настройка окружения:

Создание проекта происходило:
- Создали новую папку для проекта "Books"
- Инициализировали проект командой npm init -y.
- установили необходимые зависимости:

npm install express pg
npm install --save-dev typescript @types/express ts-node nodemon @types/node

- инициализировали TypeScript:

npx tsc --init

!!!Подключите базу данных!!!

Настройка базы данных:

Создайте базу данных PostgreSQL для проекта.
Создайте таблицу books с соответствующими столбцами:

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_date DATE,
    pages INTEGER,
    language VARCHAR(50),
    publisher VARCHAR(100)
);


Не забудьте создать .env файл со следующей структурой:

# Настройки базы данных PostgreSQL
DB_USER=postgres
DB_PASSWORD=1234  # database password
DB_HOST=localhost
DB_PORT=5432  # database port
DB_NAME=postgres  # database name

# Порт, на котором будет запущен сервер
PORT=3000



Структура проекта:
Books/
├── src/
│   ├── controllers/
│   │   └── bookController.ts
│   ├── models/
│   │   └── book.ts
│   ├── routes/
│   │   └── bookRoutes.ts
│   ├── app.ts
│   └── db.ts
├── package.json
├── tsconfig.json
└── README.md

Запуск проекта:
npm run dev


