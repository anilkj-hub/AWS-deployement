pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/anilkj-hub/AWS-deployement.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t anilkumarjena22/backend ./backend'
                sh 'docker build -t anilkumarjena22/frontend ./frontend'
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push anilkumarjena22/backend'
                sh 'docker push anilkumarjena22/frontend'
            }
        }

    }
}