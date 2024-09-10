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

    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                <RouterLink :to="{ name: 'CrmSetting' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> List Settings CRM</RouterLink>
            </div>
            
        </div>
    
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       

            <div class="items-center sm:flex sm:mr-4">
            </div>

            <div class="hidden mx-auto md:block text-black">
                <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Settings CRM</h2>
            </div>
    
            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">

            </div>

        </div>
        
        <!-- BEGIN: Data List -->
        <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
            <div class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       

                        <div class="items-center sm:flex sm:mr-4">
                            <Button variant="primary" class="mr-2 shadow-md" @click="add">
                                <span class="flex items-center justify-center w-5 h-5">
                                    <Lucide icon="Plus" class="w-4 h-4" />
                                </span>
                            </Button>
                        </div>

                        <div class="hidden mx-auto md:block text-black">
                            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Data Categori CRM</h2>
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
                    <div class="overflow-x-auto">
                        <Table class="border-spacing-y-[10px] border-separate -mt-2">
                            <Table.Thead class="bg-primary text-white">
                                <Table.Tr>
                                    <Table.Th class="border-b-0 whitespace-nowrap"> No </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center"> Action </Table.Th>
                                    <Table.Th class="text-center border-b-0 whitespace-nowrap"> Categori Followup </Table.Th>
                                    <Table.Th class="text-center border-b-0 whitespace-nowrap"> Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                    
                                <Table.Tr v-if="loading" class="intro-x">
                                    <Table.Td colspan="4" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        <div class="flex flex-col items-center justify-end col-span-12">
                                            <LoadingIcon icon="audio" class="w-8 h-8" />
                                            <div class="mt-2 text-xs text-center">Processing Data</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr v-if="state.listData.total==0" class="intro-x">
                                    <Table.Td colspan="4" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        <div class="flex flex-col items-center justify-end col-span-12">
                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr v-for="(data, index) in state.listData.data" :key="data.id" class="intro-x">
                                    
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        {{ state.listData.from + index }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                        <div class="flex items-center justify-center">
                                            <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                                <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> 
                                            </a>

                                            <a class="flex items-center text-danger ml-5" href="#" @click="hapus(data.id)">
                                                <Lucide icon="Trash" class="w-4 h-4 mr-1" /> 
                                            </a>
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                        {{ data.kategori }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                        <div
                                            :class="[
                                            'flex items-center justify-center',
                                                { 'text-success': data.status_kategori==0 },
                                                { 'text-danger': data.status_kategori==1 },
                                            ]"
                                        >
                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                            <div v-if="data.status_kategori==0">Active</div>
                                            <div v-else-if="data.status_kategori==1">Non Active</div>
                                        
                                        </div>
                                    </Table.Td>
                                    
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
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

                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       

                        <div class="items-center sm:flex sm:mr-4">
                            <Button variant="primary" class="mr-2 shadow-md" @click="addSource">
                                <span class="flex items-center justify-center w-5 h-5">
                                    <Lucide icon="Plus" class="w-4 h-4" />
                                </span>
                            </Button>
                        </div>

                        <div class="hidden mx-auto md:block text-black">
                            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Data Source CRM</h2>
                        </div>

                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div class="relative w-56 text-slate-500">
                                <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="searchSource"
                                />
                                <Lucide
                                icon="Search"
                                class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                />
                            </div>
                            
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <Table class="border-spacing-y-[10px] border-separate -mt-2">
                            <Table.Thead class="bg-primary text-white">
                                <Table.Tr>
                                    <Table.Th class="border-b-0 whitespace-nowrap"> No </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center"> Action </Table.Th>
                                    <Table.Th class="text-center border-b-0 whitespace-nowrap"> Source </Table.Th>
                                    <Table.Th class="text-center border-b-0 whitespace-nowrap"> Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                    
                                <Table.Tr v-if="loading" class="intro-x">
                                    <Table.Td colspan="4" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        <div class="flex flex-col items-center justify-end col-span-12">
                                            <LoadingIcon icon="audio" class="w-8 h-8" />
                                            <div class="mt-2 text-xs text-center">Processing Data</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr v-if="state.listDataSource.total==0" class="intro-x">
                                    <Table.Td colspan="4" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        <div class="flex flex-col items-center justify-end col-span-12">
                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>

                                

                                <Table.Tr v-for="(data, index) in state.listDataSource.data" :key="data.id" class="intro-x">
                                    
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        {{ state.listDataSource.from + index }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                        <div class="flex items-center justify-center">
                                            <a class="flex items-center text-success" href="#" @click="editSource(data.id)">
                                                <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> 
                                            </a>

                                            <a class="flex items-center text-danger ml-5" href="#" @click="hapusSource(data.id)">
                                                <Lucide icon="Trash" class="w-4 h-4 mr-1" /> 
                                            </a>
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                        {{ data.source }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                        <div
                                            :class="[
                                            'flex items-center justify-center',
                                                { 'text-success': data.status_source==0 },
                                                { 'text-danger': data.status_source==1 },
                                            ]"
                                        >
                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                            <div v-if="data.status_source==0">Active</div>
                                            <div v-else-if="data.status_source==1">Non Active</div>
                                        
                                        </div>
                                    </Table.Td>
                                    
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </div>
                    
                    
                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                        <div class="items-center sm:flex sm:mr-4">
                            <TailwindPagination :limit="1" :data="state.listDataSource" @pagination-change-page="tampilDataSource"/>
                        </div>

                        <div class="hidden mx-auto md:block text-slate-500">
                            Showing {{ state.listDataSource.from }} to {{ state.listDataSource.to }} of {{ state.listDataSource.total }} entries
                        </div>

                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div class="relative w-56 text-slate-500">
                                <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="searchSource"
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
        <!-- END: Data List -->

        <!-- END: Users Layout -->
        
    </div>


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

    <Dialog :open="warningModalPreview" @close="setWarningModalPreview(false)">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
                <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
                <div class="mt-2 text-slate-500"> {{ pesan }}</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="setWarningModalPreview(false)" class="w-24">
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

    <Dialog size="lg" :open="addModal"  @close="setaddModal(false)">
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    {{action}} Data Categori CRM
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setaddModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                        <FormInline class="mt-5">
                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Categori</FormLabel>
                            <FormInput type="text" class="col-span-8" v-model="state.data.kategori"/>
                    </FormInline>

                    <FormInline class="mt-5">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Status</FormLabel>
                        <FormSelect v-model="state.data.status_kategori" class="w-full">
                            <option value="">Select Status</option>
                            <option value="0">Active</option>
                            <option value="1">Non Active</option>
                        </FormSelect>
                    </FormInline>
                </div>

            </Dialog.Description>
            <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                <Button type="button" variant="outline-secondary" @click="setaddModal(false)" class="w-20 mr-1">
                    Cancel
                </Button>
            
                <Button variant="primary" type="button" class="w-40" @click="save">
                    Save
                </Button>
            </Dialog.Footer>
        
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="hapusModal" @close="sethapusModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to delete this data?? <br />
                    This process cannot be reversed if it has been deleted.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="sethapusModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="hapusKat">
                    Delete
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog size="lg" :open="addSourceModal"  @close="setaddSourceModal(false)">
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    {{actionSource}} Data Source CRM
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setaddSourceModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                        <FormInline class="mt-5">
                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Source</FormLabel>
                            <FormInput type="text" class="col-span-8" v-model="state.data.source"/>
                    </FormInline>

                    <FormInline class="mt-5">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Status</FormLabel>
                        <FormSelect v-model="state.data.status_source" class="w-full">
                            <option value="">Select Status</option>
                            <option value="0">Active</option>
                            <option value="1">Non Active</option>
                        </FormSelect>
                    </FormInline>
                </div>

            </Dialog.Description>
            <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                <Button type="button" variant="outline-secondary" @click="setaddSourceModal(false)" class="w-20 mr-1">
                    Cancel
                </Button>
            
                <Button variant="primary" type="button" class="w-40" @click="saveSource">
                    Save
                </Button>
            </Dialog.Footer>
        
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="hapusSourceModal" @close="sethapusSourceModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to delete this data?? <br />
                    This process cannot be reversed if it has been deleted.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="sethapusSourceModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="hapussor">
                    Delete
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>


</template>



<script setup>
    import Api from '../api/Api'
    import moment from 'moment'
    import Button from "../base-components/Button"
    import { FormInput, FormSelect, FormLabel, FormInline, FormTextarea } from "../base-components/Form"
    import TomSelect from "../base-components/TomSelect"
    import { onMounted, ref, reactive , watch, computed  } from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useDebounceFn } from '@vueuse/core'
    import 'vue-select/dist/vue-select.css';
    import { useStore } from "vuex";
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import LoadingIcon from "../base-components/LoadingIcon"
    import { Dialog } from "../base-components/Headless"
    import man from "../assets/images/sabar.png"
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    const router = useRouter()
    const route = useRoute()
    const search = ref("")
    const searchSource = ref("")
    const store = useStore()
    const user = store.getters['auth/currentUser']
    const roleName = ref("")
    const roleName2 = ref("")
    const loading = ref(true)
    const loadingsycn = ref("")
    const pesan = ref("")
    const action = ref("Add New")
    const actionSource = ref("Add New")
    const basicModalPreview = ref(false);

    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (warningModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (successModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    
    const addModal = ref(false);
    const setaddModal = (value) => {
        addModal.value = value
        if (addModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const hapusModal = ref(false);
    const sethapusModal = (value) => {
        hapusModal.value = value
        if (hapusModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const addSourceModal = ref(false);
    const setaddSourceModal = (value) => {
        addSourceModal.value = value
        if (addSourceModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const hapusSourceModal = ref(false);
    const sethapusSourceModal = (value) => {
        hapusSourceModal.value = value
        if (hapusSourceModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const state = reactive({
        listData  : {},
        listDataSource  : {},
        datas : "",
        data : {
            id:"",
            kategori:"",
            status_kategori:"",
            source:"",
            status_source:""
        }
        
    })

    const tampilData = async (page = state.listData.current_page) => {
        loading.value= true
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/categori')
        .then(response => {
            state.listData = response.data.data
            loading.value= false
        }).catch(error => {
            if(error.response.data.status_code==403){
                router.push({name: '403'})
            }else{
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            }
        })

        
        if (state.listData.last_page < 1 || state.listData.last_page === undefined || page > state.listData.last_page) {
           page = 1
        }

        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/categori')
        .then(response => {
            state.listData = response.data.data
            loading.value= false
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

    const add = async() => {
        action.value ='Add New'
        addModal.value = true
    } 

    const edit = async (id) => {
    
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/categori', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.kategori = state.datas[0].kategori
            state.data.status_kategori = state.datas[0].status_kategori
            action.value='Update'
            addModal.value = true
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

    const hapus = async (id) => {
    
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/categori', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            hapusModal.value = true
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

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (action.value=='Add New') {
            await Api.post('/admin/categori', {
                kategori : state.data.kategori,
                status_kategori : state.data.status_kategori,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Save Data"
                addModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else {
            await Api.put('/admin/categori', {
                id : state.data.id,
                kategori : state.data.kategori,
                status_kategori : state.data.status_kategori,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Update Data"
                addModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    
    }

    const hapusKat = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Deleted Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.delete('/admin/categori?id=' + state.data.id)
        .then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Delete Data"
            hapusModal.value = false
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
        
    
    }

    //Source

    const tampilDataSource = async (page = state.listDataSource.current_page) => {
        loading.value= true
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/source')
        .then(response => {
            state.listDataSource = response.data.data
            loading.value= false
        }).catch(error => {
            if(error.response.data.status_code==403){
                router.push({name: '403'})
            }else{
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            }
        })

        
        if (state.listDataSource.last_page < 1 || state.listDataSource.last_page === undefined || page > state.listDataSource.last_page) {
           page = 1
        }

        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/source')
        .then(response => {
            state.listDataSource = response.data.data
            loading.value= false
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

    const addSource = async() => {
        actionSource.value ='Add New'
        addSourceModal.value = true
    } 

    const saveSource = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (actionSource.value=='Add New') {
            await Api.post('/admin/source', {
                source : state.data.source,
                status_source : state.data.status_source,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Save Data"
                addSourceModal.value = false
                tampilDataSource()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else {
            await Api.put('/admin/source', {
                id : state.data.id,
                source : state.data.source,
                status_source : state.data.status_source,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Update Data"
                addSourceModal.value = false
                tampilDataSource()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    
    }


    const editSource = async (id) => {
    
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/source', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.source = state.datas[0].source
            state.data.status_source = state.datas[0].status_source
            actionSource.value='Update'
            addSourceModal.value = true
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

    const hapusSource = async (id) => {
        state.data.id = id
        hapusSourceModal.value = true
        loadingsycn.value = false
        basicModalPreview.value = false
    }

    const hapussor = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Deleted Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.delete('/admin/source?id=' + state.data.id)
        .then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Delete Data"
            hapusSourceModal.value = false
            tampilDataSource()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
        
    
    }


    onMounted(async() => {
        if (user.roles.length === 1) {
            roleName.value = user.roles[0].name;
        } else if (user.roles.length > 1) {
            roleName.value = user.roles[0].name;
            roleName2.value = user.roles[1].name;
        }
    
        await tampilData()
        await tampilDataSource()
        
    })

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })


    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

    watch(searchSource, (newQuestion, oldQuestion) => {
        searchingSource()
    })


    const searchingSource = useDebounceFn(() => {
        loading.value= false
        tampilDataSource()
    }, 500)

</script>

<!-- <style>
    .ck-editor__main {
        width: 1000px;
    }
</style> -->