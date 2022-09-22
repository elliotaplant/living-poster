# Living Poster

A live updating poster.

## Hardware

### Consumables

- [ ] Raspberry Pi Zero W with headers [$14](https://www.adafruit.com/product/3708)
- [ ] Regular old USB Micro cable and wall plug (you probably have an extra one)
- [ ] Female/male jumper wires [$2](https://www.adafruit.com/product/1953)
- [ ] 3 micro servos [$10](https://www.amazon.com/gp/product/B07MLR1498)
- [ ] \>2GB flash micro card [$2](https://www.amazon.com/SanDisk-microSDHC-Memory-SDSDQ-016G-Packaging/dp/B001L1H0SC)
- [ ] Shadow Box (11x14, get it at Michaels)
- [ ] Print of your beach picture [$2](https://www.amazon.com/prints)
- [ ] Black and white printout of above photo

**Total: ~$46**

### Tools

- Power drill with a variety of bits
- Wire stripper
- Tiny screwdriver
- Computer
- WiFi

### Artwork

I made a beach scene by taking a photo and running it through Adobe Illustrators Image Trace filter, and I'm sure you can make something creative. Try out Inkscape if you want a free image editor.

### Assembly

See ASSEMBLY.md

## Code

- Fetches surf data from surfline.com
- Converts that data into signals to adjust the angle on servo controllers
- Runs on a raspberry pi (zero w)

### Getting setup

- Get your pi
- Clone this repo into /home/pi/code/living-poster
- Install these dependencies:
  - `python-requests`
  - `python-RPI.GPIO`
- Copy `poster/config.example.json into poster.config.json` with the actual pin values you want
- Hook up your servo wires according to the pin numbers in `actuate.py`
- Run the script with `python main.py` to get live data OR
  `python manual.py <surf_height> <water_temp> <wind_speed>` to put in your own data

## Chron

Add this with `crontab -e`:

```
0 * * * * cd /home/pi/code/living-poster && python3 poster/main.py >> /home/pi/logs/living-poster.log 2>&1
1 0 1 * * mv /home/pi/logs/living-poster.log /home/pi/logs/living-poster.log.bak && echo -n > /home/pi/logs/living-poster.log 2>&1
```
