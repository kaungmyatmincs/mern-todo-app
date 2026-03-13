pipeline {
    agent any
    
    tools {
        // Ensure this name matches exactly what you set in Manage Jenkins -> Tools
        nodejs 'node18' 
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
                    // This block handles the Docker Hub login using your saved credentials
                    docker.withRegistry('', 'docker-hub-creds') {
                        // The "." context tells Docker to look for the Dockerfile in the ROOT
                        def appImage = docker.build("kaungmyatmin21/finead-todo-app:latest", ".")
                        appImage.push()
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build and Push successful! You are ready to deploy.'
        }
        failure {
            echo 'Build failed. Check the console output for errors.'
        }
    }
}