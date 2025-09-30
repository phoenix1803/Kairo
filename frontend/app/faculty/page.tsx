'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Calendar, Search, Clock, Users, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function FacultyPortal() {
    const [facultyCode, setFacultyCode] = useState('')
    const [facultyData, setFacultyData] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        if (!facultyCode.trim()) return

        setLoading(true)
        try {
            // Mock API call - replace with actual API
            const response = await fetch(`/api/v1/faculty/${facultyCode}/schedule`)
            const data = await response.json()
            setFacultyData(data)
        } catch (error) {
            console.error('Failed to fetch faculty schedule:', error)
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
                            <span className="text-xl font-bold text-black">Kairo Faculty</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Clock className="h-4 w-4 mr-2" />
                                Leave Request
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {!facultyData ? (
                    /* Search Interface */
                    <div className="max-w-md mx-auto">
                        <Card className="border-gray-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-black">Faculty Portal</CardTitle>
                                <CardDescription>
                                    Enter your faculty code to view your schedule and workload
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="faculty-code" className="text-sm font-medium text-black">
                                        Faculty Code
                                    </label>
                                    <Input
                                        id="faculty-code"
                                        placeholder="e.g., FAC001"
                                        value={facultyCode}
                                        onChange={(e) => setFacultyCode(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="border-gray-300"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={loading || !facultyCode.trim()}
                                    className="w-full bg-black text-white hover:bg-gray-800"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Loading...
                                        </div>
                                    ) : (
                                        <>
                                            <Search className="h-4 w-4 mr-2" />
                                            View Schedule
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-semibold text-black text-center">Faculty Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Calendar className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Personal Schedule</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Clock className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Workload Summary</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <Users className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Substitute Finder</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200">
                                    <CardContent className="p-4 text-center">
                                        <AlertCircle className="h-6 w-6 text-black mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Leave Management</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Faculty Dashboard */
                    <div>
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-black">Faculty Dashboard</h1>
                            <p className="text-gray-600">Welcome, {facultyData.faculty?.name || 'Faculty Member'}</p>
                        </div>

                        {/* Workload Summary */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-black flex items-center">
                                        <Clock className="h-5 w-5 mr-2" />
                                        Teaching Load
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-black mb-2">
                                        {facultyData.workload?.totalHours || 0} / {facultyData.workload?.maxHours || 20} hrs
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-black h-2 rounded-full"
                                            style={{ width: `${((facultyData.workload?.totalHours || 0) / (facultyData.workload?.maxHours || 20)) * 100}%` }}
                                        ></div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-black">Free Slots</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-black">
                                        {facultyData.workload?.freeSlots || 0}
                                    </div>
                                    <p className="text-sm text-gray-600">Available time slots this week</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-black">Busy Slots</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-black">
                                        {facultyData.workload?.busySlots || 0}
                                    </div>
                                    <p className="text-sm text-gray-600">Scheduled classes this week</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Schedule View */}
                        <Card className="border-gray-200 mb-6">
                            <CardHeader>
                                <CardTitle className="text-black">Weekly Schedule</CardTitle>
                                <CardDescription>Your teaching schedule for this week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-gray-500">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No classes scheduled for this week</p>
                                    <p className="text-sm">Schedule will appear here once timetables are generated</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-black">Leave Management</CardTitle>
                                    <CardDescription>Request leave and view substitute arrangements</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Request Leave
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-black">Find Substitutes</CardTitle>
                                    <CardDescription>Get suggestions for substitute faculty</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                        <Users className="h-4 w-4 mr-2" />
                                        View Substitutes
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setFacultyData(null)}
                                className="border-black text-black hover:bg-black hover:text-white"
                            >
                                Search Another Faculty
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}