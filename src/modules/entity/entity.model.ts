import pool from '../../common/config/db';

export interface Entity {
    id?: number,
    name: string,
    address: string,
    type: string,
    status: boolean,
    update_by: string,
    update_at: string,
    contact: JSON
}

export const getEntity = async () => {
    const res = await pool.query('SELECT * FROM admin.entity');
    return res.rows
}

export const getEntityById = async (id: number) => {
    const res = await pool.query('SELECT * FROM admin.entity WHERE id = $1', [id]);
    return res.rows[0]
}

export const createEntity = async (req: Entity) => {
    const res = await pool.query
        (`
        INSERT INTO admin.entity (name, address, type, contact, status, update_by, update_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
            , [req.name, req.address, req.type, req.contact, req.status, req.update_by, req.update_at]
        )
    return res.rows[0]
}

export const updateEntity = async (req: Entity) => {
    const res = await pool.query
        (`
        UPDATE admin.entity 
        SET name = $2, address = $3, type = $4, contact = $5, status = $6, update_by = $7, update_at = $8
        WHERE id = $1 RETURNING *`
            , [req.id, req.name, req.address, req.type, req.contact, req.status, req.update_by, req.update_at])
    return res.rows[0]
}

export const deleteEntity = async (id: number) => {
    const res = await pool.query('DELETE FROM admin.entity WHERE id = $1 RETURNING *', [id])
    return res.rows[0] ? true : false
}