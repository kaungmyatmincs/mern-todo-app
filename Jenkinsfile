pipeline {
    agent any
    
    tools {
        nodejs 'node18' // This matches the name you gave in Global Tool Config
    }

    stages {
        stage('Install & Build') {
            steps {
                dir('TODO/todo_frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
                // Move frontend build to backend per README instructions
                sh 'mkdir -p TODO/todo_backend/static'
                sh 'cp -r TODO/todo_frontend/build TODO/todo_backend/static/'
                
                dir('TODO/todo_backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-creds') {
                        def appImage = docker.build("kaungmyatmin21/finead-todo-app:latest", "./TODO/todo_backend")
                        appImage.push()
                    }
                }
            }
        }
    }
}