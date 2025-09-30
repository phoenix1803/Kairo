'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showPrompt, setShowPrompt] = useState(false)

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handler)

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            setDeferredPrompt(null)
            setShowPrompt(false)
        }
    }

    const handleDismiss = () => {
        setShowPrompt(false)
        // Hide for 24 hours
        localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
    }

    // Check if prompt was recently dismissed
    useEffect(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed')
        if (dismissed) {
            const dismissedTime = parseInt(dismissed)
            const now = Date.now()
            const hoursSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60)

            if (hoursSinceDismissed < 24) {
                setShowPrompt(false)
            }
        }
    }, [])

    if (!showPrompt || !deferredPrompt) return null

    return (
        <div className="pwa-install-prompt">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="font-semibold mb-1">Install Kairo App</h3>
                    <p className="text-sm opacity-90">
                        Get offline access and notifications for your timetable
                    </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                    <Button
                        size="sm"
                        onClick={handleInstall}
                        className="bg-white text-black hover:bg-gray-100"
                    >
                        <Download className="h-4 w-4 mr-1" />
                        Install
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleDismiss}
                        className="text-white hover:bg-white/20"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}