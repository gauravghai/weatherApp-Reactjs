pipeline {
    agent any

    stages {
        stage('Print Tag Created') {
            steps {
                script {
                    echo "A new tag was created: ${env.CHANGE_ID}"
                }
            }
        }
    }
}
