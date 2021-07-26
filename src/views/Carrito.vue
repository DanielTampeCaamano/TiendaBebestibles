<template>
  <b-container fluid>
      <h2>Carrito</h2>
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
      <b-button variant="primary" class="mb-4"> Comprar </b-button>
    </b-container>
  </b-container>
</template>

<script>
import Carrito from '@/services/carrito.service'
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
      
  },
  methods: {
    async recuperarCarrito(){
        const { data } = await Carrito.getCarritoFromUser()
        this.items= data.carrito;
    }
  },
};
</script>

<style>
</style>