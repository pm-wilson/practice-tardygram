const pool = require('../utils/pool');

module.exports = class Postgram {
  postgramId;
  user;
  photoURL;
  caption;
  tags;

  constructor(row) {
    this.postgramId = row.postgram_id; 
    this.userId = row.user_id;
    this.photoURL = row.photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert(postgram) {
    const { rows } = await pool.query(
      'INSERT INTO postgrams (user_id, photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [postgram.userId, postgram.photoURL, postgram.caption, postgram.tags]
    );
    return new Postgram(rows[0]);
  }

  static async getAllPostgrams() {
    const { rows } = await pool.query(
      'SELECT * from postgrams'
    );
    if(!rows[0]) return null;
    return new Postgram(rows[0]);
  }

  static async getPostgramById(id) {
    const { rows } = await pool.query(
      'SELECT * from postgrams WHERE postgram_id=$1',
      [id]
    );
    if(!rows[0]) return null;
    return new Postgram(rows[0]);
  }
};
