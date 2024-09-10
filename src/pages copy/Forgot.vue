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
    <div
        :class="[
        '-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
        'before:hidden before:xl:block before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
        'after:hidden after:xl:block after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
        ]"
    >
        <DarkModeSwitcher />
        <MainColorSwitcher />
        <div class="container relative z-10 sm:px-10">
        <div class="block grid-cols-2 gap-4 xl:grid">
            <!-- BEGIN: Login Info -->
            <div class="flex-col hidden min-h-screen xl:flex">
            <a href="" class="flex items-center pt-5 -intro-x">
                <img
              alt="Midone Tailwind HTML Admin Template"
              class="w-40"
              :src="logoUrl"
            />
                <!-- <span class="ml-3 text-lg text-white"> Imora Support System </span> -->
            </a>
            <div class="my-auto">
                <img
                alt="Midone Tailwind HTML Admin Template"
                class="w-1/2 -mt-16 -intro-x"
                :src="illustrationUrl"
                />
               <div
              class="mt-10 text-4xl font-medium leading-tight text-white -intro-x"
            >
              Now All Connected <br />
              <!-- sign in to your account. -->
            </div>
            <div
              class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400"
            >
            Manage all your work accounts in one place
            </div>
            </div>
            </div>
            <!-- END: Login Info -->
            <!-- BEGIN: Login Form -->
        
            <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
                <div
                class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
                >
        
                <h2
                    class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left"
                >
                    Forgot Password ?
                </h2>
                <div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
                    A few more clicks to sign in to your account. Manage all your
                    e-commerce accounts in one place
                </div>
                <form role="form" class="text-start" @submit.prevent="forgot">
                <div class="mt-8 intro-x">
                    <FormInput
                    type="text"
                    class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                    placeholder="Email" v-model="user.email"
                    />
                </div>
                <div
                    class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm"
                >
                    <div class="flex items-center mr-auto">
                    <FormCheck.Input
                        id="remember-me"
                        type="checkbox"
                        class="mr-2 border"
                    />
                    <label class="cursor-pointer select-none" htmlFor="remember-me">
                        Remember me
                    </label>
                    </div>
                    <a href="#"  @click="login">Back To Login</a>
                </div>
                <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                    <Button
                    variant="primary"
                    class="w-full px-4 py-3 align-top xl:mr-3"
                    >
                    Reset Password
                    </Button>
                </div>
                </form>
                <div
                    class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left"
                >
                    By signin up, you agree to our
                    <a class="text-primary dark:text-slate-200" href="">
                    Terms and Conditions
                    </a>
                    &
                    <a class="text-primary dark:text-slate-200" href="">
                    Privacy Policy
                    </a>
                </div>
                </div>
            </div>
            <!-- END: Login Form -->
        </div>
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

<script setup>
import DarkModeSwitcher from "../components/DarkModeSwitcher";
import MainColorSwitcher from "../components/MainColorSwitcher";
import logoUrl from "../assets/images/header.png";
import logo from "../assets/images/logo_honda.svg";
import illustrationUrl from "../assets/images/logo.png";
import { FormInput, FormCheck } from "../base-components/Form";
import Button from "../base-components/Button";
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Dialog } from "../base-components/Headless";
import Lucide from "../base-components/Lucide";
import man from "../assets/images/sabar.png"
const redirect = ref(false);

const user = reactive({
    email: ''
})

const basicModalPreview = ref(false);
const warningModalPreview = ref(false);
const setWarningModalPreview = (value) => {
    warningModalPreview.value = value;
    loadingsycn.value = false
    basicModalPreview.value = false
};

const successModalPreview = ref(false);
const setSuccessModalPreview = (value) => {
    successModalPreview.value = value;
    user.email = ''
};

const pesan = ref("");
const loading = ref(true)
const loadingsycn = ref("")


const store = useStore()
const router = useRouter()

//method login
const forgot = async () =>{
    loadingsycn.value = true
    basicModalPreview.value = true
    pesan.value="Mohon Tunggu ya, Lagi Proses Kirim Password"
    //define variable
    let email = user.email
    await store.dispatch('auth/forgot', {
        email
    })
    .then(() => {
        setSuccessModalPreview(true)
        pesan.value = "Please Check Your Email or WhatsApp"
        loadingsycn.value = false
        basicModalPreview.value = false
    }).catch(error => {
        const object1 = error.data.email
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
    
    })
}

const login = async () => {
    router.push({name: 'login'})
}
</script>