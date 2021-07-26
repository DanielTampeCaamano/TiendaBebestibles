<template>
  <b-container fluid>
    <b-row class="my-1 justify-content-center">
      <b-col sm="9">
        <h2>Catalogo Ingredientes</h2>
        <b-form @submit.prevent="filtrarIngredientes">
          <b-form-input
            v-model="form.criterioBusqueda"
            id="busqueda"
            type="search"
            placeholder="Ingrese ingrediente, categoria o tipo que desea buscar "
          ></b-form-input>
          <b-button type="submit" variant="primary" class="mt-3">
            Buscar
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-5 justify-content-center">
      <b-container>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Ingredientes</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drink, index) in items" :key="index">
              <th scope="col">{{ drink.strIngredient1 }}</th>
              
            </tr>
          </tbody>
        </table>
        <b-button variant="primary" class="mb-4"> Agregar al carrito </b-button>
      </b-container>
    </b-row>
  </b-container>
</template>

<script>
import Api from "@/services/api.cocktails.js";
export default {
  data() {
    return {
      fields: [
        {
          key: "strIngredient1",
          label: "Item",
          sortable: true,
        },
      ],
      items: [],
      form: {
        criterioBusqueda: "",
      },
    };
  },
  mounted() {
    this.listarIngredientes();
  },
  methods: {
    async listarIngredientes() {
      const { data } = await Api.listIngredients();
      console.log(data.drinks);
      this.items = data.drinks;
    },
    async filtrarIngredientes() {
      this.fields.key = "strDrink";
      const { data } = await Api.searchIngredient(
        this.form.criterioBusqueda
      );
      console.log(data.drinks);
      this.items = data.drinks;
    },
  },
};
</script>

<style>
</style>