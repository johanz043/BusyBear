pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Test') {
            steps {
                sh 'docker version'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t busybear-frontend ./frontend'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
}