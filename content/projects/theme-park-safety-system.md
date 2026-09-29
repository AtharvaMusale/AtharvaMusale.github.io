---
title: Theme Park Ride Safety System
summary: >-
  Real-time computer vision on live ride cameras to detect guest-out-of-ride
  events in under two seconds.
company: Quantiphi
period: 2021 — 2023
order: 5
tags: [Computer Vision, YOLOv5, UNet, Real-time]
metrics:
  - value: "< 2 s"
    label: inference latency on live video
stack:
  Models: [YOLOv5, UNet]
---

## The problem

Detect in real time when a guest leaves a ride vehicle, using the cameras
already installed around the ride.

## Approach

**YOLOv5** detects guests in each frame and **UNet** segments the ride vehicle
and safe zones. Combining the two tells us whether a detected person is inside
or outside the vehicle. The pipeline runs on live video with **under 2 seconds**
of end-to-end inference latency.
