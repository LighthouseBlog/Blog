#!/bin/bash
sudo apt-get update
sudo apt-get install build-essential tcl

# Retreive the latest version of redis
cd /tmp
curl -O http://download.redis.io/redis-stable.tar.gz
tar xzvf redis-stable.tar.gz
cd redis-stable
make
make test
sudo make install

sudo mkdir /etc/redis
sudo cp /tmp/redis-stable/redis.conf /etc/redis

echo "At this point, you will need to configure the redis conf file to start automatically with systemd. Refer to this article"
echo "https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04"

# Retrieve the latest version of mongo
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo "At this point, you will need to configure the mongo service to run with systemd. Refer to this article"
echo "https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04"

# Get nginx
sudo add-apt-repository -y ppa:nginx/stable
sudo apt-get update
sudo apt-get install -qq nginx

# NVM (Node manager)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
command -v nvm
nvm install node

# NPM (Node package manager)
npm install -g npm
npm install forever -g

# Certbot
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
sudo ufw allow 80

echo "As this point, you will need to configure the certbot to generate a standalone certificate for your url. See these articles"
echo "https://certbot.eff.org/#ubuntuxenial-other"
echo "https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates"


