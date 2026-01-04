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

                        # Clean start
                        rm -rf node_modules package-lock.json

                        # Install all dependencies (including devDependencies for build)
                        npm install

                        # Build Angular SSR app (includes MCP build)
                        npm run build

                        # Build MCP server separately
                        npm run build:mcp
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''#!/bin/bash -l
                        export NVM_DIR="${NVM_DIR}"
                        source "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Create deploy directory
                        sudo mkdir -p ${DEPLOY_DIR}
                        sudo chown jenkins:jenkins ${DEPLOY_DIR}

                        # Clear old deployment
                        rm -rf ${DEPLOY_DIR}/*

                        # Copy dist folder (Angular SSR)
                        cp -r dist ${DEPLOY_DIR}/

                        # Copy MCP server build
                        cp -r mcp-server ${DEPLOY_DIR}/

                        # Copy necessary config files
                        cp package.json ${DEPLOY_DIR}/
                        cp ecosystem.config.js ${DEPLOY_DIR}/

                        # Install production dependencies only
                        cd ${DEPLOY_DIR}
                        npm install --production

                        echo "✅ Deployed to ${DEPLOY_DIR}"
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
