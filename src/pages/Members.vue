<template>
    <div>
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

        <a-drawer v-model:open="modalFilter" class="custom-class" root-class-name="root-class-name" root-style="blue" style="color: #1e3a8a" title="Filter Data" placement="right">
            <div class="modal-body row g-3">
                <div class="col-12 pb-2">
                    <label for="email_reset" class="form-label">Pilih Status</label>
                
                    <div class="input-group flex-nowrap">
                        <a-select v-model:value="status"  size="large" style="width: 100%"  placeholder="Pilih Status">
                        
                            <a-select-option value="">Semua Status</a-select-option>
                            <a-select-option  value="0" label="Active">Active</a-select-option>
                            <a-select-option value="1" label="Non Active">Non Active</a-select-option>
                            <a-select-option value="2" label="Request Cuti">Request Cuti</a-select-option>
                            <a-select-option value="3" label="Cuti">Cuti</a-select-option>
                            <a-select-option  value="4" label="Trial">Trial</a-select-option>
                        </a-select>
                    </div>
                </div>

                <div class="col-12 pb-2">
                    <label for="email_reset" class="form-label">Pilih  Status PT</label>
                
                    <div class="input-group flex-nowrap">
                        <a-select v-model:value="statusPT"  size="large" style="width: 100%"  placeholder="Pilih Status">
                        
                            <a-select-option value="">Semua Status PT</a-select-option>
                            <a-select-option  value="1" label="Ya">Ya</a-select-option>
                            <a-select-option value="0" label="Tidak">Tidak</a-select-option>
                        </a-select>
                    </div>
                </div>

                <div class="col-12 pb-2">
                    <label for="email_reset" class="form-label">Pilih Studio</label>
                    
                    <div class="input-group flex-nowrap">
                        <a-select v-model:value="filterStudio"  size="large" style="width: 100%"  placeholder="Cari Studio">
                            <a-select-option  v-for="item in state.listDepartementGroup" :key="item"  :value="item" :label="item">{{item}} </a-select-option>
                        </a-select>
                    </div>
                </div>
            </div>

            <template #footer>
                <a-button type="primary" class="bg-primary" @click="modalSubmit()">Apply</a-button>
            </template>
        </a-drawer>

        <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 2xl:col-span-4">
                <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                    <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
                    <RouterLink :to="{ name: 'member' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Members</RouterLink>
                </div>
            
            </div>
            <div class="col-span-12 2xl:col-span-4">
                <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Members</h2>
            </div>
            <div class="col-span-12 2xl:col-span-4 text-right">
                <Button variant="success" class="mr-2 shadow-md" @click="showModal" v-if="user.roles[0].name!='salesConsultant'">
                    <span class="text-white flex items-center justify-center w-20 h-5">
                        <Lucide icon="Filter" class="w-4 h-4 mr-3" /> Filter
                    </span>
                </Button>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-6">

            <div class="col-span-12 2xl:col-span-12 pt-3"> 

                <div class="grid grid-cols-12 gap-6">

                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">

                            <Button variant="primary" class="mr-2 shadow-md" @click="exportExcel">
                                <span class="flex items-center justify-center w-5 h-5">
                                    <Lucide icon="Download" class="w-4 h-4" />
                                </span>
                            </Button>

                            <Button variant="success" class="shadow-md" @click="exportExcelTrial">
                                <span class="flex items-center text-white  justify-center w-20 h-5">
                                    <Lucide icon="Download" class="w-4 h-4 mr-3" />  Trial
                                </span> 
                            </Button> 
                        </div>
                        
                        <div class="hidden mx-auto md:block text-black">
                        
                        </div>

                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div class="relative w-full text-slate-500">
                                <FormInput
                                type="text"
                                class="w-full pr-10 !box"
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
                    
                
                    <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y hidden sm:block">
                        <div class="col-span-12 2xl:col-span-3">
                            <div class="overflow-x-auto">
                                <Table>
                                    <Table.Thead  class="bg-primary text-white">
                                        <Table.Tr class="intro-x">
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center sticky-column">
                                                NO
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center sticky-column1">
                                                STATUS
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                NAME
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                EMAIL
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                PHONE
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                STUDIO
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                IMAGE
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                PERSONAL TRAINING
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                TOTAL CONTRACT
                                            </Table.Th>
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                REFERAL CODE
                                            </Table.Th>
                                        
                                            <Table.Th class="border-b-0 whitespace-nowrap text-center sticky-columnAction">
                                                ACTION
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        <Table.Tr v-if="loading" class="intro-x">
                                            <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                    <LoadingIcon icon="audio" class="w-8 h-8" />
                                                    <div class="mt-2 text-xs text-center">Processing Data</div>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr v-else-if="state.listData.total==0" class="intro-x">
                                            <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id" v-else>
                                            <Table.Td class="sticky-column first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                    {{ state.listData.from + index }}
                                                </div>
                                            </Table.Td>

                                            <Table.Td class="sticky-column1 first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                <div
                                                    :class="[
                                                    'flex items-center justify-center',
                                                        { 'text-success': data.status_users==0 },
                                                        { 'text-danger': data.status_users==1 },
                                                        { 'text-warning': data.status_users==2 },
                                                        { 'text-yellow-300': data.status_users==3 },
                                                        { 'text-orange-400': data.status_users==4 }
                                                    ]"
                                                >
                                                    <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                    <div v-if="data.status_users==0">Active</div>
                                                    <div v-else-if="data.status_users==1">Non Active</div>
                                                    <div v-else-if="data.status_users==2">Request Cuti</div>
                                                    <div v-else-if="data.status_users==3">Cuti</div>
                                                    <div v-else-if="data.status_users==4">Trial</div>
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
                                                <div class="flex">
                                                    <div class="w-10 h-10 image-fit zoom-in">
                                                        <img
                                                        alt="Midone Tailwind HTML Admin Template"
                                                        class="rounded-full"
                                                        :src="baseUrlFoto + (data.foto || 'user.png')"
                                                        />
                                                    </div>
                                                </div>
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                <div class="text-success" v-if="data.personal_trainer_count>0"> YA</div>
                                                <div v-else class="text-warning">TIDAK </div>
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.total }} Contract
                                            </Table.Td>
                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                {{ data.referal_code }}
                                            </Table.Td>
                                        
                                
                                            <Table.Td class="sticky-columnAction first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                <div class="flex items-center justify-center">
                                                    <Tippy as="div"  content="View Detail Member">
                                                        <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                                            <Lucide icon="Eye" class="w-4 h-4 mr-1" /> 
                                                        </a>
                                                    </Tippy>

                                                    <Tippy as="div" content="Request Cuti" v-if="data.status_users==0 && data.total !=0">
                                                        <a class="flex items-center mr-3 text-danger ml-3" href="#" @click="cuti(data.id)">
                                                            <Lucide icon="Send" class="w-4 h-4 mr-1" />
                                                        </a>
                                                    </Tippy>

                                                    <Tippy as="div"  content="Proses Trial"  v-if="data.status_users==4">
                                                        <a class="flex items-center text-yellow-500 ml-5" href="#" @click="trial(data.id)">
                                                            <Lucide icon="Send" class="w-4 h-4 mr-1" /> 
                                                        </a>
                                                    </Tippy>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </div>
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
                                                <Lucide icon="Users" class="w-4 h-4 mr-2" /> Name : {{ data.name }}
                                            </div>
                                            <div class="flex items-center mt-2">
                                                <Lucide icon="Mail" class="w-4 h-4 mr-2" /> Email : {{ data.email }}
                                            </div>
                                            <div class="flex items-center mt-2">
                                                <Lucide icon="Phone" class="w-4 h-4 mr-2" /> Phone : {{ data.no_telp }}
                                            </div>
                                            <div class="flex items-center mt-2">
                                                <Lucide icon="Home" class="w-4 h-4 mr-2" /> Studio : {{ data.deptname }}
                                            </div>
                                            <div class="flex items-center mt-2">
                                                <Lucide icon="Edit3" class="w-4 h-4 mr-2" /> Total : {{ data.total }} Contract
                                            </div>
                                            <div class="flex items-center mt-2">
                                                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> Status: 
                                                <div
                                                    :class="[
                                                    'flex items-center justify-center ml-1',
                                                        { 'text-success': data.status_users==0 },
                                                        { 'text-danger': data.status_users==1 },
                                                        { 'text-warning': data.status_users==2 },
                                                        { 'text-yellow-300': data.status_users==3 },
                                                        { 'text-orange-400': data.status_users==4 }
                                                    ]"
                                                >
                                                    <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                    <div v-if="data.status_users==0">Active</div>
                                                    <div v-else-if="data.status_users==1">Non Active</div>
                                                    <div v-else-if="data.status_users==2">Request Cuti</div>
                                                    <div v-else-if="data.status_users==3">Cuti</div>
                                                    <div v-else-if="data.status_users==4">Trial</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                                

                                        <Tippy as="div"  content="View Detail Member">
                                            <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                                <Lucide icon="Eye" class="w-4 h-4 mr-1" /> View
                                            </a>
                                        </Tippy>

                                        <Tippy as="div" content="Request Cuti" v-if="data.status_users==0 && data.total !=0">
                                            <a class="flex items-center mr-3 text-danger ml-3" href="#" @click="cuti(data.id)">
                                                <Lucide icon="Send" class="w-4 h-4 mr-1" /> Set Cuti
                                            </a>
                                        </Tippy>

                                        <Tippy as="div"  content="Proses Trial"  v-if="data.status_users==4">
                                            <a class="flex items-center text-yellow-500 ml-5" href="#" @click="trial(data.id)">
                                                <Lucide icon="Send" class="w-4 h-4 mr-1" /> Set Trial
                                            </a>
                                        </Tippy>
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

        <Dialog size="xl" :open="headerFooterModalPreview">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <DialogPanel class="w-full rounded bg-white">
                        <Dialog.Title>
                            <h2 class="mr-auto text-base font-medium">
                                {{ headers }} Member
                            </h2>
                            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setHeaderFooterModalPreview(false)">
                                <Lucide icon="XSquare" class="w-5 h-5" />
                            </Button>
                        </Dialog.Title>
                        <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                <FormInline class="mt-5">
                                    <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">User Name</FormLabel>
                                    <FormInput id="modal-form-1" type="text" v-model="state.data.name" placeholder="Insert User Name" />
                                    <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                                    <FormInput id="modal-form-1" type="hidden" v-model="action" placeholder="Insert name Name" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Email</FormLabel>
                                    <FormInput type="text" class="w-full"  v-model="state.data.email" placeholder="Insert Email"/>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">No Telp</FormLabel>
                                    <FormInput type="text" class="w-full" v-model="state.data.telp"  placeholder="Insert No Telp" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left"> Date Of Birth</FormLabel>
                                    <div class="relative w-full">
                                    <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                        <Lucide icon="Calendar" class="w-4 h-4" />
                                    </div>
                                    <Litepicker v-model="state.data.date_birth"
                                        :options="{
                                        autoApply: true,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                            minYear: 1945,
                                            maxYear: 2050,
                                            months: true,
                                            years: true,
                                        },
                                        // startDate: formattedMinDate // Atur tanggal default di sini
                                        }"
                                        class="pl-12" />
                                    </div>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Passport/ID</FormLabel >
                                    <FormInput type="text" class="w-full" v-model="state.data.passport" placeholder="Insert Passport/ID" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Gender</FormLabel>
                                    <TomSelect class="w-full"  id="modal-form-6"  v-model="state.data.gender">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female" selected>Female</option>
                                    </TomSelect>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Marital Status</FormLabel>
                                    <TomSelect class="w-full" id="modal-form-6" v-model="state.data.marital">
                                    <option value="">Select Maritial Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    </TomSelect>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            
                            
                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Home Address</FormLabel>
                                    <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.address" placeholder="Insert Home Address" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Address 1</FormLabel>
                                    <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.address1" placeholder="Insert Home Address 1" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Address 2</FormLabel>
                                    <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.address2" placeholder="Insert Address 2" />
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Province</FormLabel>
                                    <TomSelect class="w-full"  id="modal-form-6"  v-model="province">
                                        <option value="">Select Province</option>
                                        <option v-for="item in state.listProvince" :key="item.id" :value="item.id">
                                            {{ item.province }}
                                        </option>
                                    </TomSelect>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> City</FormLabel>
                                    <TomSelect class="w-full" id="modal-form-6" v-model="city">
                                        <option value="">Select City</option>
                                        <option  v-for="item in state.listCity"  :key="item.id" :value="item.id">
                                            {{ item.city }}
                                        </option>
                                    </TomSelect>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> District</FormLabel >
                                    <TomSelect class="w-full" id="modal-form-6" v-model="district">
                                        <option value="">Select District</option>
                                        <option  v-for="item in state.listDistrict" :key="item.id" :value="item.id">
                                            {{ item.district }}
                                        </option>
                                    </TomSelect>
                                </FormInline>

                            </div>

                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Sub District</FormLabel>
                                    <TomSelect class="w-full" id="modal-form-6" v-model="sub_district">
                                        <option value="">Select Sub District</option>
                                        <option v-for="item in state.listSubDistrict"  :key="item.id"  :value="item.id">
                                            {{ item.sub_district }}
                                        </option>
                                    </TomSelect>
                                </FormInline>
                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">RT</FormLabel>
                                    <FormInput type="text" class="w-full" v-model="state.data.rt"  placeholder="Insert RT"/>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left" > RW</FormLabel>
                                    <FormInput type="text" class="w-full" v-model="state.data.rw" placeholder="Insert RW" />
                                </FormInline>

                                

                                
                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left" >Studio</FormLabel>
                                    <TomSelect class="w-full" id="modal-form-6" v-model="state.data.studio">
                                        <option value="">Select Studio</option>
                                        <option v-for="item in state.listDepartement"  :key="item.id" :value="item.id" >
                                            {{ item.deptname }}
                                        </option>
                                    </TomSelect>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left"> Status Users</FormLabel>
                                        <TomSelect v-model="state.data.status_user" class="w-full bg-white">
                                            <option value="">Semua Data</option>
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </TomSelect>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y hidden sm:block" v-if="headers=='Update'">
                                <Preview class="intro-y box">
                                    <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                        <h2 class="mr-auto text-base font-medium">Contract List</h2>
                                        <Button variant="primary" class="mr-2 shadow-md" @click="addContract('New')">
                                            <span class="flex items-center justify-center w-40 h-5">
                                                <Lucide icon="Plus" class="w-4 h-4" /> Add New Contract
                                            </span>
                                        </Button>
                                    </div>
                                    <div class="p-5">
                                        <Preview.Panel>
                                            <div class="overflow-x-auto">
                                                <Table>
                                                    <Table.Thead class="bg-primary text-white">
                                                        <Table.Tr>
                                                            <Table.Th class="whitespace-nowrap sticky-column">#</Table.Th>
                                                            <Table.Th class="whitespace-nowrap sticky-column1"> No Contract</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Package</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Type Package </Table.Th>
                                                            <!-- <Table.Th class="whitespace-nowrap"> Sessions </Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Sessions Used </Table.Th> -->
                                                            <Table.Th class="whitespace-nowrap"> Studio </Table.Th>
                                                            <!-- <Table.Th class="whitespace-nowrap"> Start Member</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Expired Member</Table.Th> -->
                                                            <Table.Th class="whitespace-nowrap"> Payment Type</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Type Contract</Table.Th>
                                                            <Table.Th class="whitespace-nowrap"> Status Contract</Table.Th>
                                                            <Table.Th class="whitespace-nowrap text-center sticky-columnAction"> Action</Table.Th>

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
                                                            <Table.Td class="sticky-column">{{ index+1 }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap sticky-column1">{{ data.contrack_no }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.type }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.packages_name }}</Table.Td>
                                                            <!-- <Table.Td class="whitespace-nowrap text-center">{{ data.sessions }}</Table.Td> -->
                                                            <!-- <Table.Td class="whitespace-nowrap text-center">
                                                                <a class="text-center text-success" href="#" @click="viewSessions(data.idcontract, data.type)">
                                                                    {{ data.totalbooking }}
                                                                </a>
                                                            </Table.Td> -->
                                                            <Table.Td class="whitespace-nowrap">{{ data.deptname }}</Table.Td>
                                                            <!-- <Table.Td class="whitespace-nowrap">{{ data.start_date }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.end_date }}</Table.Td> -->
                                                            <Table.Td class="whitespace-nowrap">{{ data.payment_type }}</Table.Td>
                                                            <Table.Td class="whitespace-nowrap">{{ data.type_contract }}</Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                                            <div class="flex items-center justify-center" >
                                                                <div class="text-success" v-if="data.status_contract == 0">Active</div>
                                                                <div class="text-danger" v-else-if="data.status_contract == 1">Non Active</div>
                                                                <div class="text-warning" v-else-if="data.status_contract == 2">Request Cuti</div>
                                                                <div class="text-warning" v-else-if="data.status_contract == 3">Cuti</div>
                                                                <div class="text-yellow-300" v-else>Trial</div>
                                                            </div>
                                                            </Table.Td>
                                                            <Table.Td class="sticky-columnAction"> 
                                                                <div class="flex items-center justify-center">
                                                                    <Tippy as="div"  content="View or Edit Detail Contract" v-if="data.status_contract != 4">
                                                                        <a class="flex items-center mr-3 text-success" href="#" @click="editContract(data.idcontract)">
                                                                            <Lucide icon="Eye" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>

                                                                

                                                                    <Tippy as="div" content="Renewal Contract" v-if="data.status_contract != 4">
                                                                        <a class="flex items-center mr-3 text-emerald-500 ml-3" href="#" @click="renewalContract(data.idcontract)">
                                                                            <Lucide icon="RefreshCcw" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>

                                                                    <Tippy as="div" content="Upgrade Contract" v-if="data.status_contract != 4">
                                                                        <a class="flex items-center mr-3 text-emerald-500 ml-3" href="#" @click="upgradeContract(data.idcontract)">
                                                                            <Lucide icon="ChevronsUp" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>


                                                                    <Tippy as="div"  content="View Payment" >
                                                                        <a class="flex items-center mr-3 text-cyan-700 ml-3" href="#" @click="viewPembayaran(data.idcontract)">
                                                                            <Lucide icon="CreditCard" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>

                                                                    <Tippy as="div"  content="Kirim Login Akun">
                                                                        <a class="flex items-center mr-3 text-info" href="#" @click="kirimlogin(data.id_member)">
                                                                            <Lucide icon="Send" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>
                                                                    
                                                                    <Tippy as="div"  content="Print Contract" v-if="data.status_contract != 4">
                                                                        <a class="flex items-center text-primary ml-3" href="#" @click="print(data.idcontract)" v-if="data.payment_type=='Full Payment' || data.payment_type=='Balance'">
                                                                            <Lucide icon="Printer" class="w-4 h-4 mr-1" />
                                                                        </a>
                                                                    </Tippy>
                                                                </div>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    </Table.Tbody>
                                                </Table>
                                            </div>
                                        </Preview.Panel>
                                    </div>
                                </Preview>
                            </div>

                            
                            <div class="col-span-12 lg:col-span-12 2xl:col-span-12 block sm:hidden"  v-if="headers=='Update'">
                                <Preview class="intro-y box">
                                    <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                        <h2 class="mr-auto text-base font-medium">Contract List</h2>
                                        <Button variant="primary" class="mr-2 shadow-md" @click="addContract">
                                            <span class="flex items-center justify-center w-40 h-5">
                                                <Lucide icon="Plus" class="w-4 h-4" /> Add New Contract
                                            </span>
                                        </Button>
                                    </div>
                                    <div class="p-1">
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
                                            <div v-if="state.listContract.length==0" class="col-span-12 intro-y">
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
                                            <div v-for="(data, index) in state.listContract" :key="data.id" class="col-span-12 intro-y">
                                                <div class="box">
                                                    <div class="p-5">
                                                        <div class="mt-5 text-slate-600 dark:text-slate-500">
                                                            <div class="flex items-center">
                                                                <Lucide icon="FileText" class="w-4 h-4 mr-2" /> Package : {{ data.type }}
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="List" class="w-4 h-4 mr-2" /> Type Package : {{ data.packages_name }}
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Circle" class="w-4 h-4 mr-2" /> Sessions : {{ data.sessions }}
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Circle" class="w-4 h-4 mr-2" /> Sessions : 
                                                                <a class="text-center text-success" href="#" @click="viewSessions(data.idcontract, data.type)">
                                                                    {{ data.totalbooking }}
                                                                </a>
                                                            </div>
                                                            
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Home" class="w-4 h-4 mr-2" /> Studio : {{ data.deptname }}
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Start Member : {{ data.start_date }} 
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Calendar" class="w-4 h-4 mr-2" /> Expired Member : {{ data.end_date }} 
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="CreditCard" class="w-4 h-4 mr-2" /> Payment Type : {{ data.payment_type }} 
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="Edit3" class="w-4 h-4 mr-2" /> Type Contract : {{ data.type_contract }} 
                                                            </div>
                                                            <div class="flex items-center mt-2">
                                                                <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> Status: 
                                                                <div class="text-success" v-if="data.status_contract == 0">Active</div>
                                                                <div class="text-danger" v-else-if="data.status_contract == 1">Non Active</div>
                                                                <div class="text-warning" v-else-if="data.status_contract == 2">Request Cuti</div>
                                                                <div class="text-warning" v-else-if="data.status_contract == 3">Cuti</div>
                                                                <div class="text-yellow-300" v-else>Trial</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                                                

                                                        <Tippy as="div"  content="View or Edit Detail Contract" v-if="data.status_contract != 4">
                                                            <a class="flex items-center mr-3 text-success" href="#" @click="editContract(data.idcontract)">
                                                                <Lucide icon="Eye" class="w-4 h-4 mr-1" />
                                                            </a>
                                                        </Tippy>

                                                    

                                                        <Tippy as="div" content="Renewal Contract" v-if="data.status_contract != 4">
                                                            <a class="flex items-center mr-3 text-emerald-500 ml-3" href="#" @click="renewalContract(data.idcontract)">
                                                                <Lucide icon="RefreshCcw" class="w-4 h-4 mr-1" />
                                                            </a>
                                                        </Tippy>

                                                        <Tippy as="div" content="Upgrade Contract" v-if="data.status_contract != 4">
                                                            <a class="flex items-center mr-3 text-emerald-500 ml-3" href="#" @click="upgradeContract(data.idcontract)">
                                                                <Lucide icon="ChevronsUp" class="w-4 h-4 mr-1" />
                                                            </a>
                                                        </Tippy>


                                                        <Tippy as="div"  content="View Payment" >
                                                            <a class="flex items-center mr-3 text-cyan-700 ml-3" href="#" @click="viewPembayaran(data.idcontract)">
                                                                <Lucide icon="CreditCard" class="w-4 h-4 mr-1" />
                                                            </a>
                                                        </Tippy>
                                                        
                                                        <Tippy as="div"  content="Print Contract" v-if="data.status_contract != 4">
                                                            <a class="flex items-center text-primary ml-3" href="#" @click="print(data.idcontract)" v-if="data.payment_type=='Full Payment' || data.payment_type=='Balance'">
                                                                <Lucide icon="Printer" class="w-4 h-4 mr-1" />
                                                            </a>
                                                        </Tippy>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Preview>
                            </div>


                        </Dialog.Description>
                        <Dialog.Footer>
                            <Button type="button" variant="outline-secondary" @click="
                                        () => {
                                        setHeaderFooterModalPreview(false);
                                        }
                                    " class="w-20 mr-1">
                                Cancel
                            </Button>
                            <Button variant="primary" type="button" class="w-40" @click="saveData">
                                Save Members
                            </Button>
                        </Dialog.Footer>
                    </DialogPanel>

                    <Dialog size="large" :open="ContractModal" :initialFocus="completeButtonRef">
                        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4">
                                <DialogPanel class="w-full rounded bg-white">
                                    <Dialog.Title>
                                        <h2 class="mr-auto text-base font-medium">
                                            {{  actionContract }} Contract
                                        </h2>
                                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setContractModal(false)">
                                            <Lucide icon="XSquare" class="w-5 h-5" />
                                        </Button>
                                    </Dialog.Title>
                                    <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                            <FormInline class="mt-5">
                                                <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Member Name</FormLabel>
                                                <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.name" readonly />
                                            </FormInline>

                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40"  style="text-align: left">Type Contract</FormLabel >
                                                <FormInput id="modal-form-1" type="hidden" v-model="state.data.idcontract" placeholder="Insert name Name" />
                                                <a-select  v-model:value="state.data.type_contract" style="width:100%" disabled>
                                                    <a-select-option value="New">New</a-select-option>
                                                    <a-select-option value="Renewal">Renewal</a-select-option>
                                                </a-select>
                                            </FormInline>

                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40"  style="text-align: left">Type Member</FormLabel >
                                                <a-select  v-model:value="state.data.type_member"  @change="typeMember" style="width:100%" placeholder="Select Type Member">
                                                    <a-select-option value="No Bundling">No Bundling</a-select-option>
                                                    <a-select-option value="Bundling">Bundling</a-select-option>
                                                </a-select>
                                            </FormInline>

                                                
                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Emergency Contact Person</FormLabel >
                                                <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.emergency_pc" placeholder="Input Emergency Contact Person"/>
                                            </FormInline>

                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Emergency Relationship</FormLabel >
                                                <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.emergency_relation" placeholder="Input Emergency Relationship"/>
                                            </FormInline>
                                        </div>

                                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                        
                            

                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Emergency Contact Number</FormLabel >
                                                    <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.emergency_number" placeholder="Input Emergency Contact Number"/>
                                            </FormInline>

                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">No Contract</FormLabel >
                                                    <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.contrack_no" placeholder="Input No Contract"/>
                                            </FormInline>

 
                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Referral Code</FormLabel >
                                                    <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.referalcode"  placeholder="Input Referral Code"/>
                                            </FormInline>

                                    
                                        </div>

                                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                        
                                            <FormInline class="mt-5">
                                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Nama Sales</FormLabel >
                                                    <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.nama_sales" readonly />
                                            </FormInline>

                                            <FormInline class="mt-5">
                                                <FormLabel  htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left">Studio</FormLabel>
                                                <a-select style="width:100%" v-model:value="studio" show-search :filter-option="filter_search" placeholder="Search Studio">
                                                    <a-select-option  v-for="item in state.listDepartement" :key="item.id" :value="item.id.toString()" :label="item.deptname">
                                                        {{ item.deptname }}
                                                    </a-select-option>
                                                </a-select>
                                            
                                            </FormInline>

                                            
                                            <FormInline class="mt-5">
                                                <FormLabel  htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Status Contract</FormLabel>

                                                <a-select style="width:100%" v-model:value="state.data.status_contract" placeholder="Search Status">
                                                    <a-select-option value="0" label="Active">Active</a-select-option>
                                                    <a-select-option value="1" label="In Active">In Active</a-select-option>
                                                </a-select>
                                            </FormInline>
                                        </div>
                                    
                                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y" v-if="actionContract=='Upgrade'">
                                            <Preview class="intro-y box">
                                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                                    <h2 class="mr-auto text-base font-medium">Current Packages</h2>
                                                </div>
                                                <div class="p-2">
                                                    <Preview.Panel>
                                                        <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y hidden sm:block">
                                                            <div class="col-span-12 2xl:col-span-3">
                                                                <div class="overflow-x-auto">
                                                                    <Table>
                                                                        <Table.Thead  class="bg-primary text-white">
                                                                            <Table.Tr class="intro-x">
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    No
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Membership Type
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Package Name
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Teacher
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Valid For Session
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Valid For Months/Year
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Session Used
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Start Date
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    End Date
                                                                                </Table.Th>
                                                                                
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Price
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center" v-if="actionContract=='Add New'">
                                                                                    Action
                                                                                </Table.Th>
                                                                            </Table.Tr>
                                                                        </Table.Thead>

                                            
                                                                        
                                                                        <Table.Tbody>

                                                                            <Table.Tr class="intro-x" v-for="(course, index) in coursesUpgrade" :key="index">
                                                                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                                                    <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                                        {{ 1 + index }}
                                                                                    </div>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select
                                                                                        style="width: 200px"
                                                                                        v-model:value="course.typeMember"
                                                                                        @change="getpaket"
                                                                                        placeholder="Select Membership Type" disabled
                                                                                    >
                                                                                        <a-select-option  
                                                                                            v-for="item in state.listMemberType" 
                                                                                            :key="item.id" 
                                                                                            :value="item.type+'pemisah'+index">
                                                                                            {{ item.type }}
                                                                                        </a-select-option>
                                                                                    </a-select>

                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select style="width:300px" disabled  v-model:value="course.packages" show-search :filter-option="filter_search" placeholder="Search Packages" :loading="loading" @change="getSesi">
                                                                                        <a-select-option  v-for="item in state.listPackages" :key="item.id" :value="item.id.toString()+'pemisah'+index" :label="item.packages_name">
                                                                                            {{ item.packages_name }}
                                                                                        </a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select style="width:300px" disabled v-model:value="course.teacher" show-search :filter-option="filter_search" placeholder="Search Teacher" v-if="course.typeMember==='Personal Training'">
                                                                                        <a-select-option  v-for="item in state.listTeacher" :key="item.id" :value="item.id.toString()" :label="item.name">
                                                                                            {{ item.name }}
                                                                                        </a-select-option>
                                                                                    </a-select>

                                                                                    <div v-else>
                                                                                        No Teacher
                                                                                    </div>
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number v-model:value="course.validSession" :loading="loading" readonly />
                                                                                </Table.Td>
                                                                            
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number v-model:value="course.validMonth" :loading="loading" readonly />
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    {{ course.totalbooking }}
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-date-picker v-model:value="course.start_date" style="width:120px" disabled/>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-date-picker v-model:value="course.end_date" style="width:120px" disabled/>
                                                                                </Table.Td>


                                                                            
                                                                                
                                                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number style="width:150px" :loading="loading"
                                                                                        v-model:value="course.price"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-button type="primary" style="background-color: #1e3a8a;" @click="addValue" v-if="index == 0 && state.data.type_member=='Bundling' && actionContract=='Add New'">Add Package</a-button>
                                                                                    <a-button type="primary" danger @click="remove(index)" v-if="index != 0 && state.data.type_member=='Bundling' && actionContract=='Add New'">Remove</a-button>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x" v-if="actionContract=='Upgrade'">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Type Upg. Session
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-select style="width:150px" v-model:value="typeUpg" @change="selectTypeUpg"   placeholder="Select Type Upg Sessions">
                                                                                        <a-select-option value="Initial Payment" label="Initial Payment">Initial Payment</a-select-option>
                                                                                        <a-select-option value="Left Session" label="Left Session">Left Session</a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x" v-if="actionContract=='Upgrade'">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Price Available
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px"
                                                                                        v-model:value="priceavailable"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>
                                                                        </Table.Tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Preview.Panel>
                                                </div>
                                            </Preview>
                                        </div>

                                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                            <Preview class="intro-y box">
                                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                                    <h2 class="mr-auto text-base font-medium">Packages</h2>
                                                </div>
                                                <div class="p-2">
                                                    <Preview.Panel>
                                                        <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y hidden sm:block">
                                                            <div class="col-span-12 2xl:col-span-3">
                                                                <div class="overflow-x-auto">
                                                                    <Table>
                                                                        <Table.Thead  class="bg-primary text-white">
                                                                            <Table.Tr class="intro-x">
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    No
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Membership Type
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Package Name
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Teacher
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Valid For Session
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Valid For Months/Year
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Session Used
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Start Date
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    End Date
                                                                                </Table.Th>
                                                                                
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                                                    Price
                                                                                </Table.Th>
                                                                                <Table.Th class="border-b-0 whitespace-nowrap text-center" v-if="(actionContract=='Add New' || actionContract=='Upgrade')">
                                                                                    Action
                                                                                </Table.Th>
                                                                            </Table.Tr>
                                                                        </Table.Thead>

                                            
                                                                        
                                                                        <Table.Tbody>

                                                            
                                                                            <Table.Tr class="intro-x" v-for="(course, index) in courses" :key="index">
                                                                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                                                    <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                                        {{ 1 + index }}
                                                                                    </div>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select
                                                                                        style="width: 200px"
                                                                                        v-model:value="course.typeMember"
                                                                                        @change="getpaket"
                                                                                        placeholder="Select Membership Type"
                                                                                        :disabled="actionContract=='Renewal'"
                                                                                    >
                                                                                        <a-select-option  
                                                                                            v-for="item in state.listMemberType" 
                                                                                            :key="item.id" 
                                                                                            :value="item.type+'pemisah'+index">
                                                                                            {{ item.type }}
                                                                                        </a-select-option>
                                                                                    </a-select>

                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select style="width:300px"  v-model:value="course.packages" show-search :filter-option="filter_search" placeholder="Search Packages" :loading="loading" @change="getSesi" :disabled="actionContract=='Renewal'">
                                                                                        <a-select-option  v-for="item in state.listPackages" :key="item.id" :value="item.id.toString()+'pemisah'+index" :label="item.packages_name">
                                                                                            {{ item.packages_name }}
                                                                                        </a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-select style="width:300px" v-model:value="course.teacher" show-search :filter-option="filter_search" placeholder="Search Teacher" v-if="course.typeMember==='Personal Training'">
                                                                                        <a-select-option  v-for="item in state.listTeacher" :key="item.id" :value="item.id.toString()" :label="item.name">
                                                                                            {{ item.name }}
                                                                                        </a-select-option>
                                                                                    </a-select>

                                                                                    <div v-else>
                                                                                        No Teacher
                                                                                    </div>
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number v-model:value="course.validSession" :loading="loading" readonly />
                                                                                </Table.Td>
                                                                            
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number v-model:value="course.validMonth" :loading="loading" readonly />
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a class="text-center text-success" href="#" @click="viewSessions(course.idcontract, course.typeMember)">
                                                                                        {{ course.totalbooking }}
                                                                                    </a>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-date-picker  @change="(value) => getStart(value, index)"  v-model:value="course.start_date" style="width:120px"/>
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-date-picker v-model:value="course.end_date" style="width:120px" disabled/>
                                                                                </Table.Td>

                                                                                
                                                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-input-number style="width:150px" :loading="loading"
                                                                                        v-model:value="course.price"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                                                    <a-button type="primary" style="background-color: #1e3a8a;" @click="addValue" v-if="index == 0 && state.data.type_member=='Bundling' && (actionContract=='Add New' || actionContract=='Upgrade')">Add Package</a-button>
                                                                                    <a-button type="primary" danger @click="remove(index)" v-if="index != 0 && state.data.type_member=='Bundling' && (actionContract=='Add New' || actionContract=='Upgrade')">Remove</a-button>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                    

                                                                        
                                                                        
                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Membership Price
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px"
                                                                                        v-model:value="totalPrice"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Discount %
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number v-model:value="disc" min="0"  />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Fee
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px"
                                                                                        v-model:value="fee"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Program
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-select style="width:150px" v-model:value="program" @change="getProgram" show-search :filter-option="filter_search" placeholder="Select Program">
                                                                                        <a-select-option  v-for="item in state.listProgram" :key="item.id" :value="item.id.toString()" :label="item.program" :title="item.program">
                                                                                            {{ item.program }}
                                                                                        </a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Disc Type
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-select style="width:150px" v-model:value="typeDisc" @change="selectType"  :disabled="loading" placeholder="Select Disc Type">
                                                                                        <a-select-option value="">Select Disc Type</a-select-option>
                                                                                        <a-select-option value="0" label="Discount %">Discount %</a-select-option>
                                                                                        <a-select-option value="1" label="Potongan Harga">Potongan Harga</a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Extra Disc
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input style="width:150px;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.extraDisc" readonly />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x" v-if="actionContract=='Upgrade'">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Price Available
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px"
                                                                                        v-model:value="priceavailable"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Total Price
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px"
                                                                                        v-model:value="state.data.totprice"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Buddy Referral
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-select style="width:150px" v-model:value="typeBR" @change="selectBR"  placeholder="Select Disc Type">
                                                                                        <a-select-option value="">Select Buddy Referral</a-select-option>
                                                                                        <a-select-option value="1" label="Yes">Yes</a-select-option>
                                                                                        <a-select-option value="0" label="No">No</a-select-option>
                                                                                    </a-select>
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Disc BR %
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input :loading="loading" style="width:150px;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.discBR" readonly />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                            <Table.Tr  class="intro-x">
                                                                                <Table.Td colspan="9" class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-right">
                                                                                    Final Price
                                                                                </Table.Td>

                                                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-left">
                                                                                    <a-input-number style="width:150px" :loading="loading"
                                                                                        v-model:value="finalprice"
                                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                                    />
                                                                                </Table.Td>
                                                                            </Table.Tr>

                                                                        </Table.Tbody>
                                                                    </Table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Preview.Panel>
                                                </div>
                                            </Preview>
                                        </div>

                                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                            <Preview class="intro-y box">
                                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                                    <h2 class="mr-auto text-base font-medium">Payment</h2>
                                                </div>
                                                <div class="p-2">
                                                    <Preview.Panel>
                                                        <div class="grid grid-cols-12 gap-4 gap-y-3">
                                                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                                            
                                                                <FormInline class="mt-5">
                                                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40"   style="text-align: left"> Amount Paid</FormLabel>
                                                                    <a-input-group compact>
                                                                            <a-input-number  style="width: 70%"
                                                                            v-model:value="amount"
                                                                            :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                            :parser="value => value.replace(/\Rp\s?|(,*)/g, '')"
                                                                            placeholder="Masukan No Invoice"/>
                                                                            <a-button type="primary" style="background-color: #1e3a8a;"  @click="cariPembayaran('new')">Cari</a-button>
                                                                    </a-input-group>
                                                                
                                                                </FormInline>

                                                                <FormInline class="mt-5">
                                                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Balance</FormLabel >
                                                                    <a-input-number style="width:100%" 
                                                                        v-model:value="balance"
                                                                        :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                        :parser="value => value.replace(/\Rp\s?|(,*)/g, '')" readonly
                                                                    />
                                                                </FormInline>

                                                            

                                                                <FormInline class="mt-5">
                                                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Payment Type</FormLabel >

                                                                    <a-select style="width:100%"  v-model:value="state.data.payment_type" show-search :filter-option="filter_search" placeholder="Search Payment Type">
                                                                        <a-select-option value="Deposit">Deposit</a-select-option>
                                                                        <a-select-option value="Full Payment" label="Full Payment">Full Payment</a-select-option>
                                                                        <a-select-option value="Balance" label="Balance">Balance</a-select-option>
                                                                    </a-select>
                                                                </FormInline>

                                                                <FormInline class="mt-5">
                                                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Payment Method</FormLabel>
                                                                    <a-select style="width:100%"  v-model:value="state.data.payment_method" show-search :filter-option="filter_search" placeholder="Search Payment Type">
                                                                        <a-select-option  value="Amex" label="Amex">Amex</a-select-option>
                                                                        <a-select-option  value="Cash" label="Cash">Cash</a-select-option>
                                                                        <a-select-option  value="Cheque" label="Cheque">Cheque</a-select-option>
                                                                        <a-select-option  value="Debit" label="Debit">Debit</a-select-option>
                                                                        <a-select-option  value="Master" label="Master">Master</a-select-option>
                                                                        <a-select-option  value="Visa" label="Visa">Visa</a-select-option>
                                                                        <a-select-option  value="Transfer" label="Transfer">Transfer</a-select-option>
                                                                        <a-select-option  value="Others" label="Others">Others</a-select-option>
                                                                    </a-select>
                                                                </FormInline>

                                                                <FormInline class="mt-5">
                                                                    <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Contract Description</FormLabel>
                                                                    <a-textarea v-model:value="state.data.desc" placeholder="Contract Description" :rows="3" />
                                                                </FormInline>
                                                                
                                                            
                                                    
                                                            </div>

                                                    

                                                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y" v-if="actionContract=='Add New' || actionContract=='Renewal' || actionContract=='Upgrade'">
                                                                <FormInline>
                                                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Proof Payment </FormLabel>
                                                                    <Button variant="primary" @click="take">Tak a Picture</Button>
                                                                </FormInline>

                                                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60 mt-5" style="text-align: left;"> Image Preview </FormLabel>
                                                    
                                                                <canvas ref="canvas" width="250" height="250"></canvas>
                                                                <!-- <img v-if="capturedPhoto" :src="capturedPhoto" alt="Captured Photo" /> -->
                                                                
                                                            </div>

                                                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y" v-if="actionContract=='Add New' || actionContract=='Renewal' || actionContract=='Upgrade'">
                                                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Signature </FormLabel>
                                                                <Vue3Signature  ref="signature1" :sigOption="state.option" :w="'400px'" :h="'250px'"
                                                                    :disabled="state.disabled" class="example"  :style="{ 'border': '1px solid black' }"></Vue3Signature>
                                                                <Button variant="primary" @click="clearTTD">Clear</Button>
                                                            </div>
                                                            

                                                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y" v-if="actionContract=='Update'">
                                                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Proof Payment </FormLabel>
                                                                <FormInline class="mt-1">
                                                                <img  :src="baseUrl+state.data.file">
                                                                <canvas ref="canvas" width="250" height="250"></canvas>
                                                                <!-- <img v-if="capturedPhoto" :src="capturedPhoto" alt="Captured Photo" /> -->
                                                                </FormInline>
                                                            
                                                                <Button variant="success" class="flex items-center text-white mt-2" href="#" @click="editPayment(state.data.id)" v-if="actionContract=='Update'">
                                                                    <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> Edit Proof Payment
                                                                </Button>
                                                            </div>

                                                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y" v-if="actionContract=='Update'">
                                                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Signature </FormLabel>
                                                                <img :src="baseUrl+state.data.ttd" style="width:400px">
                                                                <Button variant="success" class="flex items-center text-white mt-2" href="#" @click="editSiganture(state.data.id)" v-if="actionContract=='Update'">
                                                                <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> Edit Signature
                                                                </Button>
                                                            </div>
                                                        
                                                        </div>
                                                    

                                                    </Preview.Panel>
                                                    </div>
                                            </Preview>
                                        </div>
                                    </Dialog.Description>
                                    <Dialog.Footer>
                                        <Button type="button" variant="outline-secondary" @click="setContractModal(false)" class="w-20 mr-1">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="button" ref="completeButtonRef" class="w-40" @click="saveContract" v-if="actionContract==='Add New' || actionContract==='Update'">
                                            Save
                                        </Button>

                                        <Button variant="primary" type="button" ref="completeButtonRef" class="w-40" @click="SaveRenewalContract" v-else-if="actionContract==='Renewal'">
                                            Renewal
                                        </Button>

                                        <Button variant="primary" type="button" ref="completeButtonRef" class="w-40" @click="saveUpgrade" v-else-if="actionContract==='Upgrade'">
                                            Upgrade
                                        </Button>
                                    </Dialog.Footer>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog :open="PhotoPreview">
                        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4">
                                <DialogPanel class="w-120 rounded bg-white">
                                    <Dialog.Title>
                                        <h2 class="mr-auto text-base font-medium">
                                        Take a picture
                                        </h2>

                                    </Dialog.Title>
                                    <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                        <div class="col-span-12 sm:col-span-12">
                                        <video ref="videoElement" width="400" height="250" autoplay></video>
                                        <Button variant="success" class="text-white" @click="switchCamera">Switch Camera</Button>
                                        </div>
                                    </Dialog.Description>
                                    <Dialog.Footer>
                                        <Button type="button" variant="outline-secondary" @click="setPhotoPreview(false)" class="w-20 mr-1">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="button" class="w-40" @click="capturePhoto">
                                            Take Snapshoot
                                        </Button>
                                    </Dialog.Footer>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog :open="PrintPreview" size="full">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                    Contract Member
                                </h2>
                                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPrintPreview(false)">
                                    <Lucide icon="XSquare" class="w-5 h-5" />
                                </Button>
                            </Dialog.Title>
                        
                            <iframe :src="pdfUrl"  width="100%" height="700px"  fullscreen="true" />
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog :open="editPaymentModal">
                        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4">
                                <DialogPanel class="w-120 rounded bg-white">
                                    <Dialog.Title>
                                        <h2 class="mr-auto text-base font-medium">
                                        Take a picture
                                        </h2>

                                    </Dialog.Title>
                                    <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                        <div class="col-span-12 sm:col-span-12">
                                        <video ref="videoElement" width="400" height="250" autoplay></video>
                                        <Button variant="success" class="text-white" @click="switchCamera">Switch Camera</Button>
                                        </div>
                                    </Dialog.Description>
                                    <Dialog.Footer>
                                        <Button type="button" variant="outline-secondary" @click="seteditPaymentModal(false)" class="w-20 mr-1">
                                            Cancel
                                        </Button>
                                        <Button variant="primary" type="button" class="w-40" @click="capturePhotoEdit">
                                            Take Snapshoot
                                        </Button>
                                    </Dialog.Footer>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog :open="editSigantureModal">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                Edit Signature
                                </h2>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-12">
                                <Vue3Signature  ref="signature1" :sigOption="state.option" :w="'400px'" :h="'250px'"
                                    :disabled="state.disabled" class="example"  :style="{ 'border': '1px solid black' }"></Vue3Signature>
                                <Button variant="primary" @click="clearTTD">Clear</Button>
                        
                                </div>
                            </Dialog.Description>
                            <Dialog.Footer>
                                <Button type="button" variant="outline-secondary" @click="seteditSigantureModal(false)" class="w-20 mr-1">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="button" class="w-40" @click="updateSignature('image/jpeg')">
                                    Update
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog size="lg" :open="PembayaranModal">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                    Payment
                                </h2>
                                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPembayaranModal(false)">
                                    <Lucide icon="XSquare" class="w-5 h-5" />
                                </Button>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-12">
                                    <Button variant="primary" class="mr-2 shadow-md" @click="addPayment">
                                        <span class="flex items-center justify-center w-40 h-5">
                                            <Lucide icon="Plus" class="w-4 h-4" /> Add Payment
                                        </span>
                                    </Button>
                                    <div class="overflow-x-auto pt-2">
                                        <Table>
                                            <Table.Thead class="bg-primary text-white">
                                                <Table.Tr>
                                                    <Table.Th class="whitespace-nowrap">#</Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Tanggal</Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Keterangan </Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Nominal </Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> proof of payment </Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                        
                                            <Table.Tbody>
                                                <Table.Tr v-if="state.listPembayaran.length==0" class="intro-x">
                                                    <Table.Td colspan="5" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                        <div class="flex flex-col items-center justify-end col-span-12">
                                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                        </div>
                                                    </Table.Td>
                                                </Table.Tr>

                                                <Table.Tr v-for="(data, index) in state.listPembayaran" :key="index">
                                                    <Table.Td>{{ index+1 }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.tanggal }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.keterangan }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ (data.nominal * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">
                                                        <a class="flex items-center mr-3 text-success" href="#" @click="lihatfile(data.file)" v-if="data.file!=''">
                                                            <Lucide icon="View" class="w-4 h-4 mr-1" />
                                                            Lihat File
                                                        </a>
                                                        <a class="flex items-center mr-3 text-danger" href="#" @click="lihatfile(data.file)" v-else>
                                                            -
                                                        </a>
                                                    </Table.Td>
                                                
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td colspan="4">Total Price</Table.Td>
                                                    <Table.Td>{{ (Totalfee * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}</Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td colspan="4">Amount Paid</Table.Td>
                                                    <Table.Td>{{ (totalNominal * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}</Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td colspan="4">Balance</Table.Td>
                                                    <Table.Td>{{ (totalNominal - Totalfee * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}</Table.Td>
                                                </Table.Tr>

                                                
                                            </Table.Tbody>
                                        </Table>
                                    </div>
                        
                                </div>
                            </Dialog.Description>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog size="lg" :open="AddPembayaranModal" :initialFocus="completeButtonRefPayment">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                    Add Payment
                                </h2>
                                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddPembayaranModal(false)">
                                    <Lucide icon="XSquare" class="w-5 h-5" />
                                </Button>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-12">
                            
                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left"> Remaining Payment</FormLabel>
                                
                                        <CurrencyInput  ref="completeButtonRefPayment" type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80"  :value="totalNominal - Totalfee"  :options="{ currency: 'IDR' }" placeholder="Insert Amount Paid"   readonly/>
                                    </FormInline>

                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left"> Amount Paid</FormLabel>
                                        <!-- <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="amount_paid" placeholder="Insert Extra Disc" readonly/> -->
                                        <a-input-number style="width:100%" size="large"
                                            v-model:value="amount_paid"
                                            :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                            :parser="value => value.replace(/\Rp\s?|(,*)/g, '')"
                                            readonly/>
                                        <Button variant="primary" class="mr-2 shadow-md" @click="cariPembayaran('pelunasan')">
                                            <span class="flex items-center justify-center h-5"> 
                                                <Lucide icon="Search" class="w-4 h-4" /> 
                                            </span>
                                        </Button>
                                    </FormInline>

                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Payment Type</FormLabel >
                                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.payment_type">
                                        <option value="">Select Payment Type</option>
                                        <option value="Deposit">Deposit</option>
                                        <option value="Balance">Balance</option>
                                        
                                        </TomSelect>
                                    </FormInline>

                                    <!-- <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Proof of payment</FormLabel >
                                        <FormInput type="file" @change="handleFileUpload" accept="image/jpg, image/jpeg, image/png" />
                                    </FormInline> -->


                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Keterangan</FormLabel>
                                        <FormInput type="text" class="w-full" v-model="state.data.ket"  placeholder="Insert Keterangan" />
                                    </FormInline>
                                </div>
                            </Dialog.Description>

                            <Dialog.Footer>
                                <Button type="button" variant="outline-secondary" @click="setAddPembayaranModal(false)" class="w-20 mr-1">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="button" class="w-40" @click="savePembayaran">
                                    Save
                                </Button>
                            </Dialog.Footer>

                        </Dialog.Panel>
                    </Dialog>

                    <Dialog :open="FilePreview" size="xl" >
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                File
                                </h2>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                    

                                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                    <img class="rounded-md"
                                                    alt="No Image"
                                                    :src="baseUrlPembayaran+state.data.file"
                                                    />
                                </div>
                            
                            </Dialog.Description>
                            <Dialog.Footer>
                                <Button type="button" variant="outline-secondary" @click="setFilePreview(false)" class="w-20 mr-1">
                                    Cancel
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Panel>
                    </Dialog>


                    <Dialog :open="BayarModal"  :initialFocus="completeButtonRefSearch">
                        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4">
                                <DialogPanel class="w-full rounded bg-white">
                                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                                        <h2 class="mr-auto text-base font-medium">
                                            Pilih Pembayaran
                                        </h2>

                                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setBayarModal(false)">
                                            <Lucide icon="XSquare" class="w-5 h-5" />
                                        </Button>
                                    </Dialog.Title>
                                    
                                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                                        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
                                            <div class="items-center sm:flex sm:mr-4">
                                                <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                                                    Filter
                                                </label>
                                                <div class="relative w-full">
                                                    <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                        <Lucide icon="Calendar" class="w-4 h-4" />
                                                    </div>
                                                        <Litepicker v-model="tanggalbayar" :options="{
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
                                                        }" class="w-full" />
                                                </div>

                                            </div>

                                            <div class="hidden mx-auto md:block text-black">
                                            
                                            </div>

                                            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                                <div class="relative w-56 text-slate-500">
                                                    <!-- <FormInput  type="text"  class="w-56 pr-10 !box" placeholder="Search..." v-model="searchbayar" /> -->
                                                    <input ref="completeButtonRefSearch" type="text" class="transition duration-200 ease-in-out w-56 pr-10  text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="searchbayar" placeholder="Search..." />
                                                    <Lucide  icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"/>
                                                
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
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">No Invoice</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Tanggal</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Customers</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">No Telp</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Email</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Keterangan </Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Amount</Table.Th>
                                                            <Table.Th class="border-b-0 whitespace-nowrap text-center">Kasir</Table.Th>
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
                                                        <Table.Tr v-if="state.listbayar.total==0" class="intro-x">
                                                            <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                                </div>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                        <Table.Tr class="intro-x" v-for="(data, index) in state.listbayar.data" :key="data.id" >
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                                <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                                    {{ state.listbayar.from + index }}
                                                                </div>
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.noinvoice }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.tanggal }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.nama_cust }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.no_telp }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.email }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.ket }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                                {{ (1 * data.total).toLocaleString('id-ID', { style: 'currency',  currency: 'IDR', }).slice(0, -3) }}
                                                            </Table.Td>
                                                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                                            {{ data.kasir }}
                                                            </Table.Td>
                                                            <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                                <div class="flex items-center justify-center">
                                                                    <Tippy as="div"  content="Pilih Pembayaran">
                                                                        <a class="flex items-center text-success" href="#" @click="savebayar(data.total, actionBayar)">
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
                                                <TailwindPagination :limit="1" :data="state.listbayar" @pagination-change-page="tampilSchedule"/>
                                            </div>

                                            <div class="hidden mx-auto md:block text-slate-500">
                                                Showing {{ state.listbayar.from }} to {{ state.listbayar.to }} of {{ state.listbayar.total }} entries
                                            </div>

                                            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                            
                                            </div>
                                        </div>

                                    </Dialog.Description>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog size="xl" :open="BookingModal">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                    List History Booking
                                </h2>
                                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setBookingModal(false)">
                                    <Lucide icon="XSquare" class="w-5 h-5" />
                                </Button>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-12">
                                    <Button variant="primary" class="mr-2 shadow-md" @click="addbooking()" v-if="type_contract=='Personal Training'">
                                        <span class="flex items-center justify-center w-40 h-5">
                                            <Lucide icon="Plus" class="w-4 h-4" /> Add Data Booking
                                        </span>
                                    </Button>
                                    <div class="overflow-x-auto pt-2">
                                        <Table>
                                            <Table.Thead class="bg-primary text-white">
                                                <Table.Tr>
                                                    <Table.Th class="whitespace-nowrap">#</Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Tanggal Booking</Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Class </Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Teacher </Table.Th>
                                                    <Table.Th class="whitespace-nowrap"> Studio </Table.Th>
                                                </Table.Tr>
                                            </Table.Thead>
                                        
                                            <Table.Tbody>
                                                <Table.Tr v-if="state.listBooking.total==0" class="intro-x">
                                                    <Table.Td colspan="5" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                        <div class="flex flex-col items-center justify-end col-span-12">
                                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                        </div>
                                                    </Table.Td>
                                                </Table.Tr>

                                                <Table.Tr v-for="(data, index) in state.listBooking.data" :key="index">
                                                    <Table.Td>{{ state.listBooking.from+index }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.tgl_schedule ?? data.tgl_booking }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.class_name ?? 'Personal Training' }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.name ?? 'By Pass' }}</Table.Td>
                                                    <Table.Td class="whitespace-nowrap">{{ data.deptname }}</Table.Td>
                                                </Table.Tr>
                                            </Table.Tbody>
                                        </Table>
                                    </div>

                                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                                        <div class="items-center sm:flex sm:mr-4">
                                            <a-pagination :current="state.listBooking.current_page" :total="state.listBooking.total"  v-model:pageSize="paging" @change="handlePageChange" />
                                        </div>

                                        <div class="hidden mx-auto md:block text-slate-500">
                                            Showing {{ state.listBooking.from }} to {{ state.listBooking.to }} of {{ state.listBooking.total }} entries
                                        </div>

                                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                            <div class="relative w-56 text-slate-500">
                                            
                                            </div>
                                        </div>
                                    </div>
                        
                                </div>
                            </Dialog.Description>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog size="lg" :open="ModalAddBooking">
                        <Dialog.Panel>
                            <Dialog.Title>
                                <h2 class="mr-auto text-base font-medium">
                                    Add Booking
                                </h2>
                                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setModalAddBooking(false)">
                                    <Lucide icon="XSquare" class="w-5 h-5" />
                                </Button>

                            </Dialog.Title>
                            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-12">
                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left"> Tanggal Booking</FormLabel>
                                        <div class="relative w-full">
                                        <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                            <Lucide icon="Calendar" class="w-4 h-4" />
                                        </div>
                                        <Litepicker v-model="tgl_booking"
                                            :options="{
                                            autoApply: true,
                                            showWeekNumbers: true,
                                            dropdowns: {
                                                minYear: 1945,
                                                maxYear: 2050,
                                                months: true,
                                                years: true,
                                            },
                                            // startDate: formattedMinDate // Atur tanggal default di sini
                                            }"
                                            class="pl-12" />
                                        </div>
                                    </FormInline>

                                    <FormInline class="mt-5">
                                        <FormLabel htmlFor="modal-form-1" class="sm:w-60" style="text-align: left" >Studio</FormLabel>
                                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.studio">
                                            <option value="">Select Studio</option>
                                            <option v-for="item in state.listDepartement"  :key="item.id" :value="item.id" >
                                                {{ item.deptname }}
                                            </option>
                                        </TomSelect>
                                    </FormInline>
                            
                                </div>
                            </Dialog.Description>

                            <Dialog.Footer>
                                <Button type="button" variant="outline-secondary" @click="setModalAddBooking(false)" class="w-20 mr-1">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="button" class="w-40" @click="saveBooking">
                                    Save
                                </Button>
                            </Dialog.Footer>

                        </Dialog.Panel>
                    </Dialog>

                </div>
            </div>
        </Dialog>

        <Dialog size="lg" :open="cutiModal">
            <Dialog.Panel>
                <Dialog.Title>
                    <h2 class="mr-auto text-base font-medium">
                        Request Cuti
                    </h2>
                    <Button type="button" variant="danger" class="mb-2 mr-1" @click="setcutiModal(false)">
                        <Lucide icon="XSquare" class="w-5 h-5" />
                    </Button>

                </Dialog.Title>
                <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-12">
                        <FormInline class="mt-5">
                            <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Suspension Request</FormLabel>
                            <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.suspension" placeholder="Insert Suspension Request" />
                        </FormInline>

                        <FormInline class="mt-5">
                            <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Reason for Suspension</FormLabel>
                            <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.reason" placeholder="Insert  Reason for Suspension" />
                        </FormInline>

                        <FormInline class="mt-5">
                            <FormLabel htmlFor="modal-form-1" class="sm:w-20" style="text-align: left"> Periode</FormLabel>
                            <FormSelect class="w-full ml-8" id="modal-form-6" v-model="state.data.periode">
                                <option value="">Select Periode</option>
                                <option value="1">1 Month</option>
                                <option value="2">2 Month</option>
                                <option value="3">3 Month</option>
                                <option value="4">4 Month</option>
                                <option value="5">5 Month</option>
                                <option value="6">6 Month</option>
                            </FormSelect>
                        </FormInline>

                        <FormInline class="mt-5">
                            <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Document</FormLabel>
                            <input
                                    type="file"
                                    @change="onFileChange"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                        </FormInline>
                    </div>
                </Dialog.Description>

                <Dialog.Footer>
                    <Button type="button" variant="outline-secondary" @click="setcutiModal(false)" class="w-20 mr-1">
                        Cancel
                    </Button>
                    <Button variant="primary" type="button" ref="completeButtonRef" class="w-40" @click="savecuti">
                        Request Cuti
                    </Button>
                </Dialog.Footer>
            </Dialog.Panel>
        </Dialog>

        <Dialog :open="TrialModal"  :initialFocus="completeButtonRef">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <DialogPanel class="w-full rounded bg-white">
                        <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">
                                Pilih Schedule
                            </h2>

                            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setTrialModal(false)">
                                <Lucide icon="XSquare" class="w-5 h-5" />
                            </Button>
                        </Dialog.Title>
                        
                        <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
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
                                                startDate:new  moment().startOf('year').format('YYYY-MM-DD'),
                                                endDate: new  moment().endOf('month').format('YYYY-MM-DD'), 
                                            }"
                                            class="pl-12" />
                                    </div>

                                </div>

                                <div class="hidden mx-auto md:block text-black">
                                
                                </div>

                                <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                    
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
                                                        <Tippy as="div"  content="Proses Trial">
                                                            <a class="flex items-center text-success" href="#" @click="saveTrial(data.idschedule)">
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

    </div>

    
</template>

<script setup>
    // import {  apiGetData, apiPostData, apiPutData, apiDeleteData, processing, loadingButton, loadingSubmit , Swal, waitingicon, loading, pesan} from '@/store/action';
    import Api from '../api/Api'
    import moment from 'moment'
    import Button from "../base-components/Button";
    import { FormInput, FormSelect, FormLabel, FormInline, FormCheck } from "../base-components/Form"
    import TomSelect from "../base-components/TomSelect"
    import { onMounted, ref, reactive , watch, computed, onBeforeUnmount , onBeforeMount } from "vue"
    import { notification } from 'ant-design-vue';
    import { useRouter, useRoute } from 'vue-router'
    import { useDebounceFn } from '@vueuse/core'
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Tippy from "../base-components/Tippy";
    import TippyContent from "../base-components/TippyContent";
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import Preview from "../base-components/Preview"
    import CurrencyInput from "./CurrencyInput.vue";
    import LoadingIcon from "../base-components/LoadingIcon"
    import { Dialog, Menu } from "../base-components/Headless"
    import dayjs from 'dayjs'
    import {
        DialogPanel

    } from '@headlessui/vue'
    import man from "../assets/images/sabar.png"
    import 'vue-select/dist/vue-select.css';
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    import Litepicker from "../base-components/Litepicker";
    import { useStore } from "vuex";
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const store = useStore();
    const user = store.getters['auth/currentUser']
    const loadingsycn = ref("")
    const loading=ref(false)
    const studio=ref("")
    const roles = ref("")
    const tgl_schedule = ref(moment().format('YYYY-MM-DD')+" - "+moment().format('YYYY-MM-DD'))
    const pesan=ref("")
    const search = ref("")
    const selected= ref([])
    const action  = ref("INSERT")
    const actionContract  = ref("Add New")
    const headers  = ref("Add New Data")
    const headerFooterModalPreview = ref(false);
    const baseUrl = ref('https://login.yogafitidonline.com/api/storage/contract/')
    const baseUrlFoto = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const baseUrlPembayaran = ref('https://login.yogafitidonline.com/api/storage/pembayaran/')
    const router = useRouter()
    const province = ref("");
    const city = ref("");
    const district = ref("");
    const pdfUrl = ref("");
    const packages = ref("");
    const packages_name = ref("");
    const packages_new = ref("");
    const packages_name_new = ref("");
    const amount_paid = ref(0)
    const sub_district = ref("");
    const completeButtonRef = ref(null)
    const completeButtonRefSearch =ref(null)
    const actionBayar=ref("")
    const file = ref("")
    const completeButtonRefPayment = ref(null)
    const disc = ref(0);
    const balance=ref(0)
    const amount = ref(0);
    const totalNominal= ref(0);
    const Totalfee = ref(0);
    const paging=ref(10)
    const price = ref(0);
    const fee = ref(0);
    const tanggal= ref("0000-00-00 - 0000-00-00")
    const program = ref("");
    const typeDisc = ref("");
    const extraDisc = ref(0);
    const typeBR = ref("")
    const totprice = ref(0)
    const extraPotongan = ref(0);
    const statusPT = ref("");
    const sudahambil = ref(0)
    const totdics = ref(0);
    const priceavailable=ref(0);
    const status=ref("");
    const searchbayar=ref("")
    const tanggalbayar=ref(moment().format('YYYY-MM-DD') + ' - ' +moment().format('YYYY-MM-DD'))
    const finalprice=ref(0)
    const amountnew=ref(0)
    const signature1 = ref(null)
    const videoElement = ref(null);
    const image = ref("")
    const modalFilter = ref(false)
    const courses = ref([
        {
            typeMember: [],
            packages: [],
            teacher: [],
            price:0,
            validSession: 0,
            validMonth: 0,
            start_date: "",
            end_date: ""
        }
    ]);

    const coursesUpgrade = ref([
        {
            typeMember: [],
            packages: [],
            teacher: [],
            price:0,
            validSession: 0,
            validMonth: 0,
            start_date: "",
            end_date: ""
        }
    ]);

    let videoStream = null;
    const canvas = ref(null);
    let capturedPhoto = null;
    let currentCamera = 'environment';
    const filterStudio=ref([])



    const apiGetData = async (url = "", paramsData = {}) => {
        loading.value=true

        return await Api.get(url, { params: paramsData })
        .then((response) => {
            loading.value=false
            return response.data;
        })
        .catch((error) => {  
            const response = error.response
            pesan.value='';
            const title = response.data.message;
            if (response.data.status_code === 403) {
                // sweetError(title, 'Anda Tidak Memiliki Akses')
            } else if (response.status === 400) {
                const ResObj = Object.values(response.data.data)
                ResObj.forEach(value => {
                    pesan.value += value[0] + '<br>'; // Menggabungkan pesan dengan <br> sebagai pemisah
                });
                // sweetError(title, pesan.value)
            } else {
                pesan.value = 'Oppss Error'
                // sweetError(pesan.value, response.data.message);
            }
            return false;
        });
    };



    const showModal = () => {
        modalFilter.value = true;
    };

    const clearTTD = async () => {
        signature1.value.clear()
    }

    const modalSubmit = async() =>{
    
        await tampilData()

    }

    const addValue = async () => {
        typeDisc.value = ""
        courses.value.push({
            typeMember: [],
            packages: [],
            teacher: [],
            price: 0,
            validSession: 0,
            validMonth: 0,
            start_date: "",
            end_date: ""
        });
    }

    const remove = async (index) => {
        courses.value.splice(index, 1);
        typeDisc.value = ""
        totalPrice.value = courses.value.reduce((total, data) => {
            return total + (data.price);
        }, 0);
    }

    const filter_search = (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    const ContractModal = ref(false);
    const setContractModal = (value) => {
        ContractModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (ContractModal.value==false) {
            state.data.idcontract=''
            studio.value=''
            state.data.relation_name=''
            state.data.relation_telp=''
            state.data.relation=''
            packages_name.value=''
            state.data.contrack_no=''
            state.data.teacher=''
            packages.value=''
            program.value=''
            totdics.value=''
            totprice.value=''
            state.data.start_date=''
            state.data.end_date=''
            state.data.sessions=''
            state.data.validity=''
            disc.value='0'
            typeDisc.value=''
            amount.value=''
            state.data.price=''
            state.data.fee=''
            state.data.extraDisc=''
            state.data.totprice=''
            state.data.start_date=''
            state.data.end_date=''
            state.data.payment_type=''
            state.data.payment_method=''
            state.data.type_contract=''
            state.data.desc=''
            state.data.referalcode=''
            state.data.nama_sales=user.name
            state.data.status_contract=''
            actionContract.value='Add New'
            state.data.file=''
            state.data.ttd=''
            state.data.emergency_pc=""
            state.data.emergency_relation=""
            state.data.emergency_number=""
            courses.value = [
                {
                    typeMember: [],
                    packages: [],
                    teacher: [],
                    price:0,
                    validSession: 0,
                    validMonth: 0,
                    start_date: "",
                    end_date: ""
                }
            ]
            state.data.type_member = []
            totalPrice.value = 0
            fee.value = 0
        }
    };


    const state = reactive({
        listSchedule: {},
        listData  : {},
        listRole  : {},
        listBooking : {},
        listDepartementGroup:{},
        listDepartement : {},
        listbayar:{},
        listProvince: {},
        listSubDistrict: {},
        listMemberType:{},
        listCity: {},
        listDistrict: {},
        listContract:{},
        listPackages: {},
        listPackages_new: {},
        listTeacher:{},
        listProgram:{},
        listPembayaran:{},
        listBayar:{},
        total:"0",
        active:"0",
        inactive:"0",
        news:"0",
        cuti:"0",
        trial:"0",
        datas : "",
        data : {
            id: "",
            name: "",
            email: "",
            telp: "",
            studio: "",
            passport: "",
            gender: "",
            marital: "",
            date_birth: "",
            address: "",
            address1: "",
            address2: "",
            province: "",
            city: "",
            district: "",
            sub_district: "",
            rt: "",
            rw: "",
            role:[],
            status_user:"",
            contrack_no:"",
            idcontract:"",
            discBR:"",
            type_contract:"",
            teacher:"",
            relation_name: "",
            relation_telp: "",
            relation: "",
            price: "",
            validity: "",
            sessions: "",
            start_date: "",
            end_date: "",
            fee: "",
            amount: "",
            balance: "",
            payment_type: "",
            payment_method: "",
            status_contract: "",
            file:"",
            desc: "",
            referalcode: "",
            nama_sales: user.name,
            totprice:"",
            extraDisc:"",
            ket:"",
            emergency_pc:"",
            emergency_relation:"",
            emergency_number:"",
            validity_new: "",
            sessions_new: "",
            start_date_new: "",
            end_date_new: "",
            teacher_new:"",
            price_new: "",
            sessionterpakai:"",
            sessionavailable:"",
            priceavailable:"",
            pricesession:"",
            totpricenew:"",
            pricecurrent:"",
            suspension:"",
            reason:"",
            periode:""
        }
        
    })

    const TrialModal = ref(false);
    const setTrialModal = (value) => {
        TrialModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const BookingModal = ref(false);
    const setBookingModal = (value) => {
        BookingModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const ModalAddBooking = ref(false);
    const setModalAddBooking = (value) => {
        ModalAddBooking.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const PhotoPreview = ref(false);
    const setPhotoPreview = (value) => {
        PhotoPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const basicModalPreview = ref(false);
    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const FilePreview = ref(false);
    const setFilePreview = (value) => {
        FilePreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const PrintPreview = ref(false);
    const setPrintPreview = (value) => {
        PrintPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const AddPembayaranModal = ref(false);
    const setAddPembayaranModal = (value) => {
        AddPembayaranModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (AddPembayaranModal.value==false) {
            PembayaranModal.value = true
        }
    };

    const editPaymentModal = ref(false);
    const seteditPaymentModal = (value) => {
        editPaymentModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };


    const cutiModal = ref(false);
    const setcutiModal = (value) => {
        cutiModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (cutiModal.value==false) {
            state.data.idcontract=''
            state.data.suspension=''
            state.data.reason=''
            state.data.periode=''
        }
        
    };

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };


    const editSigantureModal = ref(false);
    const seteditSigantureModal = (value) => {
        editSigantureModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const PembayaranModal = ref(false);
    const setPembayaranModal = (value) => {
        PembayaranModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const BayarModal = ref(false);
    const setBayarModal = (value) => {
        BayarModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };


    const capturePhoto = () => {
        const context = canvas.value.getContext('2d');
        context.drawImage(videoElement.value, 0, 0, canvas.value.width, canvas.value.height);
        capturedPhoto = canvas.value.toDataURL('image/png');
        PhotoPreview.value = false
        sudahambil.value=1
    };

    const take = async () => {
        initCamera();
        PhotoPreview.value=true
    }

    const initCamera = async () => {
        try {
            // Stop the current stream if it exists
            if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach((track) => track.stop());
            }

            // Get media from the user with the specified camera
            const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: currentCamera },
            });

            // Assign the stream to the video element
            videoElement.value.srcObject = stream;

            // Save the stream to be closed later if needed
            videoStream = stream;
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    const switchCamera = () => {
        currentCamera = currentCamera === 'user' ? 'environment' : 'user';
        initCamera();
    };


    const setHeaderFooterModalPreview = (value) => {
        headerFooterModalPreview.value = value;
        if(headerFooterModalPreview.value==false){
            state.data.name = '';
            selected.value = [];
            state.data.email = '';
            state.data.password = '';
            state.data.role=[];
            state.data.id = '';
            action.value = 'INSERT';
            headers.value = 'Add New Data';
            state.data.name=''
            state.data.studio=''
            state.data.telp=''
            state.data.email=''
            state.data.date_birth=''
            state.data.passport=''
            state.data.gender=''
            state.data.marital=''
            state.data.address=''
            state.data.address1=''
            state.data.address2=''
            state.data.rt=''
            state.data.rw=''
            province.value=''
            city.value=''
            district.value=''
            sub_district.value=''
            state.data.file=''
            state.data.ttd=''
            state.listContract = {}

        }
    };



    const cariPembayaran = async (id) => {
        searchbayar.value = state.data.telp
        await tampilBayar()
        BayarModal.value = true
        actionBayar.value=id
    }


    const cuti = async (id) => {
        state.data.id = id
        cutiModal.value = true
    }


    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true;
        let response;
        const url = (user.roles[0].name === 'superAdmin' || user.roles[0].name === 'admin') 
            ? "/admin/member" 
            : "/sales/member";

        if (state.listData.last_page < 1 || state.listData.last_page === undefined || page > state.listData.last_page) {
            page = 1;
        }

        response = await apiGetData(url, { page, q: search.value, status: status.value, tanggal: tanggal.value, studio: filterStudio.value, statusPT: statusPT.value });


        state.listData = response.data
        state.total= response.total
        state.active= response.active
        state.inactive= response.inactive
        state.news= response.new
        state.cuti= response.cuti
        state.trial= response.trial
        loading.value = false;
    }

    const tampilBayar = async (page = 1) => {
        loading.value= true
        let url=''
        let response;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            response= await apiGetData("/admin/bayar", {page: page, q:searchbayar.value, tanggal:tanggalbayar.value});
        }else{
            response= await apiGetData("/sales/bayar", {page: page, q:searchbayar.value, tanggal:tanggalbayar.value});
        }

        state.listbayar= response.data
    }

    const edit = async (id) => {
        headers.value='Update'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/users', {
                params: {
                    id : id
                } 
            })
        }else{
            url = Api.get('/sales/users', {
                params: {
                    id : id
                } 
            })
        }

        await url.then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.name = state.datas[0].name
            state.data.email = state.datas[0].email
            state.data.telp = state.datas[0].no_telp
            state.data.date_birth = state.datas[0].date_birth ?? ''
            state.data.passport = state.datas[0].passport
            state.data.gender = state.datas[0].gender ?? ''
            state.data.marital = state.datas[0].marital ?? ''
            state.data.address = state.datas[0].address
            state.data.address1 = state.datas[0].address1
            state.data.address2 = state.datas[0].address2
            state.data.nama_sales = state.datas[0].sales ?? user.name
            province.value = state.datas[0].province ?? ''
            city.value = state.datas[0].city ?? ''
            district.value = state.datas[0].district ?? ''
            sub_district.value = state.datas[0].sub_district ?? ''
            state.data.rt = state.datas[0].rt
            state.data.rw = state.datas[0].rw
            state.data.studio = state.datas[0].kode.toString() ?? ''
            state.data.status_user = state.datas[0].status_users.toString()?? ''
            action.value = 'UPDATE';

            let urls=''
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                urls = Api.get('/admin/contract', {
                    params: {
                        id : id
                    } 
                })
            }else{
                urls = Api.get('/sales/contract', {
                    params: {
                        id : id
                    } 
                })
            }

            urls.then((responses) => {
                state.listContract = responses.data.data
                headerFooterModalPreview.value = true
                loadingsycn.value = false
                basicModalPreview.value = false
            }) .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
    

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

    const selectType = async (value) => {
    

        
        if(!value){
            state.data.totprice = price.value
            state.data.extraDisc =  0
        }else if (value==0) {
            if(actionContract.value==='Upgrade'){
                state.data.totprice = (fee.value  * (1 - extraDisc.value / 100) * 1) - priceavailable.value
            }else{
                state.data.totprice = fee.value * (1 - extraDisc.value / 100) * 1
            }
            state.data.extraDisc = extraDisc.value + ' %'
    
        }else if(value==1) {
            if(actionContract.value==='Upgrade'){
                state.data.totprice = fee.value - extraPotongan.value - priceavailable.value
            }else{
                state.data.totprice = fee.value - extraPotongan.value
            }
        
            state.data.extraDisc =  (1 * extraPotongan.value)
        }
    }

    const selectBR = async (value) => {
        let url=''
        loading.value=true
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get("/admin/master_br")
        }else{
            url = Api.get("/sales/master_br")
        }

        url.then((response) => {
            if(!value){
                state.data.discBR = 0
                finalprice.value = state.data.totprice
            }else if (value==0) {
                state.data.discBR = 0
                finalprice.value = state.data.totprice
            }else{
                state.data.discBR = parseInt(response.data.data[0].disc)
                finalprice.value = parseInt(state.data.totprice) * (1 - state.data.discBR / 100) * 1
            }

            loading.value = false
        
            }).catch((error) => {
        
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    

    }

    const editContract = async (id) => {
        actionContract.value='Update'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/contract', {
                params: {
                    idcontract: id,
                },
            })
        }else{
            url = Api.get('/sales/contract', {
                params: {
                    idcontract: id,
                },
            })
        }

        url.then((responses) => {
            state.datas = responses.data.data

            courses.value = responses.data.packages.map((pkg, index) => {
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
                        loading.value=false
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
                    Api.get("/sales/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
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

                return {
                    ...pkg,
                    packages: pkg.packages + 'pemisah' + index,
                    start_date: pkg.start_date === '0000-00-00' ? null : dayjs(pkg.start_date), // Menggunakan null jika tidak valid
                    end_date: pkg.end_date === '0000-00-00' ? null : dayjs(pkg.end_date),       
                    index: index + 1
                };
            });

            totalPrice.value = courses.value.reduce((total, data) => {
                return total + (parseInt(data.price));
            }, 0);
            fee.value=totalPrice.value * (1 - disc.value / 100) * 1


            state.data.idcontract = state.datas[0].idcontract;
            state.data.relation =  state.datas[0].relation;
            state.data.relation_name =  state.datas[0].relation_name;
            state.data.relation_telp =  state.datas[0].relation_number ?? '';
            state.data.validity = state.datas[0].validity;
            state.data.sessions = state.datas[0].sessions;
            state.data.contrack_no = state.datas[0].contrack_no
            state.data.type_member = state.datas[0].bundling
            state.data.nama_sales = state.datas[0].sales
            state.data.emergency_pc=state.datas[0].emergency_pc
            state.data.emergency_relation=state.datas[0].emergency_relation
            state.data.emergency_number=state.datas[0].emergency_number
            disc.value=  state.datas[0].disc;
            packages_name.value = state.datas[0].id_package.toString();
            packages.value =  state.datas[0].type;
            program.value = state.datas[0].id_program.toString();
        
            fee.value=totalPrice.value * (1 - disc.value / 100) * 1

            amount.value = state.datas[0].amount_paid;
            state.data.payment_type =  state.datas[0].payment_type;
            state.data.payment_method =  state.datas[0].payment_method;
            studio.value=  state.datas[0].id_studio.toString();
            state.data.desc =  state.datas[0].desc;
            typeDisc.value = state.datas[0].disc_type
            typeBR.value = state.datas[0].type_br.toString()
            state.data.discBR=state.datas[0].disc_br
            
            if (typeDisc.value==0) {
                state.data.totprice = fee.value * (1 - state.datas[0].extra_disc / 100) * 1
                state.data.extraDisc = state.datas[0].extra_disc + ' %'
                
        
            }else if(typeDisc.value==1) {
                state.data.totprice = fee.value - state.datas[0].extra_disc 
                state.data.extraDisc =  (1 * state.datas[0].extra_disc )
            }

            if (typeBR.value==0) {
                state.data.discBR = 0
                finalprice.value = state.data.totprice
            }else{
                state.data.discBR = parseInt(state.datas[0].disc_br)
                finalprice.value = parseInt(state.data.totprice) * (1 - state.datas[0].disc_br  / 100) * 1
            }   
    
            state.data.referalcode =  state.datas[0].referral_code;
            state.data.status_contract =  state.datas[0].status_contract.toString();
            state.data.type_contract =  state.datas[0].type_contract;
            state.data.file =  state.datas[0].file;
            state.data.ttd =  state.datas[0].ttd;

            ContractModal.value = true
            loadingsycn.value = false
            basicModalPreview.value = false
        }) .catch((error) => {
            
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
        

    }



    const renewalContract = async (id) => {
        actionContract.value='Renewal'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/contract', {
                params: {
                    idcontract: id,
                },
            })
        }else{
            url = Api.get('/sales/contract', {
                params: {
                    idcontract: id,
                },
            })
        }

        url.then((responses) => {
            state.datas = responses.data.data

    

            state.data.idcontract = state.datas[0].idcontract;
            state.data.relation =  state.datas[0].relation;
            state.data.relation_name =  state.datas[0].relation_name;
            state.data.relation_telp =  state.datas[0].relation_number ?? '';
            state.data.validity = state.datas[0].validity;
            state.data.sessions = state.datas[0].sessions;
            state.data.contrack_no = state.datas[0].contrack_no
            state.data.type_member = state.datas[0].bundling
            state.data.nama_sales = state.datas[0].sales
            state.data.emergency_pc=state.datas[0].emergency_pc
            typeBR.value = state.datas[0].type_br.toString()
            state.data.discBR=state.datas[0].disc_br
            state.data.emergency_pc=state.datas[0].emergency_pc
            state.data.emergency_relation=state.datas[0].emergency_relation
            state.data.emergency_number=state.datas[0].emergency_number
            disc.value=  state.datas[0].disc;
            packages_name.value = state.datas[0].id_package.toString();
            packages.value =  state.datas[0].type;
            program.value = state.datas[0].id_program.toString();
        

            studio.value=  state.datas[0].id_studio.toString();
            typeDisc.value = state.datas[0].disc_type

            
            courses.value = responses.data.packages.map((pkg, index) => {
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
                        loading.value=false
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
                    Api.get("/sales/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
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
                return {
                    ...pkg,
                    packages: pkg.packages + 'pemisah' + index,
                    start_date: pkg.start_date === '0000-00-00' ? null : null, // Menggunakan null jika tidak valid
                    end_date: pkg.end_date === '0000-00-00' ? null : null,       
                    index: index + 1
                };
            });

            totalPrice.value = courses.value.reduce((total, data) => {
                return total + (parseInt(data.price));
            }, 0);

            fee.value=totalPrice.value * (1 - disc.value / 100) * 1
            
            if (typeDisc.value==0) {
                state.data.totprice = fee.value * (1 - state.datas[0].extra_disc / 100) * 1
                state.data.extraDisc = state.datas[0].extra_disc + ' %'
                
        
            }else if(typeDisc.value==1) {
                state.data.totprice = fee.value - state.datas[0].extra_disc 
                state.data.extraDisc =  (1 * state.datas[0].extra_disc )
            }

            if (typeBR.value==0) {
                state.data.discBR = 0
                finalprice.value = state.data.totprice
            }else{
                state.data.discBR = parseInt(state.datas[0].disc_br)
                finalprice.value = parseInt(state.data.totprice) * (1 - state.datas[0].disc_br  / 100) * 1
            }
    
            state.data.referalcode =  state.datas[0].referral_code;
            state.data.status_contract =  state.datas[0].status_contract.toString();
            state.data.type_contract =  "Renewal";


            ContractModal.value = true
            loadingsycn.value = false
            basicModalPreview.value = false
        }) .catch((error) => {
            console.log(error);
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    
    }



    const upgradeContract = async (id) => {
        actionContract.value='Upgrade'
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/contract', {
                params: {
                    idcontract: id,
                },
            })
        }else{
            url = Api.get('/sales/contract', {
                params: {
                    idcontract: id,
                },
            })
        }
    
        url.then((response) => {
            state.datas = response.data.data
    

            state.data.idcontract = state.datas[0].idcontract;
            state.data.relation =  state.datas[0].relation;
            state.data.relation_name =  state.datas[0].relation_name;
            state.data.relation_telp =  state.datas[0].relation_number ?? '';
            state.data.validity = state.datas[0].validity;
            state.data.sessions = state.datas[0].sessions;
            state.data.contrack_no = state.datas[0].contrack_no
            state.data.type_member = state.datas[0].bundling
            state.data.nama_sales = state.datas[0].sales
            state.data.emergency_pc=state.datas[0].emergency_pc
            state.data.emergency_relation=state.datas[0].emergency_relation
            state.data.emergency_number=state.datas[0].emergency_number
            disc.value=  state.datas[0].disc;
            packages_name.value = state.datas[0].id_package.toString();
            packages.value =  state.datas[0].type;
        
            fee.value = 0
            studio.value=  state.datas[0].id_studio.toString();
        
            
            coursesUpgrade.value = response.data.packages.map((pkg, index) => {
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
                        loading.value=false
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
                    Api.get("/sales/get_packages?id=" + pkg.typeMember)
                    .then((response) => {
                        state.listPackages = response.data.data;
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

                return {
                    ...pkg,
                    packages: pkg.packages + 'pemisah' + index,
                    price : state.datas[0].total_price,
                    start_date: pkg.start_date === '0000-00-00' ? null : dayjs(pkg.start_date), // Menggunakan null jika tidak valid
                    end_date: pkg.end_date === '0000-00-00' ? null : dayjs(pkg.end_date),        
                    index: index + 1
                };
            });

        
            state.data.referalcode =  state.datas[0].referral_code;
            state.data.status_contract =  state.datas[0].status_contract.toString();
            state.data.type_contract =  "Upgrade";


            ContractModal.value = true
            loadingsycn.value = false
            basicModalPreview.value = false
        
        }) .catch((error) => {
            
            if (error.response.data.status_code == 403) {
                router.push({ name: "403" });
            } else {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            }
        });
    
    }

    

    const typeUpg = ref([])

    const selectTypeUpg = async (value) => {
        priceavailable.value = coursesUpgrade.value.reduce((totalPrice, pkg) => {
            
            if(state.datas[0].bundling==='Bundling'){
                const isValidDate = (pkg.start_date && pkg.end_date && dayjs().isBefore(pkg.end_date)) // Pastikan tanggal belum expired;
                const isBookingIncomplete = pkg.totalbooking <= pkg.validSession; // Mengecek jika booking dan sesi tidak sama
                const isAktiv = (pkg.start_date === null  && pkg.end_date ===  null);

                if (isBookingIncomplete && (isValidDate || isAktiv)) {
                    return parseInt(totalPrice) + parseInt(pkg.price); // Menambahkan harga jika booking belum selesai dan tanggal valid
                }

                return totalPrice; // Jika kondisi tidak terpenuhi, totalPrice tetap
            }else{
                if(pkg.typeMember==='Unlimited'){
                    return parseInt(state.datas[0].total_price)
                }else{
                    if(value==='Initial Payment'){
                        return parseInt(state.datas[0].total_price)
                    }else{
                        const priceSessions = parseInt(state.datas[0].total_price) / pkg.validSession
            
                        if(pkg.totalbooking==='0'){
                            return state.datas[0].total_price
                        }else{
                            return priceSessions * (pkg.validSession - pkg.totalbooking) 
                        }
                    }
                    
                    
                }
            }
            
        }, 0);

    }

    const saveData = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        if(action.value=="INSERT"){
            let url=''
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                url = Api.post('/admin/member', {
                    name : state.data.name,
                    email : state.data.email,
                    no_telp : state.data.telp,
                    date_birth : state.data.date_birth,
                    date_birth : state.data.date_birth,
                    passport: state.data.passport,
                    studio : state.data.studio,
                    gender : state.data.gender,
                    marital : state.data.marital,
                    address : state.data.address,
                    address1 : state.data.address1,
                    address2 : state.data.address2,
                    province : province.value,
                    city : city.value,
                    district : district.value,
                    sub_district : sub_district.value,
                    rt : state.data.rt,
                    rw : state.data.rw,
                    status : state.data.status_user,
                })
            }else{
                url = Api.post('/sales/member', {
                    name : state.data.name,
                    email : state.data.email,
                    no_telp : state.data.telp,
                    date_birth : state.data.date_birth,
                    date_birth : state.data.date_birth,
                    passport: state.data.passport,
                    studio : state.data.studio,
                    gender : state.data.gender,
                    marital : state.data.marital,
                    address : state.data.address,
                    address1 : state.data.address1,
                    address2 : state.data.address2,
                    province : province.value,
                    city : city.value,
                    district : district.value,
                    sub_district : sub_district.value,
                    rt : state.data.rt,
                    rw : state.data.rw,
                    status : state.data.status_user,
                })
            }

    
            await url.then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Members Success Added"
                setHeaderFooterModalPreview(false)
                loadingsycn.value = false
                basicModalPreview.value = false
            
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        
        }else{
            let url=''
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                url = Api.put('/admin/member', {
                    id :  state.data.id,
                    name : state.data.name,
                    email : state.data.email,
                    no_telp : state.data.telp,
                    date_birth : state.data.date_birth,
                    passport: state.data.passport,
                    studio : state.data.studio,
                    gender : state.data.gender,
                    marital : state.data.marital,
                    address : state.data.address,
                    address1 : state.data.address1,
                    address2 : state.data.address2,
                    province : province.value,
                    city : city.value,
                    district : district.value,
                    sub_district : sub_district.value,
                    rt : state.data.rt,
                    rw : state.data.rw,
                    status : state.data.status_user,
                })
            }else{
                url = Api.put('/sales/member', {
                    id :  state.data.id,
                    name : state.data.name,
                    email : state.data.email,
                    no_telp : state.data.telp,
                    date_birth : state.data.date_birth,
                    passport: state.data.passport,
                    studio : state.data.studio,
                    gender : state.data.gender,
                    marital : state.data.marital,
                    address : state.data.address,
                    address1 : state.data.address1,
                    address2 : state.data.address2,
                    province : province.value,
                    city : city.value,
                    district : district.value,
                    sub_district : sub_district.value,
                    rt : state.data.rt,
                    rw : state.data.rw,
                    status : state.data.status_user,
                })
            }

            url.then(async (response) => {
                await tampilData()

                setSuccessModalPreview(true)
                pesan.value = "Members Success Updated"
            
                setHeaderFooterModalPreview(false)
                loadingsycn.value = false
                basicModalPreview.value = false
                

            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
    
        }
    }

    const tampilRole = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/role')
            .then(response => {
                state.listRole = response.data.data
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
            await Api.get('/sales/role')
            .then(response => {
                state.listRole = response.data.data
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

    const tampilDepartement = async () => {

        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/department')
            .then(response => {
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
        }else{
            await Api.get('/sales/department')
            .then(response => {
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

    }

    const tampilProvince = async () => {
        
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get("/admin/get_province")
                .then((response) => {
                state.listProvince = response.data.data;
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
            await Api.get("/sales/get_province")
                .then((response) => {
                state.listProvince = response.data.data;
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


    //contrack

    const addContract = async (text) => {
        ContractModal.value = true
        actionContract.value ='Add New'
        state.data.type_contract=text

    }

    const callback = async () => {
        let response;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            response= await apiGetData("/admin/contract", {id: state.data.id});
        }else{
            response= await apiGetData("/sales/contract", {id: state.data.id});
        }

        state.listContract = response.data

    }


    const saveContract = async (t) => {
        if (state.data.status_contract==0) {
            const allStartDatesNull = courses.value.every(course => course.start_date === null);

            if (allStartDatesNull) {
                pesan.value =  'Please Input Start Date Contract'
                setWarningModalPreview(true)
                return false;
            }
        }

        if (state.data.status_contract == 1) {
            const hasStartDate = courses.value.some(course => course.start_date !== null);
            if (hasStartDate) {
                pesan.value = 'Please Remove Start Date Contract';
                setWarningModalPreview(true);
                return false;
            }
        }

        

        let result = String(program.value).split("pemisah");
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (actionContract.value=='Add New') {
            const formdata = new FormData();
            formdata.append("ttd", signature1.value.save(t));
            formdata.append('file', capturedPhoto);
            formdata.append('id_studio', studio.value);
            formdata.append('id_member', state.data.id);
            formdata.append("item", JSON.stringify(courses.value));
            formdata.append("type_member", state.data.type_member);
            formdata.append("extra_disc", state.data.extraDisc);
            formdata.append("total_price", finalprice.value);
            formdata.append('id_program', result[0]);
            formdata.append("disc", disc.value);
            formdata.append("disc_type", typeDisc.value);
            formdata.append("discbr", state.data.discBR);
            formdata.append("typebr", typeBR.value);
            formdata.append("amount_paid", amount.value);
            formdata.append("payment_type", state.data.payment_type);
            formdata.append("payment_method", state.data.payment_method);
            formdata.append("type_contract", state.data.type_contract);
            formdata.append("desc", state.data.desc);
            formdata.append("referral_code", state.data.referalcode);
            formdata.append("sales", state.data.nama_sales);
            formdata.append("status_contract", state.data.status_contract);
            formdata.append("emergency_pc", state.data.emergency_pc);
            formdata.append("emergency_relation", state.data.emergency_relation);
            formdata.append("emergency_number", state.data.emergency_number);
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                await Api.post('/admin/contract_new', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(async (response) => {
                
                    setSuccessModalPreview(true);
                    basicModalPreview.value=false
                    pesan.value = "Contract Success Added";
                    ContractModal.value=false
                    await callback()
                    await tampilData()
                
                }).catch((error) => {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                });
            }else{
                await Api.post('/sales/contract_new', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(async (response) => {
                    setSuccessModalPreview(true);
                    basicModalPreview.value=false
                    pesan.value = "Contract Success Added";
                    ContractModal.value=false
                    await callback()
                    await tampilData()
                }).catch((error) => {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                });
            }
    
        }else{
            const formdata = new FormData();
            formdata.append("id", state.data.idcontract);
            formdata.append('id_studio', studio.value);
            formdata.append('id_member', state.data.id);
            formdata.append("item", JSON.stringify(courses.value));
            formdata.append("type_member", state.data.type_member);
            formdata.append("extra_disc", state.data.extraDisc);
            formdata.append("total_price", finalprice.value);
            formdata.append('id_program', result[0]);
            formdata.append("disc", disc.value);
            formdata.append("disc_type", typeDisc.value);
            formdata.append("discbr", state.data.discBR);
            formdata.append("typebr", typeBR.value);
            formdata.append("amount_paid", amount.value);
            formdata.append("payment_type", state.data.payment_type);
            formdata.append("payment_method", state.data.payment_method);
            formdata.append("type_contract", state.data.type_contract);
            formdata.append("desc", state.data.desc);
            formdata.append("referral_code", state.data.referalcode);
            formdata.append("sales", state.data.nama_sales);
            formdata.append("status_contract", state.data.status_contract);
            formdata.append("emergency_pc", state.data.emergency_pc);
            formdata.append("emergency_relation", state.data.emergency_relation);
            formdata.append("emergency_number", state.data.emergency_number);
            if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                await Api.post('/admin/contract_update_new', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(async (response) => {

                    setSuccessModalPreview(true);
                    basicModalPreview.value=false
                    pesan.value = "Contract Success Update";
                    ContractModal.value=false
                    await callback()
                    await tampilData()

                })
                .catch((error) => {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
                });
            }else{
                await Api.post('/sales/contract_update_new', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(async (response) => {

                    setSuccessModalPreview(true);
                    basicModalPreview.value=false
                    pesan.value = "Contract Success Update";
                    ContractModal.value=false
                    await callback()
                    await tampilData()

                })
                .catch((error) => {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    notification[error]({
                        message: 'Upps Error',
                        description: pesan.value ,
                    });
                });
            }
        
        }
        

    };

    const tampilMemberShip = async () => {

        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get("/admin/get_packages")
                .then((response) => {
                state.listMemberType = response.data.data;
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
            await Api.get("/sales/get_packages")
            .then((response) => {
                state.listMemberType = response.data.data;
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

    const tampilProgram= async () => {
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get("/admin/get_program")
            .then((response) => {
                state.listProgram= response.data.data;
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
            await Api.get("/sales/get_program")
            .then((response) => {
                state.listProgram= response.data.data;
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

    const tampilTeacher = async (page = 1) => {
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

    const editSiganture = async (id) => {
        editSigantureModal.value = true;
    };

    const editPayment = async (id) => {
        initCamera();
        editPaymentModal.value = true;
    };

    const capturePhotoEdit = async () => {

        const context = canvas.value.getContext('2d');
        context.drawImage(videoElement.value, 0, 0, canvas.value.width, canvas.value.height);
        capturedPhoto = canvas.value.toDataURL('image/png');
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append('file', capturedPhoto);
        formdata.append("id",  state.data.idcontract);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/update_payment', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true);
                pesan.value = "Payment Success Update";
                editPaymentModal.value = false
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/contract", {
                        params: {
                            idcontract: state.data.idcontract,
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.file =  state.datas[0].file;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }else{
                    Api.get("/sales/contract", {
                        params: {
                            idcontract: state.data.idcontract
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.file =  state.datas[0].file;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }
                
            })
            .catch((error) => {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            });
        }else{
            await Api.post('/sales/update_payment', formdata, {
            headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

        
                setSuccessModalPreview(true);
                pesan.value = "Payment Success Update";
                editPaymentModal.value = false
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/contract", {
                        params: {
                            idcontract: state.data.idcontract,
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.file =  state.datas[0].file;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }else{
                    Api.get("/sales/contract", {
                        params: {
                            idcontract: state.data.idcontract
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.file =  state.datas[0].file;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }
            })
            .catch((error) => {
            const object1 = error.response.data;
            pesan.value = Object.values(object1).toString();
            setWarningModalPreview(true);
            });
        }
    };

    const updateSignature = async (t) => {
        
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("ttd", signature1.value.save(t));
        formdata.append("id", state.data.idcontract);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/update_signature', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                await tampilData();
                setSuccessModalPreview(true);
                pesan.value = "Signagture Success Update";
                editSigantureModal.value = false
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/contract", {
                        params: {
                            idcontract: state.data.idcontract,
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.ttd =  state.datas[0].ttd;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }else{
                    Api.get("/sales/contract", {
                        params: {
                            idcontract: state.data.idcontract
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                
                        state.data.ttd =  state.datas[0].ttd;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        console.log(error);
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }
            })
            .catch((error) => {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            });
        }else{
            await Api.post('/sales/update_signature', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                await tampilData();
                setSuccessModalPreview(true);
                pesan.value = "Signagture Success Update";
                editSigantureModal.value = false
                if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
                    Api.get("/admin/contract", {
                        params: {
                            idcontract: state.data.idcontract,
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                    
                        state.data.ttd =  state.datas[0].ttd;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        console.log(error);
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }else{
                    Api.get("/sales/contract", {
                        params: {
                            idcontract: state.data.idcontract
                        },
                    })
                    .then((responses) => {
                        state.datas = responses.data.data
                       
                        state.data.ttd =  state.datas[0].ttd;

                        ContractModal.value = true
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    }) .catch((error) => {
                        console.log(error);
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }
            })
            .catch((error) => {
                const object1 = error.response.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            });
        }
    };

    const print =  async(id) =>  {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Sabar Dikit ya, Lagi Proses Generate  Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/printContract', {
                params: {
                    id: id
                },
                responseType: 'blob'
            })
            .then(response => {
                loadingsycn.value = false
                PrintPreview.value = true

                pdfUrl.value = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
            
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
            await Api.get('/sales/printContract', {
                params: {
                    id: id
                },
                responseType: 'blob'
            })
            .then(response => {
                loadingsycn.value = false
                PrintPreview.value = true

                pdfUrl.value = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
            
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


    };

    const viewPembayaran = async (id) => {
        state.data.idcontract = id
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/pembayaran", {
                params: {
                    id: id,
                },
            })
            .then((responses) => {
                state.listPembayaran = responses.data.data
                Totalfee.value = responses.data.fee
                totalNominal.value = state.listPembayaran.reduce((total, data) => {
                    return total + parseInt(data.nominal);
                }, 0);
                
                PembayaranModal.value = true
                loadingsycn.value = false
                basicModalPreview.value = false
            }) .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }else{
            Api.get("/sales/pembayaran", {
                params: {
                    id: id,
                },
            })
            .then((responses) => {
                state.listPembayaran = responses.data.data
                Totalfee.value = responses.data.fee
                totalNominal.value = state.listPembayaran.reduce((total, data) => {
                    return total + parseInt(data.nominal);
                }, 0);
                
                PembayaranModal.value = true
                loadingsycn.value = false
                basicModalPreview.value = false
            }) .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }

    }



    const savePembayaran = async() => {
        if (!amount_paid.value) {
            pesan.value =  'Please Insert Amount Paid'
            setWarningModalPreview(true)
            return false;
        }

        if (!state.data.ket) {
            pesan.value =  'Please Insert Ket'
            setWarningModalPreview(true)
            return false;
        }

        if (!state.data.payment_type) {
            pesan.value =  'Please Insert Type Contract'
            setWarningModalPreview(true)
            return false;
        }

        if (amount_paid.value > Math.abs(totalNominal.value - Totalfee.value)) {
            pesan.value =  'Payment is greater than the total'
            setWarningModalPreview(true)
            return false;
        }

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Waiting Process Save Payment"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const sisa = totalNominal.value - Totalfee.value;
        const formdata = new FormData();

        formdata.append('file', file.value);
        formdata.append("id", state.data.idcontract);
        formdata.append('amount', amount_paid.value);
        formdata.append('payment_type', state.data.payment_type);
        formdata.append("sisa", sisa);
        formdata.append("ket", state.data.ket);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/pembayaran',formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            
            .then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Payment Success Added"
                loadingsycn.value = false
                basicModalPreview.value = false
                Api.get("/admin/pembayaran", {
                params: {
                        id: state.data.idcontract,
                    },
                })
                .then((responses) => {
                    state.listPembayaran = responses.data.data
                    Totalfee.value = responses.data.fee
                    totalNominal.value = state.listPembayaran.reduce((total, data) => {
                        return total + data.nominal;
                    }, 0);
                    
            
                    Api.get("/admin/contract", {
                        params: {
                            id: responses.data.id_member
                        },
                    })
                    .then((responses) => {
                        state.listContract = responses.data.data
                        amount_paid.value=''
                        state.data.ket=''
                        state.data.payment_type=''
                        loadingsycn.value = false
                        basicModalPreview.value = false
                        AddPembayaranModal.value = false
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }) .catch((error) => {
                    if (error.response.data.status_code == 403) {
                        router.push({ name: "403" });
                    } else {
                        const object1 = error.response.data;
                        pesan.value = Object.values(object1).toString();
                        setWarningModalPreview(true);
                    }
                });
            
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.post('/sales/pembayaran',formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            
            .then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Payment Success Added"
                loadingsycn.value = false
                basicModalPreview.value = false
                Api.get("/sales/pembayaran", {
                params: {
                        id: state.data.idcontract,
                    },
                })
                .then((responses) => {
                    state.listPembayaran = responses.data.data
                    Totalfee.value = responses.data.fee
                    totalNominal.value = state.listPembayaran.reduce((total, data) => {
                        return total + data.nominal;
                    }, 0);
                    
            
                    Api.get("/sales/contract", {
                        params: {
                            id: responses.data.id_member
                        },
                    })
                    .then((responses) => {
                        state.listContract = responses.data.data
                        amount_paid.value=''
                        state.data.ket=''
                        state.data.payment_type=''
                        loadingsycn.value = false
                        basicModalPreview.value = false
                        AddPembayaranModal.value = false
                        loadingsycn.value = false
                        basicModalPreview.value = false
                    
                    }) .catch((error) => {
                        if (error.response.data.status_code == 403) {
                            router.push({ name: "403" });
                        } else {
                            const object1 = error.response.data;
                            pesan.value = Object.values(object1).toString();
                            setWarningModalPreview(true);
                        }
                    });
                }) .catch((error) => {
                    if (error.response.data.status_code == 403) {
                        router.push({ name: "403" });
                    } else {
                        const object1 = error.response.data;
                        pesan.value = Object.values(object1).toString();
                        setWarningModalPreview(true);
                    }
                });
            
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    


    }

    const lihatfile = async (id) => {
        FilePreview.value = true
        state.data.file = id
    }



    const addPayment = async () => {
        PembayaranModal.value = false
        AddPembayaranModal.value = true
    }

    const SaveRenewalContract = async (t) => {

        let result = String(program.value).split("pemisah");
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        const formdata = new FormData();
        formdata.append("id", state.data.idcontract);
        formdata.append("ttd", signature1.value.save(t));
        formdata.append('file', capturedPhoto);
        formdata.append('id_studio', studio.value);
        formdata.append('id_member', state.data.id);
        formdata.append("item", JSON.stringify(courses.value));
        formdata.append("type_member", state.data.type_member);
        formdata.append("extra_disc", state.data.extraDisc);
        formdata.append("total_price", finalprice.value);
        formdata.append('id_program', result[0]);
        formdata.append("disc", disc.value);
        formdata.append("disc_type", typeDisc.value);
        formdata.append("discbr", state.data.discBR);
        formdata.append("typebr", typeBR.value);
        formdata.append("amount_paid", amount.value);
        formdata.append("payment_type", state.data.payment_type);
        formdata.append("payment_method", state.data.payment_method);
        formdata.append("type_contract", state.data.type_contract);
        formdata.append("desc", state.data.desc);
        formdata.append("referral_code", state.data.referalcode);
        formdata.append("sales", state.data.nama_sales);
        formdata.append("status_contract", state.data.status_contract);
        formdata.append("emergency_pc", state.data.emergency_pc);
        formdata.append("emergency_relation", state.data.emergency_relation);
        formdata.append("emergency_number", state.data.emergency_number);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/renewal_contract', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true);
                basicModalPreview.value=false
                pesan.value = "Renewal Contract Success";
                ContractModal.value=false
                await callback()
                await tampilData()

            })
            .catch((error) => {
            const object1 = error.response.data.data;
            pesan.value = Object.values(object1).toString();
            setWarningModalPreview(true);
            });
        }else{
            await Api.post('/sales/renewal_contract', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true);
                basicModalPreview.value=false
                pesan.value = "Renewal Contract Success";
                ContractModal.value=false
                await callback()
                await tampilData()

            })
            .catch((error) => {
            const object1 = error.response.data.data;
            pesan.value = Object.values(object1).toString();
            setWarningModalPreview(true);
            });
        }
    
    };

    const saveUpgrade = async (t) => {
        let result = String(program.value).split("pemisah");
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        const formdata = new FormData();
        formdata.append("id", state.data.idcontract);
        formdata.append("ttd", signature1.value.save(t));
        formdata.append('file', capturedPhoto);
        formdata.append('id_studio', studio.value);
        formdata.append('id_member', state.data.id);
        formdata.append("item", JSON.stringify(courses.value));
        formdata.append("type_member", state.data.type_member);
        formdata.append("extra_disc", state.data.extraDisc);
        formdata.append("total_price", finalprice.value);
        formdata.append('id_program', result[0]);
        formdata.append("disc", disc.value);
        formdata.append("disc_type", typeDisc.value);
        formdata.append("discbr", state.data.discBR);
        formdata.append("typebr", typeBR.value);
        formdata.append("amount_paid", amount.value);
        formdata.append("payment_type", state.data.payment_type);
        formdata.append("payment_method", state.data.payment_method);
        formdata.append("type_contract", state.data.type_contract);
        formdata.append("desc", state.data.desc);
        formdata.append("referral_code", state.data.referalcode);
        formdata.append("sales", state.data.nama_sales);
        formdata.append("status_contract", state.data.status_contract);
        formdata.append("emergency_pc", state.data.emergency_pc);
        formdata.append("emergency_relation", state.data.emergency_relation);
        formdata.append("emergency_number", state.data.emergency_number);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/upgrade_contract_new', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true);
                basicModalPreview.value=false
                pesan.value = "Upgrade Contract Success";
                ContractModal.value=false
                await callback()
                await tampilData()

            })
            .catch((error) => {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
                });
        }else{
            await Api.post('/sales/upgrade_contract_new', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true);
                basicModalPreview.value=false
                pesan.value = "Upgrade Contract Success";
                ContractModal.value=false
                await callback()
                await tampilData()

            })
            .catch((error) => {
            const object1 = error.response.data.data;
            pesan.value = Object.values(object1).toString();
            setWarningModalPreview(true);
            });
        }
    };

    const trial = async (id) => {
        TrialModal.value = true
        state.data.id = id
    }

    const savecuti = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const formdata = new FormData();
        formdata.append('file', image.value);
        formdata.append('id', state.data.id);
        formdata.append("suspension", state.data.suspension);
        formdata.append("reason", state.data.reason);
        formdata.append("periode", state.data.periode);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/cuti', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Success Request Cuti"
                cutiModal.value = false
                loadingsycn.value = false
                basicModalPreview.value = false
            
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.post('/sales/cuti', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                await tampilData()
                setSuccessModalPreview(true)
                pesan.value = "Success Request Cuti"
                cutiModal.value = false
                loadingsycn.value = false
                basicModalPreview.value = false
            
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    
    }

    const tampilSchedule = async (page=1) => {
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/get_schedule_leads?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl_schedule.value)
            .then(response => {
                state.listSchedule = response.data.data
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
            await Api.get('/sales/get_schedule_leads?page=' + page+ '&q=' + search.value + '&status=' + status.value+  '&studio=' + studio.value+ '&tgl=' + tgl_schedule.value)
            .then(response => {
                state.listSchedule = response.data.data
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

    const saveTrial = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("id", state.data.id);
        formdata.append("shcedule", id);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/prosesTrialLagi', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Process To Trial"
                TrialModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.post('/sales/prosesTrialLagi', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Process To Trial"
                TrialModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    }

    const savebayar = async (id, action) =>{
    
        BayarModal.value = false
        if(action=='new'){
            amount.value =id
            balance.value = parseInt(finalprice.value) - parseInt(amount.value)
            if(balance.value==amount.value){
                state.data.payment_type='Full Payment'
            }else{
                state.data.payment_type='Deposit'
            }   
        }else if(action=='pelunasan'){
            amount_paid.value =id
            balance.value = parseInt(finalprice.value) - parseInt(amount.value)
            if(balance.value==amount_paid.value ){
                state.data.payment_type='Full Payment'
            }else{
                state.data.payment_type='Deposit'
            }   
        }else{
            amountnew.value =id
            balance.value = parseInt(finalprice.value) - parseInt(amount.value)
            if(balance.value==amountnew.value ){
                state.data.payment_type='Full Payment'
            }else{
                state.data.payment_type='Deposit'
            }   
        }
    
    
    }

    const kirimlogin =  async(id) =>  {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Sabar Dikit ya, Lagi Proses Kirim  Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/kirimlogin', {
                id: id
            })
            .then(response => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Silahkan Cek Akun di Whatsapp"
            
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
            await Api.post('/sales/kirimlogin', {
                id: id
            })
            .then(response => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Silahkan Cek Akun di Whatsapp"
            
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
    };

    const type_contract=ref("")

    const viewSessions = async (id, type) => {
        state.data.idcontract = id
        type_contract.value=type
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get('/admin/getBooking?page=' + state.listBooking.current_page+ '&id=' + state.data.idcontract+ '&type=' + type_contract.value)
            .then((responses) => {
                state.listBooking = responses.data.data
            
                BookingModal.value = true
                loadingsycn.value = false
                basicModalPreview.value = false
            }) .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }else{
            Api.get('/sales/getBooking?page=' + state.listBooking.current_page+ '&id=' + state.data.idcontract+ '&type=' + type_contract.value)
            .then((responses) => {
                state.listBooking = responses.data.data
                BookingModal.value = true
                loadingsycn.value = false
                basicModalPreview.value = false
            }) .catch((error) => {
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }

    }

    const handlePageChange = (newPage) => {
        state.listBooking.current_page = newPage;
        viewSessions(state.data.idcontract, type_contract.value);
    }

    const tgl_booking = ref(moment().format('YYYY-MM-DD'))
    const addbooking = async () => {
        ModalAddBooking.value = true
    }

    const typeMember = (value) => {
        state.data.type_member=value
    }

    const saveBooking = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("id", state.data.idcontract);
        formdata.append("tgl", tgl_booking.value);
        formdata.append("studio", state.data.studio);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/addbypassbooking', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Add Bypass Booking"
                viewSessions(state.data.idcontract,type_contract.value);
                ModalAddBooking.value = false
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.post('/sales/addbypassbooking', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Add Bypass Booking"
                viewSessions(state.data.idcontract, type_contract.value);
                ModalAddBooking.value = false
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    }
    

    onMounted(async () => {
        // Jalankan beberapa pemanggilan data secara paralel
        await Promise.all([
            tampilData(),
            tampilDepartement(),
            tampilProvince(),
            tampilMemberShip(),
            tampilProgram(),
            tampilTeacher(),
            tampilRole(),
            tampilSchedule()
        ]);

        // Setelah pemanggilan data selesai, lanjutkan logika berikut
        if (user.group_studio == null) {
            state.listDepartementGroup = state.listDepartement.map(dept => dept.deptname);
        } else {
            const tempatArray = user.group_studio.split(',');
            state.listDepartementGroup = tempatArray;
        }
    });


    
    onBeforeUnmount(async() => {
        // Tutup aliran video ketika komponen di-unmount
        if (videoStream) {
            const tracks = videoStream.getTracks();
            tracks.forEach(track => track.stop());
        }

        
    });

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })


    watch(tanggal, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(roles, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

    watch(province, (newQuestion, oldQuestion) => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_city?id=" + province.value)
            .then((response) => {
                state.listCity = response.data.data;
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
        }else{
            Api.get("/sales/get_city?id=" + province.value)
            .then((response) => {
                state.listCity = response.data.data;
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
    });

    watch(city, (newQuestion, oldQuestion) => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_district?id=" + city.value)
                .then((response) => {
                state.listDistrict = response.data.data;
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
        }else{
            Api.get("/sales/get_district?id=" + city.value)
            .then((response) => {
                state.listDistrict = response.data.data;
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

    });

    
    const exportExcel = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        const statusMember = status.value
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get(`/admin/exportExcelMember`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Member Yogafit.xlsx`);
                    document.body.appendChild(link);
                    link.click();
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
            await Api.get(`/sales/exportExcelMember/${statusMember}`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Member Yogafit.xlsx`);
                    document.body.appendChild(link);
                    link.click();
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

    const exportExcelTrial = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        const statusMember = status.value
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get(`/admin/exportExcelMemberTrial`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Member Yogafit Trial.xlsx`);
                    document.body.appendChild(link);
                    link.click();
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
            await Api.get(`/sales/exportExcelMemberTrial`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Member Yogafit Trial.xlsx`);
                    document.body.appendChild(link);
                    link.click();
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

    const getpaket = (value) => {
    
        let result = value.split("pemisah");


        loading.value=true
        const courseIndex = result[1];
        if(typeUpg.value==='Initial Payment'){
    
            
            const updatedCourse = {
                ...courses.value[courseIndex],  
                typeMember: result[0],
                start_date: coursesUpgrade.value[0].start_date,
                end_date: coursesUpgrade.value[0].end_date,
                validSession: 0,
                validMonth: 0, 
                price: parseInt(0)
            };

             // Update the course object directly
            courses.value[courseIndex] = updatedCourse;

        }else{
            const updatedCourse = {
                ...courses.value[courseIndex],  
                typeMember: result[0],
                validSession: 0,
                validMonth: 0, 
                price: parseInt(0)
            };

             // Update the course object directly
            courses.value[courseIndex] = updatedCourse;
        }
        
        state.listPackages =  {}
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_packages?id=" + result[0])
            .then((response) => {
                state.listPackages = response.data.data;
                loading.value=false
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
            Api.get("/sales/get_packages?id=" + result[0])
            .then((response) => {
                state.listPackages = response.data.data;
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
    }

    const getStart = (value, index) => {
        if(typeUpg.value==='Initial Payment'){
            const courseIndex = index;
            const course = courses.value[courseIndex];

            const updatedCourse = {
            ...course,  
                start_date: coursesUpgrade.value[0].start_date, // Tetapkan start_date dengan nilai baru
                end_date: coursesUpgrade.value[0].end_date
            };

            courses.value[courseIndex] = updatedCourse;
            
            pesan.value =  'Cannot change the start date when the Initial Payment type is selected'
            setWarningModalPreview(true)
            return false;
        }

        let endDate

        const courseIndex = index;
        const course = courses.value[courseIndex];

        // Misalkan masa validitas kursus disimpan di `course.validity` (dalam bulan)
        const validityInMonths = course.validMonth

        
        if(value===null){
            endDate=null
        }else{
            endDate=dayjs(value).add(validityInMonths, 'month')
        }
        

        const updatedCourse = {
            ...course,  
            start_date: value, // Tetapkan start_date dengan nilai baru
            end_date: endDate
        };

        courses.value[courseIndex] = updatedCourse;
    }

    const totalPrice = ref(0)

    const getSesi = (value) => {
        let result = value.split("pemisah");
        loading.value=true
        const courseIndex = result[1];
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_packages?packages_name=" + result[0])
            .then((response) => {
            
                
                const updatedCourse = {
                    ...courses.value[courseIndex],  
                    validSession: response.data.data[0].sessions,
                    validMonth: response.data.data[0].validity, 
                    price: parseInt(response.data.data[0].price)
                };

                // Update the course object directly
                courses.value[courseIndex] = updatedCourse;

                totalPrice.value = courses.value.reduce((total, data) => {
                return total + (parseInt(data.price));
                }, 0);

                fee.value=totalPrice.value * (1 - disc.value / 100) * 1

                if(!typeDisc.value){
                    state.data.totprice = price.value
                    state.data.extraDisc =  0
                }else if (typeDisc.value==0) {
                    state.data.totprice = fee.value * (1 - extraDisc.value / 100) * 1
                    state.data.extraDisc = extraDisc.value + ' %'
            
                }else if(typeDisc.value==1) {
                    state.data.totprice = fee.value - extraPotongan.value
                    state.data.extraDisc =  (1 * extraPotongan.value)
                }

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
        }else{
            Api.get("/sales/get_packages?packages_name=" + result[0])
            .then((response) => {
            
                const updatedCourse = {
                    ...courses.value[courseIndex],  
                    validSession: response.data.data[0].sessions,
                    validMonth: response.data.data[0].validity, 
                    price: parseInt(response.data.data[0].price)
                };

                // Update the course object directly
                courses.value[courseIndex] = updatedCourse;

                totalPrice.value = courses.value.reduce((total, data) => {
                return total + (parseInt(data.price));
                }, 0);

                fee.value=totalPrice.value * (1 - disc.value / 100) * 1

                if(!typeDisc.value){
                    state.data.totprice = price.value
                    state.data.extraDisc =  0
                }else if (typeDisc.value==0) {
                    state.data.totprice = fee.value * (1 - extraDisc.value / 100) * 1
                    state.data.extraDisc = extraDisc.value + ' %'
            
                }else if(typeDisc.value==1) {
                    state.data.totprice = fee.value - extraPotongan.value
                    state.data.extraDisc =  (1 * extraPotongan.value)
                }

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
    }

    const getProgram = async (value) => {
        typeDisc.value = ""
        loading.value = true
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_program?id=" + value)
                .then((response) => {
                    extraDisc.value = parseInt(response.data.data[0].disc_program)
                    extraPotongan.value = parseInt(response.data.data[0].potongan_harga)
                    loading.value = false
            
                }).catch((error) => {
            
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }else{
            Api.get("/sales/get_program?id=" + value)
                .then((response) => {
                    extraDisc.value = parseInt(response.data.data[0].disc_program)
                    extraPotongan.value = parseInt(response.data.data[0].potongan_harga)
                    loading.value = false
            
                }).catch((error) => {
            
                if (error.response.data.status_code == 403) {
                    router.push({ name: "403" });
                } else {
                    const object1 = error.response.data.data;
                    pesan.value = Object.values(object1).toString();
                    setWarningModalPreview(true);
                }
            });
        }
    }

    watch(district, (newQuestion, oldQuestion) => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            Api.get("/admin/get_subdistrict?id=" + district.value)
            .then((response) => {
                state.listSubDistrict = response.data.data;
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
        }else{
            Api.get("/sales/get_subdistrict?id=" + district.value)
            .then((response) => {
                state.listSubDistrict = response.data.data;
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

    });


    watch(disc, (newQuestion, oldQuestion) => {
        fee.value=totalPrice.value * (1 - disc.value / 100) * 1
    });




    watch(tgl_schedule, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilSchedule()
    })

    watch(studio, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilSchedule()
    })

    watch(tanggalbayar, (newQuestion, oldQuestion) => {
    
        loading.value= false
        tampilBayar()
    })


    watch(searchbayar, (newQuestion, oldQuestion) => {
        searchingbayar()
    })

    const searchingbayar = useDebounceFn(() => {
        loading.value= false
        tampilBayar()
    }, 500)

</script>


<style scoped>
    .sticky-column {
        position: sticky;
        left: 0;
        z-index: 1;
    
    }

    .sticky-column1 {
        position: sticky;
        left: 58px;
        z-index: 1;
    
    }

    .sticky-column3 {
        position: sticky;
        left: 151px;
        z-index: 1;
    
    }

    .sticky-columnAction {
        position: sticky;
        right: 0;
        z-index: 1;
    
    }


    .sticky-column th, .sticky-column td {
        white-space: nowrap;
    }
</style>