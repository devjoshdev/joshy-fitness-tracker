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

async function createWorkout(workoutName, date, userId, type, data, page) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    switch (type) {
        case "duration":
            const insertWorkoutDurationQuery = "INSERT INTO joshy_fitness_tracker_workout (date, user_id, name, workout_type) VALUES (?, ?, ?, ?)";
            const [insertWorkoutDurationQueryRes] = await pool.query(insertWorkoutDurationQuery, [date, userId, workoutName, type]);
            if (insertWorkoutDurationQueryRes.affectedRows !== 1) return false;
            const insertedWorkoutDurationId = insertWorkoutDurationQueryRes.insertId;
            const durationCreated = await createDuration(insertedWorkoutDurationId, data);
            if (durationCreated) {
                revalidatePath(page);
                return true;
            }
            else {
                const rolledBack = await deleteWorkout(insertedWorkoutId, page);
                return false;
            }
            break; // this is dead asf
        case "set_and_reps":
            const insertWorkoutSetRepQuery = "INSERT INTO joshy_fitness_tracker_workout (date, user_id, name, workout_type) VALUES (?, ?, ?, ?)";
            const [insertWorkoutSetRepQueryRes] = await pool.query(insertWorkoutSetRepQuery, [date, userId, workoutName, type]);
            if (insertWorkoutSetRepQueryRes.affectedRows !== 1) return false;
            const insertedWorkoutSetRepId = insertWorkoutSetRepQueryRes.insertId;
            const setsAndRepsCreated = await createSetsAndReps(insertedWorkoutSetRepId, data);
            if (setsAndRepsCreated) {
                revalidatePath(page);
                return true;
            }
            else {
                const rolledBackSetsAndReps = await deleteWorkout(insertedWorkoutSetRepId, page);
                return false;
            }
            break;
        default:
            return false;
    }

}

async function createDuration(workoutId, data) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    const duration = data[0];
    const insertQuery = "INSERT INTO joshy_fitness_tracker_duration (workout_id, duration) VALUES (?, ?)";
    try {
        const [res] = await pool.query(insertQuery, [workoutId, duration]);
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }

}

async function createSetsAndReps(workoutId, data) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    data.forEach(async (val, idx) => {
        const insertIntoSetsRepsQuery = "INSERT INTO joshy_fitness_tracker_rep (workout_id, num_reps, set_number) VALUES (?, ?, ?)";
        try {
            const [res] = await pool.query(insertIntoSetsRepsQuery, [workoutId, val, idx]);
            if (res.affectedRows !== 1) return false;
        }
        catch (err) {
            return false;
        }

    });
    return true;
}

async function deleteWorkout(id, page) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    const deleteQuery = "DELETE FROM joshy_fitness_tracker_workout WHERE id = ?";
    try {
        const [res] = await pool.query(deleteQuery, [id]);
        revalidatePath(page);
        return res.affectedRows === 1;
    }
    catch (err) {
        return false;
    }
}

async function updateDurationWorkout(id, name, duration, page) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    const updateWorkoutNameQuery = "UPDATE joshy_fitness_tracker_workout SET name = ? WHERE id = ?";
    try {
        const [res] = pool.query(updateWorkoutNameQuery, [name, id]);
        if (res.affectedRows !== 1) {
            return false;
        }
        const updatedDuration = await innerUpdateDuration(id, duration);
        if (updatedDuration) {
            revalidatePath(page);
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

async function innerUpdateDuration(id, duration) {
    const session = await getServerSession();
    if (!session) {
        return false;
    }
    const updateDurationQuery = "UPDATE joshy_fitness_tracker_duration SET duration = ? WHERE workout_id = ?";
    const [res] = await pool.query(updateDurationQuery, [id, duration]);
    return res.affectedRows === 1;
}
/*
                        ------------------TODO------------------
                        1. create just an update for an individual row in the reps table
                        2. refactor updatedurationworkout functions to emulate this new logic 
                            2a. Name of workout update should be one function
                            2b. One row within workout update should be one function
*/