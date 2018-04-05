from flask import Flask, jsonify, request, redirect
from flask_cors import CORS

from .entities.entity import Session, engine, Base
from .entities.exam import Exam, ExamSchema
from .auth import AuthError, requires_auth

# creating the  flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)

@app.route('/exams')
def get_exams():
  # fetching from the database
  session = Session()
  exam_objects = session.query(Exam).all()

  # transforming into JSON-serializable objects
  schema = ExamSchema(many=True)
  exams = schema.dump(exam_objects)

  # serializing as JSON
  session.close()
  return jsonify(exams.data)

@app.route('/exams', methods=['POST'])
@requires_auth
def add_exam():
  # mount exam object
  posted_exam = ExamSchema(only=('title', 'description')).load(request.get_json())

  exam = Exam(**posted_exam.data, created_by="HTTP post request")

  session = Session()
  session.add(exam)
  session.commit()

  new_exam = ExamSchema().dump(exam).data
  session.close()
  return jsonify(new_exam), 201

@app.route('/add-dummy-exam')
def add_dummy_exam():
  session = Session()  
  exams = session.query(Exam).all()

  if len(exams) == 0:
    python_exam = Exam("SQLAlchemy Exam", "Test your knowledge about SQLAlchemy", "script")
    session.add(python_exam)
    session.commit()
    session.close()
  return redirect('/exams')


@app.errorhandler(AuthError)
def handle_auth_eror(ex):
  response = jsonify(ex.error)
  response.status_code = ex.status_code
  return response