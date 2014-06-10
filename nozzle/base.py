# import atexit

from flask import (
    # abort,
    # redirect,
    # url_for,
    # Blueprint,
    request,
    render_template
)
from restless.fl import FlaskResource as Resource
from restless.preparers import FieldsPreparer
from .models import (
    get_object_or_404,
    db,
    Station,
    Program,
    Schedule
)
from .factory import create_app
# app = Blueprint('vap', __name__, template_folder='templates', static_folder='static')
app = create_app(__name__, SQLALCHEMY_DATABASE_URI='sqlite:///test.db')
# import raspbery_gpio as gpio


class EmberMixin(object):
    def wrap_list_response(self, data):
        return {
            self.plural_name: data
        }

    def serialize_detail(self, data):
        """
        Given a single item (``object`` or ``dict``), serializes it.

        :param data: The item to serialize
        :type data: object or dict

        :returns: The serialized body
        :rtype: string
        """
        if data is None:
            return ''

        # Check for a ``Data``-like object. We should assume ``True`` (all
        # data gets prepared) unless it's explicitly marked as not.
        if not getattr(data, 'should_prepare', True):
            prepped_data = data.value
        else:
            prepped_data = self.prepare(data)

        return self.serializer.serialize({self.name: prepped_data})

    def deserialize(self, method, endpoint, body):
        print 'deserializing'
        if endpoint == 'list':
            return self.deserialize_list(body)

        return self.deserialize_detail(body)

    def deserialize_detail(self, body):
        if body:
            data = self.serializer.deserialize(body)
            return data[self.name]

        return {}

    def deserialize_list(self, body):
        """
        Given a string of text, deserializes a (presumed) list out of the body.

        :param body: The body of the current request
        :type body: string

        :returns: The deserialized body or an empty ``list``
        """
        if body:
            data = self.serializer.deserialize(body)
            if isinstance(data, dict):
                print data
                return data[self.name]
            elif hasattr(data, '__iter__'):
                return data

        return []


class BaseResource(Resource):
    def list(self):
        return self.model.query.all()

    def detail(self, pk):
        return get_object_or_404(self.model, Station.id == pk)

    def create(self):
        print self.data
        obj = self.model(**self.data)
        db.session.add(obj)
        db.session.commit()
        return obj

    def is_authenticated(self):
        return True


class NestedFieldsPreparer(FieldsPreparer):
    def lookup_data(self, lookup, data):
        value = data
        preparer = None
        if isinstance(lookup, tuple):
            preparer = lookup[1]
            lookup = lookup[0]
        parts = lookup.split('.')

        if not parts or not parts[0]:
            return value

        part = parts[0]
        remaining_lookup = '.'.join(parts[1:])

        if hasattr(data, 'keys') and hasattr(data, '__getitem__'):
            # Dictionary enough for us.
            value = data[part]
        else:
            # Assume it's an object.
            value = getattr(data, part)

        if not remaining_lookup:
            if preparer:
                if hasattr(value, '__iter__'):
                    return [preparer.prepare(i) for i in value]
                return preparer.prepare(value)
            else:
                return value

        # There's more to lookup, so dive in recursively.
        return self.lookup_data(remaining_lookup, value)


class SchedulePreparer(FieldsPreparer):
    pass

schedule_preparer = FieldsPreparer(fields={
    'program': 'program_id',
    'start_ts': 'start_ts',
    'run_time': 'run_time',
    'station': 'station_id'
})


class StationResource(EmberMixin, BaseResource):
    plural_name = 'stations'
    name = 'station'
    model = Station
    preparer = NestedFieldsPreparer(fields={
        'id': 'id',
        'name': 'name',
        'schedules': ('schedules', schedule_preparer)
    })


class ProgramResource(EmberMixin, BaseResource):
    plural_name = 'programs'
    name = 'program'
    model = Program
    preparer = NestedFieldsPreparer(fields={
        'id': 'id',
        'name': 'name',
        'active': 'active',
        'schedules': ('schedules', schedule_preparer)
    })


class ScheduleResource(EmberMixin, BaseResource):
    plural_name = 'schedule'
    name = 'schedules'
    model = Schedule
    preparer = schedule_preparer


StationResource.add_url_rules(app, rule_prefix='/api/stations')
ProgramResource.add_url_rules(app, rule_prefix='/api/programs/')
ScheduleResource.add_url_rules(app, rule_prefix='/api/schedules')


@app.route("/hello")
def hello():
    return "Hello World!"


@app.route('/work')
def work():
    #  are there any schedules ready to start
    #  are there any scheudles ready to stop
    pass


@app.route('/setup', methods=['GET'])
def setup_display():
    #  how many stations?
    return render_template('setup.html')


@app.route('/setup', methods=['POST'])
def setup():
    n = request.form['num_stations']
    for i in range(1, n + 1):
        station = Station(name='Station %s' % i, number=i)
        db.session.add(station)
    db.session.commit()
    return {}


@app.route('/')
def root():
    return app.send_static_file('index.html')
