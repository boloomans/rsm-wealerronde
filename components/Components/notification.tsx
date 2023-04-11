import React, {useEffect, useState} from "react";
import {FaBell} from "react-icons/fa";

const base64ToUint8Array = base64 => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
//
// function notificationPopup({...props}) {
//   return (
//     <div className={'absolute top-0 left-0'}>
//       <h1>Next.js + PWA = AWESOME!</h1>
//       <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
//         Subscribe
//       </button>
//       <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
//         Unsubscribe
//       </button>
//       <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
//         Send Notification
//       </button>
//     </div>
//   )
// }

export function NotificationBell({ }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  const openPopup = async event => {
    event.preventDefault()
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    // @ts-ignore
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [])

  const subscribeButtonOnClick = async event => {
    event.preventDefault()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    })
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log('web push subscribed!')
    console.log(sub)
  }

  const unsubscribeButtonOnClick = async event => {
    event.preventDefault()
    await subscription.unsubscribe()
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null)
    setIsSubscribed(false)
    console.log('web push unsubscribed!')
  }

  const sendNotificationButtonOnClick = async event => {
    event.preventDefault()
    if (subscription == null) {
      console.error('web push not subscribed')
      return
    }

    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      })
    })
  }

  return (
    <div className={'relative'}>
      <FaBell onClick={openPopup} className="cursor-pointer text-2xl text-primary-900"></FaBell>
      {isOpen && (
        <div className={'absolute top-full left-1/2 -translate-x-1/2 rounded bg-white-900 p-6 shadow-lg shadow-black-900/20'}>
          <button onClick={subscribeButtonOnClick} disabled={isSubscribed} className={"disabled:text-primary-10"}>
            Subscribe
          </button>
          <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed} className={"disabled:text-primary-10"}>
            Unsubscribe
          </button>
          <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed} className={"disabled:text-primary-10"}>
            Send Notification
          </button>
        </div>
      )}
    </div>
  );
}
