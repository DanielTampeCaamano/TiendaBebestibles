<template>
  <b-container>
    <b-row class="mt-5 justify-content-center">
      <b-col lg="5" md="7">
        <b-card no-body class="mb-0">
          <b-card-body class="p-5">
            <h2 class="mb-5">Registro</h2>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form
                role="registerForm"
                @submit.prevent="handleSubmit(saveUser)"
                @reset="resetForm"
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

                <base-input
                  class="mb-3"
                  name="contraseña"
                  type="password"
                  placeholder="Password"
                  rules="required|min:6"
                  v-model="user.password"
                >
                </base-input>

                <div class="text-center mt-4">
                  <b-button class="mx-1" type="reset"> Limpiar </b-button>
                  <b-button class="mx-1" variant="primary" type="submit">
                    Crear Cuenta
                  </b-button>
                </div>
              </b-form>
            </ValidationObserver>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    saveUser() {
      authService
        .register(this.user)
        .then(() => {
          this.$swal({
            icon: "success",
            title: "Usuario creado con exito",
          }).then(() => {
            this.$router.push("/auth/login");
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
    resetForm() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
  },
};
</script>