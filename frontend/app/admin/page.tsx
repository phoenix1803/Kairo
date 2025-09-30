'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, BookOpen, Settings, Upload, Bell, BarChart3, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
    // Mock dashboard stats
    const stats = {
        students: 1250,
        faculty: 85,
        courses: 120,
        rooms: 45,
        activeScenarios: 3,
        lastGenerated: "2024-01-15T10:30:00Z"
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Calendar className="h-6 w-6 text-black" />
                            <span className="text-xl font-bold text-black">Kairo Admin</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage timetables, constraints, and institutional data</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-black" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{stats.students.toLocaleString()}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Faculty Members</CardTitle>
                            <Users className="h-4 w-4 text-black" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{stats.faculty}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Active Courses</CardTitle>
                            <BookOpen className="h-4 w-4 text-black" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{stats.courses}</div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Available Rooms</CardTitle>
                            <Settings className="h-4 w-4 text-black" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-black">{stats.rooms}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <Upload className="h-5 w-5 mr-2" />
                                Data Management
                            </CardTitle>
                            <CardDescription>
                                Upload and manage institutional data via CSV imports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                                <Link href="/admin/data">Manage Data</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <Settings className="h-5 w-5 mr-2" />
                                Constraint Studio
                            </CardTitle>
                            <CardDescription>
                                Define scheduling constraints using AI and form builders
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                <Link href="/admin/constraints">Build Constraints</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <Calendar className="h-5 w-5 mr-2" />
                                Generate Timetable
                            </CardTitle>
                            <CardDescription>
                                Create optimized schedules using AI-powered solving
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                <Link href="/admin/generate">Generate Schedule</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <BarChart3 className="h-5 w-5 mr-2" />
                                What-If Simulations
                            </CardTitle>
                            <CardDescription>
                                Compare scenarios and analyze scheduling alternatives
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                <Link href="/admin/simulations">Run Simulations</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <Bell className="h-5 w-5 mr-2" />
                                Notifications
                            </CardTitle>
                            <CardDescription>
                                Send updates and alerts to students and faculty
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                <Link href="/admin/notifications">Manage Notifications</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                            <CardTitle className="text-black flex items-center">
                                <Clock className="h-5 w-5 mr-2" />
                                Audit Logs
                            </CardTitle>
                            <CardDescription>
                                Track changes and monitor system activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                <Link href="/admin/audit">View Logs</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-black">Recent Activity</CardTitle>
                        <CardDescription>Latest system events and changes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Timetable generated for CSE Semester 5</p>
                                    <p className="text-xs text-gray-600">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">Faculty data uploaded (85 records)</p>
                                    <p className="text-xs text-gray-600">5 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-black">New constraint added: No Friday evening classes</p>
                                    <p className="text-xs text-gray-600">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}