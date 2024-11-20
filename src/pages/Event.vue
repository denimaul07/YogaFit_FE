<template>
    <div v-if="loadingsycn==true">
        <Dialog :open="basicModalPreview">
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
                <RouterLink :to="{ name: 'Event' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Event</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">List Data Event</h2>
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
                        <Button variant="primary" class="mr-2 shadow-md" @click="add">
                            <span class="flex items-center justify-center w-40 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" /> Add New Event
                            </span>
                        </Button>

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
                                            Event
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Tanggal
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Desc
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Image
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Members List
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
                                    <Table.Tr v-else-if="state.listData.total==0" class="intro-x">
                                        <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.odata" v-else>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{ state.listData.from + index }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.event }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.tanggal }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.desc_event }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    
                                            <a-image
                                                :width="200"
                                                :src="'https://login.yogafitidonline.com/api/storage/event/'+data.gambar"
                                            />
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <div class="flex items-center justify-center">
                                                <a class="flex items-center text-success" href="#" @click="listMember(data.odata)">
                                                    Members List
                                                </a>

                                                <a class="flex items-center text-success" href="#" @click="listPresent(data.odata)">
                                                    Members Present
                                                </a>
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                            <div
                                                :class="[
                                                'flex items-center justify-center',
                                                    { 'text-success': data.status_event==0 },
                                                    { 'text-danger': data.status_event==1 }
                                                ]"
                                            >
                                                <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                                <div v-if="data.status_event==0">Active</div>
                                                <div v-else-if="data.status_event==1">Non Active</div>
                                            
                                            </div>
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <a class="flex items-center text-success" href="#" @click="edit(data)">
                                                    <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> 
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

    <Dialog  :open="AddModal"  @close="setAddModal(false)" >
    
        <Dialog.Panel>
            <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                <h2 class="mr-auto text-base font-medium">
                    {{ action }} Event
                </h2>

                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
            
            <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                
                    
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Event</FormLabel>
                        <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.event" placeholder="Input Event"/>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Tanggal Event</FormLabel>
                        <a-input style="width:100%;border-radius:7px;border-color: rgb(217 217 217);padding: 4px 9px;" v-model:value="state.data.tanggal" placeholder="Input Tanggal"/>
                    </FormInline> 

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Desc Event</FormLabel>
                        <a-textarea v-model:value="state.data.desc_event" style="width: 100%" placeholder="Desc Event" :rows="4" />
                    </FormInline> 

                
                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> File</FormLabel>
                        <FormInput type="file" @change="onFileChange" accept="image/jpg, image/jpeg, image/png" />
                    </FormInline>

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-20" style="text-align: left;"> Status</FormLabel>
                        <a-select v-model:value="state.data.status_event"  size="large" style="width: 100%"  placeholder="Pilih Status">
                            <a-select-option value="">Semua Status</a-select-option>
                            <a-select-option  value="0" label="Active">Active</a-select-option>
                            <a-select-option value="1" label="Non Active">Non Active</a-select-option>
                        </a-select>

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

    <a-modal v-model:open="AddModalMember" title="event Members" :footer="false"     width="1000px">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">       
            <div class="items-center sm:flex sm:mr-4">
                <Button variant="primary" class="mr-2 shadow-md" @click="addNewMember" v-if="actionPresent!=='present'">
                    <span class="flex items-center justify-center w-40 h-5">
                        <Lucide icon="Plus" class="w-4 h-4" /> Add Members
                    </span>
                </Button>

            </div>

            <div class="hidden mx-auto md:block text-black">
            
            </div>

            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                <div class="relative w-56 text-slate-500">
                    <FormInput
                    type="text"
                    class="w-56 pr-10 !box"
                    placeholder="Search..."
                    v-model="searchevent"
                    />
                    <Lucide
                    icon="Search"
                    class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                    />
                </div>
                
            </div>
        </div>

        <div class="col-span-12 sm:col-span-12 xl:col-span-12 pt-5  intro-y">
            <div class="col-span-12 2xl:col-span-3">
                <div class="overflow-x-auto">
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
                                    Studio
                                </Table.Th>
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    No Telp
                                </Table.Th>
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    Gender
                                </Table.Th>
                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                    Sales
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
                                <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                    <div class="flex flex-col items-center justify-end col-span-12">
                                        <LoadingIcon icon="audio" class="w-8 h-8" />
                                        <div class="mt-2 text-xs text-center">Processing Data</div>
                                    </div>
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr v-else-if="state.listEvent.total === 0" class="intro-x">
                                <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                    <div class="flex flex-col items-center justify-end col-span-12">
                                        <div class="mt-2 text-xs text-center">No Data</div>
                                    </div>
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr class="intro-x" v-for="(data, index) in state.listEvent.data" :key="data.id" v-else>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                    <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                        {{ state.listEvent.from + index }}
                                    </div>
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.name }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.deptname }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.no_telp }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.gender }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    {{ data.namasales }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                        <div
                                            :class="[
                                            'flex items-center justify-center',
                                                { 'text-danger': data.status==0 },
                                                { 'text-success': data.status==1 }
                                            ]"
                                        >
                                            <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                                            <div v-if="data.status==0">Absen</div>
                                            <div v-else-if="data.status==1">Present</div>
                                        
                                        </div>
                                    </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                    <div class="flex items-center justify-center" v-if="data.status==0">
                                        <a-popconfirm
                                            title="Are you sure add list Member?"
                                            ok-text="Yes"
                                            cancel-text="No"
                                            @confirm="present(data)"
                                            @cancel="cancel"
                                        >
                                            <a class="flex items-center text-success" href="#">
                                                <Lucide icon="Check" class="w-4 h-4 mr-1" /> 
                                            </a>
                                        </a-popconfirm>
                                    </div>
                                </Table.Td>

                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </div>
            </div>

            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                <div class="items-center sm:flex sm:mr-4">
                    <TailwindPagination :limit="1" :data="state.listEvent" @pagination-change-page="tampilEvent"/>
                </div>

                <div class="hidden mx-auto md:block text-slate-500">
                    Showing {{ state.listEvent.from }} to {{ state.listEvent.to }} of {{ state.listEvent.total }} entries
                </div>

                <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                    <div class="relative w-56 text-slate-500">
                        <FormInput
                        type="text"
                        class="w-56 pr-10 !box"
                        placeholder="Search..."
                        v-model="searchevent"
                        />
                        <Lucide
                        icon="Search"
                        class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                        />
                    </div>
                </div>
            </div>
        </div>

        <a-modal v-model:open="modalMember" title="List Data Members" :footer="false"     width="1000px">
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
                            v-model="searchMember"
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
                                            Member Name
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Studio
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            No Telp
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Gender
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Sales
                                        </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                            Action
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>

                                    <Table.Tr v-if="loadingMember" class="intro-x">
                                        <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                <LoadingIcon icon="audio" class="w-8 h-8" />
                                                <div class="mt-2 text-xs text-center">Processing Data</div>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>

                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listMember.data" :key="data.id" v-else>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                            <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                {{ state.listMember.from + index }}
                                            </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.name }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.departments.deptname }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.no_telp }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.gender }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            {{ data.namasales }}
                                        </Table.Td>
                            
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                            <div class="flex items-center justify-center">
                                                <a-popconfirm
                                                    title="Are you sure add list Member?"
                                                    ok-text="Yes"
                                                    cancel-text="No"
                                                    @confirm="confirm(data.id)"
                                                    @cancel="cancel"
                                                >
                                                    <a class="flex items-center text-success" href="#">
                                                        <Lucide icon="Check" class="w-4 h-4 mr-1" /> 
                                                    </a>
                                                </a-popconfirm>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                        <div class="items-center sm:flex sm:mr-4">
                            <TailwindPagination :limit="1" :data="state.listMember" @pagination-change-page="tampilMember"/>
                        </div>

                        <div class="hidden mx-auto md:block text-slate-500">
                            Showing {{ state.listMember.from }} to {{ state.listMember.to }} of {{ state.listMember.total }} entries
                        </div>

                        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                            <div class="relative w-56 text-slate-500">
                                <FormInput
                                type="text"
                                class="w-56 pr-10 !box"
                                placeholder="Search..."
                                v-model="searchMember"
                                />
                                <Lucide
                                icon="Search"
                                class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </a-modal>
    </a-modal>

    
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
    import { message } from 'ant-design-vue';
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
            state.data.id=''
            state.data.event=''
            state.data.tanggal=''
            state.data.desc_event=''
            image.value=''
            state.data.status_event=''
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
    const pesan = ref("")
    const searchevent=ref("")
    const action = ref("Add New")
    const AddModalMember=ref(false)
    const modalMember=ref(false)
    const state = reactive(
        {
            listData:{},
            listMember:{},
            listEvent:{},
            data:{
                id:"",
                event:"",
                tanggal:"",
                desc_event:"",
                gambar:"",
                status_event:""
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


    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        await Api.get('/admin/event?page=' + page+ '&q=' + search.value)
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


    const add = async() => {
        action.value ='Add New'
        AddModal.value = true
    }

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };

    const edit = async (data) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
    
        state.data.id = data.odata
        state.data.event=data.event
        state.data.tanggal=data.tanggal
        state.data.desc_event=data.desc_event
        state.data.status_event=data.status_event
        action.value ='Update'
        AddModal.value = true
        loadingsycn.value = false
        basicModalPreview.value = false

    }


    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (action.value=='Add New') {
            const formdata = new FormData();
            formdata.append('file', image.value);
            formdata.append('event', state.data.event);
            formdata.append('tanggal', state.data.tanggal);
            formdata.append('desc_event', state.data.desc_event);
            formdata.append('status_event', state.data.status_event);

            await Api.post('/admin/event', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {
                setSuccessModalPreview(true)
                pesan.value = "Event Success Added"
                setAddModal(false)
                loadingsycn.value = false
                basicModalPreview.value = false
                tampilData()
            
            }).catch((error) => {
                const object1 = error.response.data.data;
                pesan.value = Object.values(object1).toString();
                setWarningModalPreview(true);
            });
    
        }else{
            const formdata = new FormData();
            formdata.append("id", state.data.id);
            formdata.append('file', image.value);
            formdata.append('event', state.data.event);
            formdata.append('tanggal', state.data.tanggal);
            formdata.append('desc_event', state.data.desc_event);
            formdata.append('status_event', state.data.status_event);
        
            await Api.post('/admin/event_update', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async (response) => {

                setSuccessModalPreview(true)
                pesan.value = "Event Success Updated"
                setAddModal(false)
                loadingsycn.value = false
                basicModalPreview.value = false
                tampilData()

            })
            .catch((error) => {
            const object1 = error.response.data.data;
            pesan.value = Object.values(object1).toString();
            setWarningModalPreview(true);
            });
        }

    }

    const listMember = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        state.data.id = id
        await tampilEvent()
        AddModalMember.value = true
        loadingsycn.value = false
        basicModalPreview.value = false
    }

    const actionPresent=ref("")
    const listPresent = async (id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Get Data"
        state.data.id = id
        actionPresent.value = "present"
        await tampilEvent()
        AddModalMember.value = true
        loadingsycn.value = false
        basicModalPreview.value = false
    }

    const tampilEvent= async (page = state.listEvent.current_page) => {
        loading.value = true
        await Api.get('/admin/event_member?page=' + page+ '&q=' + search.value+'&id=' + state.data.id+'&action=' + actionPresent.value)
        .then(response => {
            state.listEvent = response.data.data
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

    const addNewMember= () => {
        modalMember.value=true
    }

    const cancel = e => {
        console.log(e);
    };

    const confirm = async(id) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
    
        await Api.post('/admin/event_member', {
            id : state.data.id,
            id_user : id,

        }) .then(async (response) => {
                loadingsycn.value = false
                await tampilEvent()
                await tampilData()
                message.success('Member Sukses Di Tambahkan');
                AddModal.value = false
        }).catch(error => {
            console.log(error);
            
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    
    
        modalMember.value=false
        
    };

    const present = async(data) => {
        await Api.post('/admin/present_event_member', {
            id : data.odata,
            id_user : data.id_member,
            event : data.event
        }) .then(async (response) => {
                await tampilEvent()
                message.success('Success Change Member Present');
        }).catch(error => {
            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    
    
        modalMember.value=false
        
    };

    const searchMember=ref("")
    const loadingMember=ref(false)
    const tampilMember= async (page = state.listMember.current_page) => {
        loadingMember.value=true
        await Api.get('/admin/get_member_active?page=' + page+ '&q=' + searchMember.value)
        .then((response) => {
            state.listMember = response.data.data;
            loadingMember.value = false;
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



    onMounted(async() => {
        await Promise.all([
            tampilData(),
            tampilMember()
        ]);
    })

    watch(searchMember, (newQuestion, oldQuestion) => {
        searchingMember()
    })

    const searchingMember = useDebounceFn(() => {
        loading.value= false
        tampilMember()
    }, 500)


    watch(search, (newQuestion, oldQuestion) => {
        searching()
    })

    const searching = useDebounceFn(() => {
        loading.value= false
        tampilData()
    }, 500)

</script>

