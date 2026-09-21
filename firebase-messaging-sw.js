importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCHXUL5qlZZ_me6S8oGzMMHqcBs0cV43eY",
    authDomain: "bbapp-6b10e.firebaseapp.com",
    projectId: "bbapp-6b10e",
    storageBucket: "bbapp-6b10e.firebasestorage.app",
    messagingSenderId: "431787724186",
    appId: "1:431787724186:web:450f61927ae01bfc8f7e23"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'BBapp';
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
