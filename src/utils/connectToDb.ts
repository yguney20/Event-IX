//import { Pool } from 'pg';
import config from 'config';
import log from "./logger"
import mysql, { Pool, PoolConnection } from 'mysql2/promise'; // Import the mysql2 library


const dbConfig = config.get<object>("dbConfig");
// const pool = new Pool(dbConfig);

// async function connect() {
//   try {

//     await pool.connect();
//     log.info("DB connected"); 

//     //await pool.end();
//     //log.info("DB connection closed");

//   } catch (err) {
//     log.error("Could not connect to db");
//     process.exit(1);
//   }
// }

// export {pool, connect};

var pool: Pool;
var connection: PoolConnection;

async function connect() {
    try {
      pool = mysql.createPool(dbConfig);
      connection = await pool.getConnection();
      log.info('DB connected');
    } catch (err) {
        log.error('Could not connect to db', err);
        process.exit(1);
    }
}

async function disconnect() {
    try {
        if (connection) {
          connection.release();
          log.info('DB connection closed');
        }
    } catch (err) {
        log.error('Error closing DB connection', err);
    }
}

export { connect, disconnect, pool, connection };
