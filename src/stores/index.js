import { createStore } from "vuex";
import auth from './auth'

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    keranjang: []
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    tambahKeKeranjang(state, barang) {
      const index = state.keranjang.findIndex(item => item.kode_product === barang.kode_product);
      if (index !== -1) {
        // item sudah ada di dalam keranjang, tambahkan quantity
        let existingItem = state.keranjang[index].qty;
        existingItem = parseInt(existingItem);
        state.keranjang[index].qty = existingItem + parseInt(barang.qty)
      } else {
        // item belum ada di dalam keranjang, tambahkan item
        state.keranjang.push(barang);
      }
    },
    hapusDariKeranjang(state, faker) {
      // hapus barang dari keranjang
      state.keranjang.splice(faker, 1)
    },
    hapussemua(state, faker) {
      // hapus barang dari keranjang
      state.keranjang = [];
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
  },
  getters: {},
  modules: {
    auth, // <-- module auth
  }
});
