pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_USERNAME = 'diabanas'
        FRONTEND_IMAGE = "${DOCKER_USERNAME}/task-management-frontend"
        BACKEND_IMAGE = "${DOCKER_USERNAME}/task-management-backend"
        VERSION = "latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Backend Build & Test') {
            steps {
                dir('backend') {
                    script {
                        // Using Maven wrapper for consistency
                        sh './mvnw clean package -DskipTests'
                        
                        // Run tests
                        sh './mvnw test'
                    }
                }
            }
        }
        
        stage('Frontend Build & Test') {
            steps {
                dir('frontend') {
                    script {
                        // Install dependencies
                        sh 'npm install'
                        
                        // Install specific Angular CLI version
                        sh 'npm install -g @angular/cli@7.3.9'
                        
                        // Run tests
                        sh 'ng test --watch=false --browsers=ChromeHeadless'
                        
                        // Build production
                        sh 'ng build --prod'
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend image
                    sh "docker build -t ${FRONTEND_IMAGE}:${VERSION} -f frontend/Dockerfile frontend/"
                    
                    // Build backend image
                    sh "docker build -t ${BACKEND_IMAGE}:${VERSION} -f backend/Dockerfile backend/"
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_CREDS_USR', passwordVariable: 'DOCKER_HUB_CREDS_PSW')]) {
                        sh "echo ${DOCKER_HUB_CREDS_PSW} | docker login -u ${DOCKER_HUB_CREDS_USR} --password-stdin"
                    
                        // Push images
                        sh "docker push ${FRONTEND_IMAGE}:${VERSION}"
                        sh "docker push ${BACKEND_IMAGE}:${VERSION}"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Stop existing containers if running
                    sh 'docker-compose down || true'
                    
                    // Start new containers
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup
            sh 'docker-compose down || true'
            sh 'docker system prune -f'
            
            // Logout from Docker Hub
            sh 'docker logout'
            
            // Clean workspace
            cleanWs()
        }
        
        success {
            echo '✅ Pipeline completed successfully!'
        }
        
        failure {
            echo '❌ Pipeline failed! Check the logs for details.'
        }
    }
}
