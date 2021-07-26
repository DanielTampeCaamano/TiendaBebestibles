import axios from 'axios'

var options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
  headers: {
    'x-rapidapi-key': '961e8f6d88msh3a847341ea7a39cp1f4bf1jsnb2b772990387',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});