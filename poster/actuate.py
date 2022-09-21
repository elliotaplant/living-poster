import RPi.GPIO as GPIO
import logging
import time

GPIO.setmode(GPIO.BCM)

def move_dial(value, dial_config, servo_config):
    print('moving pin', dial_config['pin'], 'to value', value)
    GPIO.setup(dial['pin'], GPIO.OUT)
    pin = GPIO.PWM(dial['pin'], servo_config['pwmFrequencyHz'])
    pin.start(0) # Why 0?
    duty_cycle = convert_to_duty_cycle(value, dial_config['range'], servo_config['dutyCycleRange'])
    pin.ChangeDutyCycle(duty_cycle)
    pin.stop()
    GPIO.cleanup()

def convert_to_duty_cycle(value, metric_range, servo_range):
    metric_ratio = float(value - metric_range[0]) / float(metric_range[1] - metric_range[0])
    scaled_value = metric_ratio * float(servo_range[0] - servo_range[1]) + float(servo_range[1])
    return max(min(value, servo_range[0]), servo_range[1])

