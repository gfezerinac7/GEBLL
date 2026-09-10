importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyB0_ROV4sjigkHj5yachpCuuAmoUtfsJoA",
    authDomain: "task-manager-5f5b3.firebaseapp.com",
    projectId: "task-manager-5f5b3",
    storageBucket: "task-manager-5f5b3.firebasestorage.app",
    messagingSenderId: "912477224199",
    appId: "1:912477224199:web:ca3071efacbb5994ff19a2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'GEBLL';
    const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.message) || '';
    const badgeCount = parseInt((payload.data && payload.data.badge) || '0', 10);

    if (badgeCount > 0 && 'setAppBadge' in navigator) {
        navigator.setAppBadge(badgeCount).catch(() => {});
    }

    self.registration.showNotification(title, {
        body,
        icon: './icon-192.png',
        badge: './icon-192.png'
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if ('clearAppBadge' in navigator) {
        navigator.clearAppBadge().catch(() => {});
    }
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('./');
        })
    );
});
