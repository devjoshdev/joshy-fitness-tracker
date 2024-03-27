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
    const session = await getServerSession();
    if (!session) {
        return null;
    }
    
    try {
        const [res] = await pool.query("INSERT INTO joshy_fitness_tracker_user (email, date_registered) VALUES (?, ?)", [email, getCurrentDate()]);
        if (res.affectedRows !== 1) {
            return null;
        }
        const [rows, fields] = await pool.query("SELECT * FROM joshy_fitness_tracker_user WHERE email = ?", [email]);
        if (rows.length > 0) {
            
            return rows[0];
        } else {
            
            return null;
        }
    }
    catch (err) {
        
        return null;
    }
}

async function findUser(email) {
    const session = await getServerSession();
    
    if (!session) {
        return null;
    }
    try {
        const [rows, fields] = await pool.query("SELECT * FROM joshy_fitness_tracker_user WHERE email = ?", [email]);
        if (rows.length > 0) {
            
            return rows[0];
        } else {
            
            return null;
        }
    } catch (error) {
        
        return null;
    }
}

async function updateWeight(id, newWeight) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET weight = ? WHERE id = ?", [newWeight, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }

}

async function updateGoalWeight(id, newWeight) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET goal_weight = ? WHERE id = ?", [newWeight, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }

}

async function updateHeight(id, newHeight) {
        const session = await getServerSession();
        if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET height = ? WHERE id = ?", [newHeight, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
    
}

async function updateDOB(id, newDOB) {
        const session = await getServerSession();
        if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET dob = ? WHERE id = ?", [newDOB, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
    
}

async function updateGender(id, newGender) {
        const session = await getServerSession();
        if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET gender = ? WHERE id = ?", [newGender, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
    
}

async function updateActivityLevel(id, newActivityLevel) {
        const session = await getServerSession();
        if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET activity_level = ? WHERE id = ?", [newActivityLevel, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
        

    }
    catch (err) {
        return false;
    }
    
    
}

async function updateRate(id, newRate) {
        const session = await getServerSession();
        if (!session) {
        return false;
    }
    try {
        const [res] = await pool.query("UPDATE joshy_fitness_tracker_user SET rate = ? WHERE id = ?", [newRate, id]);
        revalidatePath("/info-goals");
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
    
}

export { initializeUser, findUser, updateWeight, updateHeight, updateDOB, updateGender, updateActivityLevel, updateRate, updateGoalWeight };