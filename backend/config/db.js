import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config({path: 'D:/Product Store - Web App/.env'});

const PGHOST = process.env.PGHOST ;
const PGDATABASE = process.env.PGDATABASE;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;    


export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)