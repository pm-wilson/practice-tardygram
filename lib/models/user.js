const pool = require('../utils/pool');

module.exports = class User {
  userId;
  email;
  passwordHash;
  profilePhotoUrl;

  constructor(row) {
    this.userId = row.user_id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [user.email, user.passwordHash]
    );
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    
    return {
      userId: this.userId,
      email: this.email,
      profilePhotoUrl: this.profilePhotoUrl,
    };
  }
};
