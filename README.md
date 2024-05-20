# ViViApplication
Application Web

npm install
npm start

--
Port 3000
--

curl --location 'localhost:3000/api/rooms' \
--header 'Content-Type: application/json' \
--data '{"name":"RoomName"}'


curl --location 'localhost:3000/api/queues/664bbf4e3a0c4be6d7adf2e7/musics/' \
--header 'Content-Type: application/json' \
--data '{"url":"4"}'


curl --location --request PUT 'localhost:3000/api/queues/664bbf4e3a0c4be6d7adf2e7/musics/664bbf5b3a0c4be6d7adf2ec/validate' \
--header 'Content-Type: application/json' \
--data '{
"url":"https://www.youtube.com/watch?v=s3b2ssKmn2I&list=RDs3b2ssKmn2I&start_radio=1"
}'

curl --location --request PUT 'localhost:3000/api/queues/664bbf4e3a0c4be6d7adf2e7/musics/664bbf5b3a0c4be6d7adf2ec/skip'
