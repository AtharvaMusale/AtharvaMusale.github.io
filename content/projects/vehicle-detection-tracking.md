---
title: Vehicle Detection, Tracking and Lane Counting
summary: >-
  YOLOv3 finds vehicles, Deep SORT follows each one across frames, and a
  tripwire counter reports how many passed in each lane, broken down by class.
company: Personal project
period: 2021
order: 7
side: true   # shown under Side projects, not Work
demo_image: /assets/videos/vehicle-tracking-demo.gif
demo_alt: Demo of vehicle detection, tracking and per-lane counting on a highway clip
tags: [Computer Vision, YOLOv3, DeepSORT, OpenCV]
pipeline_title: Processing pipeline
pipeline:
  - title: Read video
    kind: deterministic
    detail: >-
      Frames are decoded and downscaled to a working width. YOLO can run on
      every Nth frame to trade accuracy for speed.
  - title: Detect vehicles
    kind: agent
    detail: >-
      Darknet YOLOv3 weights run through OpenCV's DNN module, filtered to cars,
      buses, trucks and motorbikes.
  - title: Region of interest
    kind: deterministic
    detail: >-
      Only detections inside the road polygon continue, which removes
      background clutter before tracking starts.
  - title: Track across frames
    kind: agent
    detail: >-
      Deep SORT combines a Kalman filter with an HSV-histogram appearance
      feature. A track's class is a majority vote over its lifetime.
  - title: Count per lane
    kind: deterministic
    detail: >-
      A vehicle is counted once, when its bottom-centre crosses its lane's
      tripwire, so a single car is never counted twice.
  - title: Render and export
    kind: deterministic
    detail: >-
      Lane overlay, class-coloured boxes, trails and a live counter are drawn
      onto an H.264 video, with a JSON summary and a per-vehicle CSV alongside.
stack:
  Vision: [YOLOv3, Deep SORT, OpenCV DNN, Kalman filter]
  Engineering: [Python, YAML config, CLI, pytest, mypy, ruff]
  Delivery: [GitHub Actions CI, ffmpeg H.264 output]
---

## What it achieved

- **Per-lane, per-class counts.** The output says how many cars, buses and trucks used each lane, not just a single total.
- **Counts each vehicle once.** Keying the counter on track IDs and tripwire crossings replaced the original notebook's per-frame counting.
- **Works on any camera.** Lanes, tripwires and the road region are set in a YAML file using normalised coordinates, so the same setup scales to any resolution.
- **Runs on a laptop.** The full pipeline processes a 4K clip on CPU alone.

## The problem

Toll booths and lane-discipline checks depend on knowing which vehicles passed and where. Counting by hand is slow, and naive detection counts the same car in every frame it appears in.

## What I built

- **A detection and tracking pipeline** that gives each vehicle a persistent identity across frames.
- **A tripwire counter** with one line per lane, so a vehicle is counted at the moment it crosses.
- **A lane preview command** to check the overlay on a single frame before running a whole video.
- **A command-line tool** that writes the annotated video, a JSON summary and a CSV with one row per counted vehicle.

## Decisions that mattered

- **Count crossings, not detections.** Counting once per track crossing a line is what makes the numbers meaningful.
- **Place the tripwire near the camera.** Detections are most reliable there, which keeps the count stable.
- **Configuration over code.** Everything camera-specific lives in one config file, so a new road needs no code change.

## Built to be maintained

- **Typed and linted.** Strict type checking and lint run through a single `make check`.
- **Tested without model files.** The pipeline test renders a synthetic video with a fake detector, so the suite runs anywhere.
- **CI on every push** across several Python versions.

## Links

- Source code: [github.com/AtharvaMusale/Vehicle-Detection-and-Tracking-using-YOLOv3-and-Deep-Sort](https://github.com/AtharvaMusale/Vehicle-Detection-and-Tracking-using-YOLOv3-and-Deep-Sort)
- Write-up: [Vehicle tracking and counting using YOLOv3 and Deep SORT](https://atharvamusale.medium.com/vehicle-tracking-and-counting-using-yolov3-and-deep-sort-f43d1c66c7c6)
- Background: [A comprehensive guide to YOLOv3](https://atharvamusale.medium.com/a-comprehensive-guide-to-yolov3-74029810ca81)
