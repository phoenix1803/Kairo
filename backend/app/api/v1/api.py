from fastapi import APIRouter
from app.api.v1.endpoints import students, faculty, admin, timetables, constraints

api_router = APIRouter()

api_router.include_router(students.router, prefix="/students", tags=["students"])
api_router.include_router(faculty.router, prefix="/faculty", tags=["faculty"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(timetables.router, prefix="/timetables", tags=["timetables"])
api_router.include_router(constraints.router, prefix="/constraints", tags=["constraints"])