import { pool } from '../utils/connectToDb';
import { CreateUserInput} from '../schemas/userSchema';
import argon2 from "argon2";
import { omit } from 'lodash';
import { v4 as uuidv4 } from "uuid";

export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

let id = 1;

// Function to hash the password using argon2
async function hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  // Function to compare the provided password with the hashed password
export async function comparePasswords(hashedPassword: string, candidatePassword: string): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, candidatePassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  }

  // Function to create a new user
export async function createUser(input: CreateUserInput): Promise<User | null> {
    try {
      // Destructure the nested 'body' object to get individual properties
      const { firstName, lastName, email, phone, password, passwordConfirmation} = input.body;
  
      // Check if the password and password confirmation match
      if (password !== passwordConfirmation) {
        throw new Error("Passwords do not match");
      }
  
      // Hash the password using argon2
      const hashedPassword = await hashPassword(password);

      const insertUserQuery = `
        INSERT INTO Users (firstName, lastName, email, phone, password)
        VALUES (?, ?, ?, ?, ?)
      `;
  
      const userValues = [firstName, lastName, email, phone, hashedPassword];
  
      await pool.query(insertUserQuery, userValues);

      const [result] = await pool.query('SELECT LAST_INSERT_ID() as userID');

      const lastInsertId = (result as any)[0].userID;
      
      const createdUser = await getUserById(lastInsertId);

      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  // Function to get a user by email
export async function getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM Users WHERE email = ?';
      const values = [email];
      const [rows] = await pool.query(query, values);
  
      // Check if a user with the given email exists
      if ((rows as any).length === 0) {
        return null;
      }
  
      // Return the user object
      return (rows as any)[0] as User;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  // Function to get a user by ID
export async function getUserById(id: number): Promise<User| null> {
    try {
      const query = `
        SELECT *
        FROM Users
        WHERE userID = ?
      `;
      const values = [id];
      const [rows] = await pool.query(query, values);
  
      if ((rows as any).length === 0) {
        return null;
      }
  
      const user = (rows as any)[0] as User;
  
      return user;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return null;
    }
  }