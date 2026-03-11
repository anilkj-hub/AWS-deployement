pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_NAMESPACE = 'anilkumarjena22'
        BACKEND_IMAGE = 'backend'
        FRONTEND_IMAGE = 'frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat "docker build -t %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:latest -t %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:%IMAGE_TAG% ./backend"
                bat "docker build -t %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:latest -t %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:%IMAGE_TAG% ./frontend"
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                bat "docker push %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:latest"
                bat "docker push %DOCKER_NAMESPACE%/%BACKEND_IMAGE%:%IMAGE_TAG%"
                bat "docker push %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:latest"
                bat "docker push %DOCKER_NAMESPACE%/%FRONTEND_IMAGE%:%IMAGE_TAG%"
            }
        }
    }

    post {
        always {
            bat 'docker logout || exit /b 0'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
