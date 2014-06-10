import RPi.GPIO as GPIO

# GPIO PIN DEFINES

pin_sr_clk = 7
pin_sr_noe = 11
pin_sr_dat = 13  # NOTE: if you have a RPi rev.2, need to change this to 27
pin_sr_lat = 15


# NUMBER OF STATIONS
num_stations = 6

# STATION BITS
values = [0] * num_stations


def enableShiftRegisterOutput():
    GPIO.output(pin_sr_noe, False)


def disableShiftRegisterOutput():
    GPIO.output(pin_sr_noe, True)


def setShiftRegister(values):
    GPIO.output(pin_sr_clk, False)
    GPIO.output(pin_sr_lat, False)
    for i in range(num_stations):
        GPIO.output(pin_sr_clk, False)
        GPIO.output(pin_sr_dat, values[num_stations - 1 - i])
        GPIO.output(pin_sr_clk, True)
    GPIO.output(pin_sr_lat, True)


def setup():
    GPIO.cleanup()
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(pin_sr_clk, GPIO.OUT)
    GPIO.setup(pin_sr_noe, GPIO.OUT)
    disableShiftRegisterOutput()
    GPIO.setup(pin_sr_dat, GPIO.OUT)
    GPIO.setup(pin_sr_lat, GPIO.OUT)
    setShiftRegister(values)
    enableShiftRegisterOutput()


def onexit():
    values = [0] * num_stations
    setShiftRegister(values)
    GPIO.cleanup()
