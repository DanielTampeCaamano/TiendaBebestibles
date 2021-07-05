<template>
  <v-container fluid>
    <b-row class="mt-5" align-h="center">
      <b-col lg="5" md="7">
        <b-card>
          <h2>Restablecer contraseña</h2>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <b-form
              role="resetPasswordForm"
              @submit.prevent="handleSubmit(resetPassword)"
            >
              <base-input
                class="mb-3"
                name="Nueva Contraseña"
                type="password"
                placeholder="Nueva Contraseña"
                rules="required|min:6"
                v-model="resetPasswordForm.password"
              />
              <base-input
                class="mb-3"
                name="Repetir Contraseña"
                type="password"
                placeholder="Repetir Contraseña"
                rules="required|min:6"
                v-model="resetPasswordForm.confirmPassword"
              />
              <b-button variant="primary" block type="submit">
                Restablecer contraseña
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
      resetPasswordForm: {
        confirmPassword: "",
        password: "",
      },
      token: null,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    resetPassword() {
      authService
        .resetPassword({ token: this.token, ...this.resetPasswordForm })
        .then(
          (response) => {
            this.$router.push("/auth/login");
            this.$swal({
              title: response.data.message,
              icon: "success",
              showConfirmButton: false,
              position: "top-end",
              timer: 1200,
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
