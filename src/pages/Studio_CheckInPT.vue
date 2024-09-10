<script setup>
    import _ from "lodash";
    import Api from '../api/Api'
    import Button from "../base-components/Button"
    import TomSelect from "../base-components/TomSelect"
    import { FormSelect, FormInput, FormInline, FormLabel, InputGroup } from "../base-components/Form"
    import { onMounted, ref, reactive , watch , computed, onBeforeMount} from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { Tab } from "../base-components/Headless";
    import { useStore } from "vuex"
    import { TailwindPagination } from 'laravel-vue-pagination'
    import LoadingIcon from "../base-components/LoadingIcon"
    import Lucide from "../base-components/Lucide"
    import Preview from "../base-components/Preview"
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
    import "@fullcalendar/core/vdom";
    import { TimePicker } from 'ant-design-vue';
    import Tippy from "../base-components/Tippy";
    const store = useStore();
    const router = useRouter();
    const user = store.getters["auth/currentUser"];
    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
    };

    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
    };

    const deleteModalPreview = ref(false);
    const setdeleteModalPreview = (value) => {
        deleteModalPreview.value = value
        if (deleteModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const approveModalPreview = ref(false);
    const setapproveModalPreview = (value) => {
        approveModalPreview.value = value
        if (approveModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };




    const pesan = ref("");
    const roleName = ref("");
    const roleName2 = ref("");
    const roleName3 = ref("");
    const loadingsycn = ref("");
    

    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const route = useRoute()
    const status = ref("")
    const studio = ref("")
    const search = ref("")
    const tgl=ref("")
    const searchMember = ref("")
    const loading = ref("")
    const action =ref("Add New")
    const searchBooking=ref("")
    const state = reactive(
        {
            listData:{},
            listMember:{},
            listContract:{},
            listBookingPT:{},
            listStudio:{},
            datas:{},
            data:{
                id:"",
                idcontract:"",
                idbooking:"",
                typebooking:"",
                start_time:"",
                end_time:"",
                id_studio:"",
                note:""
            }
        }
    )

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/studio/department')
        .then(response => {
            state.listStudio = response.data.data
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



    const AddBooking = ref(false);
    const setAddBooking = (value) => {
        AddBooking.value = value
        if (AddBooking.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const PilihModal = ref(false);
    const setPilihModal = (value) => {
        PilihModal.value = value
        if (PilihModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };
    const basicModalPreview = ref(false);



    const tampilData = async (page=state.listData.current_page) => {
        loading.value = true
        await Api.get('studio/bookingPT?page=' + page+ '&q=' + search.value +  '&studio=' + studio.value+ '&tgl=' + tgl.value)
        .then(response => {

            Api.get('/studio/get_schedule_PT')
            .then(responses => {
                state.listData = response.data.data
                state.listBookingPT = responses.data.data
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

        await Api.get('studio/bookingPT?page=' + page+ '&q=' + search.value +  '&studio=' + studio.value+ '&tgl=' + tgl.value)
        .then(response => {
            Api.get('/studio/get_schedule_PT')
            .then(responses => {
                state.listData = response.data.data
                state.listBookingPT = responses.data.data
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

    // const edit = async (id, typebooking) => {
    //     state.data.typebooking = typebooking
    //     action.value='Update'
    //     loadingsycn.value = true
    //     basicModalPreview.value = true
    //     pesan.value="Please Wait, Process Get Data"
    //     const token = localStorage.getItem('token_iss')
    //     Api.defaults.headers.common['Authorization'] = "Bearer " +token
    //     if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
    //         await Api.get('admin/booking', {
    //             params: {
    //                 id : id
    //             } 
    //         })
    //         .then(response => {
    //             state.listBooking = response.data.data
    //             state.listBookingPresent = response.data.present
    //             state.listBookingAbsent = response.data.absent
    //             state.data.id = id
    //             AddModal.value = true
    //             loadingsycn.value = false
    //             basicModalPreview.value = false

    //         }).catch(error => {
    //             console.log(error);
    //             if(error.response.data.status_code==403){
    //                 router.push({name: '403'})
    //             }else{
    //                 const object1 = error.response.data
    //                 pesan.value =  Object.values(object1).toString()
    //                 setWarningModalPreview(true)
    //             }
    //         })
    //     }else{
    //         await Api.get('sales/booking', {
    //             params: {
    //                 id : id
    //             } 
    //         })
    //         .then(response => {
    //             state.listBooking = response.data.data
    //             state.listBookingPresent = response.data.present
    //             state.listBookingAbsent = response.data.absent
    //             state.data.id = id
    //             AddModal.value = true
    //             loadingsycn.value = false
    //             basicModalPreview.value = false

    //         }).catch(error => {
    //             console.log(error);
    //             if(error.response.data.status_code==403){
    //                 router.push({name: '403'})
    //             }else{
    //                 const object1 = error.response.data
    //                 pesan.value =  Object.values(object1).toString()
    //                 setWarningModalPreview(true)
    //             }
    //         })
    //     }

    // }

    const add = async () =>{
        action.value='Add New'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

            await Api.get('/studio/get_contract', {
                params: {
                    id : 1
                } 
            })
            .then(response => {
                state.listMember = response.data.data
                AddBooking.value = true
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

    const pilih = async (id) => {
        PilihModal.value=true
        state.data.idcontract = id
    }

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
            await Api.post('studio/bookingPT', {
                idcontract :  state.data.idcontract,
                start_time : state.data.start_time,
                end_time : state.data.end_time,
                studio : state.data.id_studio,
                note : state.data.note

            }).then(async (response) => {
            
            
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = 'Suksess Add Booking'
                PilihModal.value = false
                AddBooking.value= false
                await tampilData()
            }).catch(error => {
                loadingsycn.value = false
                basicModalPreview.value = false
                pesan.value =  error.response.data.message
                setWarningModalPreview(true)
            })


    }

    const approve = (id) => {
        state.data.id = id
        approveModalPreview.value = true
    }

    const tolak = (id) => {
        state.data.id = id
        deleteModalPreview.value = true
    }

    const approveRequest = async() => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
        await Api.put('studio/bookingTeacher', {
            id :  state.data.id,

        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = 'Suksess Add Booking'
            approveModalPreview.value= false
            await tampilData()
        }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            pesan.value =  error.response.data.message
            setWarningModalPreview(true)
        })
    }

    const tolakRequest = async() => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
        await Api.delete('studio/bookingTeacher', { params : {
                id :  state.data.id
            }
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = 'Suksess Tolak Booking'
            deleteModalPreview.value= false
            await tampilData()
        }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            pesan.value =  error.response.data.message
            setWarningModalPreview(true)
        })
    }
    onMounted(async () => {
        if (user.roles.length === 1) {
        roleName.value = user.roles[0].name;
        } else if (user.roles.length === 2) {
        roleName.value = user.roles[0].name;
        roleName2.value = user.roles[1].name;
        } else {
        roleName.value = user.roles[0].name;
        roleName2.value = user.roles[1].name;
        roleName3.value = user.roles[2].name;
        }


        if (roleName.value=='studio') {
            router.push({ name: "Studio_CheckInPT" });
        }

        await tampilData()
        await tampilDepartement()

    });

    watch(searchMember, (newQuestion, oldQuestion) => {
        searchingMember()
    })

    const searchingMember = useDebounceFn(() => {
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
        Api.get('studio/get_contract?search=' + searchMember.value)
        .then(response => {
            state.listMember = response.data.data

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

    }, 500)

    watch(studio, (newQuestion, oldQuestion) => {
        loading.value=false
        tampilData()
    })

    
    watch(tgl, (newQuestion, oldQuestion) => {
        loading.value=false
        tampilData()
    })

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value=false
        tampilData()
    }, 500)

    watch(searchBooking, (newQuestion, oldQuestion) => {
        searchingBooking()
    })

    const searchingBooking = useDebounceFn(() => {
        loading.value=false
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get('admin/booking?id=' + state.data.id+ '&q=' + searchBooking.value)
            .then(response => {
                state.listBooking = response.data.data
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
        }else{
            Api.get('sales/booking?id=' + state.data.id+ '&q=' + searchBooking.value)
            .then(response => {
                state.listBooking = response.data.data
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
    
    }, 500)


</script>


<template>
    <div v-if="loadingsycn == true">
        <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false)">
        <div class="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel>
            <div class="p-5 text-center pt-10">
                <br /><br />
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
                    <RouterLink :to="{ name: 'Studio_CheckIn' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Studio Check In</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Personal Trainer Booking</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
                <div class="items-center sm:flex">
                    <div class="items-center sm:flex sm:mr-4">
                        <Button variant="primary" class="mr-2 shadow-md" @click="add">
                            <span class="flex items-center justify-center w-40 h-5">
                                <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Add New Booking
                            </span>
                        </Button>
                    </div>
                </div>  
            </div>
        </div>
    </div>


    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 md:col-span-12 2xl:col-span-12">
        <Tab.Group>
            <Tab.List variant="link-tabs" class="flex-col justify-center text-center sm:flex-row lg:justify-start">
                <Tab :fullWidth="false">
                    <Tab.Button class="flex items-center py-4 cursor-pointer">
                        <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Personal Training Check-In
                    </Tab.Button>
                </Tab>
                <Tab :fullWidth="false">
                    <Tab.Button class="flex items-center py-4 cursor-pointer">
                        <Lucide icon="Users" class="w-4 h-4 mr-2" /> Personal Training Approval
                    </Tab.Button>
                </Tab>
            </Tab.List>

            <Tab.Panels class="mt-5">
                <Tab.Panel>
                    <div class="col-span-12 md:col-span-12 2xl:col-span-12"> 
                        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                            <div class="items-center sm:flex sm:mr-4">
                                <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                    Filter
                                </label>
                                <FormSelect v-model="studio"  class="w-full">
                                    <option value="">Select Studio</option>
                                    <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                </FormSelect>
                                <div class="relative w-full">
                                    <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                        <Lucide icon="Calendar" class="w-4 h-4" />
                                    </div>
                                    <Litepicker v-model="tgl"
                                        :options="{
                                        autoApply: true,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                            minYear: 1960,
                                            maxYear: null,
                                            months: true,
                                            years: true,
                                        },
                                        // Atur tanggal default di sini -->
                                        }"
                                        class="pl-12" />
                                </div>

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
                        <div class="overflow-x-auto pt-5">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Member
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Class
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Teacher
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Date
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Time
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Session Used
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Session Left
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Notes
                                        </Table.Th>
                                        <!-- <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Action
                                        </Table.Th> -->
                                    </Table.Tr>
                                </Table.Thead>


                                <Table.Tbody>
                                    <Table.Tr v-if="loading" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
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
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.member_name }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.schedule_pt }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.teacher_name }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.deptname }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.tgl_booking }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.start_time_pt }} - {{ data.end_time_pt }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.sessios_used }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.sessios_left-data.sessios_used }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.notes }}
                                        </Table.Td>
                                        <!-- <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <Tippy as="div"  content="View Booking Members">
                                                    <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                                        <Lucide icon="Eye" class="w-4 h-4 mr-5" /> 
                                                    </a>
                                                </Tippy>
                                            </div>
                                        </Table.Td> -->
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
                </Tab.Panel>
            </Tab.Panels>

            <Tab.Panels class="mt-5">
                <Tab.Panel>
                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
            
                        <div class="overflow-x-auto pt-5">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Member Name
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Phone Number
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Tanggal
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Teacher
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Session Used
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Session Left
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
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr v-if="state.listBookingPT.length==0" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listBookingPT" :key="data.id" >
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{  index+1 }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.no_telp }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.deptname }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.tgl_booking }}  {{ data.start_time_pt }} s/d  {{ data.end_time_pt }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.pic }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.sessios_used }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.sessios_left-data.sessios_used }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <div class="flex items-center justify-center" >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div class="text-warning" v-if="data.approve_booking_pt == 0">Menunggu Approve</div>
                                                <div class="text-success" v-else-if="data.approve_booking_pt == 1">Approve</div>
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <div class="flex items-center justify-center">
                                                <Tippy as="div" content="Approve">
                                                    <a class="flex items-center text-success" href="#" @click="approve(data.id)">
                                                        <Lucide icon="Check" class="w-4 h-4 mr-5" /> 
                                                    </a>
                                                </Tippy>

                                                <Tippy as="div" content="Tolak">
                                                    <a class="flex items-center text-danger" href="#" @click="tolak(data.id)">
                                                        <Lucide icon="Trash" class="w-4 h-4 mr-5" /> 
                                                    </a>
                                                </Tippy>
                                            </div>
                                        </Table.Td>
                                    
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </div>
                                
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
        </div>
    </div>
    

    <Dialog
        :open="warningModalPreview"
        @close="
        () => {
            setWarningModalPreview(false);
        }
        "
    >
        <Dialog.Panel>
        <div class="p-5 text-center">
            <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
            <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
            <div class="mt-2 text-slate-500">{{ pesan }}</div>
        </div>
        <div class="px-5 pb-8 text-center">
            <Button
            type="button"
            variant="primary"
            @click="
                () => {
                setWarningModalPreview(false);
                }
            "
            class="w-24"
            >
            Ok
            </Button>
        </div>
        <div class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
            <a href="" class="text-primary"> Why do I have this issue? </a>
        </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog
        :open="successModalPreview"
        @close="
        () => {
            setSuccessModalPreview(false);
        }
        "
    >
        <Dialog.Panel>
        <div class="p-5 text-center">
            <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-success" />
            <div class="mt-5 text-3xl">Yeyyyy Success!</div>
            <div class="mt-2 text-slate-500">
            {{ pesan }}
            </div>
        </div>
        <div class="px-5 pb-8 text-center">
            <Button
            type="button"
            variant="primary"
            @click="
                () => {
                setSuccessModalPreview(false);
                }
            "
            class="w-24"
            >
            Ok
            </Button>
        </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog size :open="AddBooking" @close="setAddBooking(false)">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title>
                        <h2 class="mr-auto text-base font-medium">
                            {{ action }} Member
                        </h2>
                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddBooking(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>

                    </Dialog.Title>
                    <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-12">
                            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                            <div class="items-center sm:flex sm:mr-4">

                            </div>

                            <div class="hidden mx-auto md:block text-black">
                            
                            </div>

                            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                <div class="relative w-56 text-slate-500">
                                    <FormInput
                                    type="text"
                                    class="w-56 pr-10 !box"
                                    placeholder="Search..."
                                    v-model="searchMember"
                                    />
                                    <Lucide
                                    icon="Search"
                                    class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                    />
                                    
                                </div>
                                
                                
                            </div>
                            </div>

                            <div class="overflow-x-auto pt-5">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Members Name
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Packages
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Type
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Access
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Action
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr v-if="loading" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr v-if="state.listMember.length==0" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listMember" :key="data.id" >
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{ state.listMember.from + index }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.packages_name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.type }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.accesss }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.deptname }}
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <Tippy as="div"  content="Selected Members">
                                                    <a class="flex items-center text-success" href="#" @click="pilih(data.idcontract)">
                                                        <Lucide icon="UserCheck" class="w-4 h-4 mr-5" /> 
                                                    </a>
                                                </Tippy>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </div>
                
                        </div>
                    </Dialog.Description>
                </DialogPanel>

                <Dialog :open="PilihModal" size="lg">
                    <Dialog.Panel>
                        <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">
                                Add New Booking  
                            </h2>

                            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPilihModal(false)">
                                <Lucide icon="XSquare" class="w-5 h-5" />
                            </Button>
                        </Dialog.Title>
                        
                        <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Start Time</FormLabel>
                                    <TimePicker  v-model:value="state.data.start_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> End Time</FormLabel>
                                    <TimePicker  v-model:value="state.data.end_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                                    <TomSelect v-model="state.data.id_studio"  class="w-full">
                                        <option value="">Select Studio</option>
                                        <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                    </TomSelect>
                                </FormInline>

                                
                            </div>

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Notes</FormLabel>
                                    <FormInput  v-model="state.data.note" class="w-full" type="text" placeholder="Notes"/>
                                </FormInline>
                            </div>


                        </Dialog.Description>
                        
                        <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                            <Button type="button" variant="outline-secondary" @click="setPilihModal(false)" class="w-20 mr-1">
                                Cancel
                            </Button>
                            <Button variant="primary" type="button" class="w-20" @click="save">
                                SAVE
                            </Button>
                        </Dialog.Footer>
                    
                    </Dialog.Panel>
                </Dialog>
            </div>
        </div>
    </Dialog>

    <Dialog :open="deleteModalPreview" @close="setdeleteModalPreview(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to delete this data? <br />
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setdeleteModalPreview(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="tolakRequest">
                    Delete
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="approveModalPreview" @close="setapproveModalPreview(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="Check" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to Approve this data? <br />
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setapproveModalPreview(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-24" @click="approveRequest">
                    Approve
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

</template>
