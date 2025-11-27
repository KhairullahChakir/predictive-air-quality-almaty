// firebase-messaging-sw.js - Service Worker for Background Push Notifications
// This file MUST be in the public folder

// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// TODO: Replace with your actual Firebase configuration (same as firebase-config.js)
firebase.initializeApp({
    apiKey: "AIzaSyC1XK43wQGorijOPhm_QRioFn27mfF-0fk",
    authDomain: "aqm-notifications.firebaseapp.com",
    projectId: "aqm-notifications",
    storageBucket: "aqm-notifications.firebasestorage.app",
    messagingSenderId: "550505067458",
    appId: "1:550505067458:web:7ca5d4f83765e2c4e9dc5b"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] Background message received:', payload);

    const notificationTitle = payload.notification?.title || 'Air Quality Alert';
    const notificationOptions = {
        body: payload.notification?.body || 'Check air quality levels',
        icon: '/Images/Logo-v2.svg',
        badge: '/Images/Logo-v2.svg',
        tag: 'air-quality-alert',
        requireInteraction: false,
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked');
    event.notification.close();

    // Open the app when notification is clicked
    event.waitUntil(
        clients.openWindow('/')
    );
});
