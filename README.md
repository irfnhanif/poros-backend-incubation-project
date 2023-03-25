# Proyek Inkubasi Backend POROS Kelompok 2
**Kelompok 2:**
1. Irfan Hanif Habibi (BE)
2. Ndaniel Mahulae (BE)
3. Hilmisyah Nabil (FE)

*NB: Semua perintah di bawah dilakukan pada direktori root dari proyek*

1. Membuat Image Aplikasi Node.js
```
docker build . -t <username-anda>/poros-backend-incubation-project
```

2. Membuat Kontainer Database MySQL
```
docker run -d \
     --network bookshelf --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=books \
     mysql:8.0
```

3. Membuat Kontainer Aplikasi Node.js dari Image
``` 
docker run -dp 3000:3000 --network bookshelf <username-anda>/poros-backend-incubation-project
```


### Perintah untuk Membuat Kontainer Pengembangan Dengan Nodemon
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
