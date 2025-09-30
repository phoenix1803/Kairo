from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, ForeignKey, Enum, JSON, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
from app.core.database import Base


class ConstraintKind(str, enum.Enum):
    HARD = "hard"
    SOFT = "soft"


class ConstraintSource(str, enum.Enum):
    UI = "ui"
    GEMINI = "gemini"
    IMPORT = "import"


class ScenarioStatus(str, enum.Enum):
    DRAFT = "draft"
    SOLVING = "solving"
    READY = "ready"
    FAILED = "failed"


class Constraint(Base):
    __tablename__ = "constraints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    kind = Column(Enum(ConstraintKind), nullable=False)
    expression_json = Column(JSON, nullable=False)  # Structured constraint definition
    weight = Column(Integer, default=1)  # For soft constraints
    source = Column(Enum(ConstraintSource), nullable=False)
    active = Column(Boolean, default=True, index=True)
    note = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    ruleset_constraints = relationship("RulesetConstraint", back_populates="constraint")


class Ruleset(Base):
    __tablename__ = "rulesets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(Text)
    program = Column(String, nullable=False)
    semester = Column(Integer, nullable=False)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    constraints = relationship("RulesetConstraint", back_populates="ruleset")
    scenarios = relationship("Scenario", back_populates="ruleset")


class RulesetConstraint(Base):
    __tablename__ = "ruleset_constraints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ruleset_id = Column(UUID(as_uuid=True), ForeignKey("rulesets.id"), nullable=False)
    constraint_id = Column(UUID(as_uuid=True), ForeignKey("constraints.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    ruleset = relationship("Ruleset", back_populates="constraints")
    constraint = relationship("Constraint", back_populates="ruleset_constraints")


class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    program = Column(String, nullable=False, index=True)
    semester = Column(Integer, nullable=False, index=True)
    ruleset_id = Column(UUID(as_uuid=True), ForeignKey("rulesets.id"), nullable=False)
    status = Column(Enum(ScenarioStatus), default=ScenarioStatus.DRAFT)
    version = Column(Integer, default=1)
    objective_score = Column(Float)
    solve_metadata = Column(JSON, default=dict)  # Solver statistics
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    ruleset = relationship("Ruleset", back_populates="scenarios")
    timetables = relationship("Timetable", back_populates="scenario")
    simulations = relationship("Simulation", back_populates="base_scenario")


class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scenario_id = Column(UUID(as_uuid=True), ForeignKey("scenarios.id"), nullable=False)
    objective_score = Column(Float, nullable=False)
    solve_time_seconds = Column(Integer, nullable=False)
    is_final = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    scenario = relationship("Scenario", back_populates="timetables")
    assignments = relationship("Assignment", back_populates="timetable")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    timetable_id = Column(UUID(as_uuid=True), ForeignKey("timetables.id"), nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id"), nullable=False)
    slot_id = Column(UUID(as_uuid=True), ForeignKey("time_slots.id"), nullable=False)
    room_id = Column(UUID(as_uuid=True), ForeignKey("rooms.id"), nullable=False)
    faculty_id = Column(UUID(as_uuid=True), ForeignKey("faculty.id"), nullable=False)
    cohort_key = Column(String, nullable=False)  # Identifies student group
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    timetable = relationship("Timetable", back_populates="assignments")
    course = relationship("Course", back_populates="assignments")
    slot = relationship("TimeSlot", back_populates="assignments")
    room = relationship("Room", back_populates="assignments")
    faculty = relationship("Faculty", back_populates="assignments")


class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    base_scenario_id = Column(UUID(as_uuid=True), ForeignKey("scenarios.id"), nullable=False)
    modifications_json = Column(JSON, nullable=False)  # What was changed
    result_timetable_id = Column(UUID(as_uuid=True), ForeignKey("timetables.id"))
    status = Column(Enum(ScenarioStatus), default=ScenarioStatus.DRAFT)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    base_scenario = relationship("Scenario", back_populates="simulations")
    result_timetable = relationship("Timetable")