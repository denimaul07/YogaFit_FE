<template>
    <div v-if="loadingsycn==true">
        <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false);">
            <div class="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel>
                    <div class="p-5 text-center pt-10">
                        <br><br>
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

    <div v-if="loading==true">
        <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false);">
            <div class="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel>
                    <div class="p-5 text-center pt-10">
                        <br><br>
                        <div class="flex flex-col items-center justify-end col-span-12">
                            <img
                                alt="Midone Tailwind HTML Admin Template"
                                class="w-1/2 -mt-16 -intro-x"
                                :src="man"
                                />
                            <div class="mt-2 text-1xl text-center">Mohon Tunggu Ya, Lagi Proses Ambil Data :)</div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                <RouterLink :to="{ name: 'dashboardAdmin' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Dashboards</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Summary Data Sales Askara Aktiv</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
                <div class="items-center sm:flex sm:mr-4">
                    <div class="items-center sm:flex sm:mr-4">
                        <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                            Filter
                        </label>
                        <FormSelect v-model="bulan" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                            <option value="0">Semua Bulan</option>
                            <option value="01">Jan</option>
                            <option value="02">Feb</option>
                            <option value="03">Mar</option>
                            <option value="04">Apr</option>
                            <option value="05">Mei</option>
                            <option value="06">Jun</option>
                            <option value="07">Jul</option>
                            <option value="08">Aug</option>
                            <option value="09">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Des</option>
                        </FormSelect>

                        <FormSelect v-model="tahun" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                            <option value="0">Semua Tahun</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </FormSelect>
                        <Menu>
                            <Menu.Button :as="Button" class="px-2 !box">
                                <span class="flex items-center justify-center w-5 h-5">
                                    <Lucide icon="Download" class="w-4 h-4" />
                                </span>
                            </Menu.Button>
                            <Menu.Items class="w-40">
                                <Menu.Item  @click="syncData">
                                    <Lucide icon="RefreshCcw" class="w-4 h-4 mr-2" /> Sync Data
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        
        <div class="col-span-12 md:col-span-12 2xl:col-span-12"> 
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 2xl:col-span-8">
                    <div class="grid grid-cols-12 gap-6 mt-14" v-if="user.roles[0].name=='superAdmin'">
                        <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y" @click="total(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-teal-500">
                            <div class="flex items-center">
                                <div class="flex-none">
                                <div class="text-lg font-medium truncate text-white">Total Sales By Invoice</div>
                                <div class="mt-1 text-white">{{ state.total }} Invoice</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y" @click="income(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-sky-400">
                            <div class="flex items-center">
                                <div class="flex-none">
                                <div class="text-lg font-medium truncate text-white">Total Sales By Product</div>
                                <div class="mt-1 text-white">{{ state.totalproduct }} Sales Product</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-4  intro-y" @click="income(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-indigo-500">
                                <div class="flex items-center">
                                    <div class="flex-none">
                                    <div class="text-lg font-medium truncate text-white">Total Income</div>
                                    <div class="mt-1 text-white">{{ Math.abs(state.income).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -2) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-6  intro-y" @click="income(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-sky-600">
                                <div class="flex items-center">
                                    <div class="flex-none">
                                    <div class="text-lg font-medium truncate text-white">Total Profit Sales</div>
                                    <div class="mt-1 text-white">{{ Math.abs(state.profit).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -2) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-6  intro-y" @click="incomeTotal(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-sky-600">
                                <div class="flex items-center">
                                    <div class="flex-none">
                                    <div class="text-lg font-medium truncate text-white">Total Profit</div>
                                    <div class="mt-1 text-white">{{ (Math.abs(state.profit) - Math.abs(state.incomeTotal)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -2) }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-6 mt-14" v-else>
                        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y" @click="total(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-teal-500">
                            <div class="flex items-center">
                                <div class="flex-none">
                                <div class="text-lg font-medium truncate text-white">Total Sales By Invoice</div>
                                <div class="mt-1 text-white">{{ state.total }} Invoice</div>
                                </div>
                            
                            </div>
                            </div>
                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y" @click="income(bulan, tahun)">
                            <div class="p-5 box zoom-in bg-sky-400">
                            <div class="flex items-center">
                                <div class="flex-none">
                                <div class="text-lg font-medium truncate text-white">Total Sales By Product</div>
                                <div class="mt-1 text-white">{{ state.totalproduct }} Sales Product</div>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                    </div>

                    <Preview class="intro-y box mt-5">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">Chart Sales Year {{  tahun }}</h2>
                        </div>
                        <div class="p-5">
                        <Preview.Panel>
                            <div class="chart-container">
                                <Chart
                                    type="bar"
                                    :width="width"
                                    :height="height"
                                    :data="dataModel"
                                    :options="options"
                                />
                            </div>
                        </Preview.Panel>
                        
                        </div>
                    </Preview>
                </div>

                <div class="col-span-12 2xl:col-span-4 mt-14">
                    <Table>
                        <Table.Thead  variant="dark">
                            <Table.Tr class="intro-x">
                                <Table.Th colspan="3" class="border-b-0 whitespace-nowrap text-center">
                                    SALES STORE BY INVOICE
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr class="intro-x">
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    STORE
                                </Table.Th>
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    TOTAL SALE
                                </Table.Th>
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    PRINT INVOICE
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr v-if="state.listToko.length==0" class="intro-x">
                                <Table.Td colspan="3" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                    <div class="flex flex-col items-center justify-end col-span-12">
                                        <div class="mt-2 text-xs text-center">Sales Not Found</div>
                                    </div>
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr v-for="(data, index) in state.listToko" :key="index" class="intro-x">
                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-success text-center">
                                        {{ data.nama_toko}} 
                                    </div>
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.total }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    <div class="flex items-center justify-center">
                                        <a
                                            class="flex items-center text-primary"
                                            href="#" @click="print(data.toko, bulan, tahun)"
                                        
                                            >
                                            <Lucide icon="Printer" class="w-4 h-4 mr-1" />
                                        </a>&nbsp; &nbsp; 

                                        <a
                                            class="flex items-center text-success"
                                            href="#" @click="exportexcel(data.toko, bulan, tahun)"
                                        
                                            >
                                            <Lucide icon="Download" class="w-4 h-4 mr-1" />
                                        </a>
                                    </div>
                                </Table.Td>

                            </Table.Tr>

                        </Table.Tbody>
                    </Table>
                </div>

                <div  class="col-span-12 2xl:col-span-8">
                    <Preview class="intro-y box mt-5">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">Top Product Varian Sales Month {{  bulanIndo }} Years {{  tahun }}</h2>
                            <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="search"
                                />
                            
                        </div>
                    
                        <div class="p-5">
                            <Preview.Panel>
                                <div class="overflow-x-auto">
                                    <Table>
                                        <Table.Thead  variant="dark">
                                            <Table.Tr class="intro-x">
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    NO
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    PRODUCT CODE
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    PRODUCT NAME
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    PRODUCT SKU
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    TOTAL SALES
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            <Table.Tr v-if="state.topProduct.total==0" class="intro-x">
                                                <Table.Td colspan="5" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                    <div class="flex flex-col items-center justify-end col-span-12">
                                                        <div class="mt-2 text-xs text-center">Sales Not Found</div>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr v-for="(data, index) in state.topProduct.data" :key="index" class="intro-x">
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ index+1 }}
                                                </Table.Td>
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                    <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-success text-center">
                                                        {{ data.product_code}}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.product_name }}
                                                </Table.Td>
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.product_sku }}
                                                </Table.Td>
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.total }}
                                                </Table.Td>
                                            </Table.Tr>
                                        
                                        </Table.Tbody>
                                    </Table>
                                </div>

                                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                                    <div class="items-center sm:flex sm:mr-4">
                                        <TailwindPagination :limit="1" :data="state.topProduct" @pagination-change-page="tampilSummary"/>
                                    </div>

                                    <div class="hidden mx-auto md:block text-slate-500">
                                        Showing {{ state.topProduct.current_page }} to {{ state.topProduct.to }} of {{ state.topProduct.total }} entries
                                    </div>
                                </div>
                            </Preview.Panel>
                        </div>
                    </Preview>
                </div>

                <div  class="col-span-12 2xl:col-span-4">
                    <Preview class="intro-y box mt-5">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">Top Reference Sales  Month {{  bulanIndo }} Year {{  tahun }}</h2>
                            <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="search"
                                />
                            
                        </div>
                    
                        <div class="p-5">
                            <Preview.Panel>
                                <div class="overflow-x-auto">
                                    <Table>
                                        <Table.Thead  variant="dark">
                                            <Table.Tr class="intro-x">
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    NO
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    REFERENCE
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    TOTAL SALES
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            <Table.Tr v-if="state.topReferences.total==0" class="intro-x">
                                                <Table.Td colspan="3" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                    <div class="flex flex-col items-center justify-end col-span-12">
                                                        <div class="mt-2 text-xs text-center">Sales Not Found</div>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr v-for="(data, index) in state.topReferences.data" :key="index" class="intro-x">
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ index+1 }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                    <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-success text-center">
                                                        {{ data.reference}}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.total }}
                                                </Table.Td>
                                            </Table.Tr>
                                        
                                        </Table.Tbody>
                                    </Table>
                                </div>

                                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                                    <div class="items-center sm:flex sm:mr-4">
                                        <TailwindPagination :limit="1" :data="state.topReferences" @pagination-change-page="tampilSummary"/>
                                    </div>

                                    <div class="hidden mx-auto md:block text-slate-500">
                                        Showing {{ state.topReferences.current_page }} to {{ state.topReferences.to }} of {{ state.topReferences.total }} entries
                                    </div>
                                </div>
                            </Preview.Panel>
                        </div>
                    </Preview>
                </div>
            </div>
        </div>
    </div>

    <Dialog :open="PrintTTDPreview" size="full" @close="setPrintTTDModalPreview(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    Laporan Invoice
                </h2>
                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPrintTTDModalPreview(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
        
            <iframe :src="pdfUrl"  width="100%" height="500px"  fullscreen="true" />
        </Dialog.Panel>
    </Dialog>
</template>

<script setup>
    import Api from '../api/Api'
    import Button from "../base-components/Button"
    import { FormInput, FormSelect, FormLabel, FormInline } from "../base-components/Form"
    import { onMounted, ref, reactive , watch, onUnmounted } from "vue"
    import { useRouter } from 'vue-router'
    import { useStore } from "vuex"
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import moment from 'moment'
    import Preview from "../base-components/Preview";
    import { Dialog, Menu } from "../base-components/Headless"
    import { TailwindPagination } from 'laravel-vue-pagination'
    import { useDebounceFn } from '@vueuse/core'
    
    // import Chart from 'chart.js/auto';
    // import { Bar } from 'vue-chartjs'
    // import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import man from "../assets/images/sabar.png"
    // ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    import  "chart.js/auto"
    import Chart from "../base-components/Chart"
    import { getColor } from "../utils/colors";
    const basicModalPreview = ref(true);
    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    let todaysDate = new Date()
    const date = moment(todaysDate).format("MM")
    const year = moment(todaysDate).format("Y")
    const router = useRouter()
    const store = useStore()
    const search = ref("")
    const loading = ref("")
    const bulanIndo = ref("")
    const chartDataModel = ref(null)
    const labelModel = ref("")
    const dataModel = ref("")
    const loadingsycn = ref("")
    const pdfUrl  = ref("")
    const pesan = ref("")
    const user = store.getters['auth/currentUser']
    const bulan = ref(date)
    const tahun = ref(year)
    const height = ref(500)
    const width = ref("100%")
    const state = reactive({
        listToko:{},
        topProduct:{},
        topReferences:{},
        total:"0",
        income:"0",
        incomeTotal:"0",
        totalproduct:"",
        profit:""
    })

    const PrintTTDPreview = ref(false);
    const setPrintTTDModalPreview = (value) => {
        PrintTTDPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (PrintTTDPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };



    const chartColors = () => [
            "#6467f1",
            "#eab309",
            "#ef4545",
            "#84cc17",
            "#0fa5e9",
            "#0f7590",
            "#046aa1",
    ];



    const options =  {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'center',
                    labels: {
                        color: getColor("slate.500", 0.8),
                    },
                },
                datalabels: {
                    color: 'black', // Warna teks label
                    anchor: 'end', // Lokasi anchor label
                    align: 'top', // Posisi label terhadap elemen datanya
                    formatter: (value, context) => value, // Format nilai yang ingin ditampilkan di atas batang
                },
            },
    };



    
    const tampilSummary = async (page = 1) => {
        loading.value= true
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/AdminSummary?bulan=' + bulan.value + '&tahun=' + tahun.value + '&page='+ page+ '&q=' + search.value)
        .then(response => {
            loading.value= false
            state.total = response.data.total
            state.income = parseInt(response.data.income[0].total)
            state.incomeTotal = parseInt(response.data.incometotal[0].total ?? 0) 
            state.profit = parseInt(response.data.profit[0].total)
            state.totalproduct = response.data.totalproduct
            state.topProduct = response.data.topProduct
            state.topReferences = response.data.topReference
            state.listToko = response.data.toko

            const mappedDataModel = response.data.product.map(item => {
                return {
                    bulan: item.bulan,
                    total: item.total
                };
            });

            labelModel.value = mappedDataModel.map(item => item.bulan);
            chartDataModel.value = mappedDataModel.map(item => item.total);

        
        }).catch(error => {
            console.log(error);
            if(error.response.data.status_code===403){
                router.push({name: '403'})
            }else{
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            }
        })
    }



    const total = async (bulan, tahun) => {
        router.push({name: 'saleDetail',
        params : {
                bulan : bulan,
                tahun : tahun,
            }
        })
    }

    
    const income = async (bulan, tahun) => {
        router.push({name: 'transaction',
        params : {
                bulan : bulan,
                tahun : tahun,
            }
        })
    }

    const incomeTotal = async (bulan, tahun) => {
        router.push({name: 'cost',
        params : {
                bulan : bulan,
                tahun : tahun,
            }
        })
    }

    const print =  async(id, bulan, tahun) =>  {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Sabar Dikit ya, Lagi Proses Generate  Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/printInvoiceToko', {
            params: {
                id: id,
                bulan: bulan,
                tahun: tahun,
            },
            responseType: 'blob'
        })
        .then(response => {
            loadingsycn.value = false
            PrintTTDPreview.value = true

            pdfUrl.value = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        
        }).catch(error => {
            console.log(error);
            if(error.response.data.status_code==403){
                router.push({name: '403'})
            }else{
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            }
        })

    };

    const exportexcel = async (id, bulan, tahun) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/exportexcelInvoice',{
            params: {
                id: id,
                bulan: bulan,
                tahun: tahun,
            },
            responseType: 'blob'
        })
        .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `List Invoice.xlsx`);
                document.body.appendChild(link);
                link.click();
                loadingsycn.value = false
                basicModalPreview.value = false

        }).catch(error => {
            console.log(error);
            if(error.response.data.status_code==403){
                router.push({name: '403'})
            }else{
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            }
        })
    }


    onMounted(async() => {
        await tampilSummary()

        if(bulan.value=='01'){
            bulanIndo.value='Jan'
        }else if(bulan.value=='02'){
            bulanIndo.value='Feb'
        }else if(bulan.value=='03'){
            bulanIndo.value='Mar'
        }else if(bulan.value=='04'){
            bulanIndo.value='Apr'
        }else if(bulan.value=='05'){
            bulanIndo.value='May'
        }else if(bulan.value=='06'){
            bulanIndo.value='Jun'
        }else if(bulan.value=='07'){
            bulanIndo.value='Jul'
        }else if(bulan.value=='08'){
            bulanIndo.value='Aug'
        }else if(bulan.value=='09'){
            bulanIndo.value='Sept'
        }else if(bulan.value=='10'){
            bulanIndo.value='Oct'
        }else if(bulan.value=='11'){
            bulanIndo.value='Nov'
        } else if(bulan.value=='12'){
            bulanIndo.value='Dec'
        }



        dataModel.value = {
            labels: labelModel.value,
            datasets: [
                {
                    data: chartDataModel,
                    backgroundColor: chartColors(),
                    hoverBackgroundColor: chartColors(),
                    borderWidth: 5,
                    
                },
                
            ],
            
        };
    })

    watch(tahun, (newQuestion, oldQuestion) => {
        tampilSummary()
    })

    watch(bulan, (newQuestion, oldQuestion) => {
        tampilSummary()
    })


    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })


    const searching = useDebounceFn(() => {
        loading.value= false
        tampilSummary()
    }, 500)

</script>

