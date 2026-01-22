import { useState } from 'react';
import { loginUser } from './api';

function Login({ onLoginSuccess, onGoToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            // אם הצלחנו, השרת מחזיר את פרטי המשתמש
            console.log("Logged in user:", response.data);
            onLoginSuccess(response.data);
        } catch (err) {
            setError("שם משתמש או סיסמה שגויים");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h2>התחברות</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="שם משתמש"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="סיסמה"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">התחבר</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <p style={{ marginTop: '15px' }}>
                אין לך חשבון?
                <button onClick={onGoToRegister} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}>
                    הירשם כאן
                </button>
            </p>
        </div>
    );
}

export default Login;