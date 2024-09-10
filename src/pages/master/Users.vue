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

    <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 class="mr-auto text-lg font-medium">Users Data</h2>
        <div class="flex w-full mt-4 sm:w-auto sm:mt-0">

        <div class="text-center">
            <Button class="mr-2 shadow-md" as="a" href="#" variant="primary" @click="setHeaderFooterModalPreview(true)">
            Add New Data
            </Button>
        </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
            <div class="items-center sm:flex sm:mr-4">
                <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                    Filter
                </label>

                <div class="col-span-12 intro-y lg:col-span-6 grid grid-cols-3">
                    <Preview class="intro-y box">
                        <TomSelect v-model="status" class="w-full bg-white">
                            <option value="">Semua Data</option>
                            <option value="0">Active</option>
                            <option value="1">Inactive</option>
                        </TomSelect>
                    </Preview>


                    <Preview class="intro-y box">
                        <TomSelect v-model="dept" class="w-full bg-white">
                            <option value="">Departement Users</option>
                            <option v-for="item in state.listDepartement" :key="item.id"  :value="item.id">{{item.deptname}}</option>
                        </TomSelect>
                    </Preview>
                </div>
            </div>

            <div class="hidden mx-auto md:block text-slate-500">
                
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

        <!-- BEGIN: Data List -->
        <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
            <Table class="border-spacing-y-[10px] border-separate -mt-2">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th class="border-b-0 whitespace-nowrap"> No </Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap"> Users Name </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Email </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Departement </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Roles </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Status </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Last Login </Table.Th>
                        <Table.Th class="text-center border-b-0 whitespace-nowrap"> Actions </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
        
                    <Table.Tr v-if="loading" class="intro-x">
                        <Table.Td colspan="8" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                            <div class="flex flex-col items-center justify-end col-span-12">
                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                <div class="mt-2 text-xs text-center">Processing Data</div>
                            </div>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr v-if="state.listData.total==0" class="intro-x">
                        <Table.Td colspan="8" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                            <div class="flex flex-col items-center justify-end col-span-12">
                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                            </div>
                        </Table.Td>
                    </Table.Tr>

                    <Table.Tr v-for="(item, index) in state.listData.data" :key="item.id_data" class="intro-x">
                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                            {{ index+1 }}
                        </Table.Td>
                        <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            {{ item.name }}
                        </Table.Td>
                        <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            {{ item.email }}
                        </Table.Td>
                        <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] ">
                            {{ item.deptname }}
                        </Table.Td>
                    
                        <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            {{ item.roles.map(role => role.name).join(", ") }}
                        </Table.Td>
            
                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                            <div
                                :class="[
                                'flex items-center justify-center',
                                    { 'text-success': item.status_users==0 },
                                    { 'text-danger': item.status_users==1 },
                                ]"
                            >
                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                <div v-if="item.status_users==0">Aktif</div>
                                <div v-else-if="item.status_users==1">Tidak Aktif</div>
                            
                            </div>
                        </Table.Td>
                        <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] ">
                            {{ item.last_login }}
                        </Table.Td>
                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                        <div class="flex items-center justify-center">
                            <a class="flex items-center mr-3 text-success" href="#" @click="edit(item.id)">
                                <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                                Edit
                            </a>
                        </div>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </div>
        <!-- END: Data List -->

        <!-- END: Users Layout -->
        
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
            <div class="items-center sm:flex sm:mr-4">
                <TailwindPagination :limit="1" :data="state.listData" @pagination-change-page="tampilData"/>
            </div>

            <div class="hidden mx-auto md:block text-slate-500">
                Showing {{ state.listData.current_page }} to {{ state.listData.to }} of {{ state.listData.total }} entries
            </div>

        
        </div>
    </div>

    <!-- BEGIN: HTML Table Data -->
    
    <!-- END: HTML Table Data -->
    <Dialog size="xl" :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    {{ headers }}
                </h2>
        
            </Dialog.Title>
            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-4">
                    <FormLabel htmlFor="modal-form-1"> User Name</FormLabel>
                    <FormInput id="modal-form-1" type="text" v-model="state.data.name" placeholder="Insert User Name" />
                    <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                    <FormInput id="modal-form-1" type="hidden" v-model="action" placeholder="Insert name Name" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <FormLabel htmlFor="modal-form-1"> User Email</FormLabel>
                    <FormInput id="modal-form-1" type="text" v-model="state.data.email" placeholder="Insert User Email" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <FormLabel htmlFor="modal-form-1"> Password</FormLabel>
                    <FormInput id="modal-form-1" type="password" v-model="state.data.password" placeholder="Insert User Password" />
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <FormLabel htmlFor="modal-form-1"> Departement</FormLabel>
                    <FormSelect  class="w-full" id="modal-form-6" v-model="kode">
                        <option v-for="item in state.listDepartement" :key="item.id"  :value="item.id">{{item.deptname}}</option>
                    </FormSelect>
                </div>

                <div class="col-span-12 sm:col-span-4">
                    <FormLabel htmlFor="modal-form-1"> Roles</FormLabel>
        
                    <div class="flex flex-col mt-2">
                        <label v-for="item in state.listRole" :key="item.id"  class="flex items-center">
                            <input
                                type="checkbox"
                                :value="item.name" v-model="selected"
                                class="form-checkbox mr-2"
                            />
                            <span>{{ item.name }}</span>
                        </label>
                            <!-- <FormCheck class="mt-2"  v-for="item in state.listRole" :key="item.id">
                                <FormCheck.Input id="checkbox-switch-1" type="checkbox" :value="item.name" v-model="selected"/>
                                <FormCheck.Label htmlFor="checkbox-switch-1">
                                    {{ item.name }}
                                </FormCheck.Label>
                            </FormCheck> -->
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-4">
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

    <Dialog :open="warningModalPreview" @close="
            () => {
            setWarningModalPreview(false);
            }
        ">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
                <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
                <div class="mt-2 text-slate-500"> {{ pesan }}</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="
                            () => {
                            setWarningModalPreview(false);
                            }
                        " class="w-24">
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

    <Dialog :open="successModalPreview" @close="
            () => {
            setSuccessModalPreview(false);
            }
        ">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-success" />
                <div class="mt-5 text-3xl">Yeyyyy Success!</div>
                <div class="mt-2 text-slate-500">
                    {{ pesan }}
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="
                () => {
                    setSuccessModalPreview(false);
                }
                " class="w-24">
                    Ok
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>


</template>

<script setup>
    import Api from '../../api/Api'
    import Button from "../../base-components/Button";
    import { FormInput, FormSelect, FormLabel, FormInline, FormCheck } from "../../base-components/Form"
    import TomSelect from "../../base-components/TomSelect"
    import { onMounted, ref, reactive , watch, computed  } from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useDebounceFn } from '@vueuse/core'
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Lucide from "../../base-components/Lucide"
    import Table from "../../base-components/Table"
    import Preview from "../../base-components/Preview"
    import LoadingIcon from "../../base-components/LoadingIcon"
    import { Dialog, Menu } from "../../base-components/Headless"
    import {
        DialogPanel

    } from '@headlessui/vue'
    import man from "../../assets/images/sabar.png"
    import 'vue-select/dist/vue-select.css';
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'

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
            status_user:""
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
            action.value = 'INSERT';
            headers.value = 'Add New Data';

        }
    };


    const tampilData = async (page = 1) => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/users?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&dept=' + dept.value)
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
            kode.value = state.datas[0].kode
            state.data.password = state.datas[0].password
            selected.value = response.data.data[0].roles.map(role => role.name)
            state.data.status_user = state.datas[0].status_users
            action.value = 'UPDATE';
            headerFooterModalPreview.value = true
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

    const saveData = async () => {

        if(action.value=="INSERT"){
            await Api.post('/admin/users', {
                name : state.data.name,
                email : state.data.email,
                password : state.data.password,
                kode : kode.value,
                role : selected.value,
                status_user : state.data.status_user,

            })
            .then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Data Success Added"
                setHeaderFooterModalPreview(false)

            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.put('/admin/users', {
                id :  state.data.id,
                name : state.data.name,
                email : state.data.email,
                password : state.data.password,
                kode : kode.value,
                role : selected.value,
                status_user : state.data.status_user,
            }).then(async (response) => {

                await tampilData()

                setSuccessModalPreview(true)
                pesan.value = "Data Success Updated"
            
                setHeaderFooterModalPreview(false)
                tabulator.value.replaceData(tableData.value.data);
                

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
            console.log( response.data.data);
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
            console.log( response.data.data);
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