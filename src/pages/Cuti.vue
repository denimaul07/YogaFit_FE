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
                <RouterLink :to="{ name: 'cuti' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Request Cuti</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Request Cuti</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
        
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <!-- <div class="col-span-12 md:col-span-2 2xl:col-span-2">
            <div class="pb-10 -mb-10 2xl:border-l">
                <div class="grid grid-cols-12 pl-0 2xl:pl-0 gap-x-6 2xl:gap-x-0 gap-y-6">
                    <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-10 2xl:col-span-12 2xl:mt-8">
                        <listMenu></listMenu>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="col-span-12 2xl:col-span-12 pt-12"> 
        
            <div class="grid grid-cols-12 gap-6">

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
                            v-model="search"
                            />
                            <Lucide
                            icon="Search"
                            class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                            />
                        </div>
                        
                    </div>
                </div>
            
                <div class="col-span-12 sm:col-span-12 xl:col-span-12  intro-y">
                    <div class="col-span-12 2xl:col-span-3">
                        <div class="overflow-x-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Name Member
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Suspension
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Reason
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Periode
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Sales Request
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Date Request
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Approve By
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Date Approve
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Document
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
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
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
                                            {{ data.name }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.deptname }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.suspension }}
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.reason }} 
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.periode }} Month
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.request }} 
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.date_request }} 
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.approve }} 
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.date_approve }} 
                                        </Table.Td>
                                        <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.file ?? '-' }} 
                                        </Table.Td>
                                        
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                            <div
                                                :class="[
                                                'flex items-center justify-center',
                                                    { 'text-danger': data.status_cuti==0 },
                                                    { 'text-success': data.status_cuti==1 }
                                                ]"
                                            >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div v-if="data.status_cuti==0">Pending</div>
                                                <div v-else-if="data.status_cuti==1">Approve</div>
                                            
                                            </div>
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <a class="flex items-center text-success" href="#" @click="edit(data.idcuti, data.id_member)">
                                                    <Lucide icon="Eye" class="w-4 h-4 mr-1" /> 
                                                </a>
                                            </div>
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

    <Dialog size="xl" :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)" >
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title>
                        <h2 class="mr-auto text-base font-medium">
                            Detail Members
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
                                <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left" >Studio</FormLabel>
                                <FormInput type="text" class="w-full" v-model="state.data.studio" placeholder="Insert Passport/ID" />
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

                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <Preview class="intro-y box">
                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                    <h2 class="mr-auto text-base font-medium">Contract List</h2>
                                </div>
                                <div class="p-5">
                                    <Preview.Panel>
                                        <div class="overflow-x-auto">
                                            <Table>
                                                <Table.Thead class="bg-primary text-white">
                                                    <Table.Tr>
                                                        <Table.Th class="whitespace-nowrap">#</Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Package</Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Type Package </Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Sessions </Table.Th>
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
                                                        <Table.Td class="whitespace-nowrap">{{ data.sessions }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.deptname }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.start_date }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.end_date }}</Table.Td>
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
                        <Button variant="primary" type="button" class="w-40" @click="saveData" v-if="state.data.status_user!=3">
                            Approve Cuti
                        </Button>
                    </Dialog.Footer>
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
    import { ClassicEditor } from "../base-components/Ckeditor";
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
    const image = ref("")
    const tanggal= ref(moment().startOf('month').format('YYYY-MM-DD')+" - "+moment().endOf('month').format('YYYY-MM-DD'))
    const pesan = ref("")
    const source = ref("")
    const show = ref(20)
    const province = ref("");
    const city = ref("");
    const district = ref("");
    const sub_district = ref("");
    const action = ref("Add New")
    const baseUrl = ref('https://login.yogafitidonline.com/api/storage/studio/')
    const state = reactive(
        {
            listContract:{},
            listProvince: {},
            listSubDistrict: {},
            listCity: {},
            listDistrict: {},
            listData:{},
            datas : "",
            data : {
                id: "",
                id_members: "",
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
                status_user:"",
            
            }
        }
    )

    const headerFooterModalPreview = ref(false);
    const setHeaderFooterModalPreview = (value) => {
        headerFooterModalPreview.value = value;
        if(headerFooterModalPreview.value==false){
            state.data.name = '';
            state.data.email = '';
            state.data.id = '';
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



    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/leader/cuti?page=' + page+ '&q=' + search.value)
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


    const edit = async (id, member) => {
        state.data.id = id
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/leader/users', {
            params: {
                id : member
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id_members = state.datas[0].id
            state.data.name = state.datas[0].name
            state.data.email = state.datas[0].email
            state.data.telp = state.datas[0].no_telp
            state.data.date_birth = state.datas[0].date_birth
            state.data.passport = state.datas[0].passport
            state.data.gender = state.datas[0].gender
            state.data.marital = state.datas[0].marital
            state.data.address = state.datas[0].address
            state.data.address1 = state.datas[0].address1
            state.data.address2 = state.datas[0].address2
            province.value = state.datas[0].province ?? ''
            city.value = state.datas[0].city ?? ''
            district.value = state.datas[0].district ?? ''
            sub_district.value = state.datas[0].sub_district ?? ''
            state.data.rt = state.datas[0].rt
            state.data.rw = state.datas[0].rw
            state.data.studio = state.datas[0].departments.deptname
            state.data.status_user = state.datas[0].status_users.toString() ?? ''
            action.value = 'UPDATE';
            Api.get("/leader/contract", {
                params: {
                    id: member,
                },
            })
            .then((responses) => {
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

    const tampilProvince = async () => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        await Api.get("/leader/get_province")
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
    };

    const saveData = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const formdata = new FormData();
        formdata.append('id', state.data.id);
        formdata.append('idmember', state.data.id_members);
        await Api.post('/leader/approveCuti', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(async (response) => {
            await tampilData()
            setSuccessModalPreview(true)
            pesan.value = "Success Approve Cuti"
            headerFooterModalPreview.value = false
            loadingsycn.value = false
            basicModalPreview.value = false
        
        }).catch(error => {
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    onMounted(async() => {
    
        await tampilData()
        await  tampilProvince();
    })



    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

    watch(province, (newQuestion, oldQuestion) => {
    const token = localStorage.getItem("token_yogafit");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    Api.get("/leader/get_city?id=" + province.value)
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
    });

    watch(city, (newQuestion, oldQuestion) => {
    const token = localStorage.getItem("token_yogafit");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    Api.get("/leader/get_district?id=" + city.value)
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
    });

    watch(district, (newQuestion, oldQuestion) => {
    const token = localStorage.getItem("token_yogafit");
    Api.defaults.headers.common["Authorization"] = "Bearer " + token;
    Api.get("/leader/get_subdistrict?id=" + district.value)
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
    });

</script>

