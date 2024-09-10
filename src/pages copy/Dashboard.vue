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
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home Pages</RouterLink>
                
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
                                startDate:new  moment().startOf('month').format('YYYY-MM-DD'),
                                endDate: new  moment().endOf('month').format('YYYY-MM-DD'), 
                                }" class="block w-56 mx-auto" />

                        <Button variant="primary" class="mr-2 shadow-md" @click="add" v-if="user.roles[0].name=='salesConsultant'">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" />
                            </span>
                        </Button>

                        <Button variant="primary" class="mr-2 shadow-md" @click="upload">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Upload" class="w-4 h-4" />
                            </span>
                        </Button>
                    
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-12 2xl:col-span-12 pt-10"> 
            <div class="grid grid-cols-12 gap-6" v-if="user.roles[0].name=='salesConsultant'">
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
                            <div class="text-lg font-medium truncate text-white"> Prospect</div>
                            <div class="mt-1 text-white">{{ prospect }} Leads</div>
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

            <div class="grid grid-cols-12 gap-6" v-else>
                <div class="col-span-12 sm:col-span-4 xl:col-span-4  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <Table>
                            <Table.Thead  class="bg-primary text-white">
                                <Table.Tr class="intro-x">
                                    <Table.Th colspan="3" class="border-b-0 whitespace-nowrap text-center">
                                        SUMMARY STATUS LEADS
                                    </Table.Th>
                                </Table.Tr>
                                <Table.Tr class="intro-x">
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        STATUS
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        TOTAL
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr class="intro-x">
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-orange-400 text-center">
                                            NEED FOLLOWUP
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        <a class="text-success" href="#" @click="need(tanggal)">
                                            {{ needfu }}
                                        </a>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr class="intro-x">
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-yellow-400 text-center">
                                            PROCESS
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center">
                                        <a class="text-success" href="#" @click="pro(tanggal)">
                                            {{ proses }}
                                        </a>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr class="intro-x">
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-green-400 text-center">
                                            PROSPECT
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center">
                                        <a class="text-success" href="#" @click="mem(tanggal)">
                                            {{ prospect }}
                                        </a>
                                    </Table.Td>
                                </Table.Tr>

                                <Table.Tr class="intro-x">
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-danger text-center">
                                            LOSS
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center">
                                        <a class="text-success" href="#" @click="los(tanggal)">
                                            {{ loss }}
                                        </a>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr class="intro-x">
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary text-center">
                                            TOTAL
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center">
                                        <a class="text-success" href="#" @click="tot(tanggal)">
                                            {{ total }}
                                        </a>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-4 xl:col-span-4  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <div class="max-h-80 overflow-y-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th colspan="3" class="border-b-0 whitespace-nowrap text-center">
                                            SUMMARY SOURCE LEADS
                                        </Table.Th>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            STATUS
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            TOTAL
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr v-if="state.source.length==0" class="intro-x">
                                        <Table.Td colspan="2" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="item in state.source" :key="item.id" >
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-teal-500 text-center">
                                                {{ item.source }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="need(tanggal)">
                                                {{ item.total }}
                                            </a>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-4 xl:col-span-4  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <div class="max-h-80 overflow-y-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th colspan="3" class="border-b-0 whitespace-nowrap text-center">
                                            SUMMARY CATEGORY LEADS
                                        </Table.Th>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            STATUS
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            TOTAL
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr v-if="state.category.length==0" class="intro-x">
                                        <Table.Td colspan="2" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="item in state.category" :key="item.id" >
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-teal-500 text-center">
                                                {{ item.remarks }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="need(tanggal)">
                                                {{ item.total }}
                                            </a>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <div class="overflow-x-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th colspan="7" class="border-b-0 whitespace-nowrap text-center">
                                            SUMMARY LEADS BY SALES
                                        </Table.Th>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            NO
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            SALES NAME
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            NEED FU
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            PROCESS
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            PROSPECT
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            LOSS
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            TOTAL
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                            
                                    <Table.Tr v-if="state.listData.total==0" class="intro-x">
                                        <Table.Td colspan="7" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
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
                                            {{ data.create_name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.need }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.process }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.prospect }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.loss }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.total }}
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
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

    <Dialog  size="sm" :open="uploadModal"  @close="setuploadModal(false)" >
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    Import CRM
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setuploadModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1"> Upload File Excel </FormLabel>
                        <FormInput type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
                    </FormInline>
                </div>

            </Dialog.Description>
            <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                <Button type="button" variant="outline-secondary" @click="setuploadModal(false)" class="w-20 mr-1">
                    Cancel
                </Button>
                <Button variant="primary" type="button" class="w-20" @click="saveUpload">
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
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const source = ref("")
    const file = ref("")
    const show = ref(20)
    const total = ref(0)
    const needfu = ref(0)
    const proses = ref(0)
    const loss = ref(0)
    const prospect = ref(0)
    const state = reactive(
        {
            listSource:{},
            source:{},
            category:{},
            listData:{},
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


    const uploadModal = ref(false);
    const setuploadModal = (value) => {
        uploadModal.value = value
        if (uploadModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };


    const tampilData = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Proccesing Get Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'  || user.roles[0].name=='salesLeader' || user.roles[0].name=='salesManager') {
            await Api.get('/admin/crmSummary?tgl=' +  tanggal.value)
            .then(response => {
                state.listSource = response.data.data
                total.value = response.data.total
                needfu.value = response.data.needfu
                proses.value = response.data.proses
                loss.value = response.data.loss
                prospect.value = response.data.prospect
                state.source = response.data.source
                state.category = response.data.category
                state.listData = response.data.pic
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
        } else {
            await Api.get('/admin/crmSummary?tgl=' +  tanggal.value)
            .then(response => {
                state.listSource = response.data.data
                total.value = response.data.total
                needfu.value = response.data.needfu
                proses.value = response.data.proses
                loss.value = response.data.loss
                prospect.value = response.data.prospect
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
        
    }

    const upload = async () => {
        uploadModal.value = true
    }

    const handleFileUpload = (e) => {
        file.value = e.target.files[0];
    };

    const saveUpload = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Import CRM"
        const formData = new FormData();
        formData.append('file', file.value);
        await Api.post('/admin/import', formData)
        .then(async (response) => {
            loadingsycn.value = false
            tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Data Sukses Di Import"
            loadingsycn.value = false
            basicModalPreview.value = false
            uploadModal.value = false
            
        }).catch(error => {
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString() + ' Pastikan File yang di upload bener ya format nya'
            setWarningModalPreview(true)
        })
    }


    const tot = async (tanggal) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        params : {
                startDate : startDate,
                endDate : endDate,
                status :'total'
            }
        })
    }

    const need = async (tanggal) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        params : {
                startDate : startDate,
                endDate : endDate,
                status :0
            }
        })
    }

    const pro = async (tanggal) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        params : {
                startDate : startDate,
                endDate : endDate,
                status :1
            }
        })
    }

    const mem = async (tanggal) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        params : {
                startDate : startDate,
                endDate : endDate,
                status :2
            }
        })
    }

    const los = async (tanggal) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        params : {
                startDate : startDate,
                endDate : endDate,
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
        if (user.roles[0].name=='studio') {
            router.push({ name: "Studio_CheckIn" });
        }else if(user.roles[0].name=='teacher'){
            router.push({ name: "Dashboard_Teacher" });
        }else if(user.roles[0].name=='member'){
            router.push({ name: "Dashboard_Member" });
        }else{
            await tampilData()
        }
    
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

