import { useState, useEffect } from 'react';
import { createPost, getFeed, searchUsers, followUser } from './api';

function Dashboard({ user, onLogout }) {
    const [feed, setFeed] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = async () => {
        try {
            const response = await getFeed(user.id);
            setFeed(response.data);
        } catch (error) {
            console.error("Error loading feed:", error);
        }
    };

    const handlePost = async () => {
        if (!postContent) return;
        try {
            await createPost(user.id, postContent);
            setPostContent('');
            alert("הפוסט פורסם!");
            loadFeed();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("שגיאה בפרסום הפוסט");
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) return;
        try {
            const response = await searchUsers(searchQuery);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const handleFollow = async (targetUserId) => {
        try {
            await followUser(user.id, targetUserId);
            alert("התחלת לעקוב בהצלחה!");
            loadFeed();
        } catch (error) {
            console.error("Error following user:", error);
            alert("שגיאה בביצוע מעקב");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>שלום, {user.username}! 👋</h1>
                <button onClick={onLogout} style={{ backgroundColor: '#ff4444', color: 'white' }}>התנתק</button>
            </div>

            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>מה חדש?</h3>
                <textarea
                    style={{ width: '100%', height: '80px', marginBottom: '10px' }}
                    placeholder="כתוב משהו..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
                <button onClick={handlePost}>פרסם פוסט</button>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 2 }}>
                    <h3>הפיד שלך</h3>
                    {feed.length === 0 ? <p>אין פוסטים עדיין.</p> : null}
                    {feed.map(post => (
                        <div key={post.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
                            <strong>{post.author.username}</strong> כתב/ה:
                            <p>{post.content}</p>
                            <small style={{ color: 'gray' }}>{new Date(post.createdAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>

                <div style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '20px' }}>
                    <h3>חפש חברים</h3>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="שם משתמש..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>🔍</button>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {searchResults.map(resultUser => (
                            <li key={resultUser.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span>{resultUser.username}</span>
                                {resultUser.id !== user.id && (
                                    <button onClick={() => handleFollow(resultUser.id)}>עקוב</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;