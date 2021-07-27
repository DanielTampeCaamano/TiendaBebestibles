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
          <b-button
            class="mt-2"
            type="submit"
            variant="primary"
            @click="buscarIngredientePorNombre()"
            >Buscar</b-button
          >
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-5 justify-content-center">
      <b-container>
        <!--<b-table hover :items="items" :fields="resultados">
          <template #cell(actions)="row">
            <b-button
              variant="danger"
              size="sm"
              @click="agregarMezcla(row.item._id)"
            >
              Agregar a la mezcla
            </b-button>
          </template>
        </b-table>-->
        <div v-if="resultadosFiltrados.length >= 1">
          <select
            class="form-select" aria-label="Default select example"
            id="select_filter"
          >
            <option
              v-for="(resultados, index) in resultadosFiltrados"
              :key="index"
              :id="index"
            >
              {{ resultados.strIngredient }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="agregarIngredienteATabla()"
          >
            Primary
          </button>
        </div>
      </b-container>
    </b-row>
    <b-row class="mt-5 justify-content-center">
      <b-container>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Es bebida alcolica?</th>
              <th scope="col">Precio</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="drink in contenidosTabla" :key="drink.idIngredient">
              <td>
                {{drink.strIngredient}}
              </td>
              <td>
                {{ drink.strAlcohol === "Yes" ? "Si" : "No" }}
              </td>
              <td>
                {{ drink.idIngredient }}
              </td>
            </tr>
            
          </tbody>
        </table>
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
      resultadosFiltrados: [],
      contenidosTabla: [],
    };
  },
  mounted() {},
  methods: {
    async listarIngredientes() {
      const { data } = await Api.filterByIngredients(this.criteria);
      this.resultados = data.drinks;
      //console.log(data.drinks);
    },
    async buscarIngredientePorNombre() {
      const nombre = document.getElementById("busqueda").value;
      const data = await Api.searchIngredient(nombre);
      if (data.ingredients == null) {
        alert("No se encontraron ingredientes con ese nombre");
      } else {
        this.resultadosFiltrados.push(data.ingredients[0]);
      }
    },
    agregarIngredienteATabla() {
      const index = document.getElementById("select_filter").selectedIndex;
      this.contenidosTabla.push(this.resultadosFiltrados[index]);
      console.log(this.contenidosTabla);
    },
  },
};
</script>

<style>
</style>