pipeline {
    agent any

    environment {
        // Change these to your actual Docker Hub username
        DOCKER_USER = 'kaungmyatmin21'
        IMAGE_NAME = 'finead-todo-app'
    }

    stages {
        // Stage 1: Install dependencies in appropriate folders
        stage('Build') {
            steps {
                echo 'Installing Backend Dependencies...'
                sh 'cd TODO/todo_backend && npm install'
                echo 'Installing Frontend Dependencies...'
                sh 'cd TODO/todo_frontend && npm install'
            }
        }

        // Stage 2: Build Docker image using the Dockerfile
        stage('Containerise') {
            steps {
                echo 'Building Docker Image...'
                sh "docker build -t ${DOCKER_USER}/${IMAGE_NAME}:latest ."
            }
        }

        // Stage 3: Login and Push (Using Credentials Provider to avoid deduction)
        stage('Push') {
            steps {
                // 'docker-hub-creds' is the ID we will create in Jenkins UI
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', 
                                                passwordVariable: 'DOCKER_PASS', 
                                                usernameVariable: 'DOCKER_USER_VAR')]) {
                    echo 'Logging into Docker Hub...'
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER_VAR} --password-stdin"
                    
                    echo 'Pushing Image...'
                    sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
}