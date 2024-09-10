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
                <RouterLink :to="{ name: 'ListDetailCRM' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> List Data CRM</RouterLink>
            </div>
            
        </div>
    
    </div>

    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       

            <div class="items-center sm:flex sm:mr-4">
                <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                    Filter
                </label>
                <FormSelect v-model="status" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                    <option value="total">Semua Data</option>
                    <option value="0">Need Fu</option>
                    <option value="1">Proses</option>
                    <option value="2">Prospect</option>
                    <option value="3">Loss</option>
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
                                startDate: new moment(startDate).format('DD-MMM-YYYY'),
                                endDate: new moment(endDate).format('DD-MMM-YYYY'),
                    }" class="block w-56 mx-auto" />

            </div>

            <div class="hidden mx-auto md:block text-black">
                <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data CRM</h2>
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
        
        <!-- BEGIN: Data List -->
        <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
            <div class="overflow-x-auto">
                <Table class="border-spacing-y-[10px] border-separate -mt-2">
                    <Table.Thead class="bg-primary text-white">
                        <Table.Tr>
                            <Table.Th class="border-b-0 whitespace-nowrap"> No </Table.Th>
                            <Table.Th class="border-b-0 whitespace-nowrap text-center"> Action </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Tanggal </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Nama Customers </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> No Telp </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Email </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Source </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Trial </Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Remarks</Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Ket Remarks</Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Sales</Table.Th>
                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
            
                        <Table.Tr v-if="loading" class="intro-x">
                            <Table.Td colspan="12" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                <div class="flex flex-col items-center justify-end col-span-12">
                                    <LoadingIcon icon="audio" class="w-8 h-8" />
                                    <div class="mt-2 text-xs text-center">Processing Data</div>
                                </div>
                            </Table.Td>
                        </Table.Tr>

                        <Table.Tr v-if="state.listData.total==0" class="intro-x">
                            <Table.Td colspan="12" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                <div class="flex flex-col items-center justify-end col-span-12">
                                    <div class="mt-2 text-xs text-center">Data Not Found</div>
                                </div>
                            </Table.Td>
                        </Table.Tr>

                        <Table.Tr v-for="(data, index) in state.listData.data" :key="data.id" class="intro-x">
                            
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                {{ state.listData.from + index }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                <div class="flex items-center justify-center">
                                    <Tippy as="div"  content="Proses CRM" v-if="data.status_crm==0">
                                        <a class="flex items-center text-success" href="#" @click="proses(data.id)">
                                            <Lucide icon="CheckCircle" class="w-4 h-4 mr-1" /> 
                                        </a>
                                    </Tippy>
                                    <Tippy as="div"  content="View CRM"  v-else>
                                        <a class="flex items-center text-success" href="#" @click="edit(data.id)">
                                            <Lucide icon="Eye" class="w-4 h-4 mr-1" /> 
                                        </a>
                                    </Tippy>
                                    <Tippy as="div"  content="Proses Members" v-if="data.status_crm > 1 && data.proses == 0">
                                        <a class="flex items-center text-primary ml-5" href="#" @click="member(data.id)">
                                            <Lucide icon="UserCheck" class="w-4 h-4 mr-1" /> 
                                        </a>
                                    </Tippy>
                                    <Tippy as="div"  content="Proses Trial"  v-if="data.status_crm > 1 && data.proses == 0">
                                        <a class="flex items-center text-yellow-500 ml-5" href="#" @click="trial(data.id)">
                                            <Lucide icon="Send" class="w-4 h-4 mr-1" /> 
                                        </a>
                                    </Tippy>
                                </div>
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.tanggal }}
                            </Table.Td>
                            <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.nama }}
                            </Table.Td>
                            <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.telp }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.email }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.source }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.trial }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.remarks }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap" v-html="data.ket_remarks">
                    
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                {{ data.create_name }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                <div
                                    :class="[
                                    'flex items-center justify-center',
                                        { 'text-success': data.status_crm==0 },
                                        { 'text-warning': data.status_crm==1 },
                                        { 'text-primary': data.status_crm==2 },
                                        { 'text-danger': data.status_crm==3 },
                                    ]"
                                >
                                    <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                    <div v-if="data.status_crm==0">Need FU</div>
                                    <div v-else-if="data.status_crm==1">Process</div>
                                    <div v-else-if="data.status_crm==2">Prospect</div>
                                    <div v-else-if="data.status_crm==3">Loss</div>
                                
                                </div>
                            </Table.Td>
                            
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>

        </div>
        <!-- END: Data List -->

        <!-- END: Users Layout -->
        
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
                <Button type="button" variant="primary" @click="setSuccessModalPreview(false)" class="w-24">
                    Ok
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="warningModalPreview" @close="setWarningModalPreview(false)">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
                <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
                <div class="mt-2 text-slate-500"> {{ pesan }}</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="setWarningModalPreview(false)" class="w-24">
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

    <Dialog class="relative" size="full" :open="addModal"  @close="setaddModal(false)">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Detail Leads
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setaddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Date</FormLabel>
                                    <FormInput type="text" class="col-span-8" v-model="state.data.tanggal" readonly/>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Sales</FormLabel>
                                    <FormInput type="text" class="col-span-8" v-model="state.data.create_name" readonly/>
                                </FormInline>

                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Customers Name</FormLabel>
                                    <FormInput type="text" class="col-span-8" v-model="state.data.nama" />
                                </FormInline>
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                        

                            <FormInline class="mt-5">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Email</FormLabel>
                                <FormInput type="text" class="col-span-8" v-model="state.data.email" />
                            </FormInline>

                            <FormInline class="mt-5">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Phone Number</FormLabel>
                                <FormInput type="text" class="col-span-8" v-model="state.data.telp" />
                            </FormInline>

                            

                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-5">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Source</FormLabel>
                                <TomSelect v-model="state.data.source" :options="{placeholder: 'Select Source'}" class="w-full">
                                    <option value="">Select Source</option>
                                    <option v-for="item in state.listSource" :key="item.id" :value="item.source">{{item.source}}</option>
                                </TomSelect>
                            </FormInline>
                        
                            <FormInline class="mt-5">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Trial</FormLabel>
                                <TomSelect v-model="state.data.trial" :options="{placeholder: 'Select Trial'}" class="w-full">
                                    <option value="">Select Trial</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </TomSelect>
                            </FormInline>

                        
                        </div>

                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <Preview class="intro-y box">
                                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                                    <h2 class="mr-auto text-base font-medium">History FollowUp</h2>
                                    <Button variant="primary" class="mr-2 shadow-md" @click="addfollowup">
                                        <span class="flex items-center justify-center w-30 h-5">
                                            <Lucide icon="Plus" class="w-4 h-4" /> Add New Followup
                                        </span>
                                    </Button>
                                </div>

                                

                                <div class="p-5">
                                    <Preview.Panel>
                                        <div class="overflow-x-auto">
                                            <Table>
                                                <Table.Thead class="bg-primary text-white">
                                                    <Table.Tr>
                                                        <Table.Th class="whitespace-nowrap">#</Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Remarks</Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Ket Remarks </Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Image</Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Create Date </Table.Th>
                                                        <Table.Th class="whitespace-nowrap"> Create Name </Table.Th>

                                                    </Table.Tr>
                                                </Table.Thead>
                                            
                                                <Table.Tbody>
                                                
                                                    <Table.Tr v-if="state.litsHistory.length==0" class="intro-x">
                                                        <Table.Td colspan="5" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                            </div>
                                                        </Table.Td>
                                                    </Table.Tr>

                                                    <Table.Tr v-for="(data, index) in state.litsHistory" :key="index">
                                                        <Table.Td>{{ index+1 }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.kat }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap" v-html="data.keterangan"></Table.Td>
                                                        <Table.Td class="whitespace-nowrap">
                                                            <a class="flex items-center mr-3 text-success" href="#" @click="lihatfile(data.file)" v-if="data.file!=''">
                                                                <Lucide icon="View" class="w-4 h-4 mr-1" />
                                                                Lihat File
                                                            </a>
                                                            <a class="flex items-center mr-3 text-danger" href="#" @click="lihatfile(data.file)" v-else>
                                                                -
                                                            </a>
                                                        </Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.tgl }}</Table.Td>
                                                        <Table.Td class="whitespace-nowrap">{{ data.created_name }}</Table.Td>
                                                        <!-- <Table.Td> 
                                                            <a class="flex items-center mr-3 text-success" href="#" @click="editFollowup(data.id, data.kat, data.keterangan)">
                                                                <Lucide icon="CheckSquare" class="w-4 h-4 mr-1" />
                                                                Edit
                                                            </a>
                                                        </Table.Td> -->
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </Preview.Panel>
                                </div>
                            </Preview>
                        </div>
                    </Dialog.Description>
                    <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                        <Button type="button" variant="outline-secondary" @click="setaddModal(false)" class="w-20 mr-1">
                            Cancel
                        </Button>
                    
                        <Button variant="primary" type="button" class="w-20" @click="save" v-if="state.data.status_crm < 2">
                            Update 
                        </Button>
                    </Dialog.Footer>
                
                </DialogPanel>

                <Dialog :open="NewFollowUpPreview" size="xl"  @close="setNewFollowUpPreview(false)">
                    <Dialog.Panel>
                        <Dialog.Title>
                            <h2 class="mr-auto text-base font-medium">
                            {{action}} FollowUp
                            </h2>

                        </Dialog.Title>
                        <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Remarks</FormLabel>
                                    <TomSelect v-model="state.data.kat" :options="{placeholder: 'Select Remarks'}" class="w-full">
                                        <option value="">Select Remarks</option>
                                        <option v-for="item in state.listKategori" :key="item.id" :value="item.kategori">{{item.kategori}}</option>
                                    </TomSelect>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Image</FormLabel>
                                    <FormInput   type="file"
                                            @change="onFileChange"
                                            accept="image/x-png,image/gif,image/jpeg" class="col-span-8"/>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                                <FormInline class="mt-5">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;">Status</FormLabel>
                                    <FormSelect v-model="state.data.status_crm" :options="{placeholder: 'Select Status'}" class="w-full">
                                        <option value="">Select Status</option>
                                        <option value="1">Process</option>
                                        <option value="2">Prospect</option>
                                        <option value="3">Loss</option>
                                    </FormSelect>
                                </FormInline>
                            </div>

                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Ket Remarks</FormLabel>
                                <ClassicEditor v-model="state.data.keterangan"  />
                            </div>
                        
                        </Dialog.Description>
                        <Dialog.Footer>
                            <Button type="button" variant="outline-secondary" @click="setNewFollowUpPreview(false)" class="w-20 mr-1">
                                Cancel
                            </Button>
                            <Button variant="primary" type="button" class="w-20" @click="saveFollowup" v>
                                Save
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Panel>
                </Dialog>

                <Dialog :open="FilePreview" size="xl"  @close="setFilePreview(false)">
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
                                                :src="baseUrl+state.data.file"
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
            </div>
        </div>
    </Dialog>

    <Dialog :open="deleteModalPreview" @close="setDeleteModalPreview(false);">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin membatalkan ticket ini? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di hapus.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setDeleteModalPreview(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="batal">
                    Batal
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog class="relative" size="lg"  :open="FollowModalPreview" @close="setFollowModalPreview(false);">
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    Process Leads
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setFollowModalPreview(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <FormInline class="mt-5">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Remarks</FormLabel>
                        <TomSelect v-model="state.data.remarks" :options="{placeholder: 'Select Remarks'}" class="w-full">
                            <option value="">Select Remarks</option>
                            <option v-for="item in state.listKategori" :key="item.id" :value="item.kategori">{{item.kategori}}</option>
                        </TomSelect>
                    </FormInline>
                </div>

                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                    <FormInline class="mt-5">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;">Image</FormLabel>
                        <FormInput   type="file"
                                @change="onFileChange"
                                accept="image/x-png,image/gif,image/jpeg" class="col-span-8"/>
                    </FormInline>
                </div>

                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Ket Remarks</FormLabel>
                    <ClassicEditor v-model="state.data.ket_remarks"  />
                </div>
            </Dialog.Description>
            <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                <Button type="button" variant="outline-secondary" @click="setFollowModalPreview(false)" class="w-20 mr-1">
                    Cancel
                </Button>
            
                <Button variant="primary" type="button" class="w-40" @click="prosesLeads">
                    PROCESS
                </Button>
            </Dialog.Footer>
        
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="MemberModal" @close="setMemberModal(false);"  :initialFocus="completeButtonRef">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin proses menjadi member ? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di proses.
                </div>
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
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setMemberModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-40" @click="saveMember" ref="completeButtonRef">
                    Proses To Members
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="TrialModal" @close="setTrialModal(false);"  :initialFocus="completeButtonRef">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-primary" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin proses menjadi Trial ? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di proses.
                </div>
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
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="TrialModal(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="primary" class="w-40" @click="saveTrial" ref="completeButtonRef">
                    Proses To Trial
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

</template>



<script setup>
    import Api from '../api/Api'
    import moment from 'moment'
    import Button from "../base-components/Button"
    import { FormInput, FormSelect, FormLabel, FormInline, FormTextarea } from "../base-components/Form"
    import TomSelect from "../base-components/TomSelect"
    import { onMounted, ref, reactive , watch, computed  } from "vue"
    import { useRouter, useRoute } from 'vue-router'
    import { useDebounceFn } from '@vueuse/core'
    import 'vue-select/dist/vue-select.css';
    import { useStore } from "vuex";
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import Preview from "../base-components/Preview"
    import LoadingIcon from "../base-components/LoadingIcon"
    import { Dialog, Menu } from "../base-components/Headless"
    import {
        DialogPanel

    } from '@headlessui/vue'
    import man from "../assets/images/sabar.png"
    import Litepicker from "../base-components/Litepicker"
    import xlsx from 'xlsx/dist/xlsx.full.min'
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    import CurrencyInput from "./CurrencyInput.vue";
    import 'vue-multiselect/dist/vue-multiselect.ssr.css'
    import { ClassicEditor } from "../base-components/Ckeditor";
    import Tippy from "../base-components/Tippy";
    const router = useRouter()
    const route = useRoute()
    const search = ref("")
    const store = useStore()
    const kat_vendor = ref("")
    const completeButtonRef = ref(null)
    const user = store.getters['auth/currentUser']
    const roleName = ref("")
    const roleName2 = ref("")
    const baseUrl = ref('http://192.168.5.65:5050/storage/crm/')
    const editorConfig = {
        toolbar: {
            items: ["bold", "italic", "link"],
        },

    }
    let statusReq

    statusReq = route.params.status 
    

    const status = ref(statusReq ?? "")
    const tgl = ref(route.params.startDate+" - "+ route.params.endDate)
    const startDate=ref(route.params.startDate)
    const endDate=ref(route.params.endDate)
    const image = ref("")
    const loading = ref(true)
    const loadingsycn = ref("")
    const pesan = ref("")
    const action = ref("Add New")

    const deleteModalPreview = ref(false);
    const setDeleteModalPreview = (value) => {
        deleteModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (deleteModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
        if (warningModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const basicModalPreview = ref(false);
    const successModalPreview = ref(false);
    const setSuccessModalPreview = (value) => {
        successModalPreview.value = value;
        document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden'
        if (successModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    
    const addModal = ref(false);
    const setaddModal = (value) => {
        addModal.value = value
        if (addModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const FollowModalPreview = ref(false);
    const setFollowModalPreview = (value) => {
        FollowModalPreview.value = value
        if (FollowModalPreview.value ==false) {
            document.body.style.overflow = 'none';
            state.data.ket_remarks =''
            state.data.remarks =''
        }
    };

    const NewFollowUpPreview = ref(false);
    const setNewFollowUpPreview = (value) => {
        NewFollowUpPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };


    const FilePreview = ref(false);
    const setFilePreview = (value) => {
        FilePreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const MemberModal = ref(false);
    const setMemberModal = (value) => {
        MemberModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const TrialModal = ref(false);
    const setTrialModal = (value) => {
        TrialModal.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const state = reactive({
        listData  : {},
        listSource:{},
        listKategori:{},
        litsHistory:{},
        listDepartement:{},
        datas : "",
        data : {
            id:"",
            idFollowup:"",
            nama:"",
            email:"",
            telp:"",
            source:"",
            tanggal:"",
            create_name:"",
            trial:"",
            remarks:"",
            ket_remarks:"",
            status_crm:"",
            kat:"",
            keterangan:"",
            file:"",
            proses:"",
            studio:""
            
        }
        
    })

    const tampilData = async (page = state.listData.current_page) => {
        loading.value= true
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/crm?page=' + page+ '&q=' + search.value + '&status=' + status.value+ '&tgl=' + tgl.value)
        .then(response => {
            state.listData = response.data.data
            state.listSource = response.data.source
            state.listKategori = response.data.kategori
            loading.value= false
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

        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/crm?page=' + page+ '&q=' + search.value + '&status=' + status.value+ '&tgl=' + tgl.value)
        .then(response => {
            state.listData = response.data.data
            state.listSource = response.data.source
            loading.value= false
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

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
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
    }

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };

    const proses = async (id) => {
        FollowModalPreview.value = true
        state.data.id = id
    }

    const member = async (id) => {
        MemberModal.value = true
        state.data.id = id
    }

    const trial = async (id) => {
        TrialModal.value = true
        state.data.id = id
    }

    const lihatfile = async (id) => {
        FilePreview.value = true
        state.data.file = id
    }

    const prosesLeads = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append('image', image.value);
        formdata.append("id", state.data.id);
        formdata.append("remarks", state.data.remarks);
        formdata.append("ket_remarks", state.data.ket_remarks);
        await Api.post('/admin/prosesLeads', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Process Leads"
            FollowModalPreview.value = false
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    
    const saveMember = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("id", state.data.id);
        formdata.append("studio", state.data.studio);
        await Api.post('/admin/prosesMembers', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Process To Members"
            MemberModal.value = false
            tampilData()
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    const saveTrial = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        const formdata = new FormData();
        formdata.append("id", state.data.id);
        formdata.append("studio", state.data.studio);
        await Api.post('/admin/prosesTrial', formdata, {
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

    const addfollowup = async () => {
        NewFollowUpPreview.value = true
    }

    const edit = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/crm', {
            params: {
                id : id
            } 
        })
        .then(response => {
            state.datas = response.data.data
            state.data.id = state.datas[0].id
            state.data.nama = state.datas[0].nama
            state.data.email = state.datas[0].email
            state.data.telp = state.datas[0].telp
            state.data.tanggal = state.datas[0].tanggal
            state.data.source = state.datas[0].source
            state.data.trial = state.datas[0].trial
            state.data.remarks = state.datas[0].remarks
            state.data.ket_remarks = state.datas[0].ket_remarks
            state.data.create_name = state.datas[0].create_name
            state.data.status_crm = state.datas[0].status_crm
            state.data.proses = state.datas[0].proses

            Api.get('/admin/getHistory', {
                params: {
                    id : state.datas[0].id
                } 
            })
            .then(responses => {
                state.litsHistory = responses.data.data
            }).catch(error => {
                
                if(error.response.data.status_code==403){
                router.push({name: '403'})
                }else{
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
                }
            })

    
    
            addModal.value = true
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

    const saveFollowup = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (action.value=='Add New') {
            const formdata = new FormData();
            formdata.append('image', image.value);
            formdata.append("id", state.data.id);
            formdata.append("kat", state.data.kat);
            formdata.append("keterangan", state.data.keterangan);
            formdata.append("status", state.data.status_crm);
            await Api.post('/admin/followup', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Add Followup"
                NewFollowUpPreview.value = false
                Api.get('/admin/getHistory', {
                    params: {
                        id : state.data.id
                    } 
                })
                .then(responses => {
                    state.litsHistory = responses.data.data
                }).catch(error => {
                    
                    if(error.response.data.status_code==403){
                    router.push({name: '403'})
                    }else{
                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                    }
                })
                tampilData()
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        } else {
            const formdata = new FormData();
            formdata.append('image', image.value);
            formdata.append("id", state.data.idFollowup);
            formdata.append("kat", state.data.kat);
            formdata.append("keterangan", state.data.keterangan);
            formdata.append("status", state.data.status_crm);
            await Api.put('/admin/followup', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Update Followup"
                NewFollowUpPreview.value = false
                Api.get('/admin/getHistory', {
                    params: {
                        id : state.data.id
                    } 
                })
                .then(responses => {
                    state.litsHistory = responses.data.data
                }).catch(error => {
                    
                    if(error.response.data.status_code==403){
                    router.push({name: '403'})
                    }else{
                    const object1 = error.response.data.data
                    pesan.value =  Object.values(object1).toString()
                    setWarningModalPreview(true)
                    }
                })
                tampilData()
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }

        tampilData()

        
    
    }

    const editFollowup = async (id, kat,keterangan) => {
        state.data.idFollowup = id
        state.data.kat = kat
        state.data.keterangan = keterangan
        action.value='Update'
        NewFollowUpPreview.value = true
    }

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        await Api.put('/admin/crm', {
            id : state.data.id,
            nama : state.data.nama,
            email : state.data.email,
            telp : state.data.telp,
            source : state.data.source,
            trial : state.data.trial
        }).then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Update"
            addModal.value = false
        
            tampilData()
        }).catch(error => {
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }


    onMounted(async() => {
        if (user.roles.length === 1) {
            roleName.value = user.roles[0].name;
        } else if (user.roles.length > 1) {
            roleName.value = user.roles[0].name;
            roleName2.value = user.roles[1].name;
        }

    
        await tampilData()
        await tampilDepartement()
    })

    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    watch(status, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })

    watch(tgl, (newQuestion, oldQuestion) => {
        loading.value= false
        tampilData()
    })


    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>

<!-- <style>
    .ck-editor__main {
        width: 1000px;
    }
</style> -->