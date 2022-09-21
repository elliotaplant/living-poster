import RPi.GPIO as GPIO
import logging
import time

SURF_HEIGHT_PIN_NUMBER = 21
WATER_TEMP_PIN_NUMBER = 20
SURF_QUALITY_PIN_NUMBER = 16

SERVO_PWM_FREQUENCY = 50  # Hz
DUTY_CYCLE_RANGE = [12.5, 2.5]

class ServoController:
    def setup(self):
        GPIO.setmode(GPIO.BCM)

        GPIO.setup(SURF_HEIGHT_PIN_NUMBER, GPIO.OUT)
        GPIO.setup(WATER_TEMP_PIN_NUMBER, GPIO.OUT)
        GPIO.setup(SURF_QUALITY_PIN_NUMBER, GPIO.OUT)

        self.surf_height_pin = GPIO.PWM(SURF_HEIGHT_PIN_NUMBER, SERVO_PWM_FREQUENCY)
        self.surf_height_pin.start(3)
        self.water_temp_pin = GPIO.PWM(WATER_TEMP_PIN_NUMBER, SERVO_PWM_FREQUENCY)
        self.water_temp_pin.start(3)
        self.surf_quality_pin = GPIO.PWM(SURF_QUALITY_PIN_NUMBER, SERVO_PWM_FREQUENCY)
        self.surf_quality_pin.start(3)

    def stop(self):
        logging.info('Cleaning up')
        self.surf_height_pin.stop()
        self.water_temp_pin.stop()
        self.surf_quality_pin.stop()
        GPIO.cleanup()

    def set_to_angles(self, surf_height, water_temp, surf_quality, dial_range):
        surf_height_duty = self._convert_to_duty_cycle(surf_height, dial_range['surf_height'])
        water_temp_duty = self._convert_to_duty_cycle(water_temp, dial_range['water_temp'])
        surf_quality_duty = self._convert_to_duty_cycle(surf_quality, dial_range['surf_quality'])

        logging.info('Surf height duty:  %s' % surf_height_duty)
        logging.info('Water temp duty:   %s' % water_temp_duty)
        logging.info('Surf quality duty: %s' % surf_quality_duty)

        self.surf_height_pin.ChangeDutyCycle(surf_height_duty)
        self.water_temp_pin.ChangeDutyCycle(water_temp_duty)
        self.surf_quality_pin.ChangeDutyCycle(surf_quality_duty)
        time.sleep(1)

        self.surf_height_pin.ChangeDutyCycle(0)
        self.water_temp_pin.ChangeDutyCycle(0)
        self.surf_quality_pin.ChangeDutyCycle(0)
        time.sleep(1)

    def _convert_to_duty_cycle(self, metric, metric_range):
        metric_ratio = float(metric - metric_range[0]) / float(metric_range[1] - metric_range[0])
        scaled_value = metric_ratio * float(DUTY_CYCLE_RANGE[1] - DUTY_CYCLE_RANGE[0]) + float(DUTY_CYCLE_RANGE[0])
        return self._clamp(scaled_value, float(DUTY_CYCLE_RANGE[1]), float(DUTY_CYCLE_RANGE[0]))

    def _clamp(self, value, min_value, max_value):
        return max(min(value, max_value), min_value)
