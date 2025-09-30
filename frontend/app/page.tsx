import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Settings, BookOpen } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-8 w-8 text-black" />
                            <h1 className="text-2xl font-bold text-black">Kairo</h1>
                        </div>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/student" className="text-gray-600 hover:text-black transition-colors">
                                Student Portal
                            </Link>
                            <Link href="/faculty" className="text-gray-600 hover:text-black transition-colors">
                                Faculty Portal
                            </Link>
                            <Link href="/admin" className="text-gray-600 hover:text-black transition-colors">
                                Admin Dashboard
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
                        AI-Powered Timetable Management
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Streamline academic scheduling with intelligent constraint solving,
                        natural language processing, and real-time optimization for educational institutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800">
                            <Link href="/student">Access Student Portal</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
                            <Link href="/admin">Admin Dashboard</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center text-black mb-12">
                        Comprehensive Timetable Solution
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <BookOpen className="h-8 w-8 text-black mb-2" />
                                <CardTitle className="text-black">Student Portal</CardTitle>
                                <CardDescription>
                                    Search timetables by enrollment number with offline PWA support
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Week and day view layouts</li>
                                    <li>• Course color coding</li>
                                    <li>• PDF and iCal export</li>
                                    <li>• Push notifications</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Users className="h-8 w-8 text-black mb-2" />
                                <CardTitle className="text-black">Faculty Management</CardTitle>
                                <CardDescription>
                                    Personal schedules, workload tracking, and leave management
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Workload summaries</li>
                                    <li>• Substitute suggestions</li>
                                    <li>• Conflict detection</li>
                                    <li>• Leave calendar</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Settings className="h-8 w-8 text-black mb-2" />
                                <CardTitle className="text-black">AI Constraints</CardTitle>
                                <CardDescription>
                                    Natural language constraint authoring with Gemini integration
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Form-based builder</li>
                                    <li>• Natural language input</li>
                                    <li>• Constraint validation</li>
                                    <li>• Conflict resolution</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Calendar className="h-8 w-8 text-black mb-2" />
                                <CardTitle className="text-black">Smart Optimization</CardTitle>
                                <CardDescription>
                                    OR-Tools powered scheduling with what-if simulations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Constraint solving</li>
                                    <li>• Scenario comparison</li>
                                    <li>• Auto-suggestions</li>
                                    <li>• Real-time progress</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Quick Access */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold text-black mb-8">Quick Access</h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-black">Student Timetable</CardTitle>
                                <CardDescription>
                                    Enter your enrollment number to view your schedule
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                                    <Link href="/student">View Timetable</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-black">Faculty Schedule</CardTitle>
                                <CardDescription>
                                    Access your teaching schedule and workload summary
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                    <Link href="/faculty">Faculty Portal</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-black">Administration</CardTitle>
                                <CardDescription>
                                    Manage timetables, constraints, and institutional data
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                                    <Link href="/admin">Admin Dashboard</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">
                        © 2024 Kairo NEP Timetable System. Built with AI-powered optimization.
                    </p>
                </div>
            </footer>
        </div>
    )
}