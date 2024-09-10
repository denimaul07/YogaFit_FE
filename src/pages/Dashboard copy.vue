<script setup>
  import _ from "lodash";
  import Api from "../api/Api";
  import Lucide from "../base-components/Lucide";
  import { Tab } from "../base-components/Headless";
  import Button from "../base-components/Button";
  import { Menu, Dialog } from "../base-components/Headless";
  import { FormInput, FormLabel, InputGroup, FormSelect, FormInline } from "../base-components/Form";
  import Tippy from "../base-components/Tippy";
  import { ref, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import man from "../assets/images/sabar.png";
  import Alert from "../base-components/Alert";
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

  const WaModalPreview = ref(false);
  const setWaModalPreview = (value) => {
    WaModalPreview.value = value;
  };

  const pesan = ref("");
  const oldpass = ref("");
  const newpass = ref("");
  const roleName = ref("");
  const roleName2 = ref("");
  const roleName3 = ref("");
  const id = ref(user.id);
  const email = ref(user.email);
  const name = ref(user.name);
  const foto = ref(user.foto);
  const wa = ref(user.wa);
  const status_notif = ref(user.status_notif);
  const image = ref("");
  const loadingsycn = ref("");
  const informasi = ref("");
  const headerFooterModalPreviewacc = ref(false);
  const setHeaderFooterModalPreviewacc = (value) => {
    headerFooterModalPreviewacc.value = value;
  };

  const headerFooterModalPreview = ref(false);
  const setHeaderFooterModalPreview = (value) => {
    headerFooterModalPreview.value = value;
  };

  const HeaderMKTModalPreview = ref(false);
  const setHeaderMKTModalPreview = (value) => {
    HeaderMKTModalPreview.value = value;
  };


  const showPassword = ref(false);
  const toggleShowPassword = async () => {
    showPassword.value = !showPassword.value;
  };

  const showPasswordConfirm = ref(false);
  const toggleShowPasswordConfirm = async () => {
    showPasswordConfirm.value = !showPasswordConfirm.value;
  };

  const basicModalPreview = ref(false);
  const saveData = async () => {
    const token = localStorage.getItem("token_iss");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    await Api.put("/admin/update_profile", {
      id: id.value,
      oldpass: oldpass.value,
      newpass: newpass.value,
    })
      .then(async (response) => {
        setSuccessModalPreview(true);
        pesan.value = "Data Success Added";

        oldpass.value = "";
        newpass.value = "";
      })
      .catch((error) => {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      });
  };

  const updateWa = async () => {
    const token = localStorage.getItem("token_iss");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    await Api.put("/admin/update_wa", {
      id: id.value,
      wa: wa.value,
      status_notif: status_notif.value,
    })
      .then(async (response) => {
        setSuccessModalPreview(true);
        pesan.value = "No WhatsApp Sudah Di Daftarkan";
        WaModalPreview.value = false;
        oldpass.value = "";
        newpass.value = "";
      })
      .catch((error) => {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      });
  };

  const sendwa = async () => {
    loadingsycn.value = true;
    basicModalPreview.value = true;
    pesan.value = "Harap Sabar, Lagi Proses Kirim WA";
    const token = localStorage.getItem("token_iss");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    await Api.post("/admin/send_wa", {
      wa: wa.value,
      status_notif: status_notif.value,
    })
      .then(async (response) => {
        loadingsycn.value = false;
        basicModalPreview.value = false;
        setSuccessModalPreview(true);
        pesan.value = "Sukses Kirim WA";

        oldpass.value = "";
        newpass.value = "";
      })
      .catch((error) => {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      });
  };

  const onFileChange = (e) => {
    image.value = e.target.files[0];
  };
  const changeFoto = async () => {
    const formdata = new FormData();
    formdata.append("image", image.value);
    formdata.append("id", id.value);
    const token = localStorage.getItem("token_iss");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    await Api.post("/admin/change_profile", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(async (response) => {
        setSuccessModalPreview(true);
        pesan.value = "Data Success Added";

        foto.value = response.data.data;
      })
      .catch((error) => {
        const object1 = error.response.data.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      });
  };


  const crm = async () => {
    router.push({ name: "crm" });
  };

  
  const schedule = async () => {
    router.push({ name: "schedule" });
  };


  const member = async () => {
    router.push({ name: "member" });
  };


  const teacher = async () => {
    router.push({ name: "teacher" });
  };

  const packages = async () => {
    router.push({ name: "packages" });
  };

  const kelas = async () => {
    router.push({ name: "kelas" });
  };

  const studio = async () => {
    router.push({ name: "studio" });
  };

  const users = async () => {
    router.push({ name: "user" });
  };

  const crmsetting = async () => {
    router.push({ name: "CrmSetting" });
  };

  const program = async () => {
    router.push({ name: "program" });
  };

  const checkin = async () => {
    router.push({ name: "Studio_CheckInAdmin" });
  };

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
    if (user.change_password == 0) {
      router.push({ name: "change_password" });
    }

    if (roleName.value=='studio') {
      router.push({ name: "Studio_CheckIn" });
    }

  });

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

    <!-- BEGIN: Profile Info -->
    <div class="px-5 pt-5 mt-5 intro-y box">
      <div
        class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
      >
        <div class="flex items-center justify-center flex-1 px-5 lg:justify-start">
          <div
            class="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit"
          >
            <img
              v-if="foto != null"
              alt="No Image"
              class="rounded-full"
              :src="'https://portal.hondaimora.com/iss/api/storage/foto/' + foto"
            />

            <img
              v-if="foto == null"
              alt="No Image"
              class="rounded-full"
              :src="'https://portal.hondaimora.com/iss/api/storage/foto/user.png'"
            />

            <!-- <img v-if="foto != null"
              alt="No Image"
              class="rounded-full"
              :src="'http://192.168.5.65:5050/storage/foto/'+foto"
            />

            <img v-if="foto == null"
              alt="No Image"
              class="rounded-full"
              :src="'http://192.168.5.65:5050/storage/foto/user.png'"
            /> -->
          </div>
          <div class="ml-5">
            <div class="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
              {{ user.name }}
            </div>
            <div class="text-sky-600">Online</div>
          </div>
        </div>
        <div
          class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-3">Contact Details</div>
          <div class="flex flex-col items-center justify-center mt-4 lg:items-start">
            <div class="flex items-center truncate sm:whitespace-normal">
              <Lucide icon="Mail" class="w-4 h-4 mr-2" />
              {{ user.email }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="Home" class="w-4 h-4 mr-2" />
              {{ user.departments.deptname }}
            </div>
            <!-- <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="User" class="w-4 h-4 mr-2" />   
              <div class="bg-success/20 text-success rounded px-2 mt-1.5">
                Online
              </div>
            </div> -->
          </div>
        </div>
      </div>
      <Tab.List
        variant="link-tabs"
        class="flex-col justify-center text-center sm:flex-row lg:justify-start"
      >
        <Tab :fullWidth="false">
          <Tab.Button class="py-4 cursor-pointer">Dashboard</Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
          <Tab.Button class="py-4 cursor-pointer"> Account & Profile </Tab.Button>
        </Tab>
        <!-- <Tab :fullWidth="false">
          <Tab.Button class="py-4 cursor-pointer"> Activities </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
          <Tab.Button class="py-4 cursor-pointer">Tasks</Tab.Button>
        </Tab> -->
      </Tab.List>
    </div>

    <!-- END: Profile Info -->
    <Tab.Panels class="mt-5 intro-y">
      <Tab.Panel>
        <div class="px-5 pt-5 mt-5 intro-y box">
          <h2 class="mr-auto text-base font-medium">Main Menu</h2>
          <div class="grid grid-cols-12 gap-6 mt-5">
          
            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="crm" v-if="roleName=='superAdmin' || roleName=='admin' || roleName=='salesConsultant' || roleName=='salesLeader'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide
                        icon="Airplay"
                        class="w-[28px] h-[28px] text-gray-50"
                      />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    CRM Database
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Leads</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="schedule" v-if="roleName=='superAdmin' || roleName=='admin' || roleName=='salesConsultant' || roleName=='salesLeader' || roleName=='studio'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Calendar" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Schedule Class
                  </div>
                  <div class="mt-1 text-base text-gray-50">
                    Manage Booking Class
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="checkin" v-if="roleName=='superAdmin' || roleName=='admin' || roleName=='salesConsultant' || roleName=='salesLeader' || roleName=='studio'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Calendar" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Class Booking & Check-In
                  </div>
                  <div class="mt-1 text-base text-gray-50">
                    Manage Class Booking & Check-In
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="member" v-if="roleName=='superAdmin' || roleName=='admin' || roleName=='salesConsultant' || roleName=='salesLeader'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Users" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Members
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Members and Contract</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="teacher" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="User" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Teachers
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Teachers</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="packages" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="CreditCard" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Packages
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Packages</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="kelas" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Clipboard" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Class
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Class</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="studio" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Layers" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Studio
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Studio</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="program" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="List" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Program
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Program</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="crmsetting" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="Cog" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Settings CRM
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage CRM</div>
                </div>
              </div>
            </div>

            <div class="col-span-12 sm:col-span-3 xl:col-span-3 intro-y" @click="users" v-if="roleName=='superAdmin' || roleName=='admin'">
              <div
                :class="[
                  'pb-5',
                  'relative zoom-in',
                  'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                ]"
              >
                <div class="p-5 box bg-blue-800">
                  <div class="flex">
                    <div class="m-auto">
                      <Lucide icon="User" class="w-[28px] h-[28px] text-gray-50" />
                    </div>
                  </div>
                  <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                    Users
                  </div>
                  <div class="mt-1 text-base text-gray-50">Manage Users</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Tab.Panel>

      <Tab.Panel>
        <div class="px-5 pt-5 mt-5 intro-y box">
          <h2 class="mr-auto text-base font-medium">Display Information</h2>
          <div class="p-5">
            <div class="flex flex-col xl:flex-row">
              <div class="flex-1 mt-6 xl:mt-0">
                <div class="grid grid-cols-12 gap-x-5">
                  <div class="col-span-12 2xl:col-span-4">
                    <div>
                      <FormLabel htmlFor="update-profile-form-1"> Email </FormLabel>
                      <FormInput
                        id="update-profile-form-2"
                        type="text"
                        placeholder="Input text"
                        v-model="email"
                        disabled
                      />

                      <FormInput
                        id="update-profile-form-3"
                        type="hidden"
                        placeholder="Input text"
                        v-model="id"
                        disabled
                      />
                    </div>

                    <div>
                      <FormLabel htmlFor="update-profile-form-4">
                        Old Password
                      </FormLabel>
                      <InputGroup class="mt-2">
                        <FormInput
                          placeholder="Password"
                          v-model="oldpass"
                          :type="showPassword ? 'text' : 'password'"
                        />
                        <InputGroup.Text id="input-group-price">
                          <button @click="toggleShowPassword">
                            <Lucide
                              :icon="showPassword ? 'EyeOff' : 'Eye'"
                              :class="'text-primary'"
                            />
                          </button>
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <div class="col-span-12 2xl:col-span-4">
                    <div class="mt-3 2xl:mt-0">
                      <FormLabel htmlFor="update-profile-form-6"> Name </FormLabel>

                      <FormInput
                        id="update-profile-form-7"
                        type="text"
                        placeholder="Input text"
                        v-model="name"
                        disabled
                      />
                    </div>

                    <div>
                      <FormLabel htmlFor="update-profile-form-8">
                        New Password
                      </FormLabel>
                      <InputGroup class="mt-2">
                        <FormInput
                          placeholder="Password"
                          v-model="newpass"
                          :type="showPassword ? 'text' : 'password'"
                        />
                        <InputGroup.Text id="input-group-price">
                          <button @click="toggleShowPassword">
                            <Lucide
                              :icon="showPassword ? 'EyeOff' : 'Eye'"
                              :class="'text-primary'"
                            />
                          </button>
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>

                  <div class="col-span-12 2xl:col-span-4">
                    <div>
                      <FormLabel htmlFor="update-profile-form-1"> No Wa </FormLabel>
                      <FormInput
                        id="update-profile-form-2"
                        type="text"
                        placeholder="Input No Wa"
                        v-model="wa"
                      />
                    </div>

                    <div class="mt-3 2xl:mt-0">
                      <FormLabel htmlFor="update-profile-form-6">
                        Notification
                      </FormLabel>

                      <FormSelect v-model="status_notif" class="sm:mt-3 sm:mr-3">
                        <option value="0">Email Only</option>
                        <option value="1">Wa Only</option>
                        <option value="2">Email & WA</option>
                      </FormSelect>
                    </div>
                  </div>
                </div>
                <Button
                  variant="primary"
                  type="button"
                  class="w-40 mt-3"
                  @click="saveData"
                >
                  Change Password </Button
                >&nbsp;&nbsp;
                <Button
                  variant="success"
                  type="button"
                  class="w-40 mt-3 text-white"
                  @click="updateWa"
                >
                  Update No WhatsApp </Button
                >&nbsp;&nbsp;
                <Button
                  variant="linkedin"
                  type="button"
                  class="w-40 mt-3"
                  @click="sendwa"
                >
                  Test Send WhatsApp
                </Button>
              </div>
              <div class="mx-auto w-52 xl:mr-0 xl:ml-6">
                <div
                  class="p-5 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400"
                >
                  <div class="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
                    <img
                      class="rounded-md"
                      alt="No Image"
                      :src="'https://portal.hondaimora.com/iss/api/storage/foto/' + foto"
                    />
                  </div>
                  <!-- <div class="relative mx-auto mt-5 cursor-pointer">
                    <Button variant="primary" type="button" class="w-full">
                      Choose Photo
                    </Button>
                    <FormInput
                      type="file" @change="onFileChange"
                      class="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                  </div> -->

                  <input
                    type="file"
                    @change="onFileChange"
                    accept="image/x-png,image/gif,image/jpeg"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <Button
                    variant="primary"
                    type="button"
                    class="w-40 mt-3"
                    @click="changeFoto"
                  >
                    Uoload Foto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab.Panel>
    </Tab.Panels>
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

  <Dialog
    size="lg"
    :open="WaModalPreview"
    @close="
      () => {
        setWaModalPreview(false);
      }
    "
  >
    <Dialog.Panel>
      <div class="p-5">
        <div class="mt-5 text-3xl text-center">INFORMATION !!!</div>
        <div class="mt-2 text-slate-500">
          Hallo , {{ user.name }} <br />
          Kami ingin memberi tahu Anda tentang fitur notifikasi baru yang telah kami
          tambahkan ke dalam IMORA SUPPORT SYSTEM (ISS). Fitur notifikasi ini akan
          membantu Anda tetap terhubung dengan pembaruan aplikasi dan informasi terbaru
          yang ada di Sytem Kami.  Update No WhatsApp Kamu Di System ini Ya dan pilih status Notification nya
        </div>
      </div>

      <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
          <FormInline class="mt-2">
            <FormLabel
              htmlFor="horizontal-form-2"
              class="sm:w-40"
              style="text-align: left"
            >
              No WhatsApp Kamu</FormLabel
            >
            <FormInput
              type="text"
              class="col-span-8"
              v-model="wa"
              placeholder="Masukan No Whatsapp Kamu"
            />
          </FormInline>
        </div>

        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
          <FormInline class="mt-2">
            <FormLabel
              htmlFor="horizontal-form-2"
              class="sm:w-40"
              style="text-align: left"
              >Status Notification</FormLabel
            >
            <FormSelect v-model="status_notif">
              <option value="0">Email Only</option>
              <option value="1">Wa Only</option>
              <option value="2">Email & WA</option>
            </FormSelect>
          </FormInline>
        </div>
      </Dialog.Description>

      <Dialog.Footer
        class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400"
      >
        <Button variant="primary" type="button" class="w-20" @click="updateWa">
          SAVE
        </Button>
      </Dialog.Footer>
    </Dialog.Panel>
  </Dialog>

  <Dialog size="xl" :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)" >
    <Dialog.Panel>
      <Dialog.Title>
        <h2 class="mr-auto text-base font-medium">Pilih Roles</h2>
      </Dialog.Title>
      <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
        <div
          class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y"
          @click="purchaseadmin"
        >
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="User" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                Purchase Orders Admin
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y"
          @click="purchaseadminstaff"
        >
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="Users" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                Purchase Orders Requester
              </div>
            </div>
          </div>
        </div>
      </Dialog.Description>
      <Dialog.Footer>
        <Button
          type="button"
          variant="outline-secondary"
          @click="
            () => {
              setHeaderFooterModalPreview(false);
            }
          "
          class="w-20 mr-1"
        >
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog.Panel>
  </Dialog>

  <Dialog
    size="xl"
    :open="headerFooterModalPreviewacc"
    @close="setHeaderFooterModalPreviewacc(false)"
  >
    <Dialog.Panel>
      <Dialog.Title>
        <h2 class="mr-auto text-base font-medium">Pilih Roles</h2>
      </Dialog.Title>
      <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y" @click="budgetadmin">
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="User" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                E-Budget Admin
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y" @click="budgetstaff">
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="Users" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                E-Budget Requester
              </div>
            </div>
          </div>
        </div>
      </Dialog.Description>
      <Dialog.Footer>
        <Button
          type="button"
          variant="outline-secondary"
          @click="
            () => {
              setHeaderFooterModalPreviewacc(false);
            }
          "
          class="w-20 mr-1"
        >
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog.Panel>
  </Dialog>

  <Dialog size="xl" :open="HeaderMKTModalPreview" @close="setHeaderMKTModalPreview(false)" >
    <Dialog.Panel>
      <Dialog.Title>
        <h2 class="mr-auto text-base font-medium">Pilih Roles</h2>
      </Dialog.Title>
      <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
        <div
          class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y"
          @click="mktadmin"
        >
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="User" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                Event Admin
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y"
          @click="mktstaff"
        >
          <div
            :class="[
              'pb-5',
              'relative zoom-in',
              'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
            ]"
          >
            <div class="p-5 box bg-blue-800">
              <div class="flex">
                <div class="m-auto">
                  <Lucide icon="Users" class="w-[28px] h-[28px] text-gray-50" />
                </div>
              </div>
              <div class="mt-6 text-2xl font-medium leading-8 text-gray-50">
                Event Jaga
              </div>
            </div>
          </div>
        </div>
      </Dialog.Description>
      <Dialog.Footer>
        <Button
          type="button"
          variant="outline-secondary"
          @click="
            () => {
              setHeaderMKTModalPreview(false);
            }
          "
          class="w-20 mr-1"
        >
          Cancel
        </Button>
      </Dialog.Footer>
    </Dialog.Panel>
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
