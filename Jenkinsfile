pipeline {
 agent any

 stages {

  stage('Clone Repo') {
   steps {
    git 'your github repo'
   }
  }

  stage('Build Docker Image') {
   steps {
    sh 'docker build -t backend ./backend'
   }
  }

  stage('Push Docker Image') {
   steps {
    sh 'docker push anilkumarjena22/backend'
   }
  }

 }
}