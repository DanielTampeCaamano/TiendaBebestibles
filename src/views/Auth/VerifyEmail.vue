<template>
  <v-container fluid>
    <b-row class="mt-5" align-h="center">
      <b-col lg="5" md="7">
        <b-card>
          <h2>Verificar Usuario</h2>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-form
              role="resetPasswordForm"
              @submit.prevent="handleSubmit(verifyEmail)"
            >
              <base-input
                class="mb-3"
                name="Nueva Contraseña"
                type="password"
                placeholder="Contraseña"
                rules="required|min:6"
                v-model="credentials.password"
              />
              <base-input
                class="mb-3"
                name="Repetir Contraseña"
                type="password"
                placeholder="Repetir Contraseña"
                rules="required|min:6"
                v-model="credentials.confirmPassword"
              />
              <b-button variant="primary" block type="submit">
                Verificar
              </b-button>
            </b-form>
          </ValidationObserver>
        </b-card>
      </b-col>
    </b-row>
  </v-container>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      credentials: {
        password: "",
        confirmPassword: "",
      },
      token: null,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    verifyEmail() {
      authService.verifyEmail({ token: this.token, ...this.credentials }).then(
        (response) => {
          this.$router.push("/auth/login");
          this.$swal({
            title: response.data.message,
            icon: "success",
            showConfirmButton: false,
            position: "top-end",
            timer: 2000,
            toast: true,
          });
        },
        (error) => {
          this.$swal({
            icon: "error",
            title: `Error`,
            text: error.response.data.error,
          });
        }
      );
    },
  },
};
</script>
