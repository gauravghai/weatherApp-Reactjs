pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git changelog: false, url: 'https://github.com/uniquebiwas/weatherApp-Reactjs.git'
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker image prune -f'
                    sh 'docker container prune -f'
                }
            }
        }

        stage('Stop and Remove Container') {
            steps {
                script {
                    sh 'docker stop test-app || true'
                    sh 'docker rm test-app || true'
                }
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    sh 'docker build . -t test-app'
                    sh 'docker run -d --name test-app -p 80:80 test-app'
                }
            }
        }
    }
}
