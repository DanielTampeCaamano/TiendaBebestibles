<template>
  <b-card>
    <b-avatar :src="user.avatar" size="240">
      <template #badge>
        <b-icon :scale="0.8" @click="showModal = true" icon="camera"></b-icon>
      </template>
    </b-avatar>

    <h4>{{ user.firstName }} {{ user.lastName }}</h4>
    <b-badge pill variant="primary">
      <h6 class="m-2">{{ user.role }}</h6>
    </b-badge>
    <b-modal v-model="showModal" title="Editar Avatar">
      <b-form-file
        v-model="file"
        accept="image/*"
        placeholder="Selecciona una imagen"
        drop-placeholder="Arrastra una imagen aqui..."
        browse-text="Buscar"
      />
      <template #modal-footer>
        <b-button variant="primary" @click="sendForm()">
          Actualizar Avatar
        </b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import authService from "@/services/auth.service";
export default {
  data() {
    return {
      showModal: false,
      file: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    closeDialog() {
      this.showModal = false;
    },
    sendForm() {
      let formData = new FormData();
      formData.append("avatar", this.file);
      authService
        .updateAvatar(formData, this.user._id)
        .then(({ data }) => {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.setUser(data.user);
          this.$swal({
            title: "Avatar actualizado con éxito",
            icon: "success",
            showConfirmButton: false,
            position: "bottom-end",
            timer: 1200,
            toast: true,
          });
          this.showModal = false;
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

<style lang="scss">
.b-avatar .b-avatar-badge {
  font-size: 3rem !important;
  cursor: pointer;
}
</style>
