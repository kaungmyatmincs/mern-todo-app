pipeline {
    agent any
    
    tools {
        // Changed from 'node18' to 'node' based on the Jenkins error suggestion
        nodejs 'node' 
    }

    stages {
        stage('Install & Build') {
            steps {
                // 1. Build the Frontend
                dir('TODO/todo_frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
                
                // 2. Prepare the Backend: Create static folder and move the build
                sh 'mkdir -p TODO/todo_backend/static'
                sh 'cp -r TODO/todo_frontend/build/* TODO/todo_backend/static/'
                
                // 3. Install Backend dependencies
                dir('TODO/todo_backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-creds') {
                        // "." uses the root context where your Dockerfile lives
                        def appImage = docker.build("kaungmyatmin21/finead-todo-app:latest", ".")
                        appImage.push()
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build and Push successful!'
        }
        failure {
            echo 'Build failed. Check tool naming in Global Tool Configuration if this persists.'
        }
    }
}