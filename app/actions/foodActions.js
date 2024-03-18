"use server";
import mysql from "mysql2";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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

async function createFood(foodName, calories, date, userId, page) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    const insertQuery = "INSERT INTO joshy_fitness_tracker_food (name, calories, date, user_id) VALUES (?, ?, ?, ?)";
    try {
        const [res] = await pool.query(insertQuery, [foodName, calories, date, userId]);
        revalidatePath(page);
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
}

async function deleteFood(id, page) {
    const deleteQuery = "DELETE FROM joshy_fitness_tracker_food WHERE id = ?";
    try {
        const [res] = await pool.query(deleteQuery, [id]);
        revalidatePath(page);
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
}

async function updateFood(id, foodName, calories, page) {
    const updateQuery = "UPDATE joshy_fitness_tracker_food SET name = ?, calories = ? WHERE id = ?";
    try {
        const [res] = await pool.query(updateQuery, [foodName, calories, id]);
        revalidatePath(page);
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
}

async function getFoodsForDay(day, page) {

}

export { createFood, deleteFood, updateFood, getFoodsForDay }