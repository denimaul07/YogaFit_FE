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
                <RouterLink :to="{ name: 'Course' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Course</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Course</h2>
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

                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
                    <div class="items-center sm:flex sm:mr-4">
                        <Button variant="primary" class="mr-2 shadow-md" @click="add">
                            <span class="flex items-center justify-center w-40 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" /> Add New Course
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
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Course
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Durasi
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Tanggal
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Teacher
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Desc
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
                                    <Table.Tr v-else-if="state.listData.total==0" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
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
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.course }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.durasi }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.tanggal }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.teacher }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.studio }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.desc_course }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                            <div
                                                :class="[
                                                'flex items-center justify-center',
                                                    { 'text-success': data.status_course==0 },
                                                    { 'text-danger': data.status_Course==1 }
                                                ]"
                                            >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div v-if="data.status_course==0">Active</div>
                                                <div v-else-if="data.status_course==1">Non Active</div>
                                            
                                            </div>
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <a class="flex items-center text-success" href="#" @click="edit(data)">
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

    <Dialog  :open="AddModal"  @close="setAddModal(false)" >
    
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    {{ action }} Course
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                
                    
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Course</FormLabel>
                        <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.course" placeholder="Input Title"/>
                    </FormInline> 
                    
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Duration</FormLabel>
                        <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.durasi" placeholder="Input Duration"/>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Date</FormLabel>
                        <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.tanggal" placeholder="Input Date"/>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Teacher</FormLabel>
                        <a-select style="width:100%"  v-model:value="state.data.teacher" show-search :filter-option="filter_search" placeholder="Search Teacher">
                            <a-select-option  v-for="item in state.listTeacher" :key="item.id" :value="item.name" :label="item.name">
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Studio</FormLabel>
                        <a-select v-model:value="state.data.studio"  size="large" style="width: 100%"  placeholder="Cari Studio">
                            <a-select-option  v-for="item in state.listDepartement" :key="item" :value="item.deptname" :label="item.deptname">{{item.deptname}} </a-select-option>
                        </a-select>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Desc</FormLabel>
                        <a-textarea v-model:value="state.data.desc_course" style="width: 100%" placeholder="Desc Course" :rows="4" />
                    </FormInline> 
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Status</FormLabel>
                        <a-select v-model:value="state.data.status_course"  size="large" style="width: 100%"  placeholder="Pilih Status">
                            <a-select-option value="">Semua Status</a-select-option>
                            <a-select-option  value="0" label="Active">Active</a-select-option>
                            <a-select-option value="1" label="Non Active">Non Active</a-select-option>
                        </a-select>

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
import { data } from 'jquery'
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
            state.data.course=''
            state.data.durasi=''
            state.data.tanggal=''
            state.data.teacher=[]
            state.data.studio=[]
            state.data.desc_course=''
            state.data.status_course=[]
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
    const loadingsycn = ref("")
    const search = ref("")
    const image = ref("")
    const pesan = ref("")
    const action = ref("Add New")
    const state = reactive(
        {
            listData:{},
            listTeacher:{},
            listDepartement:{},
            data:{
                id:"",
                course:"",
                durasi:"",
                tanggal:"",
                teacher:[],
                studio:[],
                desc_course:"",
                status_course:[]
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

    const tampilDepartement = async () => {

    
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

    const tampilTeacher = async () => {
    
        await Api.get("/admin/get_teacher")
        .then((response) => {
            state.listTeacher = response.data.data;
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

    };

    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/course?page=' + page+ '&q=' + search.value)
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


    const edit = async (data) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        state.data.id = data.odata
        state.data.course=data.course
        state.data.durasi=data.durasi
        state.data.tanggal=data.tanggal
        state.data.teacher=data.teacher
        state.data.studio=data.studio
        state.data.desc_course=data.desc_course
        state.data.status_course=data.status_course
        action.value ='Update'
        AddModal.value = true
        loadingsycn.value = false
        basicModalPreview.value = false
    }

    const filter_search = (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }


    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (action.value=='Add New') {
            await Api.post('/admin/course', {
                course : state.data.course,
                durasi : state.data.durasi,
                tanggal : state.data.tanggal,
                teacher : state.data.teacher,
                studio : state.data.studio,
                desc_course : state.data.desc_course,
                status_course : state.data.status_course

            }) .then(async (response) => {
                    loadingsycn.value = false
                    tampilData()
                    setSuccessModalPreview(true)
                    pesan.value = "Course Sukses Di Tambahkan"
                    basicModalPreview.value = false
                    AddModal.value = false
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
    
        }else{
            await Api.put('/admin/course', {
                id: state.data.id,
                course : state.data.course,
                durasi : state.data.durasi,
                tanggal : state.data.tanggal,
                teacher : state.data.teacher,
                studio : state.data.studio,
                desc_course : state.data.desc_course,
                status_course : state.data.status_course

            }) .then(async (response) => {
                    loadingsycn.value = false
                    tampilData()
                    setSuccessModalPreview(true)
                    pesan.value = "Course Sukses Di Update"
                    basicModalPreview.value = false
                    AddModal.value = false
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }

    }



    onMounted(async() => {
    
        await tampilData()
        await tampilTeacher()
        await tampilDepartement()
    })


    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>

