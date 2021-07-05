<template>
  <b-container>
    <h2 class="my-4">Usuarios</h2>
    <admin-create-user @loaddUsers="getUsers" />
    <b-table hover :items="users" :fields="fields">
      <template #cell(actions)="row">
        <b-button variant="danger" size="sm" @click="deleteUser(row.item._id)">
          Eliminar
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import userService from "@/services/user.service";
export default {
  data() {
    return {
      fields: [
        {
          key: "firstName",
          label: "Nombres",
          sortable: true,
        },
        {
          key: "lastName",
          label: "Apellidos",
          sortable: true,
        },
        {
          key: "email",
          label: "Correo electrónico",
          sortable: true,
        },
        {
          key: "role",
          label: "Rol",
          sortable: true,
        },
        { key: "actions", label: "Actions" },
      ],
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      userService.all().then(({ data }) => {
        this.users = data;
      });
    },
    deleteUser(id) {
      this.$swal({
        title: "¿Estás seguro?",
        text: "Tu no puedes revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Cancelar",
        cancelButtonText: "Eliminar",
      }).then((result) => {
        if (!result.isConfirmed) {
          userService.delete(id).then(
            () => {
              this.users = this.users.filter((user) => user._id !== id);
              this.$swal(
                "Usuario eliminado",
                "El usuario fue eliminado con éxito",
                "success"
              );
            },
            (error) => {
              this.$swal("Error", error.response.data.error, "error");
            }
          );
        }
      });
    },
  },
};
</script>
