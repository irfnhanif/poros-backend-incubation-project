### Command for Creating Development Container
```
docker run -dp 3000:3000 \
-w /poros-backend-incubation-project --mount type=bind,src="$(pwd)",target=/poros-backend-incubation-project \   
node:18-alpine \  
sh -c "npm install && npm run dev"
```
