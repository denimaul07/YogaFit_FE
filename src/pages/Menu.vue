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
    <div class="mt-3">
        <div class="intro-x">
            <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
                <!-- BEGIN: Inbox Menu -->
                <div class="p-3 mt-2 intro-y box bg-primary">
                    <Button type="button" class="w-full mt-1 bg-white text-slate-600 dark:text-slate-300 dark:bg-darkmode-300 dark:border-darkmode-300"> 
                        Main Menu
                    </Button>
                    <div class="pt-1 mt-1 text-white border-t border-white/10 dark:border-darkmode-400">
                    
                        <a href="#" class="flex items-center px-3 py-2"  @click="crm" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin'  || user.roles[0].name=='salesConsultant'" :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/dashboard'}">
                            <Lucide icon="Layers" class="w-4 h-4 mr-2" /> CRM Database
                        </a>
                        <div class="mt-4 text-white border-t border-white/10 dark:border-darkmode-400" >
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="settingcrm" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "  :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/CrmSetting'}">
                                <Lucide icon="Settings" class="w-4 h-4 mr-2" /> Settings CRM
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="teacher" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "  :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/teacher'}">
                                <Lucide icon="Users" class="w-4 h-4 mr-2" /> Teacher
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="member" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "  :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/member'}">
                                <Lucide icon="UserCheck" class="w-4 h-4 mr-2" /> Members
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="packages" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "  :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/packages'}">
                                <Lucide icon="CreditCard" class="w-4 h-4 mr-2" /> Packages
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="kelas" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "  :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/class'}">
                                <Lucide icon="Clipboard" class="w-4 h-4 mr-2" /> Class
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="studio" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "   :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/studio'}">
                                <Lucide icon="Home" class="w-4 h-4 mr-2" /> Studio
                            </a>
                            <a href="#" class="flex items-center px-3 py-2 mt-2 rounded-md" @click="users" v-if="user.roles[0].name=='superAdmin' ||  user.roles[0].name=='admin' "   :class="{ 'bg-white/10 dark:bg-darkmode-700': route.path === '/user'}">
                                <Lucide icon="UserCheck" class="w-4 h-4 mr-2" /> User
                            </a>
                        </div>
                    
                    </div>
                </div>
                <!-- END: Inbox Menu -->
            </div>


        </div>
    </div>

</template>

<script setup>
    import Api from '../api/Api'
    import Button from "../base-components/Button"
    import Lucide from "../base-components/Lucide"
    import { useStore } from "vuex";
    import { useRouter, useRoute } from 'vue-router'
    import { Dialog } from "../base-components/Headless"
    import man from "../assets/images/sabar.png"
    import CurrencyInput from "./CurrencyInput.vue";
    import LoadingIcon from "../base-components/LoadingIcon"
    import { onMounted, ref, reactive , watch, computed } from "vue"
    import { FormInput, FormSelect, FormLabel, FormInline } from "../base-components/Form"
    const router = useRouter()
    const store = useStore()
    const user = store.getters['auth/currentUser']
    const loadingsycn = ref("")
    const pesan = ref("")
    const loading = ref(true)
    const route = useRoute()
    const headerFooterModalPreview = ref(false);
    const setHeaderFooterModalPreview = (value) => {
        headerFooterModalPreview.value = value
        if( headerFooterModalPreview.value==false){
            varian.value = '';
            state.data.namabarang = '';
            state.data.harga = '';
            state.data.desc = '';
            state.data.alasan = '';
            state.data.link = '-';
            state.data.qty = '1';
            state.data.cover = '';
            state.data.varian = '';
        }
    };

    

    const basicModalPreview = ref(false);
    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
        document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden'
    };

    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const crm = async () => {
        router.push({name: 'Dashboard'})
    }

    const settingcrm = async () => {
        router.push({name: 'CrmSetting'})
    }

    const studio = async () => {
        router.push({name: 'studio'})
    }

    const users = async () => {
        router.push({name: 'user'})
    }

    const kelas = async () => {
        router.push({name: 'class'})
    }

    const packages = async () => {
        router.push({name: 'packages'})
    }

    const teacher = async () => {
        router.push({name: 'teacher'})
    }

    const member = async () => {
        router.push({name: 'member'})
    }


</script>