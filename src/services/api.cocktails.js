import axios from 'axios'
class ApiCocktails {
    constructor() {
        this.resource = axios.create({
            baseURL: 'https://the-cocktail-db.p.rapidapi.com/',
            headers: {
                common: {
                    'x-rapidapi-key': '71822baeb0msh7bfd75da728cd02p19fc54jsn2a4aed6719b2',
                    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
                }
            }
        })
    }
    randomCocktail() {
        return this.resource.get('random.php')
    }
    popularCocktails(){
        return this.resource.get('popular.php').then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    latestCocktails(){
        return this.resource.get('latest.php').then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    listAlcoholicFilters(){
        return this.resource.get('list.php',{params: {a:'list'}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    listGlasses(){
        return this.resource.get('list.php',{params: {g:'list'}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    listIngredients(){
        var axios = require("axios").default;

        var options = {
          method: 'GET',
          url: 'https://the-cocktail-db.p.rapidapi.com/list.php',
          params: {i: 'list'},
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
    }
    listCategories(){
        return this.resource.get('list.php',{params: {c:'list'}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    filterByIngredients(nombres){
        return this.resource.get('filter.php',{params: {i:`${nombres}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    filterDrinksByType(tipo){
        return this.resource.get('filter.php',{params: {a:`${tipo}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    filterDrinksByCategory(categoria){
        return this.resource.get('filter.php',{params: {i:`${categoria}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    lookupIngredientById(id){
        return this.resource.get('lookup.php',{params: {iid:`${id}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    lookupCocktailById(id){
        return this.resource.get('search.php',{params: {i:`${id}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    searchCocktail(nombre){
        return this.resource.get('search.php',{params: {i:`${nombre}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    searchIngredient(ingrediente){
        return this.resource.get('search.php',{params: {i:`${ingrediente}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    searchByIngredient(ingrediente){
        return this.resource.get('filter.php',{params: {i:`${ingrediente}`}}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

export default ApiCocktails
