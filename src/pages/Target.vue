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
        <RouterLink :to="{ name: 'Target' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Target</RouterLink>
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-4">
      <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">
        List Data Target
      </h2>
    </div>
    <div class="col-span-12 2xl:col-span-4">
      <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
          <div class="items-center sm:flex">
              <div class="items-center sm:flex sm:mr-4">
                <Button  variant="primary" class="mr-2 shadow-md" @click="add">
                  <span class="flex items-center justify-center w-40 h-5">
                    <Lucide icon="Plus" class="w-4 h-4" /> Add New Target
                  </span>
                </Button>
                  
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
            Filter
            <a-date-picker v-model:value="filterBulan" picker="month" style="width: 200px;"/>
            <a-select v-model:value="status" style="width: 250px" placeholder="Pilih Status">
            
              <a-select-option :value="0">Belum Ada Target</a-select-option>
              <a-select-option :value="1">Sudah Ada Target</a-select-option>
            </a-select>
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
                    <Table.Th class="border-b-0 whitespace-nowrap sticky-column"> No </Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center sticky-column1"> Action </Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Bulan Tahun</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Name Sales</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Studio</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Target Unit</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Target Sales</Table.Th>
                    <Table.Th class="text-center border-b-0 whitespace-nowrap sticky-columnAction"> Status</Table.Th>
                    
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
                    <Table.Td :class="(moment().diff(moment(data.updated_at), 'days') > 7 && (data.status_crm == 1 || data.status_crm == 2)) ? 'bg-red-200' : 'bg-white'" class="sticky-column1 first:rounded-l-md last:rounded-r-md w-56  border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                        <div class="flex items-center justify-center">
                    
                            <Tippy as="div"  content="Edit">
                                <a class="flex items-center text-success" href="#" @click="edit(data)">
                                    <Lucide icon="Eye" class="w-4 h-4 mr-1" /> 
                                </a>
                            </Tippy>
                        </div>
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.bulan }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.name }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.deptname }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.unit }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ (data.nominal *1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                    </Table.Td>
                    <Table.Td class="sticky-columnAction first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                      <div class="flex items-center justify-center" >
                        <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                        <div class="text-danger" v-if="data.status == 0">Target Belum Di Buat</div>
                        <div class="text-success" v-else>Target Sudah Di Buat</div>
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

  <Dialog  :open="AddModalPreview" @close="setAddModalPreview(false)">
      <Dialog.Panel>
          <Dialog.Title>
              <h2 class="mr-auto text-base font-medium">
                  Add Target
              </h2>
      
          </Dialog.Title>
          <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
  
              <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                Bulan
                <a-date-picker v-model:value="bulan" picker="month" style="width: 100%;"/>
              </div>
          </Dialog.Description>
          <Dialog.Footer>
              <Button type="button" variant="outline-secondary" @click="
                          () => {
                              setAddModalPreview(false);
                          }
                      " class="w-20 mr-1">
                  Cancel
              </Button>
              <Button variant="primary" type="button" class="w-20" @click="saveData">
                  Save
              </Button>
          </Dialog.Footer>
      </Dialog.Panel>
  </Dialog>   

  <Dialog  :open="ModalEdit" @close="setModalEdit(false)">
      <Dialog.Panel>
          <Dialog.Title>
              <h2 class="mr-auto text-base font-medium">
                  Add Target
              </h2>
      
          </Dialog.Title>
          <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
  
              <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
                Unit
                <a-input-number id="inputNumber" v-model:value="state.data.unit" :min="1" :max="100" style="width: 100%"/>
              </div>
              <div class="col-span-12 sm:col-span-12 xl:col-span-6 intro-y">
                Sales
                <a-input-number style="width:100%" 
                                    v-model:value="state.data.nominal"
                                    :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="value => value.replace(/\Rp\s?|(,*)/g, '')"
                                />
              </div>
          </Dialog.Description>
          <Dialog.Footer>
              <Button type="button" variant="outline-secondary" @click="
                          () => {
                              setModalEdit(false);
                          }
                      " class="w-20 mr-1">
                  Cancel
              </Button>
              <Button variant="primary" type="button" class="w-20" @click="updateTarget">
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
const status = ref([]);
const search = ref("");
const headerFooterModalPreview = ref(false);
const baseUrl = ref("https://login.yogafitidonline.com/api/storage/contract/");
const router = useRouter();
const sales = ref("")
const store = useStore();
const user = store.getters['auth/currentUser']
const filterBulan = ref(dayjs())
const bulan = ref();

const state = reactive({
  listData: {},
  listDepartement: {},
  listSales :{},
  data:{
    id:"",
    unit:"",
    nominal:""
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

const AddModalPreview = ref(false);
const setAddModalPreview = (value) => {
  AddModalPreview.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};

const ModalEdit = ref(false);
const setModalEdit = (value) => {
  ModalEdit.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};


const tampilData = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;



  if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    await Api.get("/admin/target?page=" + page + "&q=" + search.value+ "&bulan=" + dayjs(filterBulan.value).format('YYYY-MM')+ "&status=" + status.value)
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
    await Api.get("/sales/target?page=" + page + "&q=" + search.value+ "&bulan=" + dayjs(filterBulan.value).format('YYYY-MM')+ "&status=" + status.value)
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

const add = () => {
  AddModalPreview.value = true
}

const edit = async (data) => {

    state.data.id = data.id
    state.data.unit = data.unit
    state.data.nominal = data.nominal
    ModalEdit.value = true
      
}

const saveData = async () => {
  pesan.value="Mohon Sabar, Proses Simpan Data"
  loadingsycn.value = true
  if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    await Api.post('/admin/target', {
        bulan : dayjs(bulan.value).format('YYYY-MM'),

    }) .then(async (response) => {


          
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Target Sukses Di Tambahkan"
            basicModalPreview.value = false

    }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
  }else{
    await Api.post('/sales/target', {
      bulan : dayjs(bulan.value).format('YYYY-MM'),

    }) .then(async (response) => {

            AddModalPreview.value = false
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Target Sukses Di Tambahkan"
            basicModalPreview.value = false

    }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
  }

}


const updateTarget = async () => {
  pesan.value="Mohon Sabar, Proses Simpan Data"
  loadingsycn.value = true
  if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    await Api.put('/admin/target', {
        id : state.data.id,
        unit : state.data.unit,
        nominal : state.data.nominal,

    }) .then(async (response) => {


          
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Target Sukses Di Update"
            ModalEdit.value = false

    }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
  }else{
    await Api.put('/sales/target', {
        id : state.data.id,
        unit : state.data.unit,
        nominal : state.data.nominal,

    }) .then(async (response) => {

            AddModalPreview.value = false
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Target Sukses Di Update"
            ModalEdit.value = false

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

watch(filterBulan, (newQuestion, oldQuestion) => {
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


<style scoped>
     .sticky-column {
        position: sticky;
        left: 0;
        z-index: 1;
       
    }

    .sticky-column1 {
        position: sticky;
        left: 58px;
        z-index: 1;
       
    }

    .sticky-column3 {
        position: sticky;
        left: 151px;
        z-index: 1;
       
    }

    .sticky-columnAction {
        position: sticky;
        right: 0;
        z-index: 1;
       
    }


    .sticky-column th, .sticky-column td {
        white-space: nowrap;
    }
</style>