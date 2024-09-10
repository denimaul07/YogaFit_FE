<script setup>
    import _ from "lodash";
    import Api from '../api/Api'
    import listMenu from './Menu.vue'
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
    import FullCalendar from "@fullcalendar/vue3";
    import interactionPlugin from "@fullcalendar/interaction";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import listPlugin from "@fullcalendar/list";
    import { TimePicker } from 'ant-design-vue';
    import Tippy from "../base-components/Tippy";
    import { nanoid } from 'nanoid';
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'
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



    const pesan = ref("");
    const roleName = ref("");
    const roleName2 = ref("");
    const roleName3 = ref("");
    const id = ref(user.id);
    const qr = ref("")
    const email = ref(user.email);
    const name = ref(user.name);
    const foto = ref(user.foto);
    const searchUser = ref("")
    const baseUrlFoto = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const wa = ref(user.wa);
    const status_notif = ref(user.status_notif);
    const image = ref("");
    const loadingsycn = ref("");
    const calendarKey = ref("")
    
    let todaysDate = new Date()
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const status = ref("")
    const studio = ref("")
    const qrInput = ref("")
    const tanggal= ref(moment().format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    const search = ref("")
    const check_in = ref("")
    const searchMember = ref("")
    const searchBooking = ref("")
    const searchPresent = ref("")
    const searchAbsent = ref("")
    const loading = ref("")
    const tgl=ref("")
    const tgl_schedule=ref("")
    const action =ref("Add New")
    const events = ref([]);
    const liststudio=ref("")
    const state = reactive(
        {
            listData:{},
            listMember:{},
            listClass:{},
            listSchedule:{},
            listTeacher:{},
            listStudio:{},
            listBooking:{},
            listBookingClass:{},
            listBookingPresent:{},
            listBookingAbsent:{},
            listContract:{},
            listUser:{},
            listProfile:{},
            datas:{},
            data:{
                id:"",
                idcontract:"",
                idbooking:"",
                typebooking:""

            }
        }
    )


    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
            state.listBooking = []
            state.listBookingPresent = []
            state.listBookingAbsent = []
        }
    };

    const showQr = () => {
        QrShow.value= true
    }

    const onDetect = (result) => {
        qr.value = result[0].rawValue

        QrShow.value= false
    }

    const QrShow = ref(false);
    const setQrShow = (value) => {
        QrShow.value = value
        if (QrShow.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const AddBooking = ref(false);
    const setAddBooking = (value) => {
        AddBooking.value = value
        if (AddBooking.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const Booking = ref(false);
    const setBooking = (value) => {
        Booking.value = value
        if (Booking.value ==false) {
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

    const PresentModal = ref(false);
    const setPresentModal = (value) => {
        PresentModal.value = value
        if (PresentModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const CheckInModal = ref(false);
    const setCheckInModal = (value) => {
        CheckInModal.value = value
        if (CheckInModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const AbsentModal = ref(false);
    const setAbsentModal = (value) => {
        AbsentModal.value = value
        if (AbsentModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const TrialModal = ref(false);
    const setTrialModal = (value) => {
        TrialModal.value = value
        if (TrialModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const CariMemberModal = ref(false);
    const setCariMemberModal = (value) => {
        CariMemberModal.value = value
        if (CariMemberModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const cariMember = async (id) => {
        CariMemberModal.value = true
    
    }

    const booking = async (id) => {
        state.data.id = id
        Booking.value = true
    }

    const basicModalPreview = ref(false);

    const tampilSchedule = async ()=>{
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_schedule')
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_schedule')
        }else{
            url = Api.get('/admin/get_schedule')
        }

        await url.then(response => {
            optionsCalendar.events = response.data.data
            calendarKey.value = nanoid(20)
            // console.log(newData);
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

    const tampilUsers = async (page=state.listData.current_page)=>{
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_users?page=' + page+ '&q=' + searchUser.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_users?page=' + page+ '&q=' + searchUser.value)
        }else{
            url = Api.get('/admin/get_users?page=' + page+ '&q=' + searchUser.value)
        }

        await url.then(response => {
            state.listUser = response.data.data
    
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
        
    

    const optionsCalendar = {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        droppable: true,
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
    
        navLinks: true,
        editable: true,
        dayMaxEvents: true,
        height: 500,
        events: [],
        dateClick: function(info) {
            
            state.data.tgl = info.dateStr
            tgl.value = info.dateStr
            AddModal.value = true
        },
        eventClick: function (info) {
            // Access the id of the clicked event
            const eventId = info.event.id;
            const token = localStorage.getItem('token_iss')
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            let url=''
            if (user.roles[0].name=='studio') {
                url = Api.get('/studio/booking', {
                    params: {
                        id : eventId
                    } 
                })
            }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                url = Api.get('/sales/booking', {
                    params: {
                        id : eventId
                    } 
                })
            }else{
                url = Api.get('/admin/booking', {
                    params: {
                        id : eventId
                    } 
                })
            }
            url.then(response => {
                state.listBooking = response.data.data
                state.listBookingPresent = response.data.present
                state.listBookingAbsent = response.data.absent
                state.data.id = eventId
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
        },
    };

    const add = async () =>{
        action.value='Add New'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_contract', {
                params: {
                    id : state.data.typebooking
                } 
            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_contract', {
                params: {
                    id : state.data.typebooking
                } 
            })
        }else{
            url = Api.get('/admin/get_contract', {
                params: {
                    id : state.data.typebooking
                } 
            })
        }


        url.then(response => {
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

    const tampilData = async (page=state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const tgl = moment().format('YYYY-MM-DD')
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/schedule_chekcin?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + liststudio.value+ '&tgl=' + tanggal.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/schedule_chekcin?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + liststudio.value+ '&tgl=' + tanggal.value)
        }else{
            url = Api.get('/admin/schedule_chekcin?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + liststudio.value+ '&tgl=' + tanggal.value)
        }
    
        await url.then(response => {
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

        if (state.listData.last_page < 1 || state.listData.last_page === undefined || page > state.listData.last_page) {
           page = 1
        }

        await url.then(response => {
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

    const edit = async (id, typebooking) => {
        action.value='Update'
        state.data.typebooking = typebooking
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/booking', {
                params: {
                    id : id
                } 
            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/booking', {
                params: {
                    id : id
                } 
            })
        }else{
            url = Api.get('/admin/booking', {
                params: {
                    id : id
                } 
            })
        }
        await url.then(response => {
            state.listBooking = response.data.data
            state.listBookingPresent = response.data.present
            state.listBookingAbsent = response.data.absent
            state.data.id = id
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

    const pilih = async (id) => {
        PilihModal.value=true
        state.data.idcontract = id
    }

    const pilihmember = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.post('/studio/booking', {
                idcontract :  state.data.idcontract,
                id : state.data.id

            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.post('/sales/booking', {
                idcontract :  state.data.idcontract,
                id : state.data.id

            })
        }else{
            url = Api.post('/admin/booking', {
                idcontract :  state.data.idcontract,
                id : state.data.id

            })
        }
        
        await url.then(async (response) => {
            let urls=''
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            if (user.roles[0].name=='studio') {
                urls = Api.get('/studio/booking', {
                    params: {
                        id : state.data.id
                    } 

                })
            }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                urls = Api.get('/sales/booking', {
                    params: {
                        id : state.data.id
                    } 

                })
            }else{
                urls = Api.get('/admin/booking', {
                    params: {
                        id : state.data.id
                    } 

                })
            }
            await urls.then(response => {
                state.listBooking = response.data.data
                state.listBookingPresent = response.data.present
                state.listBookingAbsent = response.data.absent
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = 'Suksess Add Member'
                PilihModal.value = false
                AddBooking.value= false

            }).catch(error => {
        
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    pesan.value =  error.message
                    setWarningModalPreview(true)
                }
            })
            }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            pesan.value =  error.response.data.message
            setWarningModalPreview(true)
        })

    }

    const present = async (id) => {
        PresentModal.value=true
        state.data.idbooking = id
    }


    const absent = async (id) => {
        AbsentModal.value=true
        state.data.idbooking = id
    }

    const checkin = async (id) => {
        CheckInModal.value=true
        state.data.idbooking = id
    }

    const savePresent = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.post('/studio/present', {
                id : state.data.idbooking

            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.post('/sales/present', {
                id : state.data.idbooking

            })
        }else{
            url = Api.post('/admin/present', {
                id : state.data.idbooking

            })
        }
        
        await url.then(async (response) => {
        
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            let url=''
            if (user.roles[0].name=='studio') {
                url = Api.get('/studio/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                url = Api.get('/sales/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }else{
                url = Api.get('/admin/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }
            await url.then(response => {
                state.listBooking = response.data.data
                state.listBookingPresent = response.data.present
                state.listBookingAbsent = response.data.absent
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = 'Suksess Present Members'
                PresentModal.value = false
                qr.value=''
            }).catch(error => {
        
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    pesan.value =  error.message
                    setWarningModalPreview(true)
                }
            })
        }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })

    }

    const saveAbsent = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.post('/studio/absent', {
                id : state.data.idbooking

            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.post('/sales/absent', {
                id : state.data.idbooking

            })
        }else{
            url = Api.post('/admin/absent', {
            id : state.data.idbooking

            })
        }
        
        await url.then(async (response) => {
            
            let url=''
            if (user.roles[0].name=='studio') {
                url = Api.get('/studio/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                url = Api.get('/sales/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }else{
                url = Api.get('/admin/booking', {
                    params: {
                        id : state.data.id
                    } 
                })
            }
            await url.then(response => {
                state.listBooking = response.data.data
                state.listBookingPresent = response.data.present
                state.listBookingAbsent = response.data.absent
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = 'Suksess Absent Members'
                AbsentModal.value = false
                qr.value=''
            }).catch(error => {
        
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    pesan.value =  error.message
                    setWarningModalPreview(true)
                }
            })
        }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            pesan.value =  error.response.data.message
            setWarningModalPreview(true)
        })

    }

    const saveCheckIn = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.post('/studio/checkin', {
                id : state.data.idbooking

            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.post('/sales/checkin', {
                id : state.data.idbooking

            })
        }else{
            url = Api.post('/admin/checkin', {
                id : state.data.idbooking

            })
        }

        await url.then(async (response) => {
            
                let url=''
                if (user.roles[0].name=='studio') {
                    url = Api.get('/studio/booking', {
                        params: {
                            id : state.data.id
                        } 
                    })
                }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                    url = Api.get('/sales/booking', {
                        params: {
                            id : state.data.id
                        } 
                    })
                }else{
                    url = Api.get('/admin/booking', {
                        params: {
                            id : state.data.id
                        } 
                    })
                }
                await url.then(response => {
                    state.listBooking = response.data.data
                    state.listBookingPresent = response.data.present
                    state.listBookingAbsent = response.data.absent
                    loadingsycn.value = false
                    basicModalPreview.value = false
                    setSuccessModalPreview(true)
                    pesan.value = 'Suksess Check In Members'
                    CheckInModal.value = false
                    qr.value=''
                }).catch(error => {
            
                    if(error.response.data.status_code==403){
                        router.push({name: '403'})
                    }else{
                        pesan.value =  error.message
                        setWarningModalPreview(true)
                    }
                })
            }).catch(error => {
            loadingsycn.value = false
            basicModalPreview.value = false
            pesan.value =  error.response.data.message
            setWarningModalPreview(true)
        })

    }

    const tampilScheduleLeads = async (page=1) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_schedule_leads?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tanggal.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_schedule_leads?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tanggal.value)
        }else{
            url = Api.get('/admin/get_schedule_leads?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tanggal.value)
        }

        await url.then(response => {
            state.listSchedule = response.data.data
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

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/department')
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/department')
        }else{
            url = Api.get('/admin/department')
        }
        await url.then(response => {
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
    
    const saveBooking = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("id", state.data.id);
        formdata.append("shcedule", id);

        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.post('/studio/saveBooking', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.post('/sales/saveBooking', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }else{
            url = Api.post('/admin/saveBooking', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }


            await url.then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Booking"
                TrialModal.value = false
                Booking.value = false
                qr.value =''
                tampilData()
            }).catch(error => {
                loadingsycn.value = false
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        
    
    }

    const getMembers = () => {
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/my_profile?id=' + qr.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/my_profile?id=' + qr.value)
        }else{
            url = Api.get('/admin/my_profile?id=' + qr.value)
        }

        url.then(response => {
            state.listProfile = response.data.data
            if (state.listProfile.length > 0) {
                let url=''
                if (user.roles[0].name=='studio') {
                    url = Api.get('/studio/my_contract?id=' +  state.listProfile[0].idusers)
                }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                    url = Api.get('/sales/my_contract?id=' +  state.listProfile[0].idusers)
                }else{
                    url = Api.get('/admin/my_contract?id=' +  state.listProfile[0].idusers)
                }
        
                url.then(responses => {
                    state.listContract = responses.data.data
                    console.log( state.listContract);
                    let url=''
                    if (user.roles[0].name=='studio') {
                        url = Api.get('/studio/my_booking?id=' +  state.listProfile[0].idusers)
                    }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
                        url = Api.get('/sales/my_booking?id=' +  state.listProfile[0].idusers)
                    }else{
                        url = Api.get('/admin/my_booking?id=' +  state.listProfile[0].idusers)
                    }
                    url.then(responsesss => {
                        state.listBookingClass = responsesss.data.data
                        check_in.value =     state.listBookingClass[0].idbooking
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
            } else {
                state.listContract = response.data.data
                state.listBookingClass = response.data.data
            }
        
            
        
        

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

    const pilihuser = (id) => {
        qr.value = id
        CariMemberModal.value=false
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

        // if (user.change_password == 0) {
        // router.push({ name: "change_password" });
        // }

        qrInput.value.focus()
        await getMembers()
        await tampilSchedule()
        await tampilData()
        await tampilScheduleLeads()
        await tampilDepartement()
        await tampilUsers()

    });

    watch(searchMember, (newQuestion, oldQuestion) => {
        searchingMember()
    })

    const searchingMember = useDebounceFn(() => {
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_contract?search=' + searchMember.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_contract?search=' + searchMember.value)
        }else{
            url = Api.get('/admin/get_contract?search=' + searchMember.value)
        }
        url.then(response => {
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

    watch(status, (newQuestion, oldQuestion) => {
        loading.value=false
        tampilData()
    })

    watch(tgl_schedule, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilScheduleLeads()
    })

    watch(tanggal, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(studio, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilScheduleLeads()
    })

    watch(liststudio, (newQuestion, oldQuestion) => {
        loading.value= false
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
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/booking?id=' + state.data.id+ '&q=' + searchBooking.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/booking?id=' + state.data.id+ '&q=' + searchBooking.value)
        }else{
            url = Api.get('/admin/booking?id=' + state.data.id+ '&q=' + searchBooking.value)
        }
        url.then(response => {
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
    }, 500)

    watch(searchPresent, (newQuestion, oldQuestion) => {
        searchingPresent()
    })

    const searchingPresent = useDebounceFn(() => {
        loading.value=false
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/booking?id=' + state.data.id+ '&qpresent=' + searchPresent.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/booking?id=' + state.data.id+ '&qpresent=' + searchPresent.value)
        }else{
            url = Api.get('/admin/booking?id=' + state.data.id+ '&qpresent=' + searchPresent.value)
        }
        url.then(response => {
            state.listBookingPresent = response.data.present
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
    }, 500)

    watch(searchAbsent, (newQuestion, oldQuestion) => {
        searchingAbsent()
    })

    const searchingAbsent = useDebounceFn(() => {
        loading.value=false
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/booking?id=' + state.data.id+ '&qpresent=' + searchAbsent.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/booking?id=' + state.data.id+ '&qpresent=' + searchAbsent.value)
        }else{
            url = Api.get('/admin/booking?id=' + state.data.id+ '&qpresent=' + searchAbsent.value)
        }
        url.then(response => {
            state.listBookingAbsent = response.data.absent
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
    }, 500)

    watch(qr, (newQuestion, oldQuestion) => {
        searchingMembers()
    })

    const searchingMembers = useDebounceFn(() => {
        loading.value= false
        getMembers()
    }, 100)

    watch(searchUser, (newQuestion, oldQuestion) => {
        searchingUsers()
    })

    const searchingUsers = useDebounceFn(() => {
        loading.value= false
        tampilUsers()
    }, 100)



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

    <Tab.Group>
        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 2xl:col-span-4">
                <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                    <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                    <RouterLink :to="{ name: 'Studio_CheckIn' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Studio Check In</RouterLink>
                </div>
                
            </div>
        </div>


        <div class="px-5 pt-5 mt-5 intro-y box">
            <h2 class="mr-auto text-base font-medium">Schedule List</h2>
            <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 md:col-span-12 2xl:col-span-12"> 
                <Tab.Group  class="mt-5">
                    <Tab.List variant="boxed-tabs">
                        <Tab>
                            <Tab.Button class="w-full py-2" as="button">
                                Scan Members
                            </Tab.Button>
                        </Tab>
                        <Tab>
                            <Tab.Button class="w-full py-2" as="button">
                                Calendar Schedule
                            </Tab.Button>
                        </Tab>
                        <Tab>
                            <Tab.Button class="w-full py-2" as="button">
                                Schedule List
                            </Tab.Button>
                        </Tab>
                    </Tab.List>

                    <Tab.Panels class="mt-5">
                        <Tab.Panel class="leading-relaxed">
                        <div class="p-5 box">
                            <div class="flex items-center intro-y">
                                <h2 class="mr-auto text-lg font-medium">Profile Members</h2>
                            </div>


                            <div class="grid grid-cols-12 gap-6 mt-5">
                                <div class="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
                                    <FormInline class="mt-5 pb-5">
                                        <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Scan QR</FormLabel>
                                    
                                        <input type="text" ref="qrInput" v-model="qr" placeholder="Scan QR" class="pr-12 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80"/>
                                        <Button variant="primary" class="mr-2 shadow-md" @click="showQr(true)">
                                            <span class="flex items-center justify-center h-5"> 
                                                <Lucide icon="Camera" class="w-4 h-4" /> 
                                            </span>
                                        </Button>
                                    
                                    </FormInline>

                                    

                                    <div class="mt-5 intro-y box lg:mt-0 pt-3"  v-if="qr==''">
                                        <div class="relative flex items-center p-5">
                                            <div class="w-12 h-12 image-fit">
                                                <img
                                                alt="Midone Tailwind HTML Admin Template"
                                                class="rounded-full"
                                                :src="baseUrlFoto + 'user.png'"
                                                />
                                            </div>

                                            <div class="ml-4 mr-auto text-center">
                                                <div class="text-base font-medium">
                                                    Member Not Found
                                                </div>

                                                <Button variant="primary" class="mr-2 shadow-md" @click="cariMember(true)">
                                                    <span class="flex items-center justify-center h-5"> 
                                                        <Lucide icon="Search" class="w-4 h-4 mr-3"/> Cari Members
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                
                        
                                    <div class="mt-5 intro-y box lg:mt-0 pt-3"  v-else-if="state.listProfile.length==0">
                                        <div class="relative flex items-center p-5">
                                            <div class="w-12 h-12 image-fit">
                                                <img
                                                alt="Midone Tailwind HTML Admin Template"
                                                class="rounded-full"
                                                :src="baseUrlFoto + 'user.png'"
                                                />
                                            </div>

                                            <div class="ml-4 mr-auto">
                                                <div class="text-base font-medium">
                                                    Member Not Found
                                                </div>
                                                <Button variant="primary" class="mr-2 shadow-md" @click="cariMember(true)">
                                                    <span class="flex items-center justify-center h-5"> 
                                                        <Lucide icon="Search" class="w-4 h-4 mr-3"/> Cari Members
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                

                                    <div class="mt-5 intro-y box lg:mt-0 pt-3" v-for="(data, index) in state.listProfile" :key="index" v-else>
                                        <div class="relative flex items-center p-5">
                                            <div class="w-12 h-12 image-fit">
                                                <img
                                                alt="Midone Tailwind HTML Admin Template"
                                                class="rounded-full"
                                                :src="baseUrlFoto + ( data.foto || 'user.png')"
                                                />
                                            </div>

                                            <div class="ml-4 mr-auto">
                                                <div class="text-base font-medium">
                                                    {{ data.name }}
                                                </div>
                                            </div>
                                        </div>


                                        <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                                            <a class="flex items-center mt-5" href="">
                                                <Lucide icon="Mail" class="w-4 h-4 mr-2" />  {{ data.email }}
                                            </a>
                                            <a class="flex items-center mt-5" href="">
                                                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> {{ data.no_telp.replace(/^(\d{2})\d+(\d{2})$/, '$1***********$2') }}
                                            </a>
                                            <a class="flex items-center mt-5" href="">
                                                <Lucide icon="Calendar" class="w-4 h-4 mr-2" />  {{ moment(data.date_birth).format('D MMM, YYYY') }}
                                            </a>
                                            <!-- <a class="flex items-center mt-5" href="">
                                                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> {{ state.listProfile.passport }}
                                            </a> -->
                                            <a class="flex items-center mt-5" href="">
                                                <Lucide icon="Users" class="w-4 h-4 mr-2" /> {{ data.gender }}
                                            </a>
                                            <a class="flex items-center mt-5 text-primary" href="">
                                                <Lucide icon="User" class="w-4 h-4 mr-2" /> {{ data.namasales }}
                                            </a>

                                            
                                        </div>

                                        <div class="relative flex items-center p-5 text-center" v-if="state.listBookingClass.length!=0">
                                        

                                            <div class="ml-4 mr-auto">
                                                <div class="text-base font-medium">
                                                    <a class="flex items-center text-success" href="#" @click="checkin(check_in)">
                                                        <Lucide icon="CheckSquare" class="w-4 h-4 mr-5" /> Check In
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>

                                </div>

                                <div class="flex flex-col-reverse col-span-12 lg:col-span-8 2xl:col-span-9 lg:block">
                                    <Preview class="intro-y box" v-slot="{ toggle }">
                                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                            <h2 class="mr-auto text-base font-medium">My Packages</h2>
                                        </div>

                                        
                                        <div class="p-5">
                                            <Preview.Panel>
                                                <div class="mx-6">
                                                    <Preview.Panel>
                                                        <div class="overflow-x-auto">
                                                            <Table>
                                                                <Table.Thead class="bg-primary text-white">
                                                                    <Table.Tr>
                                                                        <Table.Th class="whitespace-nowrap">#</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Package</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Type Package </Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Sessions </Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Sessions Used</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Access</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Studio </Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Start Member</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Expired Member</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Payment Type</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Type Contract</Table.Th>
                                                                        <Table.Th class="whitespace-nowrap"> Status Contract</Table.Th>

                                                                    </Table.Tr>
                                                                </Table.Thead>
                                                                
                                                                <Table.Tbody>
                                                            
                                                            
                                                                    <Table.Tr v-if="state.listContract.length==0" class="intro-x">
                                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                                            </div>
                                                                        </Table.Td>
                                                                    </Table.Tr>

                                                                    <Table.Tr v-for="(data, index) in state.listContract" :key="index" v-else>
                                                                        <Table.Td>{{ index+1 }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ data.type }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ data.packages_name }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap text-center">{{ data.sessions }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap text-center">{{ data.terpakai }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap text-center">{{ data.accesss }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ data.deptname }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ moment(data.start_date).format('D MMM YYYY') }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ moment(data.end_date).format('D MMM YYYY') }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ data.payment_type }}</Table.Td>
                                                                        <Table.Td class="whitespace-nowrap">{{ data.type_contract }}</Table.Td>
                                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                                        <div class="flex items-center justify-center" >
                                                                            <div class="text-success" v-if="data.status_contract == 0">Active</div>
                                                                            <div class="text-danger" v-else-if="data.status_contract == 1">Non Active</div>
                                                                            <div class="text-warning" v-else-if="data.status_contract == 2">Request Cuti</div>
                                                                            <div class="text-yellow-300" v-else>Cuti</div>
                                                                        </div>
                                                                        </Table.Td>
                                                                    </Table.Tr>
                                                                </Table.Tbody>
                                                            </Table>
                                                        </div>
                                                    </Preview.Panel>
                                                </div>
                                        
                                            </Preview.Panel>
                                        </div>
                                    </Preview>

                                    <Preview class="intro-y box" v-slot="{ toggle }">
                                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                            <h2 class="mr-auto text-base font-medium">My Booking Class</h2>
                                        </div>

                            
                                        <div class="p-5">
                                            <Preview.Panel>
                                                <div class="mx-6">
                                                    <Preview.Panel>
                                                        <div class="overflow-x-auto pt-5">
                                                            <Table>
                                                                <Table.Thead  class="bg-primary text-white">
                                                                    <Table.Tr class="intro-x">
                                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                            No
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
                                                                            Type Schedule
                                                                        </Table.Th>
                                                                        <!-- <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                            Action
                                                                        </Table.Th> -->
                                                                    </Table.Tr>
                                                                </Table.Thead>
                                                                <Table.Tbody>
                                                                
                                                                    <Table.Tr v-if="state.listContract.length==0" class="intro-x">
                                                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                                            </div>
                                                                        </Table.Td>
                                                                    </Table.Tr>
                                                                    
                                                                    <Table.Tr v-else-if="state.listBookingClass.length==0" class="intro-x">
                                                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                                <div class="mt-2 text-xs text-center">
                                                                            
                                                                                    <Button variant="primary" href="#" @click="booking(state.listProfile[0].idusers)">
                                                                                        <Lucide icon="Send" class="w-4 h-4 mr-1" /> Booking Class
                                                                                    </Button>
                                                                                
                                                                                </div>
                                                                            </div>
                                                                        </Table.Td>
                                                                    </Table.Tr>

                                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listBookingClass" :key="data.id" v-else>
                                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                                {{ index+1 }}
                                                                            </div>
                                                                        </Table.Td>
                                                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                            {{ data.class_name }}
                                                                        </Table.Td>
                                                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                            {{ data.name }}
                                                                        </Table.Td>
                                                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                            {{ data.deptname }}
                                                                        </Table.Td>
                                                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                            {{ data.tgl_schedule }}
                                                                        </Table.Td>
                                                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                            {{ data.start_time }}
                                                                        </Table.Td>
                                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                                            <div
                                                                                :class="[
                                                                                'flex items-center justify-center',
                                                                                    { 'text-success': data.schedule_type==0 },
                                                                                    { 'text-primary': data.schedule_type==1 }
                                                                                ]"
                                                                            >
                                                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                                                <div v-if="data.schedule_type==0">Booking</div>
                                                                                <div v-else-if="data.schedule_type==1">Personal Trainer</div>
                                                                            
                                                                            </div>
                                                                        </Table.Td>
                                                                        <!-- <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                                            <div class="flex items-center justify-center">
                                                                                <Tippy as="div"  content="Present Yoga">
                                                                                    <a class="flex items-center text-success" href="#" @click="present(data.idbooking)">
                                                                                        <Lucide icon="CheckSquare" class="w-4 h-4 mr-5" /> 
                                                                                    </a>
                                                                                </Tippy>
                                                                            </div>
                                                                        </Table.Td> -->
                                                                    </Table.Tr>
                                                                </Table.Tbody>
                                                            </Table>
                                                        </div>
                                                    </Preview.Panel>
                                                </div>
                                        
                                            </Preview.Panel>
                                        </div>
                                    </Preview>
                                </div>

                        
                    
                            </div>
                        </div>
                        </Tab.Panel>
                    </Tab.Panels>

                    <Tab.Panels class="mt-5">
                        <Tab.Panel class="leading-relaxed">
                            <div class="p-5 box">
                            <div class="full-calendar">
                                <FullCalendar :key="calendarKey" :options="optionsCalendar" />
                            </div>
                        </div>
                        </Tab.Panel>
                    </Tab.Panels>

                    <Tab.Panels class="mt-5">
                        <Tab.Panel class="leading-relaxed">
                            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                <div class="items-center sm:flex sm:mr-4">
                                    <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                        Filter
                                    </label>
                                    <!-- <FormSelect v-model="status" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                                        <option value="">All Type</option>
                                        <option value="0">Booking</option>
                                        <option value="1">Personal Trainer</option>
                                    </FormSelect> -->

                                    <FormSelect v-model="liststudio"  class="w-full">
                                        <option value="">Select Studio</option>
                                        <option v-for="item in state.listDepartement" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                    </FormSelect>

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
                                            startDate:new  moment().startOf('year').format('YYYY-MM-DD'),
                                            endDate: new  moment().endOf('month').format('YYYY-MM-DD'), 
                                            }" 
                                    class="block w-full mr-2" />

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
                                                Type Schedule
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Booking Class
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Present Members
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
                                        <Table.Tr v-if="state.listData.total==0" class="intro-x">
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
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.class_name }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.name }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.deptname }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.tgl_schedule }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.start_time }}
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                <div
                                                    :class="[
                                                    'flex items-center justify-center',
                                                        { 'text-success': data.schedule_type==0 },
                                                        { 'text-primary': data.schedule_type==1 }
                                                    ]"
                                                >
                                                    <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                    <div v-if="data.schedule_type==0">Booking</div>
                                                    <div v-else-if="data.schedule_type==1">Personal Trainer</div>
                                                
                                                </div>
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ parseInt(data.total) + parseInt(data.absent) + parseInt(data.present) }} Member
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{  parseInt(data.present) }} Member
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div class="flex items-center justify-center">
                                                    <Tippy as="div"  content="View Booking Members">
                                                        <a class="flex items-center text-success" href="#" @click="edit(data.idschedule, data.schedule_type)">
                                                            <Lucide icon="Eye" class="w-4 h-4 mr-5" /> 
                                                        </a>
                                                    </Tippy>
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
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            </div>
        </div>

    </Tab.Group>


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

    <Dialog :open="AddModal">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full rounded bg-white">
                <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="mr-auto text-base font-medium">
                        List Members Booking Class
                    </h2>

                    <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                        <Lucide icon="XSquare" class="w-5 h-5" />
                    </Button>
                </Dialog.Title>
                
                <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
            
                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                        <Preview.Panel>
                            <Tab.Group>
                                <Tab.List variant="boxed-tabs">
                                    <Tab>
                                        <Tab.Button class="w-full py-2" as="button">
                                        Members Booking
                                        </Tab.Button>
                                    </Tab>
                                    <Tab>
                                        <Tab.Button class="w-full py-2" as="button">
                                        Members Present
                                        </Tab.Button>
                                    </Tab>
                                    <Tab>
                                        <Tab.Button class="w-full py-2" as="button">
                                        Members Absent
                                        </Tab.Button>
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels class="border-b border-l border-r">
                                    <Tab.Panel class="p-5 leading-relaxed">
                                        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                            <div class="items-center sm:flex sm:mr-4">
                                                <Button variant="primary" class="mr-2 shadow-md" @click="add">
                                                <span class="flex items-center justify-center w-40 h-5">
                                                    <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Add New Booking
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
                                                    v-model="searchBooking"
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
                                                            Member Name
                                                        </Table.Th>
                                                        <!-- <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Phone Number
                                                        </Table.Th> -->
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Members Studio
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Type Member
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Access
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Sales
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
                                                    <Table.Tr v-if="state.listBooking.length==0" class="intro-x">
                                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                            </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listBooking" :key="data.id" >
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                {{  index+1 }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.name }}
                                                        </Table.Td>
                                                        <!-- <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.no_telp.replace(/^(\d{2})\d+(\d{2})$/, '$1***********$2') }}
                                                        </Table.Td> -->
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.deptname }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.type }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.accesss }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.namasales }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                        <div class="flex items-center justify-center" >
                                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                            <div class="text-success" v-if="data.status_booking == 0">Booked</div>
                                                            <div class="text-success" v-else-if="data.status_booking == 1">Present</div>
                                                            <div class="text-danger" v-else>Absent</div>
                                                        </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                        <div class="flex items-center justify-center">
                                                            <Tippy as="div"  content="Present Yoga">
                                                                <a class="flex items-center text-success" href="#" @click="present(data.idbooking)">
                                                                    <Lucide icon="CheckSquare" class="w-4 h-4 mr-5" /> 
                                                                </a>
                                                            </Tippy>

                                                            <Tippy as="div"  content="Absent Yoga">
                                                                <a class="flex items-center text-danger" href="#" @click="absent(data.idbooking)">
                                                                    <Lucide icon="XSquare" class="w-4 h-4 mr-5" /> 
                                                                </a>
                                                            </Tippy>
                                                        </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel class="p-5 leading-relaxed">
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
                                                v-model="searchPresent"
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
                                                            Member Name
                                                        </Table.Th>
                                                        <!-- <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Phone Number
                                                        </Table.Th> -->
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Members Studio
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Type Member
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Access
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Sales
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Status
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
                                                    <Table.Tr v-if="state.listBookingPresent.length==0" class="intro-x">
                                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                            </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listBookingPresent" :key="data.id" >
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                {{  index+1 }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.name }}
                                                        </Table.Td>
                                                        <!-- <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.no_telp.replace(/^(\d{2})\d+(\d{2})$/, '$1***********$2') }}
                                                        </Table.Td> -->
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.deptname }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.type }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.accesss }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.namasales }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                        <div class="flex items-center justify-center" >
                                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                            <div class="text-success" v-if="data.status_booking == 0">Booked</div>
                                                            <div class="text-success" v-else-if="data.status_booking == 1">Present</div>
                                                            <div class="text-danger" v-else>Absent</div>
                                                        </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Tab.Panel>

                                    <Tab.Panel class="p-5 leading-relaxed">
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
                                                v-model="searchAbsent"
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
                                                            Member Name
                                                        </Table.Th>
                                                        <!-- <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Phone Number
                                                        </Table.Th> -->
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Members Studio
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Type Member
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Access
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Sales
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            Status
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
                                                    <Table.Tr v-if="state.listBookingAbsent.length==0" class="intro-x">
                                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                            </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listBookingAbsent" :key="data.id" >
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                {{  index+1 }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.name }}
                                                        </Table.Td>
                                                        <!-- <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.no_telp.replace(/^(\d{2})\d+(\d{2})$/, '$1***********$2') }}
                                                        </Table.Td> -->
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.deptname }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.type }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.accesss }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.namasales }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                        <div class="flex items-center justify-center" >
                                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                            <div class="text-success" v-if="data.status_booking == 0">Booked</div>
                                                            <div class="text-success" v-else-if="data.status_booking == 1">Present</div>
                                                            <div class="text-danger" v-else>Absent</div>
                                                        </div>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Tab.Panel>

                                </Tab.Panels>
                            </Tab.Group>
                        </Preview.Panel>
                    </div>
                </Dialog.Description>
            </DialogPanel>

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
                                            Sales Name
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
                                                {{ state.listData.from + index }}
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
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.namasales }}
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
                </div>
                </div>
            </Dialog>
            </div>
        </div>
    </Dialog>

    <Dialog  size="sm" :open="QrShow"  @close="setQrShow(false)" >
    
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    Scan QR
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setQrShow(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12">
                <qrcode-stream @detect="onDetect"></qrcode-stream>
                </div>
            </Dialog.Description>
        </Dialog.Panel>

    </Dialog>

    <Dialog :open="PilihModal" @close="setPilihModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckSquare" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to selected this member?
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setPilihModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-24" @click="pilihmember">
                    Yes
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="PresentModal" @close="setPresentModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckSquare" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to present this member?
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setPresentModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-24" @click="savePresent">
                    Yes
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="CheckInModal" @close="setCheckInModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckSquare" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to check in this member?
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setCheckInModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-24" @click="saveCheckIn">
                    Yes
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="AbsentModal" @close="setAbsentModal(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XSquare" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to absent this member?
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setAbsentModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="saveAbsent">
                    Yes
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog  size="large" :open="Booking">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Pilih Schedule
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setBooking(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                    
                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                <div class="items-center sm:flex sm:mr-4">
                                    <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                        Filter
                                    </label>
                                    <FormSelect v-model="studio"  class="w-full">
                                        <option value="">Select Studio</option>
                                        <option v-for="item in state.listDepartement" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                    </FormSelect>
                                    <div class="relative w-full">
                                        <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                            <Lucide icon="Calendar" class="w-4 h-4" />
                                        </div>
                                        <Litepicker v-model="tgl_schedule"
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
                                                Type Schedule
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
                                        <Table.Tr v-if="state.listSchedule.total==0" class="intro-x">
                                            <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr class="intro-x" v-for="(data, index) in state.listSchedule.data" :key="data.id" >
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                    {{ state.listSchedule.from + index }}
                                                </div>
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.class_name }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.name }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.deptname }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.tgl_schedule }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.start_time }}
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                <div
                                                    :class="[
                                                    'flex items-center justify-center',
                                                        { 'text-success': data.schedule_type==0 },
                                                        { 'text-primary': data.schedule_type==1 }
                                                    ]"
                                                >
                                                    <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                    <div v-if="data.schedule_type==0">Booking</div>
                                                    <div v-else-if="data.schedule_type==1">Personal Trainer</div>
                                                
                                                </div>
                                            </Table.Td>
                                            
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div class="flex items-center justify-center">
                                                    <Tippy as="div"  content="Booking">
                                                        <a class="flex items-center text-success" href="#" @click="saveBooking(data.idschedule)">
                                                            <Lucide icon="Check" class="w-4 h-4 mr-5" /> 
                                                        </a>
                                                    </Tippy>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                            <div class="items-center sm:flex sm:mr-4">
                                <TailwindPagination :limit="1" :data="state.listSchedule" @pagination-change-page="tampilSchedule"/>
                            </div>

                            <div class="hidden mx-auto md:block text-slate-500">
                                Showing {{ state.listSchedule.from }} to {{ state.listSchedule.to }} of {{ state.listSchedule.total }} entries
                            </div>

                            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            
                            </div>
                        </div>

                    </Dialog.Description>
                </DialogPanel>
            </div>
        </div>
    </Dialog>

    <Dialog  size="large" :open="CariMemberModal">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Cari Members
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setCariMemberModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
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
                                    v-model="searchUser"
                                    />
                                    <Lucide
                                    icon="Search"
                                    class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                    />
                                    
                                </div>
                                
                                
                            </div>
                        </div>
                    
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
                                                Member Telp
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Member Email
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Studio
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Referal Code
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                Sales Name
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
                                        <Table.Tr v-if="state.listUser.total==0" class="intro-x">
                                            <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr class="intro-x" v-for="(data, index) in state.listUser.data" :key="data.id" >
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                    {{ state.listUser.from + index }}
                                                </div>
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.name }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.no_telp.replace(/^(\d{2})\d+(\d{2})$/, '$1***********$2') }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.email }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.deptname }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.referal_code }}
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.namasales }}
                                            </Table.Td>
                                            
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div class="flex items-center justify-center">
                                                    <Tippy as="div"  content="Pilih Members">
                                                        <a class="flex items-center text-success" href="#" @click="pilihuser(data.referal_code)">
                                                            <Lucide icon="Check" class="w-4 h-4 mr-5" /> 
                                                        </a>
                                                    </Tippy>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                            <div class="items-center sm:flex sm:mr-4">
                                <TailwindPagination :limit="1" :data="state.listUser" @pagination-change-page="tampilUsers"/>
                            </div>

                            <div class="hidden mx-auto md:block text-slate-500">
                                Showing {{ state.listUser.from }} to {{ state.listUser.to }} of {{ state.listUser.total }} entries
                            </div>

                            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            
                            </div>
                        </div>

                    </Dialog.Description>
                </DialogPanel>
            </div>
        </div>
    </Dialog>

</template>

<style>
    .scrolling-text {
    white-space: nowrap;
    animation: scrollText 10s linear infinite; /* Mengatur durasi dan pengulangan animasi */
    }

    @keyframes scrollText {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
    }
</style>
