#!/bin/bash
gunicorn --workers=4 --bind=0.0.0.0:5001 "app.__main__:app"
