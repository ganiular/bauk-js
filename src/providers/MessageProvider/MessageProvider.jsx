import { createContext, useState, useContext, useEffect, useRef } from 'react';
import './MessageProvider.scss';

// Create the MessageContext
export const MessageContext = createContext();

// Implement the Message provider component
export default function MessageProvider({ children }) {
    const [notification, setNotification] = useState({ text: '', type: '' });
    // Create a ref to store the timeout ID
    const timeoutRef = useRef();

    // Function to send a notification
    const sendMessage = (obj, isSuccess = true) => {
        const type = isSuccess ? 'success' : 'error';
        if (typeof (obj) === 'string') {
            setNotification({ text: obj, type });
        } else {
            let message = ''
            if (obj.response) {
                message = obj.response.data.message || obj.response.data.error || obj.response.data.errors[0].message
            } else if (obj.data) {
                message = obj.data.message || obj.data.error
            } else if (obj.message) {
                message = obj.message
            }
            setNotification({ text: message, type })
        }
    };

    useEffect(() => {
        if (notification.text) {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            // Set a new timeout to clear the notification after 5 seconds
            timeoutRef.current = setTimeout(() => {
                setNotification({ text: '', type: '' });
            }, 5000);
        }
        // Clear timeout when the component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [notification]);

    return (
        <MessageContext.Provider value={{ sendMessage }}>
            {children}
            {/* Display the notification if there's text */}
            {notification.text && (
                <div className={`message_box message_box--${notification.type}`}>
                    {notification.text}
                </div>
            )}
        </MessageContext.Provider>
    );
}

// Custom hook to use the MessageContext
export function useMessage() {
    return useContext(MessageContext);
}
