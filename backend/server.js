import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import env from 'dotenv';
import {sql} from './config/db.js';

import productRoutes from './routes/productRoutes.js';
env.config({path: '../.env'});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use("/api/products",productRoutes);

async function initDB(){
    try {
        await sql`CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            image VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    }
    catch (err) {
        console.error("Database connection error:",err);
    }
}   

initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('Server running on port '+PORT);
    })
}).catch(err => console.error("DB init failed:", err));



// console.log("ENV:", process.env.PGHOST, process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD);

