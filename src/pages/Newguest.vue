<template>
  <div v-if="loadingsycn == true">
    <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false)">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div class="p-5 text-center pt-10">
            <br /><br />
            <div class="flex flex-col items-center justify-end col-span-12">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="w-1/2 -mt-16 -intro-x"
                :src="man"
              />
              <div class="mt-2 text-1xl text-center">{{ pesan }}</div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </div>

  <div v-if="loading == true">
    <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false)">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div class="p-5 text-center pt-10">
            <br /><br />
            <div class="flex flex-col items-center justify-end col-span-12">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="w-1/2 -mt-16 -intro-x"
                :src="man"
              />
              <div class="mt-2 text-1xl text-center">
                Mohon Tunggu Ya, Lagi Proses Ambil Data :)
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 2xl:col-span-4">
      <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-nowrap">
        <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
        <RouterLink :to="{ name: 'newguest' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> New Guest Members</RouterLink>
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-4">
      <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">
        List Data New Guest Contract
      </h2>
    </div>
    <div class="col-span-12 2xl:col-span-4">
      <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
          <div class="items-center sm:flex">
              <div class="items-center sm:flex sm:mr-4">
                  <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                      Filter
                  </label>
                  <a-range-picker v-model:value="tanggal" :bordered="true" style="width: 100%;"/>
              
              </div>
          </div>  
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-12 pt-12">
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div class="items-center sm:flex sm:mr-4">
            <!-- <Button  variant="primary" class="mr-2 shadow-md" @click="add">
              <span class="flex items-center justify-center w-40 h-5">
                <Lucide icon="Plus" class="w-4 h-4" /> Add New Contract
              </span>
            </Button> -->
          </div>

          <div class="hidden mx-auto md:block text-black"></div>

          <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div class="relative w-56 text-slate-500">
              <FormInput  type="text"  class="w-56 pr-10 !box" placeholder="Search..." v-model="search" />
              <Lucide  icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"/>
            </div>
          </div>
        </div>

        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
          <div class="col-span-12 2xl:col-span-3">
            <div class="overflow-x-auto">
              <Table>
                <Table.Thead class="bg-primary text-white">
                  <Table.Tr class="intro-x">
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">No</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Name Member</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Email</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">No Telp</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Type</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Package </Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Studio</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Start</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">End</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Sales</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Status</Table.Th>
                    
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr v-if="state.listData.total == 0" class="intro-x">
                    <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div class="flex flex-col items-center justify-end col-span-12">
                        <div class="mt-2 text-xs text-center">Data Not Found</div>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id">
                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                        {{ state.listData.from + index }}
                      </div>
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.name }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.email }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.no_telp }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.type }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.packages_name }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.deptname }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.start_date }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.end_date }}
                    </Table.Td>
                    <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                      <div class="flex items-center justify-center">
                        <a v-if="data.sales!=''" class="flex items-center text-success" href="#" @click="edit(data.idcontract)">
                          {{ data.sales}}
                        </a>
                        <a class="flex items-center text-success" href="#" @click="edit(data.idcontract)" v-else>
                          Tambah Sales
                        </a>
                      </div>
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                      <div class="flex items-center justify-center" >
                        <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                        <div class="text-success" v-if="data.status_contract == 0">Active</div>
                        <div class="text-danger" v-else>Non Active</div>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>
          </div>

          <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
            <div class="items-center sm:flex sm:mr-4">
              <TailwindPagination :limit="1" :data="state.listData" @pagination-change-page="tampilData"/>
            </div>

            <div class="hidden mx-auto md:block text-slate-500">
              Showing {{ state.listData.from }} to {{ state.listData.to }} of {{ state.listData.total }} entries
            </div>

            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
              <div class="relative w-56 text-slate-500">
                <FormInput  type="text"   class="w-56 pr-10 !box"  placeholder="Search..." v-model="search" />
                <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"   />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog :open="warningModalPreview" @close="setWarningModalPreview(false)">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
        <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
        <div class="mt-2 text-slate-500">{{ pesan }}</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button type="button" variant="primary"  @click="setWarningModalPreview(false)" class="w-24">
          Ok
        </Button>
      </div>
      <div class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
        <a href="" class="text-primary"> Why do I have this issue? </a>
      </div>
    </Dialog.Panel>
  </Dialog>

  <Dialog :open="successModalPreview" @close="setSuccessModalPreview(false)">
    <Dialog.Panel>
      <div class="p-5 text-center">
        <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-success" />
        <div class="mt-5 text-3xl">Yeyyyy Success!</div>
        <div class="mt-2 text-slate-500">
          {{ pesan }}
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button type="button" variant="primary" @click="setSuccessModalPreview(false)" class="w-24">
          Ok
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>

  <Dialog size="lg" :open="SalesModalPreview" @close="setSalesModalPreview(false)">
      <Dialog.Panel>
          <Dialog.Title>
              <h2 class="mr-auto text-base font-medium">
                  Add Sales
              </h2>
      
          </Dialog.Title>
          <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                  <TomSelect class="w-full"  id="modal-form-6"  v-model="sales">
                      <option value="">Select Select Consultant</option>
                      <option v-for="item in state.listSales" :key="item.id" :value="item.id">
                          {{ item.name }} 
                      </option>
                  </TomSelect>
              </div>
          </Dialog.Description>
          <Dialog.Footer>
              <Button type="button" variant="outline-secondary" @click="
                          () => {
                              setSalesModalPreview(false);
                          }
                      " class="w-20 mr-1">
                  Cancel
              </Button>
              <Button variant="primary" type="button" class="w-20" @click="saveSales">
                  Save
              </Button>
          </Dialog.Footer>
      </Dialog.Panel>
  </Dialog>   

</template>

<script setup>
import Api from "../api/Api";
import moment from 'moment'
import listMenu from "./Menu.vue";
import Button from "../base-components/Button";
import {
  FormInput,
  FormSelect,
  FormLabel,
  FormInline,
  FormCheck,
} from "../base-components/Form";
import TomSelect from "../base-components/TomSelect";
import { onMounted, ref, reactive, watch, computed, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { TailwindPagination } from "laravel-vue-pagination";
import Tippy from "../base-components/Tippy";
import Lucide from "../base-components/Lucide";
import Table from "../base-components/Table";
import Preview from "../base-components/Preview";
import LoadingIcon from "../base-components/LoadingIcon";
import { Dialog, Menu } from "../base-components/Headless";
import { DialogPanel } from "@headlessui/vue";
import CurrencyInput from "./CurrencyInput.vue";
import man from "../assets/images/sabar.png";
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.ssr.css";
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import Litepicker from "../base-components/Litepicker";
import {useStore } from "vuex";
import dayjs from 'dayjs'
const loading = ref(true);
const loadingsycn = ref("");
const pesan = ref("");
const status = ref("");
const search = ref("");
const headerFooterModalPreview = ref(false);
const baseUrl = ref("https://login.yogafitidonline.com/api/storage/contract/");
const router = useRouter();
const sales = ref("")
const store = useStore();
const user = store.getters['auth/currentUser']
const tanggal = ref("")
const singleLite = (date) => {
    return {
        autoApply: false,
        singleMode: true,
        dropdowns: {
            minYear: 1990,
            maxYear: null,
            months: true,
            years: true,
        },
        format: "YYYY-MM-DD",
        mobileFriendly: true,
        startDate: new moment(date).format("YYYY-MM-DD")
    }
};

const state = reactive({
  listData: {},
  listDepartement: {},
  listSales :{},
  data:{
    id:""
  }
});


const basicModalPreview = ref(false);
const warningModalPreview = ref(false);
const setWarningModalPreview = (value) => {
  warningModalPreview.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};

const successModalPreview = ref(false);
const setSuccessModalPreview = (value) => {
  successModalPreview.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};

const SalesModalPreview = ref(false);
const setSalesModalPreview = (value) => {
  SalesModalPreview.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};



const tampilData = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;


  let tgl=''
  if(tanggal.value!=''){
    const [timestamp1, timestamp2] = tanggal.value;
    tgl= dayjs(timestamp1.$d).format('YYYY-MM-DD') + ' - ' + dayjs(timestamp2.$d).format('YYYY-MM-DD')
  }else{
    tgl='';
  }
  
  if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    await Api.get("/admin/newcontract?page=" + page + "&q=" + search.value+ "&tgl=" + tgl)
    .then((response) => {
      state.listData = response.data.data;
      loading.value = false;
    })
    .catch((error) => {
      if (error.response.data.status_code == 403) {
        router.push({ name: "403" });
      } else {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      }
    });
  }else{
    await Api.get("/sales/newcontract?page=" + page + "&q=" + search.value+ "&tgl=" + tgl)
    .then((response) => {
      state.listData = response.data.data;
      loading.value = false;
    })
    .catch((error) => {
      if (error.response.data.status_code == 403) {
        router.push({ name: "403" });
      } else {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      }
    });
  }
};

const tampilSales = async () => {
      const token = localStorage.getItem('token_yogafit')
  
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      let url=''
      if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
          url = Api.get('/admin/team')
      }else{
          url = Api.get('/sales/team')
      }
      await url.then(response => {
          state.listSales = response.data.data
      }).catch(error => {
          
          if(error.response.data.status_code==403){
              router.push({name: '403'})
          }else{
              const object1 = error.response.data.data
              pesan.value =  Object.values(object1).toString()
              setWarningModalPreview(true)
          }
      })
  }


const tampilDepartement = async () => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  let url=''
      if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
          url = Api.get('/admin/department')
      }else{
          url = Api.get('/sales/department')
      }
  await url.then((response) => {
      state.listDepartement = response.data.data;
    })
    .catch((error) => {
      if (error.response.data.status_code == 403) {
        router.push({ name: "403" });
      } else {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      }
    });
};

const edit = async (id) => {
    state.data.id = id
    SalesModalPreview.value = true
      
}

const saveSales = async () => {

  if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    await Api.post('/admin/updatesales', {
        sales : sales.value,
        id : state.data.id

    }) .then(async (response) => {


            SalesModalPreview.value = false
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Sales Success Update"
            basicModalPreview.value = false

    }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
  }else{
    await Api.post('/sales/updatesales', {
        sales : sales.value,
        id : state.data.id

    }) .then(async (response) => {

            state.listTeam = response.data.data
            SalesModalPreview.value = false
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Sales Success Update"
            basicModalPreview.value = false

    }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
  }

}


onMounted(async () => {
  await tampilData();
  await tampilDepartement();
  await tampilSales()
});

watch(search, (newQuestion, oldQuestion) => {
  searching();
});

watch(status, (newQuestion, oldQuestion) => {
  loading.value = false;
  tampilData();
});

watch(tanggal, (newQuestion, oldQuestion) => {
  tampilData();
});


const searching = useDebounceFn(() => {
  loading.value = false;
  tampilData();
}, 500);
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");
</style>
