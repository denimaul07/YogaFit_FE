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
                <RouterLink :to="{ name: 'class' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Class</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Class</h2>
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
        
            <div class="grid grid-cols-12 gap-6">
                <Button variant="primary" class="mr-2 shadow-md" @click="add">
                    <span class="flex items-center justify-center w-60 h-5">
                        <Lucide icon="Plus" class="w-4 h-4" /> Add New
                    </span>
                </Button>
                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
                    <div class="items-center sm:flex sm:mr-4">
                    

                        <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                            Filter
                        </label>
                        <FormSelect v-model="level" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                            <option value="">Semua Data</option>
                            <option value="Advance">Advance</option>
                            <option value="All Level">All Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Beginner">Beginner</option>
                        </FormSelect>

                    </div>

                    <div class="hidden mx-auto md:block text-black">
                    
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
                                            Name Class
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Level
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Class
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Capacity
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Duration
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Virtual Class
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Foto Class
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Status
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Action
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr v-if="loading" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr v-if="state.listData.total==0" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
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
                                            {{ data.class_name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.class_level }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.class_kat }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.capacity }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.duration }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.virtual_class }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a-image
                                                :width="100"
                                                :src="'https://login.yogafitidonline.com/api/storage/kelas/'+data.file"
                                                 fallback="data:image/png;base64,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"
                                            />
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                            <div
                                                :class="[
                                                'flex items-center justify-center',
                                                    { 'text-success': data.status_class==0 },
                                                    { 'text-danger': data.status_class==1 }
                                                ]"
                                            >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div v-if="data.status_class==0">Active</div>
                                                <div v-else-if="data.status_class==1">Non Active</div>
                                            
                                            </div>
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                                    <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> 
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
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            {{ action }} Class
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Class Name</FormLabel>
                                <FormInput type="text" class="col-span-8" v-model="state.data.nama" placeholder="Insert Class Name"/>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Class Level</FormLabel>
                                <FormSelect  v-model="state.data.level" class="w-full">
                                    <option value="">Select Class Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advance">Advance</option>
                                    <option value="All Level">All Level</option>
                                </FormSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Capacity</FormLabel>
                                <FormInput type="number" class="col-span-8" v-model="state.data.capacity" placeholder="Insert Capacity"/>
                            </FormInline>

                            
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Class</FormLabel>
                                <FormSelect  v-model="state.data.class_kat" class="w-full">
                                    <option value="">Select Class</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Hot">Hot</option>
                                </FormSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Virtual Class</FormLabel>
                                <FormSelect  v-model="state.data.virtual_class" class="w-full">
                                    <option value="">Select Virtual Class</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </FormSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Duration (in minute)</FormLabel>
                                <FormInput type="number" class="col-span-8" v-model="state.data.duration" placeholder="Insert Duration"/>
                            </FormInline>
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;">Class Image</FormLabel>
                                <FormInput  type="file" @change="onFileChange" accept="image/x-png,image/gif,image/jpeg" class="col-span-8"/>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Video URL</FormLabel>
                                <FormInput type="text" class="col-span-8" v-model="state.data.video" placeholder="Insert Video URL"/>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Status</FormLabel>
                                <FormSelect v-model="state.data.status" class="w-full">
                                    <option value="">Select Status</option>
                                    <option value="0">Active</option>
                                    <option value="1">In Active</option>
                                
                                </FormSelect>
                            </FormInline>
                        </div>

                        
                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Class Description</FormLabel>
                            <ClassicEditor v-model="state.data.desc"  />
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Facilities</FormLabel>
                            <ClassicEditor v-model="state.data.fasilitas"  />
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Class Benefit</FormLabel>
                            <ClassicEditor v-model="state.data.benefit"  />
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
                
                </DialogPanel>
            </div>
        </div>
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
            state.data.id=""
            state.data.nama=""
            state.data.level=""
            state.data.capacity=""
            state.data.class_kat=""
            state.data.virtual_class=""
            state.data.video=""
            state.data.status=""
            state.data.desc=""
            state.data.fasilitas=""
            state.data.benefit=""
            state.data.file=""
            state.data.duration=''
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
    const image = ref("")
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const level = ref("")
    const show = ref(20)
    const action = ref("Add New")
    const baseUrl = ref('https://login.yogafitidonline.com/api/storage/studio/')
    const state = reactive(
        {
            listSource:{},
            source:{},
            category:{},
            listData:{},
            datas:{},
            data:{
                id:"",
                nama:"",
                level:"",
                capacity:"",
                class_kat:"",
                virtual_class:"",
                video:"",
                status:"",
                duration:"",
                desc:"",
                fasilitas:"",
                benefit:"",
                file:""
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
        await Api.get('/admin/class?page=' + page+ '&q=' + search.value+ '&level=' + level.value)
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


    const add = async() => {
        action.value ='Add New'
        AddModal.value = true
    }

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };

    const edit = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/class', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.nama=state.datas[0].class_name
            state.data.level=state.datas[0].class_level
            state.data.capacity=state.datas[0].capacity
            state.data.class_kat=state.datas[0].class_kat
            state.data.virtual_class=state.datas[0].virtual_class
            state.data.video=state.datas[0].url
            state.data.status=state.datas[0].status_class
            state.data.desc=state.datas[0].class_desc
            state.data.fasilitas=state.datas[0].class_facilities
            state.data.benefit=state.datas[0].class_benefit
            state.data.file=state.datas[0].file
            state.data.duration=state.datas[0].duration
            action.value ='Update'
            AddModal.value = true
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
            const formdata = new FormData();
            formdata.append('image', image.value);
            formdata.append("class_name", state.data.nama);
            formdata.append("capacity", state.data.capacity);
            formdata.append("class_level", state.data.level);
            formdata.append("class_kat", state.data.class_kat);
            formdata.append("virtual_class", state.data.virtual_class);
            formdata.append("class_desc", state.data.desc);
            formdata.append("class_facilities", state.data.fasilitas);
            formdata.append("class_benefit", state.data.benefit);
            formdata.append("duration", state.data.duration);
            formdata.append("url", state.data.video);
            formdata.append("status_class", state.data.status);
            await Api.post('/admin/class', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Add Class"
                AddModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        } else {
            const formdata = new FormData();
            formdata.append('image', image.value);
            formdata.append("id", state.data.id);
            formdata.append('image', image.value);
            formdata.append("class_name", state.data.nama);
            formdata.append("capacity", state.data.capacity);
            formdata.append("class_level", state.data.level);
            formdata.append("class_kat", state.data.class_kat);
            formdata.append("virtual_class", state.data.virtual_class);
            formdata.append("class_desc", state.data.desc);
            formdata.append("class_facilities", state.data.fasilitas);
            formdata.append("class_benefit", state.data.benefit);
            formdata.append("duration", state.data.duration);
            formdata.append("url", state.data.video);
            formdata.append("status_class", state.data.status);
            await Api.post('/admin/Updatekelas', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Update Class"
                AddModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }

    }

    onMounted(async() => {
    
        await tampilData()
    })


    watch(show, (newQuestion, oldQuestion) => {
        tampilData()
    })


    watch(tanggal, (newQuestion, oldQuestion) => {
        tampilData()
    })


    watch(level, (newQuestion, oldQuestion) => {
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

