import '../styles/globals.css'
import React from 'react'
import '../sentry.client'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'
import { ToastProvider } from '../context/ToastContext'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import MobileBottomNav from '../components/Layout/MobileBottomNav'
import { LoyaltyProvider } from '../components/UI/LoyaltySystem'
import { NotificationSystem } from '../components/UI/NotificationSystem'
import WhatsAppButton from '../components/UI/WhatsAppButton'
import LiveChat from '../components/UI/LiveChat'
import PushNotifications from '../components/UI/PushNotifications'
import PWABanner from '../components/UI/PWABanner'

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <LoyaltyProvider>
              <NotificationSystem />
              <div className="min-h-[100vh] mobile-only pb-20">
                <Component {...pageProps} />
              </div>
              <MobileBottomNav />
              <WhatsAppButton />
              <LiveChat />
              <PushNotifications />
              <PWABanner />
            </LoyaltyProvider>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}
