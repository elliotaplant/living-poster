import RPi.GPIO as GPIO
import logging
import time


def move_dial(value, dial_config, servo_config):
    GPIO.setup(dial_config['pin'], GPIO.OUT)
    pin = GPIO.PWM(dial_config['pin'], servo_config['pwmFrequencyHz'])
    duty_cycle = convert_to_duty_cycle(value, dial_config['range'], servo_config['dutyCycleRange'])
    pin.start(duty_cycle)
    time.sleep(0.5)
    pin.stop()

def convert_to_duty_cycle(value, metric_range, servo_range):
    metric_ratio = float(value - metric_range[0]) / float(metric_range[1] - metric_range[0])
    scaled_value = metric_ratio * float(servo_range[0] - servo_range[1]) + float(servo_range[1])
    return max(min(scaled_value, servo_range[1]), servo_range[0])

