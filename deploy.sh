scp -vvv -i deploy_key.pem -r $TRAVIS_BUILD_DIR/dist $USER@$HOST:/home/ubuntu
echo "Everything passed"
exit 0