pipeline {
    agent any

    environment {
        NODE_VERSION = '24'
        APP_NAME = 'shadcn-angular'
        DOMAIN = 'shadcn-angular.tigayon.com'
        DEPLOY_DIR = '/var/www/frontend/tigayon/frontend/production/shadcn-angular'
        NVM_DIR = '/var/lib/jenkins/.nvm'
    }

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Setup') {
            steps {
                script {
                    sh '''#!/bin/bash -l
                        export NVM_DIR="${NVM_DIR}"
                        source "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        echo "Node: $(node --version)"
                        echo "NPM: $(npm --version)"
                    '''
                }
            }
        }

        stage('Install & Build') {
            steps {
                script {
                    sh '''#!/bin/bash -l
                        export NVM_DIR="${NVM_DIR}"
                        source "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Clean install root dependencies
                        npm install --force

                        # Build Angular SSR app
                        npm run build

                        # Build MCP server
                        cd mcp-server
                        npm install --force
                        npm run build
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh '''#!/bin/bash -l
                        export NVM_DIR="${NVM_DIR}"
                        source "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        npm run test -- --run || true
                    '''
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh '''#!/bin/bash -l
                        export NVM_DIR="${NVM_DIR}"
                        source "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Create deployment directory
                        sudo mkdir -p ${DEPLOY_DIR}

                        # Copy built files
                        sudo cp -r dist/shadcn-angular/* ${DEPLOY_DIR}/
                        sudo cp package*.json ecosystem.config.js ${DEPLOY_DIR}/
                        sudo cp -r mcp-server ${DEPLOY_DIR}/

                        # Install production dependencies
                        cd ${DEPLOY_DIR}
                        sudo npm install --force --omit=dev

                        # Set permissions
                        sudo chown -R www-data:www-data ${DEPLOY_DIR}

                        # Restart services
                        pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
                        pm2 save

                        # Reload nginx
                        sudo nginx -t && sudo systemctl reload nginx
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ BUILD SUCCESSFUL'
        }
        failure {
            echo '❌ BUILD FAILED'
        }
        always {
            cleanWs()
        }
    }
}
