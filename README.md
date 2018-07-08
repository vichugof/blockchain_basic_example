## Custom

1. Create docker network
```
docker network create chainnet_example
```

2. Inspect network created
```
docker network inspect chainnet_example
```

3. Create containers
```
docker build -t blockchain .

docker build -t blockchain_client .
```

4. Run nodes
```
docker run --name chainhost1 --net chainnet_example --rm -p 82:5000 blockchain

docker run --name chainhost2 --net chainnet_example --rm -p 83:5000 blockchain

docker run --name chainhost3 --net chainnet_example --rm -p 84:5000 blockchain

docker run --name chainhost4 --net chainnet_example --rm -p 85:8080 blockchain_client
```

5. Access to container
```
docker exec -it chainhost1 sh

docker exec -it chainhost2 sh

docker exec -it chainhost3 sh

docker exec -it chainhost4 sh
```