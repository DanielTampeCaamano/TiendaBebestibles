<template>
  <b-card class="px-2">
    <h3 class="mb-3">Editar Perfil</h3>

    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <b-form
        role="updateProfileForm"
        @submit.prevent="handleSubmit(updateProfile)"
      >
        <base-input
          class="mb-3"
          name="nombre"
          placeholder="Nombre"
          rules="required|min:2"
          v-model="user.firstName"
        >
        </base-input>

        <base-input
          class="mb-3"
          name="apellido"
          placeholder="Apellido"
          rules="required|min:2"
          v-model="user.lastName"
        >
        </base-input>

        <base-input
          class="mb-3"
          name="email"
          type="email"
          placeholder="Email"
          rules="required|email"
          v-model="user.email"
        >
        </base-input>

        <b-row class="justify-content-center mt-4">
          <profile-password-dialog />
          <b-button class="mx-1" variant="primary" type="submit">
            Actualizar Perfil
          </b-button>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-card>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  computed: {
    ...mapState({ currentUser: (state) => state.user }),
  },
  mounted() {
    this.setForm();
  },
  methods: {
    ...mapMutations(["setUser"]),
    setForm() {
      // Seteamos nuestro formulario con los datos del usuario
      const { firstName, lastName, email } = this.currentUser;
      this.user = { firstName, lastName, email };
    },
    updateProfile() {
      authService
        .updateProfile(this.user, this.currentUser._id)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setUser(data.user);
          this.$swal({
            title: "Usuario actualizado con éxito",
            icon: "success",
            showConfirmButton: false,
            position: "bottom-end",
            timer: 1200,
            toast: true,
          });
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            title: `Error`,
            text: error.response.data.error,
          });
        });
    },
  },
};
</script>