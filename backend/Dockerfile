#Creates a docker image to run it in a docker container

# Use the official Python 3.11 slim image as the base image.
# This provides a lightweight environment with Python already installed.
FROM python:3.11-slim

# Set the working directory inside the container.
# All following commands will be executed from this directory.
WORKDIR /app

# Copy the requirements file into the container.
# This file contains all the Python packages needed by the application.
COPY requirements.txt .

# Install all required Python dependencies.
# --no-cache-dir prevents pip from storing unnecessary cache files,
# helping to keep the Docker image smaller.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend project files into the container.
COPY . .

# Expose port 5000 so the Flask application can receive incoming requests.
EXPOSE 5000

# Start the Flask backend when the container launches.
# This runs the main application file.
CMD ["python", "app.py"]