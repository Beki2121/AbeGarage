const conn = require("../config/db.config");

async function createSpace(data) {
  const { space_name, space_status = 'available', space_notes = '' } = data;
  const query = `INSERT INTO maintenance_space (space_name, space_status, space_notes) VALUES (?, ?, ?)`;
  const result = await conn.query(query, [space_name, space_status, space_notes]);
  return { space_id: result.insertId, space_name, space_status, space_notes };
}

async function getAllSpaces() {
  const query = `SELECT * FROM maintenance_space`;
  return await conn.query(query);
}

async function getSpaceById(id) {
  const query = `SELECT * FROM maintenance_space WHERE space_id = ?`;
  const [space] = await conn.query(query, [id]);
  return space;
}

async function updateSpace(id, data) {
  const { space_name, space_status, space_notes } = data;
  const query = `UPDATE maintenance_space SET space_name = ?, space_status = ?, space_notes = ? WHERE space_id = ?`;
  const result = await conn.query(query, [space_name, space_status, space_notes, id]);
  if (result.affectedRows === 0) return null;
  return { space_id: id, space_name, space_status, space_notes };
}

async function deleteSpace(id) {
  const query = `DELETE FROM maintenance_space WHERE space_id = ?`;
  const result = await conn.query(query, [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createSpace,
  getAllSpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
}; 