<script setup lang="ts">
import Api from '../../api/Api'
import { ref } from "vue";
import Lucide from "../../base-components/Lucide";
import logoUrl from "../../assets/logoyoga.png";
import Button from "../../base-components/Button"
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import fakerData from "../../utils/faker";
import _ from "lodash";
import { watch, reactive, computed, onMounted } from "vue";
import { useTopMenuStore } from "../../stores/top-menu";
import { TransitionRoot } from "@headlessui/vue";
import {useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router'
import { FormattedMenu, nestedMenu } from "../../layouts/TopMenu/top-menu";
const route = useRoute();
let formattedMenu = reactive<Array<FormattedMenu | "menulink">>([]);
const setFormattedMenu = (computedFormattedMenu: Array<FormattedMenu | "menulink">) => {
  Object.assign(formattedMenu, computedFormattedMenu);
};
const topMenuStore = useTopMenuStore();
const topMenu = computed(() => nestedMenu(topMenuStore.menu, route));

watch(topMenu, () => {
  setFormattedMenu(topMenu.value);
});




const store = useStore()
const router = useRouter()
const roleName = ref("")
const roleName2 = ref("")
const roleName3 = ref("")
const user = store.getters['auth/currentUser']
const baseUrl = ref('https://login.yogafitidonline.com/api/storage/foto/')
const daftarKeranjang = computed(() => store.state.keranjang)

const removeFromCart = (fakerKey) => {
  store.commit('hapusDariKeranjang', fakerKey)
}

const state = reactive({
  listData: {}
})

//method logout
function logout() {
    //panggil action "logout" di dalam module "auth"
    store.dispatch('auth/logout')
    .then(() => {
    //jika berhasil, akan di arahkan ke route login
    router.push({
      name: 'login'
    })
  })
}

const proses = async () => {
    router.push({name: 'ListCart'})
}

const prosesPermintaan = async () => {
    router.push({name: 'ProsesPermintaan'})
}

const prosesBarang = async () => {
    router.push({name: 'ProsesBarang'})
}
const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const tampilData = async () => {
      await Api.get('/admin/purchaseNotif')
      .then(response => {
          state.listData = response.data.data
      }).catch(error => {
          
          if(error.response.data.status_code==403){
              router.push({name: '403'})
          }else{
              console.log(error);
              
          }
      })
  }

onMounted(async() => {
  if (user.roles.length === 1) {
        roleName.value = user.roles[0].name;
    } else if (user.roles.length ===2) {
        roleName.value = user.roles[0].name;
        roleName2.value = user.roles[1].name;
    }else{
        roleName.value = user.roles[0].name;
        roleName2.value = user.roles[1].name;
        roleName3.value = user.roles[2].name;
    }

    if (roleName2.value=='adminPurchaseApproval' || roleName3.value=='adminPurchaseApproval') {
      await tampilData()
    }

})

</script>

<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="flex items-center h-full">
      <!-- BEGIN: Logo -->
      <RouterLink
        :to="{ name: 'Dashboard' }"
        class="hidden -intro-x md:flex"
      >
        <img
          alt="Icewall Tailwind HTML Admin Template"
          class="w-40"
          :src="logoUrl"
        />
        <!-- <span class="ml-3 text-lg text-white"> Imora Support System </span> -->
      </RouterLink>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <Breadcrumb
        light
        class="h-full md:ml-10 md:pl-10 md:border-l border-white/[0.08] mr-auto -intro-x"
      >
        <Breadcrumb.Link to="/"></Breadcrumb.Link>
      </Breadcrumb>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <!-- <div class="relative mr-3 intro-x sm:mr-6">
        <div class="hidden search sm:block">
          <FormInput
            type="text"
            class="border-transparent w-56 shadow-none rounded-full bg-slate-200 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70"
            placeholder="Search..."
            @focus="showSearchDropdown"
            @blur="hideSearchDropdown"
          />
          <Lucide
            icon="Search"
            class="absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500"
          />
        </div>
        <a class="relative text-white/70 sm:hidden" href="">
          <Lucide icon="Search" class="w-5 h-5 dark:text-slate-500" />
        </a>
        <TransitionRoot
          as="template"
          :show="searchDropdown"
          enter="transition-all ease-linear duration-150"
          enterFrom="mt-5 invisible opacity-0 translate-y-1"
          enterTo="mt-[3px] visible opacity-100 translate-y-0"
          entered="mt-[3px]"
          leave="transition-all ease-linear duration-150"
          leaveFrom="mt-[3px] visible opacity-100 translate-y-0"
          leaveTo="mt-5 invisible opacity-0 translate-y-1"
        >
          <div class="absolute right-0 z-10 mt-[3px]">
            <div class="w-[450px] p-5 box">
              <div class="mb-2 font-medium">Pages</div>
              <div class="mb-5" v-for="(menu, menuKey) in formattedMenu">
                <a href="" class="flex items-center">
                  <div
                    class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
                  >
                    <Lucide icon="Inbox" class="w-4 h-4" />
                  </div>
                  <div class="ml-3">{{  menu.subMenu }}</div>
                </a>
          
              </div>
              
            </div>
          </div>
        </TransitionRoot>
      </div> -->
      <!-- END: Search -->
      <!-- BEGIN: Notifications -->
      <Popover v-if="roleName2=='adminPurchaseApproval' || roleName3=='adminPurchaseApproval' " class="mr-4 intro-x sm:mr-6">
        <Popover.Button
          class="relative text-white/70 outline-none block before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger"
        >
          <Lucide icon="Bell" class="w-5 h-5 dark:text-slate-500" /> 
        </Popover.Button>
        <Popover.Panel class="w-[280px] sm:w-[350px] p-5 mt-2">
          <div class="mb-5 font-medium">Notifications</div>
          <div v-if="state.listData.length ==0">
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="" class="mr-5 font-medium truncate">
                  Tidak Ada Permintaan
                </a>
              </div>
            </div>
          </div>
          <div
            v-for="(faker, fakerKey) in state.listData"
            :key="fakerKey"
            :class="[
              'cursor-pointer relative flex items-center',
              { 'mt-5': fakerKey },
            ]"
          >
        
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="" class="mr-5 font-medium truncate">
                  Pemohon : {{ faker.pemohon}} - {{ faker.no_req}}
                </a>
                <div class="ml-auto text-xs text-slate-400 whitespace-nowrap">
                  {{ faker.tgl_permintaan }} 
                </div>
              </div>
              <div class="w-full truncate text-slate-500 mt-0.5">
                {{ faker.nmbarang}}
              </div>
            </div>
          </div>
          <div class="pt-5 font-medium text-center">
            <Button variant="primary" rounded class="w-full mr-1" @click="prosesPermintaan" v-if="state.listData.length > 0">
                Proses Permintaan
            </Button>
          </div>
        </Popover.Panel>
      </Popover>

      <Popover v-if="roleName2=='adminPurchase' || roleName2=='adminPurchaseApproval' || roleName3=='adminPurchaseApproval'" class="mr-4 intro-x sm:mr-6">
        <Popover.Button @click="prosesBarang"
          class="relative text-white/70 outline-none block before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger"
        >
          <Lucide icon="Archive" class="w-5 h-5 dark:text-slate-500" /> 
        </Popover.Button>
    
      </Popover>

 

      <Popover v-if="roleName=='staff'" class="mr-4 intro-x sm:mr-6">
        <Popover.Button
          class="relative text-white/70 outline-none block before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger"
        >
          <Lucide icon="ShoppingCart" class="w-5 h-5 dark:text-slate-500" />
        </Popover.Button>
        <Popover.Panel class="w-[280px] sm:w-[350px] p-5 mt-2">
          <div class="mb-5 font-medium">Keranjang Belanja Saya</div>
    
          <div v-if="daftarKeranjang.length ==0">
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="" class="mr-5 font-medium truncate">
                  No Product Found
                </a>
              </div>
            </div>
          </div>
          <div v-for="(faker, fakerKey) in daftarKeranjang" :key="fakerKey" :class="['cursor-pointer relative flex items-center',{ 'mt-5': fakerKey },]">
            <div class="relative flex-none w-12 h-12 mr-1 image-fit">
              <!-- <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="'http://192.168.5.65:5050/storage/barang/'+faker.file"
              /> -->
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="rounded-full"
                :src="'https://portal.hondaimora.com/iss/api/storage/barang/'+faker.file"
              />
              <div
                class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"
              ></div>
            </div>
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="#" class="mr-5 font-medium truncate">
                  {{ faker.namabarang}} - {{ faker.varian}}
                </a>
                <div class="ml-auto text-xs text-slate-400 whitespace-nowrap">
                  <a class="flex items-center mr-auto text-primary" href="#" @click="removeFromCart(fakerKey)">
                    <Lucide icon="Trash" class="w-4 h-4 mr-1" />
                  </a>
                </div>
              </div>
              <div class="w-full text-slate-500 mt-0.5">
                {{ faker.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -2) }} x  {{ faker.qty }} Pcs / Unit
              </div>
            </div>
          </div>
          
          <div class="pt-5 font-medium text-center">
            <Button variant="primary" rounded class="w-full mr-1" @click="proses" v-if="daftarKeranjang.length > 0">
                Proses Permintaan Saya
            </Button>
          </div>
          
        </Popover.Panel>
      </Popover>

      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <Menu>
        <Menu.Button
          class="block w-8 h-8 overflow-hidden scale-110 rounded-full shadow-lg image-fit zoom-in intro-x"
        >
        <img v-if="user.foto != null"
              alt="No Image"
              class="rounded-full"
              :src="baseUrl+user.foto"
            />

            <img v-if="user.foto == null"
              alt="No Image"
              class="rounded-full"
              :src="baseUrl+'user.png'"
            />
        </Menu.Button>
        <Menu.Items
          class="w-56 mt-px relative bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
        >
          <Menu.Header class="font-normal">
            <div class="font-medium">Hallo, {{ user.name }}</div>
            <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              {{ user.roles[0].name }}
            </div>
          </Menu.Header>

          <Menu.Item class="hover:bg-white/5" @click="logout">
            Logout
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>
