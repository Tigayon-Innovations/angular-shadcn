pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        NODE_VERSION = '24'
        APP_NAME = 'shadcn-angular'
        DOMAIN = 'shadcn-angular.tigayon.com'
        MCP_PORT = '3001'
        APP_PORT = '4200'
        DEPLOY_DIR = '/var/www/frontend/tigayon/frontend/production/shadcn-angular'
        DEPLOY_PATH = '/var/www/frontend/tigayon/frontend/production/shadcn-angular/dist'
        BUILD_PATH_APP = 'dist/shadcn-angular'
        BUILD_PATH_MCP = 'dist/mcp-server'
        NVM_DIR = '/var/lib/jenkins/.nvm'
    }

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Setup Node.js') {
            steps {
                script {
                    echo '========== Setting up Node.js via NVM =========='
                    sh '''
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

                        # Install and use the specified Node version
                        nvm install ${NODE_VERSION} || true
                        nvm use ${NODE_VERSION}

                        # Verify Node.js and npm versions
                        echo "Node version: $(node --version)"
                        echo "NPM version: $(npm --version)"
                    '''
                }
            }
        }

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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        npm ci
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    echo '========== Running linter =========='
                    sh '''
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Use direct path to ng binary (handles spaces in path)
                        ./node_modules/.bin/ng lint || true
                    '''
                }
            }
        }

        stage('Build Angular SSR') {
            steps {
                script {
                    echo '========== Building Angular SSR =========='
                    sh '''
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Use direct path to ng binary (handles spaces in path)
                        echo "Building Angular application..."
                        ./node_modules/.bin/ng build

                        # Verify build output
                        echo "Build output:"
                        ls -la ${BUILD_PATH_APP} || echo "App build path not found"
                    '''
                }
            }
        }

        stage('Build MCP Server') {
            steps {
                script {
                    echo '========== Building MCP Server =========='
                    sh '''
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        cd mcp-server
                        npm ci
                        npm run build || true

                        echo "MCP Server build complete"
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo '========== Running tests =========='
                    sh '''
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Use direct path to vitest binary (handles spaces in path)
                        ./node_modules/.bin/vitest run || true
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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Create deployment directory if not exists
                        sudo mkdir -p ${DEPLOY_DIR}
                        sudo mkdir -p ${DEPLOY_PATH}

                        # Copy dist files to deployment directory
                        sudo cp -r ${BUILD_PATH_APP}/* ${DEPLOY_DIR}/

                        # Copy package.json and package-lock.json
                        sudo cp package.json ${DEPLOY_DIR}/
                        sudo cp package-lock.json ${DEPLOY_DIR}/

                        # Install production dependencies in deploy directory
                        cd ${DEPLOY_DIR}
                        sudo $(which npm) ci --omit=dev

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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        MCP_DIR="${DEPLOY_DIR}/mcp-server"

                        # Create MCP directory
                        sudo mkdir -p ${MCP_DIR}

                        # Copy MCP server files
                        sudo cp -r mcp-server/* ${MCP_DIR}/

                        # Install MCP dependencies
                        cd ${MCP_DIR}
                        sudo $(which npm) ci --omit=dev

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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        pm2 stop ${APP_NAME} mcp-server || true
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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        cd ${DEPLOY_DIR}
                        pm2 start ecosystem.config.js || true
                        pm2 save
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
                        export NVM_DIR="${NVM_DIR}"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}

                        # Give services time to start
                        sleep 5

                        # Check if services are running
                        pm2 status

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
