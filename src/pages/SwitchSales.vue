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



    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
            <Preview class="intro-y box">
                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                    <h2 class="mr-auto text-base font-medium text-center">Switch Members</h2>
                </div>

                <div class="p-5">
                    <Preview.Panel>
                        <Tab.Group  class="mt-5">
                            <Tab.List variant="boxed-tabs">
                                <Tab>
                                    <Tab.Button class="w-full py-2" as="button">
                                        Menunggu Approve
                                    </Tab.Button>
                                </Tab>
                                <Tab>
                                    <Tab.Button class="w-full py-2" as="button">
                                        History Sales
                                    </Tab.Button>
                                </Tab>
                        
                            </Tab.List>

                            <Tab.Panels class="mt-5">
                                <Tab.Panel class="leading-relaxed">
                                    <div class="col-span-12 2xl:col-span-3">
                                        <div class="overflow-x-auto">
                                            <Table>
                                                <Table.Thead class="bg-primary text-white">
                                                <Table.Tr class="intro-x">
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        NO
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        TANGGAL REQUEST
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        MEMBER
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        SALES LAMA
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        SALES BARU
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        REQUEST BY
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        STATUS
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        ACTION
                                                    </Table.Th>
                                                </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    <Table.Tr v-if="processing" class="intro-x"> 
                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"><a-skeleton active /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr v-else-if="state.listData.total == 0" class="intro-x">
                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                        <div class="flex flex-col items-center justify-end col-span-12">
                                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                        </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id" v-else>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                        <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                            {{ state.listData.from + index }}
                                                        </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.tanggal }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.name }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.sales_awal }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.sales_akhir }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.request }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            <div
                                                                :class="[
                                                                'flex items-center justify-center',
                                                                    { 'text-warning': data.status==0 },
                                                                    { 'text-success': data.status==1 },
                                                                    { 'text-danger': data.status==1 }
                                                                ]"
                                                            >
                                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                                <div v-if="data.status==0">Menunggu Approve</div>
                                                                <div v-else-if="data.status==1">Approve</div>
                                                                <div v-else-if="data.status==1">Tolak</div>
                                                            
                                                            </div>
                                                        </Table.Td>

                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                            <div class="flex items-center justify-center">
                                                                <a class="flex items-center text-success" href="#" @click="approve(data.id)">
                                                                    <Lucide icon="UserCheck" class="w-4 h-4 mr-5" /> 
                                                                </a>

                                                                <a class="flex items-center text-danger" href="#" @click="tolak(data.id)">
                                                                    <Lucide icon="XCircle" class="w-4 h-4 mr-1" /> 
                                                                </a>
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
                                            <FormInput  type="text"   class="w-56 pr-10 !box"  placeholder="Search..." v-model="searchHistory" />
                                            <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"   />
                                        </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>

                            <Tab.Panels class="mt-5">
                                <Tab.Panel class="leading-relaxed">
                                    <div class="col-span-12 2xl:col-span-3">
                                        <div class="overflow-x-auto">
                                            <Table>
                                                <Table.Thead class="bg-primary text-white">
                                                <Table.Tr class="intro-x">
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        NO
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        TANGGAL REQUEST
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        MEMBER
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        SALES LAMA
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        SALES BARU
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        REQUEST BY
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        PROSES BY
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        TANGGAL PROSES
                                                    </Table.Th>
                                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                        STATUS
                                                    </Table.Th>
                                                </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    <Table.Tr v-if="processing2" class="intro-x"> 
                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"><a-skeleton active /></Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr v-if="state.listDataHitory.total == 0" class="intro-x">
                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                        <div class="flex flex-col items-center justify-end col-span-12">
                                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                        </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listDataHitory.data" :key="data.id" v-else>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                        <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                            {{ state.listDataHitory.from + index }}
                                                        </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.tanggal }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.name }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.sales_awal }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.sales_akhir }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                        {{ data.request }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            <div v-if="data.status==1">
                                                                {{ data.approve }}
                                                            </div>
                                                            <div v-else>
                                                                {{ data.tolak }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                
                                                            <div v-if="data.status==1">
                                                                {{ data.tgl_approve }}
                                                            </div>
                                                            <div v-else>
                                                                {{ data.tgl_tolak }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            <div
                                                                :class="[
                                                                'flex items-center justify-center',
                                                                    { 'text-warning': data.status==0 },
                                                                    { 'text-success': data.status==1 },
                                                                    { 'text-danger': data.status==2 }
                                                                ]"
                                                            >
                                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                                <div v-if="data.status==0">Menunggu Approve</div>
                                                                <div v-else-if="data.status==1">Approve</div>
                                                                <div v-else-if="data.status==2">Tolak</div>
                                                            
                                                            </div>
                                                        </Table.Td>

                                                    
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                        <div class="items-center sm:flex sm:mr-4">
                                        <TailwindPagination :limit="1" :data="state.listDataHitory" @pagination-change-page="tampilData"/>
                                        </div>

                                        <div class="hidden mx-auto md:block text-slate-500">
                                        Showing {{ state.listDataHitory.from }} to {{ state.listDataHitory.to }} of {{ state.listDataHitory.total }} entries
                                        </div>

                                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                        <div class="relative w-56 text-slate-500">
                                            <FormInput  type="text"   class="w-56 pr-10 !box"  placeholder="Search..." v-model="searchHistory" />
                                            <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"   />
                                        </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </Preview.Panel>
                </div>
            </Preview>
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

    <Dialog size="lg" :open="AddModal" @close="setAddModal(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    Switch New Sales
                </h2>
        
            </Dialog.Title>
            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <TomSelect class="w-full"  id="modal-form-6"  v-model="state.data.sales">
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
                                setAddModal(false);
                            }
                        " class="w-20 mr-1">
                    Cancel
                </Button>
                <Button variant="primary" type="button" class="w-20" @click="save()">
                    Save
                </Button>
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>  

    <Dialog :open="AddModalTolak">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin tolak permintaan ini? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di proses.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setAddModalTolak(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="tolakPermintaan()">
                    Tolak
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="AddModalApprove">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin Approve permintaan ini? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di proses.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setAddModalApprove(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-24" @click="approvePermintaan()">
                    Approve
                </Button>
            </div>
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
    import { Tab } from "../base-components/Headless";
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
        }
    };

    const AddModalApprove =ref(false)
    const setAddModalApprove = (value) => {
        AddModalApprove.value = value;
        if (AddModalApprove.value ==false) {
            document.body.style.overflow = 'none';
        }
    };
    const AddModalTolak = ref(false)
    const setAddModalTolak = (value) => {
        AddModalTolak.value = value;
        if (AddModalTolak.value ==false) {
            document.body.style.overflow = 'none';
        }
    };



    let todaysDate = new Date()
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const user = store.getters['auth/currentUser']
    const loading = ref("")
    const searchHistory=ref("")
    const loadingsycn = ref("")
    const processing=ref(false)
    const processing2=ref(false)
    const search=ref("")
    const pesan = ref("")

    const state = reactive({
        listData: {},
        listSales:{},
        listDataHitory:{},
        data:{
            id:"",
            sales:""
        }
    });

    

    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const tampilData = async (page = 1) => {
        processing.value = true
        basicModalPreview.value = true
    
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''

        url = Api.get('/sales/get_team_history?page=' + page+ '&q=' + search.value+ '&status=' + 0)
        
        await url.then(response => {
            state.listData = response.data.data
            processing.value = false
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

    const tampilHistory = async (page = 1) => {
        processing2.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''

        url = Api.get('/sales/get_team_history?page=' + page+ '&q=' + searchHistory.value+ '&status=' + 1)
        
        await url.then(response => {
            state.listDataHitory = response.data.data
            basicModalPreview.value = false
            processing2.value = false
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



    const approve = (id) => {
        state.data.id=id
        AddModalApprove.value=true
    }

    const tolak = (id) => {
        state.data.id=id
        AddModalTolak.value=true
    }

    
    const approvePermintaan = async () => {

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Harap Sabar, Lagi Proses"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.defaults.headers.post['Content-Type'] = "multipart/form-data"

        await Api.post('/sales/tukerApprove', {
            id :state.data.id
        }).then(async (response) => {

            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Permintaan Di Approve"
            AddModalApprove.value = false
            state.data.id =''
            tampilData()
            tampilHistory()

        }).catch(error => {
            console.log(error);
            const object1 = error.response.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    const tolakPermintaan = async () => {

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Harap Sabar, Lagi Proses"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.defaults.headers.post['Content-Type'] = "multipart/form-data"

        await Api.post('/sales/tukerTolak', {
            id :state.data.id
        }).then(async (response) => {

            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Permintaan Di Tolak"
            AddModalTolak.value = false
            state.data.id =''
            tampilData()
            tampilHistory()

        }).catch(error => {
            console.log(error);
            const object1 = error.response.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }


    onMounted(async() => {
    
        await tampilData()
        await tampilHistory()
    })

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>

