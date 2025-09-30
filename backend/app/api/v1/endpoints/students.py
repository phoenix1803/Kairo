from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

from app.core.database import get_db
from app.models.academic import Student, Assignment, Course, Faculty, Room, TimeSlot
from app.schemas.student import StudentTimetableResponse, TimetableCard

router = APIRouter()


@router.get("/{enrollment_number}/timetable", response_model=StudentTimetableResponse)
async def get_student_timetable(
    enrollment_number: str,
    week_offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    """Get student timetable by enrollment number"""
    
    # Find student
    result = await db.execute(
        select(Student).where(Student.enrollment_number == enrollment_number)
    )
    student = result.scalar_one_or_none()
    
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    # For now, return mock data with proper structure
    # In production, this would query actual assignments
    mock_assignments = [
        TimetableCard(
            courseCode="CS101",
            courseTitle="Computer Science Fundamentals",
            roomNumber="A-101",
            branch="CSE",
            facultyShortForm="RK",
            courseType="Major",
            timeSlot={
                "day": "Monday",
                "startTime": "09:00",
                "endTime": "10:00",
                "slotIndex": 0
            }
        ),
        TimetableCard(
            courseCode="MA201",
            courseTitle="Advanced Mathematics",
            roomNumber="B-205",
            branch="CSE",
            facultyShortForm="SP",
            courseType="Minor",
            timeSlot={
                "day": "Monday",
                "startTime": "10:00",
                "endTime": "11:00",
                "slotIndex": 1
            }
        ),
        TimetableCard(
            courseCode="CS102L",
            courseTitle="Programming Lab",
            roomNumber="Lab-1",
            branch="CSE",
            facultyShortForm="AK",
            courseType="Lab",
            timeSlot={
                "day": "Tuesday",
                "startTime": "14:00",
                "endTime": "16:00",
                "slotIndex": 4
            }
        ),
        TimetableCard(
            courseCode="EN101",
            courseTitle="Technical Communication",
            roomNumber="C-301",
            branch="CSE",
            facultyShortForm="MJ",
            courseType="SEC",
            timeSlot={
                "day": "Wednesday",
                "startTime": "11:00",
                "endTime": "12:00",
                "slotIndex": 2
            }
        )
    ]
    
    faculty_legend = {
        "RK": "Dr. Rajesh Kumar",
        "SP": "Prof. Sunita Patel", 
        "AK": "Dr. Amit Khanna",
        "MJ": "Ms. Meera Joshi"
    }
    
    return StudentTimetableResponse(
        student={
            "name": student.name,
            "program": student.program,
            "semester": student.semester
        },
        assignments=mock_assignments,
        facultyLegend=faculty_legend
    )


@router.get("/{enrollment_number}/export/pdf")
async def export_student_timetable_pdf(
    enrollment_number: str,
    db: AsyncSession = Depends(get_db)
):
    """Export student timetable as PDF"""
    # TODO: Implement PDF generation
    raise HTTPException(status_code=501, detail="PDF export not yet implemented")


@router.get("/{enrollment_number}/export/ical")
async def export_student_timetable_ical(
    enrollment_number: str,
    db: AsyncSession = Depends(get_db)
):
    """Export student timetable as iCal"""
    # TODO: Implement iCal generation
    raise HTTPException(status_code=501, detail="iCal export not yet implemented")