import RPi.GPIO as GPIO
import logging
import time

class Actuator:
    def setup(self, config):
        self.config = config
        self.pins = {}

        GPIO.setmode(GPIO.BCM)

        for dial in config['dials']:
            pin_number = dial['pin']
            GPIO.setup(pin_number, GPIO.OUT)
            pin = GPIO.PWM(pin_number, config['servo']['pwmFrequencyHz'])
            pin.start(0)
            self.pins[pin_number] = pin
            
    def cleanup(self):
        time.sleep(0.5)
        for pin in self.pins.values():
            pin.stop()
        GPIO.cleanup()


    def move_dial(value, dial_config, servo_config):
        duty_cycle = lerp(value, dial_config['range'], servo_config['dutyCycleRange'])
        pin.ChangeDutyCycle(duty_cycle)

def lerp(value, metric_range, servo_range):
    metric_ratio = float(value - metric_range[0]) / float(metric_range[1] - metric_range[0])
    scaled_value = metric_ratio * float(servo_range[0] - servo_range[1]) + float(servo_range[1])
    return max(min(scaled_value, servo_range[1]), servo_range[0])

