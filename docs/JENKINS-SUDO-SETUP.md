# Jenkins Sudo Configuration Guide

## Problem
Jenkins pipeline is prompting for a password when running `sudo` commands. This causes the build to fail.

## Solution
Configure passwordless sudo for the Jenkins user to run deployment commands.

### Step 1: Run the configuration script on your server

SSH into your Jenkins server and run:

```bash
sudo bash /var/www/frontend/scripts/configure-jenkins-sudo.sh
```

Or if you have the script available locally:

```bash
sudo bash ./scripts/configure-jenkins-sudo.sh
```

### Step 2: Verify the configuration

Test that sudo works without a password:

```bash
# As the jenkins user
sudo -u jenkins sudo mkdir -p /tmp/test
sudo -u jenkins sudo cp /etc/hosts /tmp/test/
```

These should complete without prompting for a password.

### Step 3: Restart Jenkins (optional)

If the build still fails, restart Jenkins:

```bash
sudo systemctl restart jenkins
```

## Manual Configuration

If you prefer to configure it manually, add this to `/etc/sudoers` using `visudo`:

```bash
# Allow jenkins user specific commands without password
jenkins ALL=(ALL) NOPASSWD: /bin/mkdir
jenkins ALL=(ALL) NOPASSWD: /bin/cp
jenkins ALL=(ALL) NOPASSWD: /bin/chown
jenkins ALL=(ALL) NOPASSWD: /bin/chmod
jenkins ALL=(ALL) NOPASSWD: /usr/local/bin/npm
jenkins ALL=(ALL) NOPASSWD: /usr/bin/pm2
jenkins ALL=(ALL) NOPASSWD: /usr/sbin/nginx
jenkins ALL=(ALL) NOPASSWD: /bin/systemctl
```

**IMPORTANT:** Always use `visudo` to edit sudoers files to prevent syntax errors!

## Alternative: Use /etc/sudoers.d

Create a new file `/etc/sudoers.d/jenkins` with root ownership:

```bash
sudo visudo -f /etc/sudoers.d/jenkins
```

Add the same content above, then save and exit.

Verify:
```bash
sudo visudo -c -f /etc/sudoers.d/jenkins
```

## Security Notes

- These commands are specific to the deployment process
- The jenkins user should already be created by the Jenkins installation
- If jenkins user doesn't exist, create it: `sudo useradd -m -s /bin/bash jenkins`
- Restrict these commands to the specific paths used in your deployment
- Review and update paths based on your actual npm, pm2, and nginx installations

## Debugging

If you still get password prompts, check:

1. Jenkins is running as the `jenkins` user:
   ```bash
   ps aux | grep jenkins
   ```

2. The sudoers configuration is correct:
   ```bash
   sudo -l -U jenkins
   ```

3. The paths in sudoers match your system:
   ```bash
   which mkdir cp chown chmod npm pm2 nginx systemctl
   ```
