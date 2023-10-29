from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')
    # 配置 CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)

    # 注册您的 Blueprint
    from .routes.student_routes import student_routes
    app.register_blueprint(student_routes,url_prefix='/api')
    
    # 在接收到每个请求之前运行此函数
    app.before_request(create_tables)
    
    return app

def create_tables():
    inspector = inspect(db.engine)
    if not inspector.has_table("students"):
        db.create_all()