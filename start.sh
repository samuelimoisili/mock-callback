# don't use this script if you don't have cht-interoperabity docker container running

docker build . -t interop/callback
docker run -p 8000:8000 --network=cht-net --name=callback -d interop/callback