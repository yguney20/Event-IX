import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import log from "./utils/logger";
import {connect, connection, pool} from "./utils/connectToDb";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import deserializeUser from "./middlewares/deserializeUser";
import fs from 'fs/promises';
import path from 'path';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);

app.use(userRouter);
app.use(authRouter);

const port = config.get<number>("port");

async function createTables() {
    try{ 
        log.info('Before querying the database');

        const sqlPath = path.join(__dirname, '../sql/createTables.sql');
        const sql = await fs.readFile(sqlPath, 'utf-8');
        log.info('middle querying the database');

        await pool.query(sql);
        log.info('After querying the database');
        log.info('Tables created successfully');
    } catch (error) {
        log.error('Error creating tables:', error);
        process.exit(1);
      }
}

app.listen(port, async () => {
    log.info(`App started at http://localhost:${port}`);

    await connect();
    //await createTables();
})