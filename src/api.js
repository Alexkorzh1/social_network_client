import axios from 'axios';

// כתובת השרת
const BASE_URL = 'http://localhost:8080/api';

// יצירת חיבור בסיסי
const api = axios.create({
    baseURL: BASE_URL
});

// פונקציות לתקשורת עם השרת
export const registerUser = (username, password, profilePicture) => {
    return api.post('/register', { username, password, profilePicture });
};

export const loginUser = (username, password) => {
    return api.post('/login', { username, password });
};

export const createPost = (userId, content) => {
    return api.post('/posts/create', {
        author: { id: userId }, // שים לב למבנה שהשרת מצפה לו
        content
    });
};

export const getFeed = (userId) => {
    return api.get(`/feed/${userId}`);
};

export const searchUsers = (query) => {
    return api.get(`/search?query=${query}`);
};

export const followUser = (currentUserId, targetUserId) => {
    return api.post(`/follow/${targetUserId}?currentUserId=${currentUserId}`);
};

export default api;