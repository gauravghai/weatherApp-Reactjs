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
        stage('Login to Docker Hub and Push to docker hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerpass",usernameVariable:"user")]){
                    sh "docker tag test-app:latest ${env.user}/test-app:latest"
                    sh "echo ${env.dockerpass} | docker login -u ${env.user} --password-stdin"
                    sh "docker push ${env.user}/test-app:latest"

                    }
        
                }
            }
        }
        stage('tag push') {
            steps {
                script {
                    echo "A new tag was created and pushed to docker hub
                
                }
            }
        }
    }
}
