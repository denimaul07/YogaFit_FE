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
                Contact Details
            </div>
            <div class="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div class="flex items-center truncate sm:whitespace-normal">
                <Lucide icon="Mail" class="w-4 h-4 mr-2" />
                {{ user.email }}
                </div>
                <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> 
                {{ user.no_telp }}
                </div>
                <!-- <div class="flex items-center mt-3 truncate sm:whitespace-normal">
                <Lucide icon="Twitter" class="w-4 h-4 mr-2" /> Twitter
                {{ user.roles[0].name }}
                </div> -->
            </div>
        </div>
        <div class="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
            <div class="w-40 py-3 text-center rounded-md">
                <div class="text-xl font-medium text-primary">{{ state.totalpa }}</div>
                <div class="text-slate-500">Personal Trainer Members</div>
            </div>
            <!-- <div class="w-20 py-3 text-center rounded-md">
                <div class="text-xl font-medium text-primary">1k</div>
                <div class="text-slate-500">Purchases</div>
            </div>
            <div class="w-20 py-3 text-center rounded-md">
                <div class="text-xl font-medium text-primary">492</div>
                <div class="text-slate-500">Reviews</div>
            </div> -->
            </div>
        </div>

        <Tab.List variant="link-tabs" class="flex-col justify-center text-center sm:flex-row lg:justify-start">
            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> My Schedule
                </Tab.Button>
            </Tab>
            <Tab :fullWidth="false">
                <Tab.Button class="flex items-center py-4 cursor-pointer">
                    <Lucide icon="Users" class="w-4 h-4 mr-2" /> PT Schedule
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
                <div class="col-span-12 intro-y box lg:col-span-6">

                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-2"> 
                            <div class="p-5">
                                <div class="full-calendar">
                                
                                    <FullCalendar :key="calendarKey" :options="optionsCalendar" />
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-10"> 
                            <div class="p-5">
                                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                    <div class="items-center sm:flex sm:mr-4">
                                        <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                            Filter
                                        </label>
                                        <FormSelect v-model="status" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                                            <option value="">All Type</option>
                                            <option value="0">Booking</option>
                                            <option value="1">Personal Trainer</option>
                                        </FormSelect>
                                        <Litepicker v-model="tgl" :options="{
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

                                <div class="col-span-12 overflow-auto pt-5 intro-y lg:overflow-visible hidden sm:block">
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
                                                    Members Booking
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Members Present
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Members Absent
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
                                            <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id" >
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
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    <Tippy as="div"  content="View Members">
                                                        <a class="items-center text-primary" href="#" @click="view(data.idschedule, 0)">
                                                            {{ data.total }} Members
                                                        </a>
                                                    </Tippy>
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    <Tippy as="div"  content="View Members">
                                                        <a class="items-center text-primary" href="#" @click="view(data.idschedule, 1)">
                                                            {{ data.present }} Members
                                                        </a>
                                                    </Tippy>
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    <Tippy as="div"  content="View Members">
                                                        <a class="items-center text-primary" href="#" @click="view(data.idschedule, 2)">
                                                            {{ data.absent }} Members
                                                        </a>
                                                    </Tippy>
                                                </Table.Td>
                                            </Table.Tr>
                                        </Table.Tbody>
                                    </Table>
                                </div>

                                <div class="col-span-12 lg:col-span-12 2xl:col-span-12 block sm:hidden">
                                    <div class="grid grid-cols-12 gap-5">
                                        <div v-if="loading" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="mt-5 text-slate-600 dark:text-slate-500">
                                                        <div class="text-center">
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="state.listData.total==0" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="text-slate-600 dark:text-slate-500">
                                                        <div class="text-center">
                                                            Tidak Ada Data
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(data, index) in state.listData.data" :key="data.id" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="mt-5 text-slate-600 dark:text-slate-500">
                                                        <div class="flex items-center">
                                                            <Lucide icon="List" class="w-4 h-4 mr-2" /> Class: {{ data.class_name }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="User" class="w-4 h-4 mr-2" /> Teacher : {{ data.name }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="User" class="w-4 h-4 mr-2" /> Studio : {{ data.deptname }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Date : {{ data.tgl_schedule }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Clock" class="w-4 h-4 mr-2" /> Time : {{ data.start_time }} 
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Airplay" class="w-4 h-4 mr-2" /> Type Schedule : <div
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
                                                        <div class="flex items-center mt-2" @click="view(data.idschedule, 0)">
                                                            <Lucide icon="Users" class="w-4 h-4 mr-2" /> Members Booking : {{ data.total }} Members
                                                        </div>
                                                        <div class="flex items-center mt-2" @click="view(data.idschedule, 1)">
                                                            <Lucide icon="UserCheck" class="w-4 h-4 mr-2" /> Members Present : {{ data.present }} Members
                                                        </div>
                                                        <div class="flex items-center mt-2" @click="view(data.idschedule, 2)">
                                                            <Lucide icon="UserX" class="w-4 h-4 mr-2" /> Members Absent : {{ data.absent }} Members
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                                <div class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                                            
                                                    
                                                
                                                </div>
                                            </div>
                                        </div>
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
            </Tab.Panel>
        </Tab.Panels>

        <Tab.Panels class="mt-5">
            <Tab.Panel>
                <div class="col-span-12 intro-y box lg:col-span-6">

                    <div class="grid grid-cols-12 gap-6">

                        <div class="col-span-12 md:col-span-12 2xl:col-span-12 "> 
                            <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-2"> 
                                <div class="p-5">
                                    <div class="full-calendar">
                                    
                                        <FullCalendar :key="calendarKeyPT" :options="optionsCalendarPT" />
                                    </div>
                                </div>
                            </div>
                            <div class="p-5">
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
                                            v-model="searchPT"
                                            />
                                            <Lucide
                                            icon="Search"
                                            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                            />
                                        </div>
                                        
                                        
                                    </div>
                                </div>

                                
                                <div class="col-span-12 overflow-auto pt-5 intro-y lg:overflow-visible hidden sm:block">
                                    <Table>
                                        <Table.Thead  class="bg-primary text-white">
                                            <Table.Tr class="intro-x">
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    No
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Name
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Email
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    No Telp
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Studio
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Join Members
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    End Members
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Session Used
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Session Left
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
                                            <Table.Tr v-if="state.listDataMembers.total==0" class="intro-x">
                                                <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                    <div class="flex flex-col items-center justify-end col-span-12">
                                                        <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr class="intro-x" v-for="(data, index) in state.listDataMembers.data" :key="data.id" >
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                    <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                        {{ state.listDataMembers.from + index }}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.name }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.email }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.no_telp }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.deptname }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.start_date }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.end_date }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.sessios_used }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.sessios_left-data.sessios_used }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                    <div class="flex items-center justify-center">
                                                        <Tippy as="div"  content="Add Session">
                                                            <a class="flex items-center text-success" href="#" @click="addSchedule(data.id)">
                                                                <Lucide icon="Check" class="w-4 h-4 mr-5" /> 
                                                            </a>
                                                        </Tippy>
                                                    </div>
                                                </Table.Td>
                    
                                            </Table.Tr>
                                        </Table.Tbody>
                                    </Table>
                                </div>

                                <div class="col-span-12 lg:col-span-12 2xl:col-span-12 block sm:hidden">
                                    <div class="grid grid-cols-12 gap-5">
                                        <div v-if="loading" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="mt-5 text-slate-600 dark:text-slate-500">
                                                        <div class="text-center">
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                                            </div>
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="state.listDataMembers.total==0" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="text-slate-600 dark:text-slate-500">
                                                        <div class="text-center">
                                                            Tidak Ada Data
                                                        </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-for="(data, index) in state.listDataMembers.data" :key="data.id" class="col-span-12 intro-y">
                                            <div class="box">
                                                <div class="p-5">
                                                    <div class="mt-5 text-slate-600 dark:text-slate-500">
                                                        <div class="flex items-center">
                                                            <Lucide icon="List" class="w-4 h-4 mr-2" /> Name: {{ data.name }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="User" class="w-4 h-4 mr-2" /> Email : {{ data.email }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="User" class="w-4 h-4 mr-2" /> No Telp : {{ data.no_telp }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Studio : {{ data.deptname }}
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Clock" class="w-4 h-4 mr-2" /> Join Member : {{ data.start_date }} 
                                                        </div>
                                                        <div class="flex items-center mt-2">
                                                            <Lucide icon="Clock" class="w-4 h-4 mr-2" /> End Member : {{ data.end_date }} 
                                                        </div>
                                                    
                                                    
                                                    </div>
                                                </div>
                                                <div class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                                                    <Tippy as="div"  content="Tambah Jadwal">
                                                        <a class="flex items-center text-success" href="#" @click="addSchedule(data.id)">
                                                            <Lucide icon="Check" class="w-4 h-4 mr-1" /> 
                                                        </a>
                                                    </Tippy>
                                                    
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                                    <div class="items-center sm:flex sm:mr-4">
                                        <TailwindPagination :limit="1" :data="state.listDataMembers" @pagination-change-page="tampilPA"/>
                                    </div>

                                    <div class="hidden mx-auto md:block text-slate-500">
                                        Showing {{ state.listDataMembers.from }} to {{ state.listDataMembers.to }} of {{ state.listDataMembers.total }} entries
                                    </div>

                                    <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                        <div class="relative w-56 text-slate-500">
                                            <FormInput
                                            type="text"
                                            class="w-56 pr-10 !box"
                                            placeholder="Search..."
                                            v-model="searchPT"
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

    <Dialog  size="large" :open="MemberModal"  @close="setMemberModal(false)" >
    
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    List Members Attendance
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setMemberModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
        
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
            
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
                                v-model="searchMembers"
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
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        Phone Number
                                    </Table.Th>
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
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ data.no_telp }}
                                    </Table.Td>
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
                            
                </div>

            </Dialog.Description>
        
        </Dialog.Panel>
        
    </Dialog>

    <Dialog  :open="modalSchedule"  @close="setmodalSchedule(false)" >
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    Add New Schedule 
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setmodalSchedule(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">

                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Date</FormLabel>
                        <div class="relative w-full">
                                <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker v-model="state.data.start_date"
                                    :options="{
                                    autoApply: true,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                        minYear: 1960,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                    },
                                    // startDate: formattedMinDate // Atur tanggal default di sini
                                    }"
                                    class="pl-12" />
                        </div>
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Start Time</FormLabel>
                        <TimePicker  v-model:value="state.data.start_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                    </FormInline>


                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Duration</FormLabel>
                        <TomSelect v-model="durasi"  class="w-full">
                            <option value="45">45 Minutes</option>
                            <option value="60">60 Minutes</option>
                        </TomSelect>
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                        <TomSelect v-model="state.data.studio"  class="w-full">
                            <option value="">Select Studio</option>
                            <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
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

    <Dialog  :open="AddModal"  @close="setAddModal(false)" >
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    Add New Schedule 
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">

                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <FormInline class="mt-2">
                    
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Member</FormLabel>
                        <TomSelect class="w-full"  id="modal-form-6"  v-model="state.data.id">
                            <option value="">Select Members</option>
                            <option v-for="item in state.listMember" :key="item.idcontract" :value="item.idcontract">
                                {{ item.name }}
                            </option>
                        </TomSelect>
                    </FormInline>
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Date</FormLabel>
                        <div class="relative w-full">
                                <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                    <Lucide icon="Calendar" class="w-4 h-4" />
                                </div>
                                <Litepicker v-model="state.data.start_date"
                                    :options="{
                                    autoApply: true,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                        minYear: 1960,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                    },
                                    // startDate: formattedMinDate // Atur tanggal default di sini
                                    }"
                                    class="pl-12" />
                        </div>
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Start Time</FormLabel>
                        <TimePicker  v-model:value="state.data.start_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                    </FormInline>


                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Durasi</FormLabel>
                        <TomSelect v-model="durasi"  class="w-full">
                            <option value="45">45 Menit</option>
                            <option value="60">60 Menit</option>
                        </TomSelect>
                    </FormInline>


                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                        <TomSelect v-model="state.data.studio"  class="w-full">
                            <option value="">Select Studio</option>
                            <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
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

    <Dialog  size="large" :open="AddModalPT"  @close="setAddModalPT(false)" >
    
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    List Schedule PT
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModalPT(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
        
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
                                    <div class="flex items-center justify-center" >
                                        <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                        <div class="text-warning" v-if="data.approve_booking_pt == 0">Menunggu Approve</div>
                                        <div class="text-success" v-else-if="data.approve_booking_pt == 1">Approve</div>
                                    </div>
                                    </Table.Td>
                                
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </div>
                            
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
    import { TimePicker } from 'ant-design-vue';
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
    const calendarKeyPT = ref("")
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const user = store.getters['auth/currentUser']
    const loading = ref("")
    const loadingsycn = ref("")
    const search = ref("")
    const tgl=ref(moment().format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const status =ref("")
    const searchMembers = ref("")
    const searchPT = ref("")
    const oldpass = ref("")
    const newpass = ref("")
    const image = ref("")
    const id = ref(user.id)
    const durasi=ref(45)
    const email = ref(user.email)
    const name = ref(user.name)
    const foto = ref(user.foto)
    const baseUrlFoto = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const studio = ref("")
    const state = reactive(
        {
            listData:{},
            listDataMembers:{},
            listBooking:{},
            listBookingPT:{},
            listMember:{},
            totalpa:0,
            listStudio:{},
            data:{
                id:"",
                start_date:"",
                contract:"",
                end_date:"",
                studio:"",
                start_time:"",
                end_time:""
            }
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

    const AddModalPT = ref(false);
    const setAddModalPT = (value) => {
        AddModalPT.value = value
        if (AddModalPT.value ==false) {
            document.body.style.overflow = 'none';
            status.data.idschedule =''
            status.data.status =''
        }
    };

    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
            status.data.idschedule =''
            status.data.status =''
        }
    };

    const modalSchedule = ref(false);
    const setmodalSchedule = (value) => {
        modalSchedule.value = value
        if (modalSchedule.value ==false) {
            document.body.style.overflow = 'none';
            status.data.idschedule =''
            status.data.status =''
        }
    };

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
            
            state.data.start_date = info.dateStr
            const tanggal =  moment(state.data.start_date).format("YYYY-MM-DD")
            loading.value = true
            const token = localStorage.getItem('token_yogafit')
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get('/teacher/bookingTeacher?tanggal=' + tanggal)
            .then(response => {
                state.listBookingPT = response.data.data
                loading.value = false
                AddModalPT.value = true
            }).catch(error => {
                
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        
        },
        eventClick: function(event) {

            state.data.start_date = event.event.start
            const tanggal =  moment(state.data.start_date).format("YYYY-MM-DD")
            loading.value = true
            const token = localStorage.getItem('token_yogafit')
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get('/teacher/bookingTeacher?tanggal=' + tanggal)
            .then(response => {
                state.listBookingPT = response.data.data
                loading.value = false
                AddModalPT.value = true
            }).catch(error => {
                
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

    const optionsCalendarPT = {
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
            
            state.data.start_date = info.dateStr
            const tanggal =  moment(state.data.start_date).format("YYYY-MM-DD")
            loading.value = true
            const token = localStorage.getItem('token_yogafit')
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get('/teacher/bookingTeacherPT?tanggal=' + tanggal)
            .then(response => {
                state.listBookingPT = response.data.data
                loading.value = false
                AddModalPT.value = true
            }).catch(error => {
                
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        
        },
        eventClick: function(event) {

            state.data.start_date = event.event.start
            const tanggal =  moment(state.data.start_date).format("YYYY-MM-DD")
            loading.value = true
            const token = localStorage.getItem('token_yogafit')
            Api.defaults.headers.common['Authorization'] = "Bearer " +token
            Api.get('/teacher/bookingTeacherPT?tanggal=' + tanggal)
            .then(response => {
                state.listBookingPT = response.data.data
                loading.value = false
                AddModalPT.value = true
            }).catch(error => {
                
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

    const tampilSchedule = async ()=>{
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/teacher/get_schedule')
        .then(async response => {

            optionsCalendar.events = response.data.data
            calendarKey.value = nanoid(20)
            
            await Api.get('/teacher/get_schedule_PT')
            .then(responses => {

                optionsCalendarPT.events = responses.data.data
                calendarKeyPT.value = nanoid(20)
                // console.log(newData);
                loading.value = false
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

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        await Api.get('/teacher/department')
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

    const tampilData = async (page=state.listData.current_page) => {
        // const tanggal =  moment(tgl.value).format("YYYY-MM-DD")
        // loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/teacher/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value)
        .then(response => {
            state.listData = response.data.data
            // loading.value = false
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

        await Api.get('/teacher/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value)
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

    const tampilPA = async (page=1)=>{
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/teacher/get_pa?page=' + page+ '&q=' + searchPT.value)
        .then(response => {
            state.listDataMembers = response.data.data
            state.totalpa = response.data.total
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

    const tampilMember = async ()=>{

        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/teacher/get_contract')
        .then(async response => {
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
    }

    const view = async(id, status) => {
        state.data.idschedule=id
        state.data.status=status
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/teacher/member_booking', {
            params: {
                id : id,
                status : status
            } 
        })
        .then(response => {
            state.listBooking = response.data.data
            MemberModal.value = true
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

    const addSchedule = (id) => {
        modalSchedule.value = true
        state.data.id = id
    }

    const save = async () => {

        let start = moment(state.data.start_time, 'HH:mm');
        // Durasi yang akan ditambahkan (dalam menit)
        let addedDuration = moment.duration(durasi.value, 'minutes');
        // Tambahkan durasi ke waktu mulai
        let newTime = start.add(addedDuration);
        // Format waktu hasil penambahan durasi
        let formattedTime = newTime.format('HH:mm');



        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.post('/teacher/bookingTeacher', {

            id : state.data.id,
            id_teacher : user.id,
            studio : state.data.studio,
            start_time : state.data.start_time,
            end_time : formattedTime,
            tanggal : state.data.start_date,
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Add Schedule"
            modalSchedule.value = false
            AddModal.value=false
            tampilData()
            tampilSchedule()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
            

    }

    onMounted(async() => {
        await tampilMember()
        await tampilSchedule()
        await tampilData()
        
        await tampilPA()
        await tampilDepartement()

    })

    
    watch(studio, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(status, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(tgl, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
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

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

    watch(searchMembers, (newQuestion, oldQuestion) => {
        searchingMembers()
    })

    const searchingMembers = useDebounceFn(() => {
        loading.value= false
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.get('/teacher/member_booking?id=' + state.data.idschedule+ '&q=' + searchMembers.value + '&status=' + state.data.status)
        .then(response => {
            state.listBooking = response.data.data
            MemberModal.value = true
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

    const filterOption = (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    watch(searchPT, (newQuestion, oldQuestion) => {
        searchingPT()
    })

    const searchingPT = useDebounceFn(() => {
        loading.value= false
        tampilPA()
    }, 500)

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
