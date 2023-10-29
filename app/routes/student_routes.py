from app.models.student import Student
from app import db
from flask import Blueprint, jsonify, request

student_routes = Blueprint('student_routes', __name__)

@student_routes.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.as_dict() for student in students])

@student_routes.route('/student', methods=['POST'])
def add_student():
    data = request.json
    new_student = Student(
        name=data['name'],
        age=data['age'],
        school_name=data['school_name'],
        grade=data['grade'],
        attendance=data['attendance']
    )
    db
