### Command for Creating Development Container
```
docker run -dp 3000:3000 \
   -w /app -v "$(pwd):/app" \
   --network bookshelf \
   -e MYSQL_HOST=mysql \
   -e MYSQL_USER=root \
   -e MYSQL_PASSWORD=secret \
   -e MYSQL_DB=books \
   node:18-alpine \
   sh -c "npm install && npm run dev"
```
