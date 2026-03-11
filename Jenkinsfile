pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    REGISTRY = 'docker.io'
    DOCKER_NAMESPACE = 'anilkumarjena22'
    BACKEND_IMAGE = 'product-backend'
    FRONTEND_IMAGE = 'product-frontend'
    DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'cd backend && npm install'
        sh 'cd frontend && npm install'
      }
    }

    stage('Build Frontend') {
      steps {
        sh 'cd frontend && npm run build'
      }
    }

    stage('Backend Smoke Test') {
      steps {
        sh '''
          cd backend
          node server.js &
          APP_PID=$!
          sleep 3
          curl -fsS http://localhost:5000/health
          kill $APP_PID
        '''
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          def shortSha = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          env.IMAGE_TAG = shortSha
        }

        sh """
          docker build -t ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
          docker build -t ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:latest ./backend
          docker build -t ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
          docker build -t ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:latest ./frontend
        """
      }
    }

    stage('Push Docker Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:${IMAGE_TAG}
            docker push ${DOCKER_NAMESPACE}/${BACKEND_IMAGE}:latest
            docker push ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:${IMAGE_TAG}
            docker push ${DOCKER_NAMESPACE}/${FRONTEND_IMAGE}:latest
            docker logout
          '''
        }
      }
    }

    stage('Deploy (Main Only)') {
      when {
        branch 'main'
      }
      steps {
        sh '''
          docker compose pull || true
          docker compose up -d --build
        '''
      }
    }
  }

  post {
    always {
      sh 'docker image prune -f || true'
    }
    success {
      echo 'Pipeline completed successfully.'
    }
    failure {
      echo 'Pipeline failed. Check stage logs.'
    }
  }
}
