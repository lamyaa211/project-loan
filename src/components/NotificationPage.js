import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../services/NotificationService';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (error) {
                console.error('Error loading notifications:', error);
            }
        };

        loadNotifications();
    }, []);

    return (
        <div>
            <h1>Listes des notifications</h1>
            <ul>
                {notifications.map((notif) => (
                    <li key={notif.id}>
                        <p><strong>Message:</strong> {notif.message}</p>
                        <p><strong>Date & Heure:</strong> {new Date(notif.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;
