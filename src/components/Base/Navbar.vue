<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">Tienda Bebestibles</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav />
      <!-- Right aligned nav items -->

      <b-navbar-nav v-if="!isAuthenticated" class="ml-auto">
        <b-nav-item to="/auth/login" :active="isActive('/auth/login')">
          Iniciar Sesión
        </b-nav-item>
        <b-nav-item to="/auth/register" :active="isActive('/auth/register')">
          Registrarse
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
        <b-nav-item
          v-if="isAdmin"
          to="/admin/users"
          :active="isActive('/admin/users')"
        >
          Usuarios
        </b-nav-item>
        <b-nav-item
          to="/mezclador"
        >
          Mezclador
        </b-nav-item>
        <b-nav-item
          to="/ingredientes"
        >
          Ver Ingredientes
        </b-nav-item>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{ userName }}
          </template>
          <b-dropdown-item to="/profile" :active="isActive('/profile')">
            Perfil
          </b-dropdown-item>
          <b-dropdown-item @click="logout()">Cerrar Sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated", "isAdmin", "userName"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    isActive(route) {
      return this.$route.path === route;
    },
    logout() {
      this.setUser(null);
      localStorage.clear();
      location.reload();
    },
  },
};
</script>

<style>
.user-name {
  font-size: 0.875rem;
  vertical-align: middle;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
}
</style>