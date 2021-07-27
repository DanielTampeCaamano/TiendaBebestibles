<template>
  <b-container fluid>
    <b-row class="my-1 justify-content-center">
      <b-col sm="9">
        <h2>Busqueda</h2>
        <b-form @submit.prevent="buscarItem()">
          <b-form-input
            @click="agregarItem()"
            id="busqueda"
            type="search"
            placeholder="Ingrese algun parametro de busqueda"
          ></b-form-input>
          <b-form-select v-model="alcoholFiltroSelected" :options="alcoholFiltro"></b-form-select>
          <b-form-select v-model="copaFiltroSelected" :options="copaFiltro"></b-form-select>
          <b-form-select v-model="categoriasFiltroSelected" :options="categoriasFiltro"></b-form-select>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="my-1 justify-content-center">
      <b-container>
        <b-table hover :items="items" :fields="fields">
          <template #cell(actions)="row">
            <b-button
              variant="danger"
              size="sm"
              @click="deleteUser(row.item._id)"
            >
              Eliminar
            </b-button>
          </template>
        </b-table>
        <b-button variant="primary" class="mb-4" @click="agregarCarrito()">
          Agregar al carrito
        </b-button>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
// import carritoService from "@/services/user.service";
import api from "@/services/api.cocktails.js";
export default {
  name: "Home",
  data() {
    return {

      fields: [
        {
          key: "item",
          label: "Item",
          sortable: true,
        },
        {
          key: "precio",
          label: "Precio",
          sortable: true,
        },
        { key: "actions", label: "Actions" },
      ],
      alcoholFiltro:[],
      alcoholFiltroSelected:'',
      copaFiltro:[],
      copaFiltroSelected:'',
      categoriasFiltro:[],
      categoriasFiltroSelected:'',
      items: [],
      populares: [],
      latest: [],
    };
  },
  mounted() {
    this.getPopulares();
    this.getUltimos();
    this.getGlasses();
    this.getCategories();
    this.getAlcoholFilters();
  },
  methods: {
    async getAlcoholFilters(){
      const {data} = await api.listAlcoholicFilters()
      console.log(data)
      this.alcoholFiltro = data.drinks.map((alcohol) => alcohol.strAlcoholic)
    },
    async getCategories(){
      const {data} = await api.listCategories()
      //console.log(data)
      this.categoriasFiltro = data.drinks.map((categoria) => categoria.strCategory)
    },
    async getGlasses(){
      const {data} = await api.listGlasses()
      //console.log(data)
      this.copaFiltro = data.drinks.map((copa) => copa.strGlass)
    },
    async getPopulares() {
      const { data } = await api.popularCocktails();
      this.populares = data.drinks;
      //console.log(data.drinks);
    },
    async getUltimos() {
      const { data } = await api.latestCocktails();
      this.latest = data.drinks;
      //console.log(data.drinks);
    },
    agregarCarrito() {},
    agregarItem() {},
  },
};
</script>
