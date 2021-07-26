<template>
  <b-container fluid>
    <b-row class="my-1 justify-content-center">
      <b-col sm="9">
        <h2>Catalogo Ingredientes</h2>
        <b-form-input
          id="busqueda"
          type="search"
          placeholder="Ingrese algun parametro de busqueda"
        ></b-form-input>
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
      items: [],
    };
  },
  mounted() {
    this.listarIngredientes()
  },
  methods: {
    async listarIngredientes() {
      const { data } = await Api.listIngredients();
      console.log(data)
    },
  },
};
</script>

<style>
</style>