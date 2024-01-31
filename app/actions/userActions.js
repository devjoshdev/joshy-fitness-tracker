"use server";
import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}).promise();

function getCurrentDate() {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${year}-${month}-${day}`;
}

async function initializeUser(email) {
    console.log("init user email is", email);
    try {
        const [res] = await pool.query("INSERT INTO joshy_fitness_tracker_user (email, date_registered) VALUES (?, ?)", [email, getCurrentDate()]);
        console.log(res.affectedRows === 1 ? "User successfully registered" : "User registration failed");
        return res.affectedRows === 1;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

async function findUser(email) {
    console.log("find user email is", email);
    try {
        const [rows, fields] = await pool.query("SELECT * FROM joshy_fitness_tracker_user WHERE email = ?", [email]);
        if (rows.length > 0) {
            console.log('User found:', rows[0]);
            return rows[0];
        } else {
            console.log('No user found with the given email.');
            return null;
        }
    } catch (error) {
        console.log('Error occurred during user search:', error);
        return null;
    }
}

export { initializeUser, findUser };