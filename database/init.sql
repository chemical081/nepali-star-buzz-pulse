
-- Create tables for the nepali news website

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'editor',
  permissions JSONB DEFAULT '[]',
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_np VARCHAR(255),
  excerpt TEXT,
  excerpt_np TEXT,
  content JSONB DEFAULT '[]',
  content_np JSONB DEFAULT '[]',
  category VARCHAR(100),
  images JSONB DEFAULT '[]',
  author VARCHAR(100),
  is_pinned BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'draft',
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  published_at TIMESTAMP
);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL,
  url VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255),
  duration INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Create first admin user (password: admin123)
INSERT INTO admin_users (username, email, password_hash, role)
VALUES 
  ('admin', 'admin@example.com', '$2a$12$Q7PeK3Yw4xX3xV1doFbAXu7Og0mYoRP3/NNz.NfTt3kdsLGUN.8GK', 'super_admin')
ON CONFLICT DO NOTHING;
