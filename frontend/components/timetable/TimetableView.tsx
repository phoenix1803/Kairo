'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TimetableCard {
    courseCode: string
    courseTitle: string
    roomNumber: string
    branch: string
    facultyShortForm: string
    courseType: 'Major' | 'Minor' | 'Lab' | 'SEC' | 'AEC' | 'VAC'
    timeSlot: {
        day: string
        startTime: string
        endTime: string
        slotIndex: number
    }
}

interface TimetableViewProps {
    data: {
        student: {
            name: string
            program: string
            semester: number
        }
        assignments: TimetableCard[]
        facultyLegend: Record<string, string>
    } | null
    viewMode: 'week' | 'day'
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const TIME_SLOTS = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00'
]

const getCourseTypeClass = (type: string) => {
    switch (type) {
        case 'Major': return 'course-major'
        case 'Minor': return 'course-minor'
        case 'Lab': return 'course-lab'
        case 'SEC': return 'course-sec'
        case 'AEC': return 'course-aec'
        case 'VAC': return 'course-vac'
        default: return 'bg-gray-200 text-black'
    }
}

export function TimetableView({ data, viewMode }: TimetableViewProps) {
    if (!data) {
        return (
            <Card className="border-gray-200">
                <CardContent className="p-8 text-center">
                    <p className="text-gray-500">No timetable data available</p>
                </CardContent>
            </Card>
        )
    }

    // Mock data for demonstration
    const mockAssignments: TimetableCard[] = [
        {
            courseCode: 'CS101',
            courseTitle: 'Computer Science Fundamentals',
            roomNumber: 'A-101',
            branch: 'CSE',
            facultyShortForm: 'RK',
            courseType: 'Major',
            timeSlot: { day: 'Monday', startTime: '09:00', endTime: '10:00', slotIndex: 0 }
        },
        {
            courseCode: 'MA201',
            courseTitle: 'Advanced Mathematics',
            roomNumber: 'B-205',
            branch: 'CSE',
            facultyShortForm: 'SP',
            courseType: 'Minor',
            timeSlot: { day: 'Monday', startTime: '10:00', endTime: '11:00', slotIndex: 1 }
        },
        {
            courseCode: 'CS102L',
            courseTitle: 'Programming Lab',
            roomNumber: 'Lab-1',
            branch: 'CSE',
            facultyShortForm: 'AK',
            courseType: 'Lab',
            timeSlot: { day: 'Tuesday', startTime: '14:00', endTime: '16:00', slotIndex: 4 }
        },
        {
            courseCode: 'EN101',
            courseTitle: 'Technical Communication',
            roomNumber: 'C-301',
            branch: 'CSE',
            facultyShortForm: 'MJ',
            courseType: 'SEC',
            timeSlot: { day: 'Wednesday', startTime: '11:00', endTime: '12:00', slotIndex: 2 }
        }
    ]

    const mockFacultyLegend = {
        'RK': 'Dr. Rajesh Kumar',
        'SP': 'Prof. Sunita Patel',
        'AK': 'Dr. Amit Khanna',
        'MJ': 'Ms. Meera Joshi'
    }

    if (viewMode === 'day') {
        return (
            <div className="space-y-4">
                {DAYS.map(day => {
                    const dayAssignments = mockAssignments.filter(a => a.timeSlot.day === day)
                    if (dayAssignments.length === 0) return null

                    return (
                        <Card key={day} className="border-gray-200">
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-black mb-3">{day}</h3>
                                <div className="space-y-2">
                                    {dayAssignments.map((assignment, idx) => (
                                        <div
                                            key={idx}
                                            className={cn(
                                                'p-3 rounded-lg text-sm',
                                                getCourseTypeClass(assignment.courseType)
                                            )}
                                        >
                                            <div className="font-medium">
                                                {assignment.courseCode} - {assignment.courseTitle}
                                            </div>
                                            <div className="text-xs opacity-90 mt-1">
                                                {assignment.timeSlot.startTime}-{assignment.timeSlot.endTime} • {assignment.roomNumber} • {assignment.facultyShortForm}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}

                {/* Faculty Legend */}
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <h3 className="font-semibold text-black mb-3">Faculty Legend</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {Object.entries(mockFacultyLegend).map(([short, full]) => (
                                <div key={short} className="text-gray-600">
                                    <span className="font-medium text-black">{short}:</span> {full}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Week view - Grid layout
    return (
        <div className="space-y-4">
            <Card className="border-gray-200 overflow-x-auto">
                <CardContent className="p-4">
                    <div className="timetable-grid min-w-[800px]" style={{ gridTemplateColumns: 'auto repeat(6, 1fr)' }}>
                        {/* Header row */}
                        <div className="time-slot"></div>
                        {DAYS.map(day => (
                            <div key={day} className="time-slot text-center font-semibold">
                                {day}
                            </div>
                        ))}

                        {/* Time slots */}
                        {TIME_SLOTS.map((timeSlot, slotIndex) => (
                            <React.Fragment key={timeSlot}>
                                <div className="time-slot text-center font-medium">
                                    {timeSlot}
                                </div>
                                {DAYS.map(day => {
                                    const assignment = mockAssignments.find(
                                        a => a.timeSlot.day === day && a.timeSlot.slotIndex === slotIndex
                                    )

                                    return (
                                        <div key={`${day}-${slotIndex}`} className="timetable-cell">
                                            {assignment && (
                                                <div
                                                    className={cn(
                                                        'timetable-card h-full',
                                                        getCourseTypeClass(assignment.courseType)
                                                    )}
                                                >
                                                    <div className="font-medium leading-tight">
                                                        {assignment.courseCode}
                                                    </div>
                                                    <div className="text-xs opacity-90 mt-1">
                                                        {assignment.roomNumber}
                                                    </div>
                                                    <div className="text-xs opacity-90">
                                                        {assignment.facultyShortForm}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Course Type Legend */}
            <Card className="border-gray-200">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-black mb-3">Course Types</h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {[
                            { type: 'Major', label: 'Major Courses' },
                            { type: 'Minor', label: 'Minor Courses' },
                            { type: 'Lab', label: 'Laboratory' },
                            { type: 'SEC', label: 'Skill Enhancement' },
                            { type: 'AEC', label: 'Ability Enhancement' },
                            { type: 'VAC', label: 'Value Added' }
                        ].map(({ type, label }) => (
                            <div key={type} className="flex items-center space-x-2">
                                <div className={cn('w-4 h-4 rounded', getCourseTypeClass(type))}></div>
                                <span className="text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Faculty Legend */}
            <Card className="border-gray-200">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-black mb-3">Faculty Legend</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {Object.entries(mockFacultyLegend).map(([short, full]) => (
                            <div key={short} className="text-gray-600">
                                <span className="font-medium text-black">{short}:</span> {full}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}