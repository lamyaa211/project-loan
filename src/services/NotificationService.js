import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084/api/notifications';

// Envoie une notification
export const sendNotification = async (message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send`, { message });
        return response.data;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

// Récupère toutes les notifications
export const fetchNotifications = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

// Récupère le nombre total de notifications
export const getNotificationCount = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/count`);
        return response.data.count;
    } catch (error) {
        console.error('Error fetching notification count:', error);
        throw error;
    }
};

export const onNotificationReceived = (callback) => {
    const eventSource = new EventSource(`${API_BASE_URL}/stream`);

    eventSource.onmessage = (event) => {
        callback();
    };

    return () => {
        eventSource.close();
    };
};
