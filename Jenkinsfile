pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/anilkj-hub/AWS-deployement.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t anilkumarjena22/backend ./backend'
                bat 'docker build -t anilkumarjena22/frontend ./frontend'
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push anilkumarjena22/backend'
                bat 'docker push anilkumarjena22/frontend'
            }
        }

    }
}