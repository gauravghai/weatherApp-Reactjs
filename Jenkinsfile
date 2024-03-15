pipeline {
    agent any

    options {
        skipDefaultCheckout(true) // Skip default checkout to allow customized checkout for tags
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Check if we're building a tag
                    def isTagBuild = env.CHANGE_ID?.startsWith('refs/tags/')
                    if (isTagBuild) {
                        // If it's a tag build, manually checkout the code from the tag
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: env.CHANGE_ID]],
                            doGenerateSubmoduleConfigurations: false,
                            extensions: [],
                            userRemoteConfigs: [[url: 'https://github.com/uniquebiwas/weatherApp-Reactjs.git']]
                        ])
                    } else {
                        echo "Not a tag build. Skipping build."
                        currentBuild.result = 'ABORTED'
                        return
                    }
                }
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
