import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard'; // הייבוא של הדשבורד החדש

function App() {
    const [page, setPage] = useState('login'); // מתחילים במסך התחברות
    const [user, setUser] = useState(null);    // כאן נשמור את פרטי המשתמש המחובר

    // פונקציה שמופעלת כשהמשתמש מצליח להתחבר
    const handleLoginSuccess = (userData) => {
        setUser(userData);      // שמירת פרטי המשתמש
        setPage('dashboard');   // מעבר למסך הדשבורד
    };

    // פונקציה להתנתקות
    const handleLogout = () => {
        setUser(null);          // מחיקת פרטי המשתמש
        setPage('login');       // חזרה למסך התחברות
    };

    return (
        <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>

            {/* מסך הרשמה */}
            {page === 'register' && (
                <Register onRegisterSuccess={() => setPage('login')} />
            )}

            {/* מסך התחברות */}
            {page === 'login' && (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onGoToRegister={() => setPage('register')}
                />
            )}

            {/* מסך דשבורד (מוצג רק אם יש משתמש מחובר) */}
            {page === 'dashboard' && user && (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                />
            )}

        </div>
    );
}

export default App;