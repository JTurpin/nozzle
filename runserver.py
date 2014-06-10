from nozzle.base import app
if __name__ == "__main__":
    # gpio.setup()
    # atexit.register(gpio.onexit)
    #app = create_app(__name__, SQLALCHEMY_DATABASE_URI='sqlite:///test.db')
    app.debug = True
    app.run()
