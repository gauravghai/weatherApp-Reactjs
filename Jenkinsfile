pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',  url: 'https://github.com/uniquebiwas/weatherApp-Reactjs'
            }
        }
        stage('Build and Run') {
            steps {
                script {
                    // Build the Docker image and run the container
                    sh 'docker build . -t test-app' 

                }
            }
        }
        stage('Print Tag Created') {
            steps {
                script {
                    echo "A new tag was created: ${env.GIT_TAG_NAME}"
                    sh 'ls'
                    sh 'pwd'
                }
            }
        }
    }
}
