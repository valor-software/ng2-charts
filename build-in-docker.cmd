pushd docker
docker build . -t test
popd
docker run --rm -v %CD%:/mnt test
