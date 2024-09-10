<script setup>
import Api from '../api/Api'
import Alert from "../base-components/Alert";
import Lucide from "../base-components/Lucide";
import _ from "lodash";
import Button from "../base-components/Button";
import { FormInput, FormLabel, InputGroup } from "../base-components/Form";
import { ref } from "vue";
import { useStore } from "vuex";
import { Menu, Dialog } from "../base-components/Headless";
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const user = store.getters['auth/currentUser']
const warningModalPreview = ref(false);
const setWarningModalPreview = (value) => {
    warningModalPreview.value = value;
};

const successModalPreview = ref(false);
const setSuccessModalPreview = (value) => {
    successModalPreview.value = value;

};
const id  = ref(user.id)
const new_password = ref("")
const confirmasi_password  = ref("")
const pesan = ref("");
const showPassword = ref(false)
const toggleShowPassword= async () => {
    showPassword.value = !showPassword.value;
}

const showPasswordConfirm = ref(false)
const toggleShowPasswordConfirm= async () => {
    showPasswordConfirm.value = !showPasswordConfirm.value;
}

const changePassword = async () => {
    const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    await Api.put('/admin/change_password', {
        id : id.value,
        new_password : new_password.value,
        confirmasi_password : confirmasi_password.value,
    }).then(async (response) => {

        setSuccessModalPreview(true)
        pesan.value = "Data Success Added"
        store.dispatch('auth/logout')
        router.push({ name: 'login'})


        
    }).catch(error => {
    
        console.log(error)
        const object1 = error.response.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    })
}

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        
        <div class="col-span-12 lg:col-span-12 2xl:col-span-12">
        <!-- BEGIN: Change Password -->
        <div class="intro-y box lg:mt-5">
            <div
            class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
            >
            <h2 class="mr-auto text-base font-medium">Change Password</h2>
            </div>
            <div class="p-5">
            <Alert variant="outline-danger" class="flex items-center mb-2" v-slot="{ dismiss }">
                <Lucide icon="AlertOctagon" class="w-6 h-6 mr-2" />
                The new password must be at least 8 characters <br>
                The new password must contain at least one uppercase and one lowercase letter<br>
                The new password must contain at least one symbol<br>
                The new password must contain at least one number
                <Alert.DismissButton type="button" class="btn-close" @click="dismiss" aria-label="Close">
                    <Lucide icon="X" class="w-4 h-4" />
                </Alert.DismissButton>
            </Alert>
            <div class="mt-3">
                <FormLabel htmlFor="change-password-form-2">
                New Password
                </FormLabel>
                <InputGroup class="mt-2">
                    <FormInput placeholder="Password" v-model="new_password"   :type="showPassword ? 'text' : 'password'" />
                    <InputGroup.Text id="input-group-price">
                        <button @click="toggleShowPassword">
                        <Lucide :icon="showPassword ? 'EyeOff' : 'Eye'" :class="'text-primary'" />
                        </button>
                    </InputGroup.Text>
                </InputGroup>
            </div>
            <div class="mt-3">
                <FormLabel htmlFor="change-password-form-3">
                Confirm New Password
                </FormLabel>
                <InputGroup class="mt-2">
                    <FormInput placeholder="Password" v-model="confirmasi_password"   :type="showPasswordConfirm  ? 'text' : 'password'" />
                    <InputGroup.Text id="input-group-price">
                        <button @click="toggleShowPasswordConfirm ">
                        <Lucide :icon="showPasswordConfirm  ? 'EyeOff' : 'Eye'" :class="'text-primary'" />
                        </button>
                    </InputGroup.Text>
                </InputGroup>
            </div>
            <Button variant="primary" type="button" class="mt-4" @click="changePassword">
                Change Password
            </Button>
            </div>
        </div>
        <!-- END: Change Password -->
        </div>
    </div>

    
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
