pipeline {
    agent any

    environment {
        DOCKER_USER = 'kaungmyatmin21'
        IMAGE_NAME = 'finead-todo-app'
    }

    stages {
        stage('Build') {
            agent {
                docker { 
                    image 'node:18-alpine' 
                    // This keeps the files visible between containers
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                echo 'Installing Backend Dependencies...'
                sh 'cd TODO/todo_backend && npm install'
                echo 'Installing Frontend Dependencies...'
                sh 'cd TODO/todo_frontend && npm install'
            }
        }

        stage('Containerise') {
            steps {
                echo 'Building Docker Image...'
                // We add "." to tell docker to look in the current workspace root
                sh "docker build -t ${DOCKER_USER}/${IMAGE_NAME}:latest -f Dockerfile ."
            }
        }

        stage('Push') {
            steps {
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