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
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">CRM Database Summary</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
                <div class="items-center sm:flex">
                    <div class="items-center sm:flex sm:mr-4">
                        <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                            Filter
                        </label>
                        <Litepicker v-model="tanggal" :options="{
                                autoApply: false,
                                singleMode: false,
                                numberOfColumns: 2,
                                numberOfMonths: 2,
                                showWeekNumbers: true,
                                dropdowns: {
                                    minYear: 1990,
                                    maxYear: null,
                                    months: true,
                                    years: true,
                                },
                                startDate:new  moment().format('DD-MMM-YYYY'),
                                endDate: new moment().format('DD-MMM-YYYY'),
                                }" class="block w-56 mx-auto" />

                        <Button variant="primary" class="mr-2 shadow-md" @click="add">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" />
                            </span>
                        </Button>
                    
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-2 2xl:col-span-2">
            <div class="pb-10 -mb-10 2xl:border-l">
                <div class="grid grid-cols-12 pl-0 2xl:pl-0 gap-x-6 2xl:gap-x-0 gap-y-6">
                    <!-- BEGIN: Transactions -->
                    <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-10 2xl:col-span-12 2xl:mt-8">
                        <listMenu></listMenu>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 2xl:col-span-10 pt-12"> 
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 sm:col-span-3 xl:col-span-3  intro-y" @click="tot(tanggal)">
                    <div class="p-5 box zoom-in bg-blue-500">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Total</div>
                            <div class="mt-1 text-white">{{ total }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-3 xl:col-span-3  intro-y" @click="need(tanggal)">
                    <div class="p-5 box zoom-in bg-orange-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Need Followup</div>
                            <div class="mt-1 text-white">{{ needfu }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-3 xl:col-span-3  intro-y" @click="pro(tanggal)">
                    <div class="p-5 box zoom-in bg-yellow-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Proses Followup</div>
                            <div class="mt-1 text-white">{{ proses }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-3 xl:col-span-3  intro-y" @click="mem(tanggal)">
                    <div class="p-5 box zoom-in bg-green-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Member</div>
                            <div class="mt-1 text-white">{{ member }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-3 xl:col-span-3  intro-y" @click="los(tanggal)">
                    <div class="p-5 box zoom-in bg-red-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Loss</div>
                            <div class="mt-1 text-white">{{ loss }} Leads</div>
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
                    Add New Leads
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Customers Name</FormLabel>
                        <FormInput type="text" class="col-span-8" v-model="state.data.nama" placeholder="Insert Customers Name"/>
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Phone Number</FormLabel>
                        <FormInput type="number" class="col-span-8" v-model="state.data.telp" placeholder="Insert Phone Number"/>
                    </FormInline>
                </div>

                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Email Customer</FormLabel>
                        <FormInput type="text" class="col-span-8" v-model="state.data.email" placeholder="Insert Email"/>
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Source</FormLabel>
                        <TomSelect v-model="source" :options="{placeholder: 'Select Source'}" class="w-full">
                            <option value="">Select Source</option>
                            <option v-for="item in state.listSource" :key="item.id" :value="item.source">{{item.source}}</option>
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
    const tanggal= ref("")
    const pesan = ref("")
    const source = ref("")
    const show = ref(20)
    const total = ref(0)
    const needfu = ref(0)
    const proses = ref(0)
    const loss = ref(0)
    const member = ref(0)
    const state = reactive(
        {
            listSource:{},
            data:{
                nama:"",
                telp:"",
                email:""
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


    const tampilData = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Proccesing Get Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/crmSummary?tgl=' +  tanggal.value)
        .then(response => {
            state.listSource = response.data.data
            total.value = response.data.total
            needfu.value = response.data.needfu
            proses.value = response.data.proses
            loss.value = response.data.loss
            member.value = response.data.member
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


    const tot = async (tanggal) => {
        router.push({name: 'ListDetailCRM',
        params : {
                tanggal : tanggal,
                status :'total'
            }
        })
    }

    const need = async (tanggal) => {
        router.push({name: 'ListDetailCRM',
        params : {
                tanggal : tanggal,
                status :0
            }
        })
    }

    const pro = async (tanggal) => {
        router.push({name: 'ListDetailCRM',
        params : {
                tanggal : tanggal,
                status :1
            }
        })
    }

    const mem = async (tanggal) => {
        router.push({name: 'ListDetailCRM',
        params : {
                tanggal : tanggal,
                status :2
            }
        })
    }

    const los = async (tanggal) => {
        router.push({name: 'ListDetailCRM',
        params : {
                tanggal : tanggal,
                status :3
            }
        })
    }

    const add = async() => {
        AddModal.value = true
    }

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.post('/admin/crm', {
            nama : state.data.nama,
            email : state.data.email,
            telp : state.data.telp,
            source : source.value,
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Save Data"
            AddModal.value = false
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    onMounted(async() => {
        if (user.roles[0].name == "superAdmin" || user.roles[0].name == "admin") {
            router.push({ name: "dashboardAdmin" });
        }else if(user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesLeader' || user.roles[0].name=='salesManager'){
            router.push({ name: "dashboard" });
        }
        await tampilData()
    })


    watch(show, (newQuestion, oldQuestion) => {
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

