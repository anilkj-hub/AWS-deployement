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
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t $DOCKER_NAMESPACE/$BACKEND_IMAGE:latest -t $DOCKER_NAMESPACE/$BACKEND_IMAGE:$IMAGE_TAG ./backend"
                sh "docker build -t $DOCKER_NAMESPACE/$FRONTEND_IMAGE:latest -t $DOCKER_NAMESPACE/$FRONTEND_IMAGE:$IMAGE_TAG ./frontend"
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker push $DOCKER_NAMESPACE/$BACKEND_IMAGE:latest"
                sh "docker push $DOCKER_NAMESPACE/$BACKEND_IMAGE:$IMAGE_TAG"
                sh "docker push $DOCKER_NAMESPACE/$FRONTEND_IMAGE:latest"
                sh "docker push $DOCKER_NAMESPACE/$FRONTEND_IMAGE:$IMAGE_TAG"
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}