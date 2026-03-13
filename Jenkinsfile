pipeline {
    agent any
    
    tools {
        nodejs 'node' 
    }

    stages {
        // Stage 1: Install & Build Frontend
        stage('Build Frontend') {
            steps {
                dir('TODO/todo_frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        // Stage 2: Prepare & Install Backend
        stage('Build Backend') {
            steps {
                // Move frontend build to backend static folder
                sh 'mkdir -p TODO/todo_backend/static'
                sh 'cp -r TODO/todo_frontend/build/* TODO/todo_backend/static/'
                
                dir('TODO/todo_backend') {
                    sh 'npm install'
                }
            }
        }

        // Stage 3: Containerise using Dockerfile
        stage('Containerise') {
            steps {
                script {
                    // Builds using the lightweight alpine config in your Dockerfile
                    appImage = docker.build("kaungmyatmin21/finead-todo-app:latest", ".")
                }
            }
        }

        // Stage 4: Push to Docker Hub using Stored Credentials
        stage('Push') {
            steps {
                script {
                    // Uses Jenkins Credentials Provider to avoid hardcoding
                    docker.withRegistry('', 'docker-hub-creds') {
                        appImage.push()
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
    }
}