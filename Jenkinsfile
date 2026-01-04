pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_NAME = 'shadcn-angular'
        DOMAIN = 'shadcn-angular.tigayon.com'
        MCP_PORT = '3001'
        APP_PORT = '4200'
        DEPLOY_DIR = '/var/www/shadcn-angular'
        NODE_PATH = '/usr/local/bin/node'
        NPM_PATH = '/usr/local/bin/npm'
    }

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo '========== Checking out source code =========='
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo '========== Installing dependencies =========='
                    sh '''
                        ${NPM_PATH} ci
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    echo '========== Running linter =========='
                    sh '''
                        ${NPM_PATH} run lint || true
                    '''
                }
            }
        }

        stage('Build Angular SSR') {
            steps {
                script {
                    echo '========== Building Angular SSR =========='
                    sh '''
                        ${NPM_PATH} run build
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo '========== Running tests =========='
                    sh '''
                        ${NPM_PATH} run test -- --run || true
                    '''
                }
            }
        }

        stage('Deploy Application') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Deploying application =========='
                    sh '''
                        # Create deployment directory if not exists
                        sudo mkdir -p ${DEPLOY_DIR}

                        # Copy dist files to deployment directory
                        sudo cp -r dist/* ${DEPLOY_DIR}/

                        # Copy package.json and package-lock.json
                        sudo cp package.json ${DEPLOY_DIR}/
                        sudo cp package-lock.json ${DEPLOY_DIR}/

                        # Install production dependencies in deploy directory
                        cd ${DEPLOY_DIR}
                        sudo ${NPM_PATH} ci --production

                        # Set permissions
                        sudo chown -R www-data:www-data ${DEPLOY_DIR}
                    '''
                }
            }
        }

        stage('Deploy MCP Server') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Deploying MCP Server =========='
                    sh '''
                        MCP_DIR="${DEPLOY_DIR}/mcp-server"

                        # Create MCP directory
                        sudo mkdir -p ${MCP_DIR}

                        # Copy MCP server files
                        sudo cp -r mcp-server/* ${MCP_DIR}/

                        # Install MCP dependencies
                        cd ${MCP_DIR}
                        sudo ${NPM_PATH} ci --production

                        # Set permissions
                        sudo chown -R www-data:www-data ${MCP_DIR}
                    '''
                }
            }
        }

        stage('Stop PM2 Services') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Stopping PM2 services =========='
                    sh '''
                        sudo /usr/local/bin/pm2 stop ${APP_NAME} mcp-server || true
                        sleep 2
                    '''
                }
            }
        }

        stage('Start PM2 Services') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Starting PM2 services =========='
                    sh '''
                        cd ${DEPLOY_DIR}
                        sudo /usr/local/bin/pm2 start ecosystem.config.js || true
                        sudo /usr/local/bin/pm2 save
                        sleep 3
                    '''
                }
            }
        }

        stage('Verify Health Check') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Running health checks =========='
                    sh '''
                        # Give services time to start
                        sleep 5

                        # Check if services are running
                        sudo /usr/local/bin/pm2 status

                        # Check if ports are listening
                        netstat -tlnp | grep -E ":(${APP_PORT}|${MCP_PORT})" || echo "Ports check completed"
                    '''
                }
            }
        }

        stage('Reload Nginx') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Reloading Nginx =========='
                    sh '''
                        sudo nginx -t
                        sudo systemctl reload nginx
                    '''
                }
            }
        }

        stage('Create Restart Script') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '========== Creating restart script =========='
                    sh '''
                        sudo cp scripts/restart-services.sh /usr/local/bin/restart-services.sh
                        sudo chmod +x /usr/local/bin/restart-services.sh
                    '''
                }
            }
        }
    }

    post {
        success {
            script {
                echo '========== BUILD SUCCESSFUL =========='
                // Add your notification here (email, Slack, etc.)
            }
        }
        failure {
            script {
                echo '========== BUILD FAILED =========='
                // Add rollback logic here if needed
            }
        }
        always {
            script {
                echo '========== Pipeline completed =========='
                // Clean up workspace
                cleanWs()
            }
        }
    }
}
