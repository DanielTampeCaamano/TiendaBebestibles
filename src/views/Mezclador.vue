<template>
  <b-container fluid>
    <b-row class="my-1 justify-content-center">
      <b-col sm="9">
        <h2>Mezclador</h2>
        <b-form @submit.prevent="listarIngredientes()">
          <b-form-input
            v-model="criteria"
            id="busqueda"
            type="search"
            placeholder="Ingrese algun parametro de busqueda para comenzar a mezclar"
          ></b-form-input>
          <b-button class="mt-2" type="submit" variant="primary">Buscar</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-5 justify-content-center">
      <b-container>
        <b-table hover :items="items" :fields="resultados">
          <template #cell(actions)="row">
            <b-button
              variant="danger"
              size="sm"
              @click="agregarMezcla(row.item._id)"
            >
              Agregar a la mezcla
            </b-button>
          </template>
        </b-table>
      </b-container>
    </b-row>
    <b-row class="mt-5 justify-content-center">
      <b-container>
        <b-table hover :items="mezcla" :fields="fields">
          
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
      criteria: "",
      mezcla: [],
      resultados: [
        {
          key: "strDrink",
          label: "Ingrediente",
          sortable: true,
        },
        {
          key: "precio",
          label: "Precio",
          sortable: true,
        },
        { key: "actions", label: "Action" },
      ],
      fields: [
        {
          key: "strDrink",
          label: "Ingrediente",
          sortable: true,
        },
        {
          key: "strDrinkThumb",
          label: "Precio",
        },
        { key: "actions", label: "Action" },
      ],
      items: [],
    };
  },
  mounted() {},
  methods: {
    async listarIngredientes() {
      const { data } = await Api.filterByIngredients(this.criteria);
      this.resultados = data.drinks;
      console.log(data.drinks)
    },
  },
};
</script>

<style>
</style>