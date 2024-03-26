import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs } from 'firebase/firestore';
import { database } from './firebaseConfig';

function Notification() {
    const [users, setNotifications] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [remindersOver, setOverReminders] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        checkReminders();
    }, [users]);

    const fetchNotifications = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, 'users'));
            const notificationsData = querySnapshot.docs.map(doc => doc.data());
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const checkReminders = () => {
        const currentDate = new Date();
        const remindersArray = [];
        const remindersoverArray = [];
    
        users.forEach(user => {
            const createdAtTimestamp = user.created_at;
            if (createdAtTimestamp instanceof Date) {
                // Skip if already a Date object
                return;
            }
            if (!createdAtTimestamp || !createdAtTimestamp.toDate) {
                console.error("Invalid created_at timestamp:", createdAtTimestamp);
                return;
            }
            const createdAtDate = createdAtTimestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
            const timeDiff = currentDate.getTime() - createdAtDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
            if (daysDiff >= 25 && daysDiff < 30) {
                remindersArray.push({
                    inv_id: user.inv_id,
                    daysRemaining: 30 - daysDiff
                });
            } else if (daysDiff >= 30) {
                remindersoverArray.push({
                    inv_id: user.inv_id,
                });
            }
        });
    
        setReminders(remindersArray);
        setOverReminders(remindersoverArray);
    };
    

    return (
        <div className="notifications">
            <h5>Please Release Check</h5>
            <div id='notiscrol'>
                {remindersOver.map((reminder, index) => (
                    <p id='remindcolory' key={index}>Invoice {reminder.inv_id} needs attention. Over.</p>
                ))}
                {reminders.map((reminder, index) => (
                    <p id='remindcolorx' key={index}>Invoice {reminder.inv_id} needs attention. {reminder.daysRemaining} days remaining.</p>
                ))}
            </div>
        </div>
    );
}

export default Notification;
