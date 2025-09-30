from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, ForeignKey, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base


class CourseType(str, enum.Enum):
    MAJOR = "Major"
    MINOR = "Minor"
    LAB = "Lab"
    SEC = "SEC"
    AEC = "AEC"
    VAC = "VAC"


class DayOfWeek(str, enum.Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"


class RoomType(str, enum.Enum):
    CLASS = "Class"
    LAB = "Lab"
    SEMINAR = "Seminar"
    AUDITORIUM = "Auditorium"


class Student(Base):
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    enrollment_number = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    program = Column(String, nullable=False)  # B.Ed, M.Ed, FYUP, ITEP
    semester = Column(Integer, nullable=False)
    branch = Column(String, nullable=False)
    credit_cap_min = Column(Integer, default=18)
    credit_cap_max = Column(Integer, default=24)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    enrollments = relationship("Enrollment", back_populates="student")


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    short_name = Column(String, nullable=False, index=True)
    department = Column(String, nullable=False)
    max_load = Column(Integer, default=20)  # Maximum teaching hours per week
    expertise_tags = Column(JSON, default=list)
    availability_json = Column(JSON, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    assignments = relationship("Assignment", back_populates="faculty")
    leave_records = relationship("FacultyLeave", back_populates="faculty")


class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String, unique=True, nullable=False, index=True)
    title = Column(String, nullable=False)
    type = Column(Enum(CourseType), nullable=False)
    credits = Column(Integer, nullable=False)
    hours_theory = Column(Integer, default=0)
    hours_practical = Column(Integer, default=0)
    has_lab = Column(Boolean, default=False)
    branch = Column(String, nullable=False)
    prerequisites = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    enrollments = relationship("Enrollment", back_populates="course")
    assignments = relationship("Assignment", back_populates="course")


class Room(Base):
    __tablename__ = "rooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(Enum(RoomType), nullable=False)
    capacity = Column(Integer, nullable=False)
    features = Column(JSON, default=list)  # Projector, Whiteboard, etc.
    building = Column(String, nullable=False)
    floor = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    assignments = relationship("Assignment", back_populates="room")


class TimeSlot(Base):
    __tablename__ = "time_slots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    day = Column(Enum(DayOfWeek), nullable=False)
    start_time = Column(String, nullable=False)  # Format: "HH:MM"
    end_time = Column(String, nullable=False)    # Format: "HH:MM"
    slot_index = Column(Integer, nullable=False)  # For ordering within day
    duration_minutes = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    assignments = relationship("Assignment", back_populates="slot")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"), nullable=False)
    semester = Column(Integer, nullable=False)
    academic_year = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class FacultyLeave(Base):
    __tablename__ = "faculty_leave"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    faculty_id = Column(UUID(as_uuid=True), ForeignKey("faculty.id"), nullable=False)
    start_date = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    reason = Column(Text)
    approved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    faculty = relationship("Faculty", back_populates="leave_records")