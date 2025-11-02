import express from 'express';
import Constants from './constant.js';
import { connectDB } from './db/database.js';
import cors from 'cors';
import todoRoutes from './routes/todo.routes.js'

const app = express();
app.use(express.json())
app.use(cors())
connectDB(Constants.DB_URI);

app.use('/todos', todoRoutes);

const PORT = Constants.PORT;
app.listen(PORT, () => {
    console.log(`Server is Listen on ${PORT}`)
})