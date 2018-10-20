## Fashow :fire: 

Fashow is the `Dribble` for fashion designers.

Setup the app on your machine: <br>
1. git clone this repo <br>
2. install kibana and elastic search and run them. Links: <a href='https://www.elastic.co/downloads/elasticsearch'>Elasicsearch</a> <a href='https://www.elastic.co/downloads/kibana'>Kibana</a> <br>
3. Create 2 elasticsearch indexes. `trendbucks_users` and `trendbucks_challenges`: in Kibana's devtools console, run: <br>

```javascript
PUT trendbucks_challenges/
{
  "settings": {
    "blocks.read_only": false,
    "blocks.read": false,
    "blocks.write": false,
    "blocks.metadata": false
  }
}
```
<br> and <br>

```javascript
PUT trendbucks_user/
{
  "settings": {
    "blocks.read_only": false,
    "blocks.read": false,
    "blocks.write": false,
    "blocks.metadata": false
  }
}
   
```
2. run `npm install` to install all dependencies needed. <br>
3. make .env file, supply every api key and endpoints specified in .env.sample. <br>
3. run `npm start` to get the server up and running. <br>
