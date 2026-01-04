#!/bin/bash
# Configure passwordless sudo for Jenkins user
# Run this script with sudo on your Jenkins server

JENKINS_USER="jenkins"

# Check if user exists
if ! id "$JENKINS_USER" &>/dev/null; then
    echo "Error: Jenkins user '$JENKINS_USER' does not exist"
    exit 1
fi

# Create sudoers entry for Jenkins
cat > /etc/sudoers.d/jenkins << EOF
# Allow jenkins user to run deployment commands without password
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/mkdir
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/cp
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/chown
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/chmod
$JENKINS_USER ALL=(ALL) NOPASSWD: /usr/local/bin/npm
$JENKINS_USER ALL=(ALL) NOPASSWD: /usr/bin/pm2
$JENKINS_USER ALL=(ALL) NOPASSWD: /usr/sbin/nginx
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/systemctl
$JENKINS_USER ALL=(ALL) NOPASSWD: /bin/cp
EOF

# Set correct permissions
chmod 0440 /etc/sudoers.d/jenkins

# Verify sudoers syntax
if visudo -c -f /etc/sudoers.d/jenkins; then
    echo "✓ Jenkins sudoers configuration updated successfully"
    echo "Jenkins user can now run deployment commands without a password"
else
    echo "✗ Error in sudoers configuration"
    rm /etc/sudoers.d/jenkins
    exit 1
fi
