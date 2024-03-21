pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',  url: 'https://github.com/uniquebiwas/weatherApp-Reactjs'
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Remove unused Docker images and containers
                    sh 'docker image prune -f'
                    sh 'docker container prune -f'
                }
            }
        }

        stage('Stop and Remove Container') {
            steps {
                script {
                    // Stop and remove the existing container if it exists
                    sh 'docker-compose down || true'
                }
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    // Build the Docker image and run the container
                    sh 'docker-compose up -d'

                }
            }
        }
        
    }
}
