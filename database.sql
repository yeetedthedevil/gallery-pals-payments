-- Create the database
CREATE DATABASE IF NOT EXISTS gallery_db;
USE gallery_db;

-- Create galleries table
CREATE TABLE IF NOT EXISTS galleries (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create images table
CREATE TABLE IF NOT EXISTS images (
    id VARCHAR(36) PRIMARY KEY,
    gallery_id VARCHAR(36) NOT NULL,
    url VARCHAR(1024) NOT NULL,
    watermarked_url VARCHAR(1024) NOT NULL,
    original_url VARCHAR(1024) NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
    id VARCHAR(36) PRIMARY KEY,
    gallery_id VARCHAR(36) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    download_link VARCHAR(1024) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gallery_id) REFERENCES galleries(id)
);

-- Create terms_acceptance table
CREATE TABLE IF NOT EXISTS terms_acceptance (
    id VARCHAR(36) PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_gallery_password ON galleries(password);
CREATE INDEX idx_images_gallery ON images(gallery_id);
CREATE INDEX idx_downloads_gallery ON downloads(gallery_id);
CREATE INDEX idx_terms_ip ON terms_acceptance(ip_address);