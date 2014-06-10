import os 
from flask import Flask


def create_app(name, config_filename=None, **kwargs):
    app = Flask(name, static_url_path='')
    if config_filename:
        app.config.from_pyfile(config_filename)
    if 'VAPORATOR_SETTINGS' in os.environ:
        app.config.from_envvar('VAPORATOR_SETTINGS')
    app.config.update(
        **kwargs
    )
    # from nozzle.base import vap
    from nozzle.models import db
    # app.register_blueprint(vap)
    db.init_app(app)

    return app
