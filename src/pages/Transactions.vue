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
                <RouterLink :to="{ name: 'transactions' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Trasactions</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Transactions</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
        
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <!-- <div class="col-span-12 md:col-span-2 2xl:col-span-2">
            <div class="pb-10 -mb-10 2xl:border-l">
                <div class="grid grid-cols-12 pl-0 2xl:pl-0 gap-x-6 2xl:gap-x-0 gap-y-6">
                    <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-10 2xl:col-span-12 2xl:mt-8">
                        <listMenu></listMenu>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="col-span-12 2xl:col-span-12 pt-12"> 

            <div class="grid grid-cols-3 gap-4">
    
                <div>
                    <FormInline class="mt-1">
                        <FormLabel  htmlFor="horizontal-form-2" > Filter </FormLabel>
                        <TomSelect v-model="studio"  class="w-full">
                            <option value="">Search Studio</option>
                            <option v-for="item in state.listDepartement" :key="item.id" :value="item.id">{{item.deptname}}</option>
                        </TomSelect>
                    </FormInline>
                </div>

                <div>
            
                </div>
                <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                    <div class="relative w-full text-slate-500">
                        <FormInline class="mr-1">
                                <FormInput  type="text"  class="w-56 pr-10 !box"  placeholder="Search..." v-model="search"  />
                                <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
                                <Button @click="add" class="px-2 box bg-primary text-white">
                                    <span class="flex items-center justify-center w-5 h-5">
                                        <Lucide icon="Plus" class="w-4 h-4" />
                                    </span>
                                </Button>
                        </FormInline>
                    </div>
                </div>
            </div>

        
            <div class="grid grid-cols-12 gap-6 pt-5">

            
                <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <div class="overflow-x-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Tanggal Transactions
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No Transactions
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Kategori
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Product Code
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Product Name
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Cogs
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Harga Jual
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Qty
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Pic
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr v-if="loading" class="intro-x">
                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr v-if="state.listData.total==0" class="intro-x">
                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id" >
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{ state.listData.from + index }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.tanggal }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.notransaksi }}
                                        </Table.Td>
                                        <Table.Td class=" whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.kat }}
                                        </Table.Td>
                                        <Table.Td class=" whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.kode_product }}
                                        </Table.Td>
                                        <Table.Td class=" whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.product_name }}
                                        </Table.Td>
                                        <Table.Td class=" whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ (data.cogs * 1).toLocaleString('id-ID', { style: 'currency',  currency: 'IDR', }).slice(0, -3) }}
                                        </Table.Td>
                                        <Table.Td class=" whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ (data.harga_jual * 1).toLocaleString('id-ID', { style: 'currency',  currency: 'IDR', }).slice(0, -3) }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.qty }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.deptname }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.pic }}
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
                                <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="search"
                                />
                                <Lucide
                                icon="Search"
                                class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                />
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
                <div class="mt-2 text-slate-500"> {{ pesan }}</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click=" setWarningModalPreview(false)" class="w-24">
                    Ok
                </Button>
            </div>
            <div class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
                <a href="" class="text-primary">
                    Why do I have this issue?
                </a>
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
                <Button type="button" variant="primary" @click="setSuccessModalPreview(false);" class="w-24">
                    Ok
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog  size="xl" :open="AddModal"  @close="setAddModal(false)" >
    
                <Dialog.Panel>
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            {{ action }} Product
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Product Name</FormLabel>
                                <TomSelect v-model="state.data.id_product"  class="w-60">
                                    <option value="">Search Product</option>
                                    <option v-for="item in state.listProduct" :key="item.id" :value="item.id">{{item.product_name}}</option>
                                </TomSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Kategori</FormLabel>
                                <FormSelect  v-model="state.data.kategori" class="w-full">
                                    <option value="">Select Categori</option>
                                    <option value="New Stock">New Stock</option>
                                    <option value="ReStock">ReStock</option>
                                </FormSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Qty</FormLabel>
                                <FormInput type="number" class="w-full" v-model="state.data.qty" />
                            </FormInline>


                        </div>

                        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Cogs</FormLabel>
                                <CurrencyInput type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.cogs"  :options="{ currency: 'IDR' }" placeholder="Insert Cogs" />
                            </FormInline>
                            
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Harga Jual</FormLabel>
                                <CurrencyInput type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.harga_jual"  :options="{ currency: 'IDR' }" placeholder="Insert Harga Jual" />
                            </FormInline>
                    
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Studio</FormLabel>
                                <TomSelect v-model="state.data.studio"  class="w-full">
                                    <option value="">Search Studio</option>
                                    <option v-for="item in state.listDepartement" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                </TomSelect>
                            </FormInline>
                        
                        </div>

                    </Dialog.Description>

                    <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                        <Button type="button" variant="outline-secondary" @click="setAddModal(false)" class="w-20 mr-1">
                            Cancel
                        </Button>
                        <Button variant="primary" type="button" class="w-20" @click="save">
                            SAVE
                        </Button>
                    </Dialog.Footer>
                
                </Dialog.Panel>
        
    </Dialog>

    
</template>

<script setup>
    import Api from '../api/Api'
    import listMenu from './Menu.vue'
    import Button from "../base-components/Button"
    import TomSelect from "../base-components/TomSelect"
    import { FormSelect, FormInput, FormInline, FormLabel } from "../base-components/Form"
    import { onMounted, ref, reactive , watch , computed} from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from "vuex"
    import { TailwindPagination } from 'laravel-vue-pagination'
    import LoadingIcon from "../base-components/LoadingIcon"
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import moment from 'moment'
    import CurrencyInput from "./CurrencyInput.vue";
    import Litepicker from "../base-components/Litepicker"
    import { Dialog, Menu } from "../base-components/Headless"
    import {
        DialogPanel

    } from '@headlessui/vue'
    import { ClassicEditor } from "../base-components/Ckeditor";
    import man from "../assets/images/sabar.png"
    import { useDebounceFn } from '@vueuse/core'
    const basicModalPreview = ref(true);
    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };
    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
        if (successModalPreview.value ==false) {
            document.body.style.overflow = 'none';
            state.data.id=''
            state.data.packages_name=''
            state.data.type=''
            state.data.validity=''
            state.data.price=''
            state.data.accesss=''
            state.data.sessions=''
            state.data.status_packages=''
        }
    };



    let todaysDate = new Date()
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const date = moment(todaysDate).format("MM")
    const year = moment(todaysDate).format("Y")
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const user = store.getters['auth/currentUser']
    const loading = ref("")
    const loadingsycn = ref("")
    const search = ref("")
    const studio = ref("")
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const source = ref("")
    const show = ref(20)
    const action = ref("Add New")
    const baseUrl = ref('http://192.168.5.65:5050/storage/studio/')
    const state = reactive(
        {
            listDepartement : {},
            listData:{},
            listProduct:{},
            datas:{},
            data:{
                id:"",
                id_product:"",
                kategori:"",
                qty:"",
                cogs:"",
                harga_jual:"",
                studio:""
            }
        }
    )

    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };


    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/transactions?page=' + page+ '&q=' + search.value+ '&studio=' + studio.value)
            .then(response => {
                state.listData = response.data.data
                loading.value = false
            }).catch(error => {
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        }else{
            await Api.get('/sales/transactions?page=' + page+ '&q=' + search.value+ '&studio=' + studio.value)
            .then(response => {
                state.listData = response.data.data
                loading.value = false
            }).catch(error => {
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        }
 
        
        
    }


    const add = async() => {
        action.value ='Add New'
        AddModal.value = true
    }

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/department')
            .then(response => {
                state.listDepartement = response.data.data
            }).catch(error => {
                
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        }else{
            await Api.get('/sales/department')
            .then(response => {
                state.listDepartement = response.data.data
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

    }


    const tampilProduct = async () => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/get_product')
            .then(response => {
                state.listProduct = response.data.data
                loading.value = false
            }).catch(error => {
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            }) 
        }else{
            await Api.get('/sales/get_product')
            .then(response => {
                state.listProduct = response.data.data
                loading.value = false
            }).catch(error => {
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            }) 
        }       
    }


    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
        await Api.post('/admin/transactions', {
            id_product : state.data.id_product,
            kategori : state.data.kategori,
            qty : state.data.qty,
            cogs : state.data.cogs,
            harga_jual : state.data.harga_jual,
            studio : state.data.studio
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Add Product"
            AddModal.value = false
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })


    }

    onMounted(async() => {
        await tampilData()
        await tampilProduct()
        await tampilDepartement()
    })


    watch(studio, (newQuestion, oldQuestion) => {
        tampilData()
    })


    watch(tanggal, (newQuestion, oldQuestion) => {
        tampilData()
    })


    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>

