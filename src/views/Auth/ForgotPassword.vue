<template>
  <b-container fluid>
    <b-row class="mt-5" align-h="center">
      <b-col lg="5" md="7">
        <b-overlay :show="isLoading" rounded="sm" v-if="!linkSent">
          <b-card>
            <h2>Restablecer contraseña</h2>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <b-form role="loginForm" @submit.prevent="handleSubmit(sendLink)">
                <base-input
                  class="mb-3"
                  name="email"
                  type="email"
                  label="Introduce tu Correo electrónico"
                  placeholder="Email"
                  rules="required|email"
                  v-model="email"
                />
                <b-button
                  variant="success"
                  block
                  type="submit"
                  :disabled="isLoading"
                >
                  Enviar enlace de restablecimiento
                </b-button>
              </b-form>
            </ValidationObserver>
          </b-card>
        </b-overlay>
        <b-card v-else>
          <h2>Restablecer contraseña</h2>
          <div v-show="message" class="my-3">{{ message }}</div>
          <b-button variant="primary" block to="/auth/login">
            Volver al Inicio
          </b-button>
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
      isLoading: false,
      linkSent: false,
      email: "",
      message: null,
    };
  },
  methods: {
    sendLink() {
      this.isLoading = true;
      authService.forgotPassword({ email: this.email }).then(
        (response) => {
          this.isLoading = false;
          this.linkSent = true;
          this.message = response.data.message;
        },
        (error) => {
          this.isLoading = false;
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
