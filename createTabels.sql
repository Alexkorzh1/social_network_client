-- 1. טבלת משתמשים
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE, --  בדיקה ששם המשתמש לא תפוס
                       password VARCHAR(255) NOT NULL,       --  שם משתמש וסיסמה
                       profile_picture VARCHAR(255)          -- [cite: 12] קישור לתמונה
);

-- 2. טבלת פוסטים
CREATE TABLE posts (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       content TEXT NOT NULL,                --  טקסטואלי בלבד
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. טבלת עוקבים (קשר Many-to-Many)
CREATE TABLE follows (
                         follower_id BIGINT NOT NULL,          -- מי שעוקב
                         followed_id BIGINT NOT NULL,          -- מי שנעקבים אחריו
                         PRIMARY KEY (follower_id, followed_id), -- מניעת כפילות (אי אפשר לעקוב פעמיים)
                         FOREIGN KEY (follower_id) REFERENCES users(id),
                         FOREIGN KEY (followed_id) REFERENCES users(id)
);