#!/bin/bash
# Start the backend in the background
cd /app/server && gunicorn --workers=4 --bind=0.0.0.0:5001 app:app &

# Start the frontend
cd /app/client && npm run start
