from flask import request, jsonify
from app import app, db
from models import Todo

@app.route('/api/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([todo.as_dict() for todo in todos])

@app.route('/api/todos', methods=['POST'])
def add_todo():
    task = request.json['task']
    new_todo = Todo(task=task)
    db.session.add(new_todo)
    db.session.commit()
    return jsonify(new_todo.as_dict())

@app.route('/api/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    try:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({'message': 'Todo deleted successfully', 'todo': todo.as_dict()})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}

Todo.as_dict = as_dict
