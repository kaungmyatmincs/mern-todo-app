pipeline {
    agent any // Run everything on the main Jenkins node to keep workspace consistent

    environment {
        DOCKER_USER = 'kaungmyatmin21'
        IMAGE_NAME = 'finead-todo-app'
    }

    stages {
        // Run 5: Consolidating workspace to ensure Dockerfile visibility
        stage('Build') {
            steps {
                echo 'Installing Backend Dependencies...'
                // Running npm inside a docker container manually to avoid workspace switching
                sh 'docker run --rm -v ${WORKSPACE}:/app -w /app/TODO/todo_backend node:18-alpine npm install'
                
                echo 'Installing Frontend Dependencies...'
                sh 'docker run --rm -v ${WORKSPACE}:/app -w /app/TODO/todo_frontend node:18-alpine npm install'
            }
        }

        stage('Containerise') {
            steps {
                echo 'Building Docker Image from Root...'
                // Using ${WORKSPACE} ensures we are in the exact directory where git cloned the files
                sh "docker build -t ${DOCKER_USER}/${IMAGE_NAME}:latest -f ${WORKSPACE}/Dockerfile ${WORKSPACE}"
            }
        }

        stage('Push') {
            steps {
                echo 'Pushing to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', 
                                                passwordVariable: 'DOCKER_PASS', 
                                                usernameVariable: 'DOCKER_USER_VAR')]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER_VAR} --password-stdin"
                    sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
}