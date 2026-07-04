pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Build') {
            steps {
                sh 'docker build -t busybear-backend ./backend'
            }
        }

        stage('Frontend Build') {
            steps {
                sh 'docker build -t busybear-frontend ./frontend'
            }
        }

        stage('Deploy') {
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