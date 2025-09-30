'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TimetableView } from '@/components/timetable/TimetableView'
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt'
import { Calendar, Search, Download, Bell } from 'lucide-react'
import Link from 'next/link'

export default function StudentPortal() {
    const [enrollmentNumber, setEnrollmentNumber] = useState('')
    const [timetableData, setTimetableData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState<'week' | 'day'>('week')

    const handleSearch = async () => {
        if (!enrollmentNumber.trim()) return

        setLoading(true)
        try {
            // Mock API call - replace with actual API
            const response = await fetch(`/api/v1/students/${enrollmentNumber}/timetable`)
            const data = await response.json()
            setTimetableData(data)
        } catch (error) {
            console.error('Failed to fetch timetable:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Calendar className="h-6 w-6 text-black" />
                            <span className="text-xl font-bold text-black">Kairo</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {!timetableData ? (
                    /* Search Interface */
                    <div className="max-w-md mx-auto">
                        <Card className="border-gray-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-black">Student Timetable</CardTitle>
                                <CardDescription>
                                    Enter your enrollment number to view your schedule
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="enrollment" className="text-sm font-medium text-black">
                                        Enrollment Number
                                    </label>
                                    <Input
                                        id="enrollment"
                                        placeholder="e.g., 2023001"
                                        value={enrollmentNumber}
                                        onChange={(e) => setEnrollmentNumber(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="border-gray-300"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={loading || !enrollmentNumber.trim()}
                                    className="w-full bg-black text-white hover:bg-gray-800"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Searching...
                                        </div>
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4 mr-2" />
                                            View Timetable
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-semibold text-black text-center">Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Calendar className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Week & Day Views</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Download className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">PDF Export</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Bell className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Notifications</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <div className="h-6 w-6 bg-black rounded mx-auto mb-2"></div>
                                        <p className="text-sm text-gray-600">Offline Access</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Timetable Display */
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-black">Your Timetable</h1>
                                <p className="text-gray-600">Enrollment: {enrollmentNumber}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant={viewMode === 'week' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('week')}
                                    className={viewMode === 'week' ? 'bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'}
                                >
                                    Week
                                </Button>
                                <Button
                                    variant={viewMode === 'day' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('day')}
                                    className={viewMode === 'day' ? 'bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'}
                                >
                                    Day
                                </Button>
                            </div>
                        </div>

                        <TimetableView data={timetableData} viewMode={viewMode} />

                        <div className="mt-6 flex justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setTimetableData(null)}
                                className="border-black text-black hover:bg-black hover:text-white"
                            >
                                Search Another
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <PWAInstallPrompt />
        </div>
    )
}