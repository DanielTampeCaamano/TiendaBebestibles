<template>
  <div>
    <b-button @click="showModal = true" variant="primary" class="mb-4">
      Crear Usuario
    </b-button>

    <b-modal v-model="showModal" title="Crear Usuario" centered hide-footer>
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

          <div class="text-center mt-4">
            <b-button class="mx-1" type="reset"> Limpiar </b-button>
            <b-button class="mx-1" variant="primary" type="submit">
              Crear Cuenta
            </b-button>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import userService from "@/services/user.service";
export default {
  data() {
    return {
      showModal: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  methods: {
    saveUser() {
      this.showModal = false;
      this.$swal({
        title: "Procesando solicitud",
        icon: "info",
        showConfirmButton: false,
        position: "bottom-end",
        timer: 1200,
        toast: true,
      });
      userService
        .save(this.user)
        .then(({ data }) => {
          this.$emit("loaddUsers");
          this.$swal({
            title: data,
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
    resetForm() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
      };
      this.$nextTick(() => {
        this.$refs.observer.reset();
      });
    },
  },
};
</script>
