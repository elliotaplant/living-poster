import RPi.GPIO as GPIO
import logging
import time


def move_dial(value, dial_config, servo_config):
    GPIO.setup(dial_config['pin'], GPIO.OUT)
    pin = GPIO.PWM(dial_config['pin'], servo_config['pwmFrequencyHz'])
    pin.start(3) # Why 3?
    duty_cycle = convert_to_duty_cycle(value, dial_config['range'], servo_config['dutyCycleRange'])
    pin.ChangeDutyCycle(duty_cycle)
    time.sleep(1)
    pin.ChangeDutyCycle(0)
    time.sleep(1)
    pin.stop()

def convert_to_duty_cycle(value, metric_range, servo_range):
    metric_ratio = float(value - metric_range[0]) / float(metric_range[1] - metric_range[0])
    scaled_value = metric_ratio * float(servo_range[0] - servo_range[1]) + float(servo_range[1])
    return max(min(scaled_value, servo_range[1]), servo_range[0])

