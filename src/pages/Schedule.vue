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


    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                <RouterLink :to="{ name: 'schedule' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Schedule</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Schedule Class</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
                <div class="items-center sm:flex">
                    <div class="items-center sm:flex sm:mr-4">
                        <Button variant="primary" class="mr-2 shadow-md" @click="add">
                            <span class="flex items-center justify-center w-40 h-5">
                                <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Add New Schedule
                            </span>
                        </Button>
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-10"> 
            <div class="p-5 box">
                <div class="full-calendar">
                
                    <FullCalendar :key="calendarKey" :options="optionsCalendar" />
                </div>
            </div>
        </div>

        <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-10"> 
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
                        <!-- <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" class="w-4 h-4 me-5" />
                        </div> -->
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

                    <FormSelect v-model="teacher"  class="w-full">
                        <option value="">Select Teacher</option>
                        <option v-for="item in state.listTeacher" :key="item.id" :value="item.id">{{item.name}}</option>
                    </FormSelect>

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
                                Members Booking
                            </Table.Th>
                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                Members Present
                            </Table.Th>
                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                Members Absent
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
                        <Table.Tr v-else-if="state.listData.total==0" class="intro-x">
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
                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                <div class="flex items-center justify-center">
                                    <Tippy as="div"  content="View and Edit Schedule">
                                        <a class="flex items-center text-success" href="#" @click="edit(data.idschedule)">
                                            <Lucide icon="Eye" class="w-4 h-4 mr-5" /> 
                                        </a>
                                    </Tippy>

                                    <Tippy as="div"  content="Delete">
                                        <a class="flex items-center text-danger" href="#" @click="hapus(data.idschedule)">
                                            <Lucide icon="Trash" class="w-4 h-4 mr-1" /> 
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

    <Dialog  size="large" :open="AddModal"  @close="setAddModal(false)" >
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Add New Schedule 
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                        <!-- <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Schedule Type *</FormLabel>
                                <TomSelect v-model="state.data.type" class="w-full">
                                    <option value="">Select Shedule Type</option>
                                    <option value="0">Booking</option>
                                    <option value="1">Personal Trainer</option>
                                </TomSelect>
                            </FormInline>
                        </div> -->

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Class</FormLabel>
                                <TomSelect v-model="state.data.id_class"  class="w-full">
                                    <option value="">Select Class</option>
                                    <option v-for="item in state.listClass" :key="item.id" :value="item.id">{{item.class_name}}</option>
                                </TomSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Date</FormLabel>
                                <div class="relative w-full">
                                        <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                            <Lucide icon="Calendar" class="w-4 h-4" />
                                        </div>
                                        <Litepicker v-model="state.data.tgl"
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
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Teacher</FormLabel>
                                <TomSelect v-model="state.data.id_teacher"  class="w-full">
                                    <option value="">Select Teacher</option>
                                    <option v-for="item in state.listTeacher" :key="item.id" :value="item.id">{{item.name}}</option>
                                </TomSelect>
                            </FormInline>
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Start Time</FormLabel>
                                <TimePicker  v-model:value="state.data.start_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                            </FormInline>
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                                <TomSelect v-model="state.data.id_studio"  class="w-full">
                                    <option value="">Select Studio</option>
                                    <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                </TomSelect>
                            </FormInline>

                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> End Time</FormLabel>
                                <TimePicker  v-model:value="state.data.end_time" valueFormat="HH:mm"  size="large" class="w-full"/>
                            </FormInline>
                        </div>

                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <Preview class="intro-y box">
                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                    <h2 class="mr-auto text-base font-medium">List Schedule</h2>
                                </div>

                                <div class="p-5">
                                    <Preview.Panel>
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
                                                <FormSelect v-model="studio"  class="w-full">
                                                    <option value="">Select Studio</option>
                                                    <option v-for="item in state.listStudio" :key="item.id" :value="item.id">{{item.deptname}}</option>
                                                </FormSelect>
                                                <div class="relative w-full">
                                                    <!-- <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                        <Lucide icon="Calendar" class="w-4 h-4" />
                                                    </div> -->
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
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.class_name }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.name }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.deptname }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            {{ data.tgl_schedule }}
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
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
                                    </Preview.Panel>
                                </div>
                            </Preview>
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
                
                </DialogPanel>
            </div>
        </div>
    </Dialog>

    <Dialog :open="deleteModalPreview" @close="setDeleteModalPreview(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Are You Sure ?</div>
                <div class="mt-2 text-slate-500">
                    Do you really want to delete this data? <br />
                    This process cannot be reversed if it has been deleted.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setDeleteModalPreview(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="hapusSchedule">
                    Delete
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog  size="large" :open="MemberModal"  @close="setMemberModal(false)" >
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
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
                
                </DialogPanel>
            </div>
        </div>
    </Dialog>

    
</template>

<script setup>
    import Api from '../api/Api'
    import listMenu from './Menu.vue'
    import Button from "../base-components/Button"
    import TomSelect from "../base-components/TomSelect"
    import { FormSelect, FormInput, FormInline, FormLabel } from "../base-components/Form"
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

    // Now you can use nanoid function
    const calendarKey = ref("")

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

    const deleteModalPreview = ref(false);
    const setDeleteModalPreview = (value) => {
        deleteModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (deleteModalPreview.value ==false) {
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
    const status = ref("")
    const studio = ref("")
    const teacher =ref("")
    const loadingsycn = ref("")
    const search = ref("")
    const tgl=ref("")
    const pesan = ref("")
    const action =ref("Add New")
    const searchMembers = ref("");
    const state = reactive(
        {
            listData:{},
            listClass:{},
            listTeacher:{},
            listStudio:{},
            listBooking:{},
            datas:{},
            data:{
                id:"",
                tgl:"",
                type:"",
                id_class:"",
                id_teacher:"",
                id_studio:"",
                start_time:"00:00",
                end_time:"00:00",
                idschedule:"",
                status:""

            }
        }
    )

    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
            state.data.id = ''
            state.data.id_class=''
            state.data.type=''
            state.data.id_teacher=''
            state.data.id_studio=''
            state.data.start_time='00:00'
            state.data.end_time='00:00'
            state.data.tgl=''
            action.value='Add New'
            
        }
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
    };

    const add = () =>{
        AddModal.value=true
        action.value='Add New'
    }

    const tampilData = async (page=state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value+ '&teacher=' + teacher.value)
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

            if (state.listData.last_page < 1 || state.listData.last_page === undefined || page > state.listData.last_page) {
               page = 1
            }

            await Api.get('/admin/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value+ '&teacher=' + teacher.value)
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
        }else{
            await Api.get('/sales/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value+ '&teacher=' + teacher.value)
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

            if (state.listData.last_page < 1 || state.listData.last_page === undefined || page > state.listData.last_page) {
               page = 1
            }

            await Api.get('/sales/schedule?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl.value+ '&teacher=' + teacher.value)
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

        
    }

    const tampilSchedule = async ()=>{
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/get_schedule')
            .then(response => {

                optionsCalendar.events = response.data.data
                calendarKey.value = nanoid(20)
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
        }else{
            await Api.get('/sales/get_schedule')
            .then(response => {

                optionsCalendar.events = response.data.data
                calendarKey.value = nanoid(20)
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
        }
    

    }

    const edit = async (id) => {
        action.value='Update'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/schedule', {
                params: {
                    id : id
                } 
            })
            .then(response => {
                state.datas = response.data.data
                state.data.id = state.datas[0].id
                state.data.id_class=state.datas[0].id_class.toString()
                state.data.type=state.datas[0].schedule_type.toString()
                state.data.id_teacher=state.datas[0].id_teacher.toString()
                state.data.id_studio=state.datas[0].id_studio.toString()
                state.data.start_time=state.datas[0].start_time
                state.data.end_time=state.datas[0].end_time
                state.data.tgl=state.datas[0].tgl_schedule
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
        }else{
            await Api.get('/sales/schedule', {
                params: {
                    id : id
                } 
            })
            .then(response => {
                state.datas = response.data.data
                state.data.id = state.datas[0].id
                state.data.id_class=state.datas[0].id_class.toString()
                state.data.type=state.datas[0].schedule_type.toString()
                state.data.id_teacher=state.datas[0].id_teacher.toString()
                state.data.id_studio=state.datas[0].id_studio.toString()
                state.data.start_time=state.datas[0].start_time
                state.data.end_time=state.datas[0].end_time
                state.data.tgl=state.datas[0].tgl_schedule
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
    
    }

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (action.value=='Add New') {
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                await Api.post('/admin/schedule', {
                    schedule_type : 0,
                    id_class : state.data.id_class,
                    id_teacher : state.data.id_teacher,
                    id_studio : state.data.id_studio,
                    start_time : state.data.start_time,
                    end_time : state.data.end_time,
                    tgl_schedule : state.data.tgl,
                }).then(async (response) => {
                    loadingsycn.value = false
                    basicModalPreview.value = false
                    setSuccessModalPreview(true)
                    pesan.value = "Success Add Schedule"
                    AddModal.value = false
                    tampilData()
                    tampilSchedule()
                }).catch(error => {

                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                })
            }else{
                await Api.post('/sales/schedule', {
                    schedule_type : 0,
                    id_class : state.data.id_class,
                    id_teacher : state.data.id_teacher,
                    id_studio : state.data.id_studio,
                    start_time : state.data.start_time,
                    end_time : state.data.end_time,
                    tgl_schedule : state.data.tgl,
                }).then(async (response) => {
                    loadingsycn.value = false
                    basicModalPreview.value = false
                    setSuccessModalPreview(true)
                    pesan.value = "Success Add Schedule"
                    AddModal.value = false
                    tampilData()
                    tampilSchedule()
                }).catch(error => {

                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                })
            }
        
        } else {
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                await Api.put('/admin/schedule', {
                    id : state.data.id,
                    schedule_type : 0,
                    id_class : state.data.id_class,
                    id_teacher : state.data.id_teacher,
                    id_studio : state.data.id_studio,
                    start_time : state.data.start_time,
                    end_time : state.data.end_time,
                    tgl_schedule : state.data.tgl,
                }).then(async (response) => {
                
                    pesan.value = "Success Update Schedule"
                    setSuccessModalPreview(true)
                    loadingsycn.value = false
                    basicModalPreview.value = false
                    AddModal.value = false
                    tampilData()
                    tampilSchedule()
                }).catch(error => {

                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                })
            }else{
                await Api.put('/sales/schedule', {
                    id : state.data.id,
                    schedule_type : 0,
                    id_class : state.data.id_class,
                    id_teacher : state.data.id_teacher,
                    id_studio : state.data.id_studio,
                    start_time : state.data.start_time,
                    end_time : state.data.end_time,
                    tgl_schedule : state.data.tgl,
                }).then(async (response) => {
                
                    pesan.value = "Success Update Schedule"
                    setSuccessModalPreview(true)
                    loadingsycn.value = false
                    basicModalPreview.value = false
                    AddModal.value = false
                    tampilData()
                    tampilSchedule()
                }).catch(error => {

                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                })
            }
        
        }

    }

    const hapus = async (id) => {
        state.data.id = id
        deleteModalPreview.value = true
    }

    const hapusSchedule = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Deleted Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
    
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.delete('/admin/schedule?id=' + state.data.id)
            .then(async (response) => {
            
                pesan.value = "Success Deleted Schedule"
                setSuccessModalPreview(true)
                loadingsycn.value = false
                basicModalPreview.value = false
                deleteModalPreview.value = false
                tampilData()
                tampilSchedule()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.delete('/sales/schedule?id=' + state.data.id)
            .then(async (response) => {
            
                pesan.value = "Success Deleted Schedule"
                setSuccessModalPreview(true)
                loadingsycn.value = false
                basicModalPreview.value = false
                deleteModalPreview.value = false
                tampilData()
                tampilSchedule()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
        
        

    }


    const tampilTeacher = async () => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get("/admin/get_teacher")
            .then((response) => {
                state.listTeacher = response.data.data;
                loading.value = false;
                })
                .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }else{
            await Api.get("/sales/get_teacher")
            .then((response) => {
                state.listTeacher = response.data.data;
                loading.value = false;
                })
                .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }

    };

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/department')
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
        }else{
            await Api.get('/sales/department')
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
    
    }

    const tampilClass = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/get_class')
            .then(response => {
                state.listClass = response.data.data
            }).catch(error => {
                
                if(error.response.data.status_code==403){
                    router.push({name: '403'})
                }else{
                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                }
            })
        }else{
            await Api.get('/sales/get_class')
            .then(response => {
                state.listClass = response.data.data
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
    }

    const view = async(id, status) => {
        state.data.idschedule=id
        state.data.status=status
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/member_booking', {
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
        }else{
            await Api.get('/sales/member_booking', {
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

    }

    onMounted(async() => {
        await tampilData()
        await tampilSchedule()

    
    })

    onBeforeMount(async() => {
    
        await tampilDepartement();
        await tampilClass();
        await tampilTeacher()
        
    });

    watch(status, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })


    watch(studio, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(tgl, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(teacher, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    
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
        Api.get('/sales/member_booking?id=' + state.data.idschedule+ '&q=' + searchMembers.value + '&status=' + state.data.status)
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


</script>

