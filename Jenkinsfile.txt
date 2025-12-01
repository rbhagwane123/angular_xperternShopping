pipeline {
  agent any
  environment {
    DOCKERHUB_CREDS = credentials('dockerhub-creds') // ID in Jenkins
    DOCKER_REG = "${DOCKERHUB_CREDS_USR}" // optional: use if pushing
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend') {
      steps {
        dir('backend') {
          sh 'mvn -B -DskipTests=false clean package'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run build -- --outputPath=dist'
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t ecommerce-backend:latest -f backend/Dockerfile .'
        sh 'docker build -t ecommerce-frontend:latest -f frontend/Dockerfile .'
      }
    }

    stage('Push Images (optional)') {
      when {
        expression { env.PUSH_IMAGES == 'true' }
      }
      steps {
        script {
          docker.withRegistry('', 'dockerhub-creds') {
            sh 'docker tag ecommerce-backend:latest ${DOCKERHUB_CREDS_USR}/ecommerce-backend:latest'
            sh 'docker tag ecommerce-frontend:latest ${DOCKERHUB_CREDS_USR}/ecommerce-frontend:latest'
            sh 'docker push ${DOCKERHUB_CREDS_USR}/ecommerce-backend:latest'
            sh 'docker push ${DOCKERHUB_CREDS_USR}/ecommerce-frontend:latest'
          }
        }
      }
    }

    stage('Deploy (local)') {
      steps {
        // Use docker-compose on host to recreate containers
        sh 'docker-compose pull || true'
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'backend/target/*.jar', fingerprint: true
      junit 'backend/target/surefire-reports/*.xml'
    }
  }
}
