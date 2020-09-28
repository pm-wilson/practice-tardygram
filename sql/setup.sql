DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS postgrams;
-- DROP TABLE IF EXISTS comments;

CREATE TABLE users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  profile_photo_url TEXT
);

-- CREATE TABLE postgrams (
--   postgram_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   user REFERENCES users (user_id),
--   photo_url TEXT,
--   caption TEXT,
--   tags JSONB[]
-- )

-- CREATE TABLE comments (
--   comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   comment_by REFERENCES users (user_id),
--   post REFERENCES postgrams (postgram_id),
--   comment TEXT
-- )