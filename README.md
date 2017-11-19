# Lighthouse Blog

[![Greenkeeper badge](https://badges.greenkeeper.io/LighthouseBlog/Blog.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/LighthouseBlog/Blog.svg?branch=master)](https://travis-ci.org/LighthouseBlog/Blog)

### Authors
Sam Pastoriza

### About
This is my personal blog that documents everything that I have questions about and did not find simple answers to. Every article is supplemented by a github repository belonging to the LighthouseBlog organization that I started and will be maintained.

#### Blog Topics
At some point, I will complete all or most of these topics
* Testing all files using jasmine
* Testing a C# Web application
* Refactoring an angular application into modules
* Jasmine mocking prototypes
* Setting up an backend express server into testable modules
* Jasmine testing asynchronous functions
* Generic login application with JWT
    * ExpressJS middleware
    * ReactJS, Angular frontends
* Holy grail layout and modifications
* Spring Application with JWT
* Publishing an npm package, including CI
* Setting up Webpack for Express (Include Node modules issues)
* Mastering a web application framework
    * Understand the fundamentals
    * Build a full stack application
    * Build a component
* Common Layouts (HTML, CSS, flexbox)
* C# Web API Starter
* C# Convert HTML to Word
    * Input: An HTML element id
    * Output: A fully formed word document, including images (must be urls though)


### Setup
#### Lets Encrypt

1. Add both the service and timer to the /etc/systemd/system folder
2. Run the following commands to get your certificate renewed daily
``` bash
$ sudo systemctl daemon-reload
$ sudo systemctl start letsencrypt.timer
$ sudo systemctl enable letsencrypt.timer
```
3. If you want to view information about the service and timer that you set up (for diagnostics eg)
``` bash
$ sudo systemctl list-timers
$ sudo journalctl -u letsencrypt
$ sudo journalctl -u letsencrypt --since="yesterday"
```

#### Setup a 16.04 server to run this blog

Note: This is a bash script that has been tested minimally. I will update it as needed.

1. Run the script called `setup.10.04.sh`
2. The following programs should be installed
    * Redis (run as a service)
    * Mongo (run as a service)
    * Nginx
    * NVM
    * NPM (Forever to run the blog)
    * Certbot

3. To complete the installation, the following must be done
    * Setup the service files for redis and mongo (See the articles referenced in the script)
    * Add the nginx file provided in this project to the sites-enabled folder (See this [tutorial](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)). Disregard the section about creating the certificate. Replace there location of that certificate with the one created by certbot.
    * Using the certbot tools, create a certificate for your url (See the article referenced in the script)