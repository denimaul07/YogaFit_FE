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
                <RouterLink :to="{ name: 'teacher' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Teachers</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Teachers</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
        
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12 pt-12"> 
        
            <div class="grid grid-cols-12 gap-6">

                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
                    <div class="items-center sm:flex sm:mr-4">
                        <Button variant="primary" class="mr-2 shadow-md" @click="setHeaderFooterModalPreview(true)">
                            <span class="flex items-center justify-center w-40 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" /> Add New Teacher
                            </span>
                        </Button>

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
                                            NO
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            NAME
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            EMAIL
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            PHONE
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            IMAGE
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
                                            {{ data.name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.email }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.no_telp }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a-image :width="50" :src="baseUrl+data.foto" 
                                            fallback="data:image/png;base64,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"/>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                            <div
                                                :class="[
                                                'flex items-center justify-center',
                                                    { 'text-success': data.status_users==0 },
                                                    { 'text-danger': data.status_users==1 }
                                                ]"
                                            >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div v-if="data.status_users==0">Active</div>
                                                <div v-else-if="data.status_users==1">Non Active</div>
                                            
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

    <Dialog size="xl" :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    {{ headers }}  
                </h2>
            </Dialog.Title>
            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> User Name</FormLabel>
                    <FormInput id="modal-form-1" type="text" v-model="state.data.name" placeholder="Insert User Name" />
                    <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                    <FormInput id="modal-form-1" type="hidden" v-model="action" placeholder="Insert name Name" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> User Email</FormLabel>
                    <FormInput id="modal-form-1" type="text" v-model="state.data.email" placeholder="Insert User Email" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> Telp</FormLabel>
                    <FormInput id="modal-form-1" type="text" v-model="state.data.telp" placeholder="Insert User Telp" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> Foto</FormLabel>
                    <FormInput type="file" @change="onFileChange" accept="image/jpg, image/jpeg, image/png" />
                </div>

                <div class="col-span-12 sm:col-span-12">
                    <FormLabel htmlFor="modal-form-1"> Desc Teacher</FormLabel>
                    <ckeditor :editor="editor" v-model="state.data.ket"  />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> Status Users</FormLabel>
                    <FormSelect v-model="state.data.status_user" class="w-full bg-white">
                        <option value="">Semua Data</option>
                        <option value="0">Active</option>
                        <option value="1">Inactive</option>
                    </FormSelect>
                </div>

            
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="button" variant="outline-secondary" @click="
                            () => {
                            setHeaderFooterModalPreview(false);
                            }
                        " class="w-20 mr-1">
                    Cancel
                </Button>
                <Button variant="primary" type="button" class="w-20" @click="saveData">
                    Send
                </Button>
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>
    
</template>

<script setup>
    import Api from '../api/Api'
    import listMenu from './Menu.vue'
    import Button from "../base-components/Button";
    import { FormInput, FormSelect, FormLabel, FormInline, FormCheck } from "../base-components/Form"
    import TomSelect from "../base-components/TomSelect"
    import { onMounted, ref, reactive , watch, computed  } from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useDebounceFn } from '@vueuse/core'
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Tippy from "../base-components/Tippy";
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"    
    import LoadingIcon from "../base-components/LoadingIcon"
    import { Dialog, Menu } from "../base-components/Headless"
    import {
        DialogPanel

    } from '@headlessui/vue'
    import man from "../assets/images/sabar.png"
    import 'vue-select/dist/vue-select.css';
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    import CKEditor from '@ckeditor/ckeditor5-vue'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    
    const editor = ClassicEditor
    const ckeditor = CKEditor.component

    const loading = ref(true)
    const loadingsycn = ref("")
    const pesan = ref("")
    const roles = ref("")
    const dept = ref("")
    const search = ref("")
    const selected= ref([])
    const kode= ref("")
    const status = ref("")
    const action  = ref("INSERT")
    const headers  = ref("Add New Data")
    const headerFooterModalPreview = ref(false);
    const baseUrl = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const router = useRouter()

    const state = reactive({
        listData  : {},
        listRole  : {},
        listDepartement : {},
        datas : "",
        data : {
            id:"",
            name:"",
            email:"",
            password:"",
            kode:"",
            role:[],
            status_user:"",
            ket:"",
            telp:""
        }
        
    })

    const basicModalPreview = ref(false);
    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
    };

    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
    };


    const setHeaderFooterModalPreview = (value) => {
        headerFooterModalPreview.value = value;
        if(headerFooterModalPreview.value==false){
            state.data.name = '';
            selected.value = [];
            kode.value = '';
            state.data.email = '';
            state.data.password = '';
            state.data.status_user = '';
            state.data.role=[];
            state.data.id = '';
            state.data.ket = '';
            action.value = 'INSERT';
            headers.value = 'Add New Data';

        }
    };


    const tampilData = async (page = 1) => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/teacher?page=' + page+ '&q=' + search.value)
        .then(response => {
            state.listData = response.data.data
            loading.value= false
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

    const edit = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/users', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.name = state.datas[0].name
            state.data.email = state.datas[0].email
            state.data.telp = state.datas[0].no_telp
            state.data.ket = state.datas[0].desc_teacher
            state.data.status_user = state.datas[0].status_users
            action.value = 'UPDATE';
            headerFooterModalPreview.value = true
            loadingsycn.value = false
            basicModalPreview.value = false

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

    const image= ref("")

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };

    const saveData = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        if(action.value=="INSERT"){


            const formdata = new FormData();
            formdata.append('file', image.value);
            formdata.append('name', state.data.name);
            formdata.append('email', state.data.email);
            formdata.append('telp', state.data.telp);
            formdata.append('status_user', state.data.status_user);
            formdata.append('ket', state.data.ket);
            await Api.post('/admin/teacher', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Data Success Added"
                setHeaderFooterModalPreview(false)
                loadingsycn.value = false

            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            const formdata = new FormData();
            formdata.append('file', image.value);
            formdata.append('id', state.data.id);
            formdata.append('name', state.data.name);
            formdata.append('email', state.data.email);
            formdata.append('telp', state.data.telp);
            formdata.append('status_user', state.data.status_user);
            formdata.append('ket', state.data.ket);
            await Api.post('/admin/update_teacher', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Data Success Update"
                setHeaderFooterModalPreview(false)
                loadingsycn.value = false

            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    }

    const tampilRole = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/role')
        .then(response => {
            state.listRole = response.data.data
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
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
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
    }

    onMounted(async() => {
        await tampilData()
        await tampilRole()
        await tampilDepartement()
    })

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    watch(status, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(dept, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(roles, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>
