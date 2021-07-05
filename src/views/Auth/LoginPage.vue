<template>
  <b-container>
    <b-row class="mt-5 justify-content-center">
      <b-col lg="5" md="7">
        <b-card no-body class="mb-0">
          <b-card-body class="p-5">
            <h2 class="mb-5">Iniciar Sesión</h2>

            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form role="loginForm" @submit.prevent="handleSubmit(login)">
                <base-input
                  class="mb-3"
                  name="email"
                  type="email"
                  placeholder="Email"
                  rules="required|email"
                  v-model="credenciales.email"
                >
                </base-input>

                <base-input
                  class="mb-3"
                  name="contraseña"
                  type="password"
                  placeholder="Password"
                  rules="required|min:6"
                  v-model="credenciales.password"
                >
                </base-input>

                <div class="text-center">
                  <b-button block variant="primary" type="submit" class="my-4">
                    Iniciar Sesión
                  </b-button>
                </div>
              </b-form>
            </ValidationObserver>
            <router-link to="/auth/forgot-password">
              ¿Olvidaste tu contraseña?
            </router-link>
            <div class="dropdown-divider"></div>
            <b-button block variant="success" to="/auth/register" class="mt-4">
              Crear cuenta
            </b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import { mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      loginForm: true,
      credenciales: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      authService
        .login(this.credenciales)
        .then((response) => {
          const { user, token } = response.data;
          this.setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          this.$router.push("/profile");
          this.$swal({
            title: `Bienvenido ${user.firstName} ${user.lastName}`,
            icon: "success",
            showConfirmButton: false,
            position: "top-end",
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