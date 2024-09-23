import pool from '../../common/config/db';

export const getPersonas = async () => {
    const res = await pool.query('SELECT * FROM admin.persona');
    return res.rows;
};

export const getPersonaById = async (id: number) => {
    const res = await pool.query('SELECT * FROM admin.persona WHERE id = $1', [id]);
    return res.rows[0];
};

export const createPersona = async (nombre: string, edad: number) => {
    const res = await pool.query(
        'INSERT INTO admin.persona (nombre, edad) VALUES ($1, $2) RETURNING *',
        [nombre, edad]
    );
    return res.rows[0];
};

export const updatePersona = async (id: number, nombre: string, edad: number) => {
    const res = await pool.query(
        'UPDATE admin.persona SET nombre = $1, edad = $2 WHERE id = $3 RETURNING *',
        [nombre, edad, id]
    );
    return res.rows[0];
};

export const deletePersona = async (id: number) => {
    const res = await pool.query('DELETE FROM admin.persona WHERE id = $1 RETURNING *', [id]);
    return res.rows[0] ? true : false
};