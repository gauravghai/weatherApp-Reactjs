pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',  url: 'https://github.com/uniquebiwas/weatherApp-Reactjs'
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
