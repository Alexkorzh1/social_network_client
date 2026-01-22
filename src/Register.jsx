import { useState } from 'react';
import { registerUser } from './api';

function Register({ onRegisterSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(username, password, profilePic);
            alert("נרשמת בהצלחה!");
            onRegisterSuccess();
        } catch (err) {
            console.error(err);
            // הודעה פשוטה וידידותית למשתמש
            setError("שגיאה בהרשמה: אולי שם המשתמש תפוס?");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>הרשמה לרשת החברתית</h2>
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
                <input
                    type="text"
                    placeholder="קישור לתמונת פרופיל (אופציונלי)"
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                />
                <button type="submit">הירשם</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Register;