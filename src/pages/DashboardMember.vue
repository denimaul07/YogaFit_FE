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


    <div class="flex items-center mt-8 intro-y">
        <h2 class="mr-auto text-lg font-medium">My Profile</h2>
    </div>

    <Tab.Group>
        <div class="px-5 pt-5 mt-5 intro-y box">
            <div class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                <div
                class="flex items-center justify-center flex-1 px-5 lg:justify-start"
                >
                <div
                    class="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit"
                >
                    <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="baseUrlFoto + (user.foto || 'user.png')"
                    />
                </div>
                <div class="ml-5">
                    <div
                    class="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal"
                    >
                    {{ user.name }}
                    </div>
                    <div class="text-slate-500">{{ user.deptname }}</div>
                </div>
        </div>
        <div class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
            <div class="font-medium text-center lg:text-left lg:mt-3">
                My Profile Details
            </div>
            <div class="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div class="flex items-center truncate sm:whitespace-normal">
                <Lucide icon="Mail" class="w-4 h-4 mr-2" />
                Email : {{ user.email }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> 
                Telp : {{ user.no_telp }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Calendar" class="w-4 h-4 mr-2" />
                Birth Day : {{ moment(user.date_birth).format('D MMM YYYY') }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Meh" class="w-4 h-4 mr-2" />
                Gender : {{ user.gender }}
                </div>
            </div>
        </div>
        <div class="flex items-center  justify-center  flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
            <div class="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                    <Lucide icon="Users" class="w-4 h-4 mr-2" /> 
                    Martial : {{ user.marital }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                    <Lucide icon="Home" class="w-4 h-4 mr-2" />
                    Studio : {{ user.departments.deptname }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                    <Lucide icon="Award" class="w-4 h-4 mr-2" /> 
                    Referal Code : {{ user.referal_code }}
                </div>
                <a class="flex items-center mt-3 truncate sm:whitespace-normal text-primary" href="#" @click="showQR(user.referal_code)">
                    <Lucide icon="Airplay" class="w-4 h-4 mr-2" /> 
                    Show QR
                </a>
            </div>
            </div>
        </div>

        <Tab.List variant="link-tabs" class="flex-col justify-center text-center sm:flex-row lg:justify-start">
            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Dashboard
                </Tab.Button>
            </Tab>

            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> My Contract
                </Tab.Button>
            </Tab>

            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> History Booking Class
                </Tab.Button>
            </Tab>

            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="User" class="w-4 h-4 mr-2" /> Account
                </Tab.Button>
            </Tab>
        </Tab.List>
        </div>

        <Tab.Panels class="mt-5">
            <Tab.Panel>
                <div class="grid grid-cols-12 gap-6 mt-5">
                    <div class="flex flex-col-reverse col-span-12 lg:col-span-4 2xl:col-span-3 lg:block">
                        <div class="mt-5 intro-y box lg:mt-0" v-if="state.listData.length==0">
                            <div class="relative flex items-center justify-center p-5">
                                <div>
                                    <div class="text-base font-medium">
                                        No Booking Class
                                    </div>
                                    <div class="text-slate-500">
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="mt-5 intro-y box lg:mt-0" v-for="(data, index) in state.listData" :key="data.id">
                            <div class="relative flex items-center justify-center p-5">
                                <div>
                                    <div class="text-base font-medium">
                                        {{ data.class_name }}
                                    </div>
                                    <div class="text-slate-500">
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
                                    </div>
                                </div>
                            </div>

                            <div class="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                            <a class="flex items-center font-medium text-primary" href="">
                                <Lucide icon="User" class="w-4 h-4 mr-2" /> Teacher : {{ data.name }}
                            </a>
                            <a class="flex items-center mt-5" href="">
                                <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Date : {{ moment(data.tgl_schedule).format('dddd, D MMMM  YYYY') }}
                            </a>
                            <a class="flex items-center mt-5" href="">
                                <Lucide icon="Clock" class="w-4 h-4 mr-2" /> Time : {{ data.start_time }}
                            </a>
                            <a class="flex items-center mt-5" href="">
                                <Lucide icon="Home" class="w-4 h-4 mr-2" />Studio : {{ data.deptname }}
                            </a>
                            </div>
                            
                        </div>
                    </div>

                    <div class="flex flex-col-reverse col-span-12 lg:col-span-8 2xl:col-span-9 lg:block">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                            <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 class="mr-auto text-base font-medium">Schedule Class</h2>
                            </div>

                            <div class="p-5">
                                <Preview.Panel>
                                    <div class="mx-6">
                                        <Preview.Panel>
                                            <Carousel  v-bind="settings"  :breakpoints="breakpoints" :wrap-around="true" v-model="indexNow" ref="carousel">
                                                <Slide v-for="(tanggal, indeks) in rentangTanggal" :key="indeks">
                                                    <div @click="handleClick(tanggal)" :class="{ 'bg-primary': selectedIndexes === tanggal }"
                                                        class="col-span-12 p-5 cursor-pointer sm:col-span-4 2xl:col-span-3 box border border-black"
                                                        >
                                                        <div class="text-base text-black" :class="{ 'text-white': selectedIndexes === tanggal }">{{ moment(tanggal).format('ddd') }}</div>
                                                        <div class="text-black text-4xl font-medium" :class="{ 'text-white': selectedIndexes === tanggal }">
                                                            {{ moment(tanggal).format('D') }}
                                                        </div>
                                                        <div class="text-base text-black" :class="{ 'text-white': selectedIndexes === tanggal }">{{ moment(tanggal).format('YYYY') }}</div>
                                                    </div>
                                                </Slide>

                                                <template #addons>
                                                <Navigation />
                                                </template>
                                            </Carousel>

                                            <div class="overflow-x-auto pt-10">
                                                    <Table>
                                                        <Table.Thead class="bg-primary text-white">
                                                            <Table.Tr>
                                                                <Table.Th class="whitespace-nowrap">No</Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Time</Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Class </Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Type </Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Studio</Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Teacher</Table.Th>
                                                                <Table.Th class="whitespace-nowrap"> Action </Table.Th>

                                                            </Table.Tr>
                                                        </Table.Thead>
                                                        
                                                        <Table.Tbody>
                                                        

                                                            <Table.Tr v-for="(data, index) in listContract" :key="index">
                                                                <Table.Td v-if="data.id==null" colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                    <div class="flex flex-col items-center justify-end col-span-12">
                                                                        <div class="mt-2 text-xs text-center">Class Not Found</div>
                                                                    </div>
                                                                </Table.Td>
                                                                <Table.Td v-if="data.id!=null">{{ index+1 }}</Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap">{{ moment(data.tgl_schedule +' '+ data.start_time).format('h.mm A') }} - {{ moment(data.tgl_schedule +' '+ data.end_time).format('h.mm A')}}</Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap">{{ data.class_name }}</Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap text-center">
                                                                    <div v-if="data.schedule_type==0">Booking</div>
                                                                    <div v-else>Personal Trainer</div>
                                                                    
                                                                </Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap text-center">{{ data.deptname }}</Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap text-center">{{ data.name }}</Table.Td>
                                                                <Table.Td v-if="data.id!=null" class="whitespace-nowrap">
                                                                    <Button type="button" variant="dark" class="mb-2 mr-1"  v-if="data.totalbooking <= data.capacity" @click="booking(data.idschedule, data.tgl_schedule, data.schedule_type)" >
                                                                        Book
                                                                    </Button>
                                                                    <Button type="button" variant="dark" class="mb-2 mr-1"  v-else>
                                                                        Full Booked
                                                                    </Button>
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
                    </div>
                </div>
                    
            </Tab.Panel>
        </Tab.Panels>

        <Tab.Panels class="mt-5">
            <Tab.Panel>
                <div class="grid grid-cols-12 gap-6 mt-5">

                    <div class="flex flex-col-reverse col-span-12 lg:col-span-12 2xl:col-span-12 lg:block">
                    

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
                                                                <Table.Th class="whitespace-nowrap"> Attendance</Table.Th>
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

                                                            <Table.Tr v-for="(data, index) in state.listContract" :key="index">
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
                                                                    <div class="text-success" v-if="data.status_contract == 0">Active</div>
                                                                    <div class="text-danger" v-else-if="data.status_contract == 1">Non Active</div>
                                                                    <div class="text-warning" v-else-if="data.status_contract == 2">Request Cuti</div>
                                                                    <div class="text-warning" v-else-if="data.status_contract == 3">Cuti</div>
                                                                    <div class="text-yellow-300" v-else>Trial</div>
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
                    </div>
                </div>
                    
            </Tab.Panel>
        </Tab.Panels>        

        <Tab.Panels class="mt-5">
            <Tab.Panel>
                <div class="grid grid-cols-12 gap-6 mt-5">
                    <div class="flex flex-col-reverse col-span-12 lg:col-span-12 2xl:col-span-12 lg:block">
                        <Preview class="intro-y box" v-slot="{ toggle }">
                            <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                                <h2 class="mr-auto text-base font-medium">My History Class   </h2>
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
                                                            <Table.Th class="whitespace-nowrap"> Class </Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Class Level</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Type Class</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Teacher </Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Date Schedule</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Studio</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Status</Table.Th>

                                                        </Table.Tr>
                                                    </Table.Thead>
                                                
                                                    <Table.Tbody>
                                                        <Table.Tr v-if="state.listBooking.length==0" class="intro-x">
                                                            <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                                </div>
                                                            </Table.Td>
                                                        </Table.Tr>

                                                        <Table.Tr v-for="(data, index) in state.listBooking" :key="index">
                                                            <Table.Td>{{ index+1 }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.packages_name }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.type }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap text-center">{{ data.class_name }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap text-center">{{ data.class_level }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap text-center">
                                                            <div class="flex items-center justify-center" >
                                                                <div class="text-success" v-if="data.schedule_type == 0">Booking</div>
                                                                <div class="text-primary" v-else-if="data.schedule_type == 1">Personal Trainer</div>
                                                            </div>
                                                            </Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.name }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.tgl_schedule }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.deptname }}</Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                            <div class="flex items-center justify-center" >
                                                                <div class="text-success" v-if="data.status_booking == 0">Booking</div>
                                                                <div class="text-primary" v-else-if="data.status_booking == 1">Present</div>
                                                                <div class="text-danger" v-else-if="data.status_booking == 2">Absent</div>
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
                    </div>
                </div>
                    
            </Tab.Panel>
        </Tab.Panels>


        <Tab.Panels class="mt-5">
            <Tab.Panel>
                <div class="px-5 pt-5 mt-5 intro-y box">
                    <h2 class="mr-auto text-base font-medium">Display Information</h2>
                    <div class="p-5">
                        <div class="flex flex-col xl:flex-row">
                        <div class="flex-1 mt-6 xl:mt-0">
                            <div class="grid grid-cols-12 gap-x-5">
                                <div class="col-span-12 2xl:col-span-6">
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
                                <div class="col-span-12 2xl:col-span-6">
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

                        
                            </div>
                            <Button variant="primary" type="button" class="w-40 mt-3" @click="changePass"> Change Password </Button>
                        </div>
                        <div class="mx-auto w-52 xl:mr-0 xl:ml-6">
                            <div
                            class="p-5 border-2 border-dashed rounded-md shadow-sm border-slate-200/60 dark:border-darkmode-400"
                            >
                            <div class="relative h-40 mx-auto cursor-pointer image-fit zoom-in">
                                <img
                                class="rounded-md"
                                alt="No Image"
                                :src="baseUrlFoto + (foto || 'user.png')"
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

    <Dialog  size="sm" :open="QrModel"  @close="setQrModel(false)" >
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    My QR Code
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setQrModel(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
        
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <img alt="Midone Tailwind HTML Admin Template"
                    class="w-full"
                    :src="baseUrlQR + qr +'.png'"
                    />
                            
                </div>

            </Dialog.Description>
        
        </Dialog.Panel>
        
    </Dialog>

</template>

<script setup>
    import Api from '../api/Api'
    import listMenu from './Menu.vue'
    import Button from "../base-components/Button"
    import TomSelect from "../base-components/TomSelect"
    import { FormSelect, FormInput, FormInline, FormLabel, InputGroup } from "../base-components/Form"
    import { onMounted, ref, reactive , watch , computed} from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useStore } from "vuex"
    import { TailwindPagination } from 'laravel-vue-pagination';
    import { Tab as HeadlessTab } from "@headlessui/vue";
    import LoadingIcon from "../base-components/LoadingIcon"
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import moment from 'moment'
    import CurrencyInput from "./CurrencyInput.vue";
    import Litepicker from "../base-components/Litepicker"
    import { Menu, Dialog, Tab } from "../base-components/Headless";
    import man from "../assets/images/sabar.png"
    import { useDebounceFn } from '@vueuse/core'
    import "@fullcalendar/core/vdom";
    import FullCalendar from "@fullcalendar/vue3";
    import interactionPlugin from "@fullcalendar/interaction";
    import dayGridPlugin from "@fullcalendar/daygrid";
    import timeGridPlugin from "@fullcalendar/timegrid";
    import listPlugin from "@fullcalendar/list";
    import Tippy from "../base-components/Tippy";
    import { nanoid } from 'nanoid';
    import Preview from "../base-components/Preview";
    import { Carousel, Navigation, Slide } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';

    // carousel settings
    const settings = ref({
        itemsToShow: 2,
        snapAlign: 'start',
    });

    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
        // 700px and up
        700: {
            itemsToShow: 2,
            
        },
        // 1024 and up
        1024: {
            itemsToShow: 7,
            snapAlign: 'start',
            
        },
    });

    const handleClick = (id) => {
        selectedIndexes.value = id
        const token = localStorage.getItem("token_yogafit");
        loading.value=true
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        Api.get("/auth/get_users_schedule?id=" + id)
            .then((response) => {
                listContract.value = response.data.data;
                loading.value=false
            })
            .catch((error) => {
            console.log(error);
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    }
    
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
    const calendarKey = ref("")
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const user = store.getters['auth/currentUser']
    const loading = ref("")
    const loadingsycn = ref("")
    const search = ref("")
    const tgl=ref("")
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const status =ref("")
    const currentSlide = ref(3)
    const searchPT = ref("")
    const source = ref("")
    const oldpass = ref("")
    const newpass = ref("")
    const image = ref("")
    const qr = ref("")
    const id = ref(user.id)
    const email = ref(user.email)
    const name = ref(user.name)
    const foto = ref(user.foto)
    const baseUrlFoto = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const baseUrlQR = ref('https://login.yogafitidonline.com/api/storage/qrcode/')
    const studio = ref("")
    
    const rentangTanggal = ref([]);
    const indexNow = ref(30);
    const selectedIndexes=ref(moment().format('YYYY-MM-DD'))
    const listContract=ref({})
    const state = reactive(
        {
            listData:{},
            listDataMembers:{},
            listBooking:{},
            listBooking:{},
            listContract:{},
            totalpa:0
        }
    )

    const showPassword = ref(false);
    const toggleShowPassword = async () => {
        showPassword.value = !showPassword.value;
    };

    const showPasswordConfirm = ref(false);
    const toggleShowPasswordConfirm = async () => {
        showPasswordConfirm.value = !showPasswordConfirm.value;
    };

    const MemberModal = ref(false);
    const setMemberModal = (value) => {
        MemberModal.value = value
        if (MemberModal.value ==false) {
            document.body.style.overflow = 'none';
            status.data.idschedule =''
            status.data.status =''
        }
    };

    const QrModel = ref(false);
    const setQrModel = (value) => {
        QrModel.value = value
        if (QrModel.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const booking = async (id, tgl, type_book) => {
        if (tgl < moment().format('YYYY-MM-DD')) {
            pesan.value =  'Class Is No Longer Available'
            setWarningModalPreview(true)
            return false;
        }

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        await Api.post('/member/booking_class', {
            id : id,
            type : type_book
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Booking Class"
            generateRentangTanggal()
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }


    const tampilData = async () => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/member/my_booking')
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


    const tampilContract = async () => {
    
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/member/my_contract')
        .then(response => {
            state.listContract = response.data.data
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

    const tampilBooking = async () => {

        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/member/my_booking_history')
        .then(response => {
            state.listBooking = response.data.data
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

    const showQR = async (id) => {
        QrModel.value=true
        qr.value=id

    }

    const generateRentangTanggal =  (rentang) => {


        const tanggalSekarang = new Date();
        const tanggalAwal = new Date(tanggalSekarang);
        tanggalAwal.setDate(1); // Set ke hari pertama bulan ini

        const tanggalAkhir = new Date(tanggalSekarang);
        tanggalAkhir.setMonth(tanggalAkhir.getMonth() + 2);
        tanggalAkhir.setDate(0); // Set ke hari terakhir bulan dua bulan ke depan

        const arrayTanggal = [];

        // Menghasilkan semua tanggal dalam rentang
        while (tanggalAwal <= tanggalAkhir) {
            arrayTanggal.push(tanggalAwal.toISOString().split('T')[0]);
            tanggalAwal.setDate(tanggalAwal.getDate() + 1);
        }

        const currentDateIndex = arrayTanggal.findIndex((date) => {
            const currentDate = new Date();
            return moment(date).isSame(currentDate, 'day');
        });

        rentangTanggal.value = arrayTanggal;
        indexNow.value = currentDateIndex

        

        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        Api.get("/auth/get_users_schedule?id=" + moment().format('YYYY-MM-DD'))
            .then((response) => {
                listContract.value = response.data.data;
                loading.value=false
            })
            .catch((error) => {
            console.log(error);
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    };

    onMounted(async() => {
        await tampilContract()
        await tampilData()
        await tampilBooking()
        generateRentangTanggal()
    })

    

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

    const changePass = async () => {
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



</script>

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
