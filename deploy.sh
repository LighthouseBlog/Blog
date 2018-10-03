docker stop "$(docker ps -q)"
docker-compose -f docker-compose.prod.yml rm -f blog-api
docker-compose -f docker-compose.prod.yml build --no-cache blog-api
docker-compose -f docker-compose.prod.yml up --force-recreate -d
docker rmi $(docker images -a | grep "^<none>" | awk '{print $3}')
