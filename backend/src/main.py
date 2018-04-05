from flask import Flask, jsonify, request

from .entities.entity import Session, engine, Base
from .entities.exam import Exam, ExamSchema

# creating the  flask application
app = Flask(__name__)

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

# session = Session()

# exams = session.query(Exam).all()

# if len(exams) == 0:
#   python_exam = Exam("SQLAlchemy Exam", "Test your knowledge about SQLAlchemy", "script")
#   session.add(python_exam)
#   session.commit()
#   session.close()

#   exams = session.query(Exam).all()

# print('### Exams:')
# for exam in exams:
#   print(f'({exam.id}) {exam.title} - {exam.description}')
