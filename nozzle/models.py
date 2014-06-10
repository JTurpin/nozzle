from flask import abort
from datetime import datetime
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.orm import exc

db = SQLAlchemy()


def get_object_or_404(model, *criterion):
    try:
        return model.query.filter(*criterion).one()
    except exc.NoResultFound, exc.MultipleResultsFound:
        abort(404)


class PrimaryKeyMixin(object):
    id = db.Column(db.Integer, primary_key=True)


class Station(PrimaryKeyMixin, db.Model):
    __tablename__ = 'station'
    name = db.Column(db.Unicode, unique=True)
    number = db.Column(db.Integer, unique=True)
    description = db.Column(db.UnicodeText)

    @property
    def schedules(self):
        return self.schedule_set.all()


class Program(PrimaryKeyMixin, db.Model):
    __tablename__ = 'program'
    name = db.Column(db.Unicode, unique=True)
    active = db.Column(db.Boolean, default=True)

    @property
    def schedules(self):
        return self.schedule_set.all()


class Schedule(PrimaryKeyMixin, db.Model):
    __tablename__ = 'schedule'
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'))
    program = db.relationship('Program', backref=db.backref('schedule_set', lazy='dynamic'))
    station_id = db.Column(db.Integer, db.ForeignKey('station.id'))
    station = db.relationship('Station', backref=db.backref('schedule_set', lazy='dynamic'))
    start_ts = db.Column(db.DateTime, default=datetime.utcnow)
    run_time = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)


class RunLog(PrimaryKeyMixin, db.Model):
    __tablename__ = 'runlog'
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'))
    start = db.Column(db.DateTime)
    scheduled_end = db.Column(db.DateTime)
    actual_end = db.Column(db.DateTime)
    run_time = db.Column(db.Integer)
