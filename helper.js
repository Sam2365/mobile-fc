import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NFC_KEY = 'FlashcardNotification'

export function setLocalNotification() {
    AsyncStorage.getItem(NFC_KEY)
        .then(JSON.parse)
        .then(async (data) => {
            if (data === null) {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        { time: tomorrow, repeat: 'day'}
                    )
                    AsyncStorage.setItem(NFC_KEY, JSON.stringify(true))
                }
            }
        })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NFC_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Quiz Reminder Alert!',
        body: "Hey, your streak is about to break. Do not forget to attempt the quiz today...",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            sticky: false,
            vibrate: true,
            priority: 'high'            
        }
    }
}

