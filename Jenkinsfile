pipeline {
    agent any

    stages {
        stage('Print Tag Created') {
            steps {
                script {
                    if (env.CHANGE_ID?.startsWith('refs/tags/')) {
                        echo "A new tag was created: ${env.CHANGE_ID}"
                    } else {
                        echo "Not a tag build. Skipping."
                    }
                }
            }
        }
    }
}
