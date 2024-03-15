pipeline {
    agent any

    stages {
        stage('Print Tag Created') {
            steps {
                script {
                    echo "A new tag was created: ${env.GIT_TAG_NAME}",
                    sh 'ls',
                    sh 'pwd'
                }
            }
        }
    }
}
