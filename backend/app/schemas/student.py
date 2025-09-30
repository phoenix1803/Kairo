from pydantic import BaseModel
from typing import Dict, List
from app.models.academic import CourseType


class TimeSlot(BaseModel):
    day: str
    startTime: str
    endTime: str
    slotIndex: int


class TimetableCard(BaseModel):
    courseCode: str
    courseTitle: str
    roomNumber: str
    branch: str
    facultyShortForm: str
    courseType: CourseType
    timeSlot: TimeSlot


class StudentInfo(BaseModel):
    name: str
    program: str
    semester: int


class StudentTimetableResponse(BaseModel):
    student: StudentInfo
    assignments: List[TimetableCard]
    facultyLegend: Dict[str, str]