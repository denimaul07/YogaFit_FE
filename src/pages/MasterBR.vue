<template>
    <div>
        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 2xl:col-span-4">
                <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                    <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                    <RouterLink :to="{ name: 'BR' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master BR</RouterLink>
                </div>
            
            </div>
            <div class="col-span-12 2xl:col-span-4">
                <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Master BR</h2>
            </div>
            <div class="col-span-12 2xl:col-span-4">
            
            </div>
        </div>

        <div class="col-span-12 2xl:col-span-12 pt-12"> 
        
            <div class="grid grid-cols-12 gap-6">


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
                                            Program
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Disc
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
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listData" :key="data.odata" v-else>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{ 1+ index }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            Buddy Referral
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.disc }} %
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

        <a-modal v-model:open="AddModal" title="Master BR" width="300px">
            <FormInline class="mt-5">
                <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Disc</FormLabel>
                <a-input-number style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" :min="1" :max="100" v-model:value="state.data.disc" />
            </FormInline>

            <template #footer>
                <Button variant="primary" class="shadow-md" @click="save">
                    <span class="flex items-center justify-center w-20 h-5">
                        <Lucide icon="Save" class="w-4 h-4" /> Save
                    </span>
                </Button>

            </template>

            <a-modal v-model:open="processing"  :footer="null" :closable=false   width="400px">
                <div style="align-items:center;justify-content: center;display: flex;" width="100px">
                    <img class="img-fluid" :src="man" alt="vector women with leptop"/>
                </div>

                <div style="align-items:center;justify-content: center;display: flex;">
                    {{ pesan }}
                </div>
            </a-modal>
        </a-modal>
    </div>
</template>

<script setup>
    import Api from '../api/Api'
    import Button from "../base-components/Button"
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
    import { notification  } from 'ant-design-vue';
    import { ClassicEditor } from "../base-components/Ckeditor";
    import man from "../assets/images/sabar.png"
    import { useDebounceFn } from '@vueuse/core'


    let todaysDate = new Date()
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const router = useRouter()
    const loading = ref("")
    const processing = ref(false)
    const search = ref("")
    const pesan = ref("")
    const state = reactive(
        {
            listData:{},
            data:{
                id:"",
                disc:""
            }
        }
    )




    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/master_br?page=' + page+ '&q=' + search.value)
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

    const AddModal = ref(false)


    const edit = async (data) => {
        state.data.id = data.odata
        state.data.disc=data.disc
        AddModal.value = true

    }


    const save = async () => {
        processing.value = true
        pesan.value="Please Wait, Process Save Data"

        await Api.post('/admin/master_br', {
            id : state.data.id,
            disc : state.data.disc
        }) .then(async (response) => {
                await tampilData()
                notification['success']({
                    message: 'Yeyyy Success',
                    description:
                    'Disc Success update',
                });
                processing.value=false
                AddModal.value=false
        }).catch(error => {
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })

    }



    onMounted(async() => {
        await Promise.all([
            tampilData()
        ]);
    })


    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>
