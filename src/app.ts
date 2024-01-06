import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import log from "./utils/logger";
import {connect, connection, pool} from "./utils/connectToDb";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import eventRouter from './routes/eventRoutes';
import profileRouter from './routes/profileRoutes';
import homeRouter from './routes/homeRouter'
import deserializeUser from "./middlewares/deserializeUser";
import requireUser from './middlewares/requireUser';
import fs from 'fs/promises';
import path from 'path';
import e from "express";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);

app.use(userRouter);
app.use(authRouter);
app.use(profileRouter);
app.use(homeRouter);
app.use(eventRouter);
app.use(deserializeUser);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/images', express.static('../images'));


const port = config.get<number>("port");

async function createTables() {
    try { 
        log.info('Before querying the database');

        const sqlPath = path.join(__dirname, '../sql/createTables.sql');
        const sqlFileContent = await fs.readFile(sqlPath, 'utf-8');
        const sqlStatements = sqlFileContent.split(';');
        
        // Assuming pool.query is a valid function call here
        for (const statement of sqlStatements) {
            if (statement.trim()) {
                await pool.query(statement);
            }
        }
        log.info('After querying the database');
        log.info('Tables created successfully');
    } catch (error) {
        log.error('Error creating tables:', error);
        console.log(error);
        process.exit(1);
    }
}
async function insertData() {
    try {
        log.info('Inserting initial data into the database');

        const sqlPath = path.join(__dirname, '../sql/insert.sql');
        const sqlFileContent = await fs.readFile(sqlPath, 'utf-8');
        const sqlStatements = sqlFileContent.split(';');

        for (const statement of sqlStatements) {
            if (statement.trim()) {
                await pool.query(statement);
            }
        }

        log.info('Initial data inserted successfully');
    } catch (error) {
        log.error('Error inserting data:', error);
        console.error(error);
        process.exit(1);
    }
}
async function dropTables() {
    try {
        log.info('Dropping existing tables');

        const sqlPath = path.join(__dirname, '../sql/dropTables.sql');
        const sqlFileContent = await fs.readFile(sqlPath, 'utf-8');
        const sqlStatements = sqlFileContent.split(';');

        for (const statement of sqlStatements) {
            if (statement.trim()) {
                await pool.query(statement);
            }
        }

        log.info('Tables dropped successfully');
    } catch (error) {
        log.error('Error dropping tables:', error);
        console.error(error);
        process.exit(1);
    }
}

app.listen(port, async () => {
    log.info(`App started at http://localhost:${port}`);

    await connect();
    await dropTables(); 
    await createTables();
    await insertData();
})




