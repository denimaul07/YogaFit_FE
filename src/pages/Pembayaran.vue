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

    <a-modal v-model:open="modalBukti" title="Bukti Pembayaran" >
        <div class="row">
            <label class="col-sm-4 col-form-label"> Upload Pembayaran </label>
            <div class="col-sm-8">
                <input
                type="file" class="form-control"
                @change="onFileChange"
                accept="image/x-png,image/gif,image/jpeg,application/pdf"
                />
            </div>
        </div>

        <div class="row pt-3 text-center" v-if="image!=null">
            <a-image
                :width="400"
                :src="'https://login.yogafitidonline.com/api/storage/pembayaran/'+image"
            />
        </div>

        <template #footer>
            <Button  variant="primary" class="btn btn-primary" @click="saveBukti">
                <i class="fa fa-send me-2" aria-hidden="true"></i>
                Save
            </Button>

        </template>

        <a-modal v-model:open="processing"  :footer="null" :closable=false   width="400px">
            <div style="align-items:center;justify-content: center;display: flex;" width="100px">
                <img  class="w-1/2 -intro-x" :src="man" alt="vector women with leptop"/>
            </div>

            <div style="align-items:center;justify-content: center;display: flex;">
                Please Wait, Process Get Data
            </div>
        </a-modal>
    </a-modal>



    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12  intro-y sm:flex-nowrap">
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Pembayaran</h2>
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
                                startDate:new  moment().format('DD-MMM-YYYY'),
                                endDate: new moment().format('DD-MMM-YYYY'),
                                }" class="block w-56 mx-auto" />

                        <Button variant="primary" class="mr-2 shadow-md" @click="exportExcel()">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Download" class="w-4 h-4" />
                            </span>
                        </Button>
                    
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12 pt-12">
        <div class="grid grid-cols-12 gap-6">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
            <div class="items-center sm:flex sm:mr-4">
                <Button  variant="primary" class="mr-2 shadow-md" @click="add">
                    <span class="flex items-center justify-center w-40 h-5">
                        <Lucide icon="Plus" class="w-4 h-4" /> Tambah Pembayaran
                    </span>
                </Button>
            </div>

            <div class="hidden mx-auto md:block text-black"></div>

            <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                <div class="relative w-56 text-slate-500">
                <FormInput  type="text"  class="w-56 pr-10 !box" placeholder="Search..." v-model="search" />
                <Lucide  icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"/>
                </div>
            </div>
            </div>

            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
            <div class="col-span-12 2xl:col-span-3">
                <div class="overflow-x-auto">
                <Table>
                    <Table.Thead class="bg-primary text-white">
                    <Table.Tr class="intro-x">
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Action</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No Invoice</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Tanggal</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Customers</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Email</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No Telp</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Packages</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Keterangan </Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Amount</Table.Th>
                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Kasir</Table.Th>
                    </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr v-if="loading" class="intro-x">
                            <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                <a-skeleton />
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr v-else-if="state.listData.total == 0" class="intro-x">
                            <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
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
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                <div class="flex items-center">
                                    <Tippy as="div"  content="Hapus">
                                        <a class="flex items-center text-danger" href="#" @click="hapus(data.noinvoice)">
                                            <Lucide icon="Trash" class="w-4 h-4 mr-5" /> 
                                        </a>
                                    </Tippy>

                                    <Tippy as="div"  content="Print Invoice">
                                        <a class="flex items-center text-primary" href="#" @click="print(data.noinvoice)">
                                            <Lucide icon="Printer" class="w-4 h-4 mr-5" /> 
                                        </a>
                                    </Tippy>

                                    <Tippy as="div"  content="Upload Bukti">
                                        <a class="flex items-center text-warning" href="#" @click="bukti(data.noinvoice,data.file)">
                                            <Lucide icon="Camera" class="w-4 h-4 mr-1" /> 
                                        </a>
                                    </Tippy>
                                </div>
                            
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
            
                            <a class="flex items-center text-success" href="#" @click="lihat(data.noinvoice)">
                                {{ data.noinvoice }}
                            </a>
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                            {{ data.tanggal }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                            {{ data.nama_cust }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                            {{ data.email }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                            {{ data.no_telp }}
                            </Table.Td>
                            <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                            {{ data.nama_paket }}
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
                    <FormInput  type="text"   class="w-56 pr-10 !box"  placeholder="Search..." v-model="search" />
                    <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"   />
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
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-100 rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Tambah Pembayaran
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setAddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Nama Customers</FormLabel>
                                <input type="text" v-model="state.data.nama_cust" placeholder="Insert Nama Customers" class="pr-12 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80"/>
                                <Button variant="primary" class="mr-2 shadow-md" @click="cariMember(true)">
                                    <span class="flex items-center justify-center h-5"> 
                                        <Lucide icon="Search" class="w-4 h-4"/>
                                    </span>
                                </Button>
                            </FormInline>

                        
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> No Telp</FormLabel>
                                <input type="text" v-model="state.data.no_telp" placeholder="Insert No Telp" class="pr-12 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80"/>
                            </FormInline>
                        </div>

                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                            <FormInline class="mt-2">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Email</FormLabel>
                                <input type="text" v-model="state.data.email" placeholder="Insert Email" class="pr-12 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80"/>
                            </FormInline>
                        </div>


                        <div class="col-span-12">
                            <div class="mt-5 intro-y box">
                                <div class="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                                    <div class="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                                        <Lucide icon="ChevronDown" class="w-4 h-4 mr-2" /> Item Pembayaran
                                    </div>
                                    <div class="grid grid-cols-12 gap-4 gap-y-3">
                                        <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                        <FormInline class="mt-2">
                                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Payment Method</FormLabel>
                                            <TomSelect class="w-full" id="modal-form-6" v-model="state.data.metode">
                                                <option value="">Select Payment Method</option>
                                                <option value="Amex">Amex</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Cheque">Cheque</option>
                                                <option value="Debit">Debit</option>
                                                <option value="Master">Master</option>
                                                <option value="Visa">Visa</option>
                                                <option value="Transfer">Transfer</option>
                                                <option value="Others">Others</option>
                                            </TomSelect>
                                        </FormInline>
                                    </div>
                                    <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                        <FormInline class="mt-2">
                                            <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Payment Type</FormLabel>
                                            <TomSelect class="w-full" id="modal-form-6" v-model="state.data.payment">
                                                <option value="">Select Payment Type</option>
                                                <option value="Installment">Installment</option>
                                                <option value="Full Payment">Full Payment</option>
                                            </TomSelect>
                                        </FormInline>
                                    </div>
                                    </div>
                                    
                                    <div class="mt-5">
                                        <FormInline class="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0 pb-5">
                                            <FormLabel class="sm:!mr-10">
                                                <div class="text-left">
                                                <div class="flex items-center">
                                                    <div class="font-medium">Item Pembayaran</div>
                                                </div>
                                                </div>
                                            </FormLabel>
                                            <div class="flex-1 w-full mt-3 xl:mt-0 xl:text-right">
                                                <Button variant="primary" class="w-44" @click="addValue">
                                                <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Add Item
                                                </Button>
                                            </div>
                                        </FormInline>
                            
                                
                                        <div v-for="(course, index) in courses" :key="index">
                                            <FormInline class="flex-col items-start pb-5 pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                                                <FormLabel class="sm:!mr-10">
                                                    <div class="text-left">
                                                        <div class="flex items-center">
                                                            <div class="font-medium">Item {{ index+1 }}</div>
                                                        </div>
                                                    </div>
                                                </FormLabel>
                                                <div class="flex-1 w-full mt-3 xl:mt-0">
                                                    <div class="flex-1 w-full mt-3 xl:mt-0">
                                                        <div
                                                        class="relative py-10 pl-5 pr-5 rounded-md xl:pr-10 bg-slate-50 dark:bg-transparent dark:border"
                                                        >
                                                
                                                            <div class="grid grid-cols-12 gap-4 gap-y-3">
                                                                <div class="col-span-12" :class="{' sm:col-span-3': course.varian === 'Classes Membership', ' sm:col-span-4': course.varian !== 'Classes Membership'}">
                                                                    <div class="flex items-center flex-1 xl:pr-20">
                                                                        <FormLabel class="sm:w-50">Item</FormLabel>
                                                                        <!-- <TomSelect v-model="course.varian"
                                                                        :options="{
                                                                            placeholder: 'Pilih Keterangan',
                                                                        }"
                                                                        class="w-full"
                                                                        >
                                                                            <option value="">Pilih Keterangan</option>
                                                                            <option v-for="item in state.listKategori" :key="item.kat_pembayaran" :value="item.kat_pembayaran">{{item.kat_pembayaran}}</option>
                                                                        </TomSelect> -->

                                                                        <a-select
                                                                            v-model:value="course.varian"
                                                                            show-search
                                                                            :filter-option="filterOption"
                                                                            size="large"
                                                                            style="width: 100%"
                                                                            placeholder="Pilih Keterangan"
                                                                        >
                                                                            <a-option v-for="item in state.listKategori" :key="item.kat_pembayaran" :value="item.kat_pembayaran">{{item.kat_pembayaran}}</a-option>
                                                                        </a-select>
                                                                    </div>
                                                                </div>

                                                                <div class="col-span-12" v-if=" course.varian === 'Classes Membership'"  :class="{' sm:col-span-3': course.varian === 'Classes Membership', ' sm:col-span-4': course.varian !== 'Classes Membership'}">
                                                                    <div class="flex items-center flex-1 xl:pr-20">
                                                                        <FormLabel class="sm:w-50">Packages</FormLabel>
                                                                        <a-select
                                                                            v-model:value="course.packages"
                                                                            show-search
                                                                            :filter-option="filterOption"
                                                                            size="large"
                                                                            style="width: 100%"
                                                                            placeholder="Pilih Packages"
                                                                        >
                                                                            <a-option v-for="item in state.listMemberType" :key="item.packages_name" :value="item.packages_name">{{item.packages_name}}</a-option>
                                                                        </a-select>
                                                                        <!-- <TomSelect v-model="course.packages"
                                                                        :options="{
                                                                            placeholder: 'Pilih Packages',
                                                                        }"
                                                                        class="w-full"
                                                                        >
                                                                            <option value="">Pilih Packages</option>
                                                                            <option v-for="item in state.listMemberType" :key="item.packages_name" :value="item.packages_name">{{item.packages_name}}</option>
                                                                        </TomSelect> -->
                                                                    </div>
                                                                </div>

                                                                <div class="col-span-12"  :class="{' sm:col-span-3': course.varian === 'Classes Membership', ' sm:col-span-4': course.varian !== 'Classes Membership'}">
                                                                    <div class="flex-1">
                                                                        <div class="items-center mt-5 xl:flex first:mt-0">
                                                                            <FormLabel class="mt-2 sm:w-50"> Price </FormLabel>
                                                                            <a-input-number style="width:100%" size="large"
                                                                                v-model:value="course.price"
                                                                                :formatter="value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                                                :parser="value => value.replace(/\Rp\s?|(,*)/g, '')"
                                                                                placeholder="Masukan Price "/>
                                                                            <!-- <CurrencyInput type="text" v-model="course.price" :options="{ currency: 'IDR' }" placeholder="Price Product" /> -->
                                                                            <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                                                                <button  type="button" class="ml-3 xl:ml-5"  @click="remove(index)" v-show="index != 0">
                                                                                <Lucide icon="Trash2" class="w-4 h-4" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                    
                                                                    </div>
                                                                </div>

                                                                <div class="col-span-12"  :class="{' sm:col-span-3': course.varian === 'Classes Membership', ' sm:col-span-4': course.varian !== 'Classes Membership'}">
                                                                    <div class="flex-1">
                                                                        <div class="items-center mt-5 xl:flex first:mt-0">
                                                                            <FormLabel class="mt-2 sm:w-50"> Keterangan </FormLabel>
                                                                            <FormInput type="text" v-model="course.ket"  placeholder="Insert Keterangan" />
                                                                            <div class="flex w-20 mt-3 text-slate-500 xl:mt-0">
                                                                                <button  type="button" class="ml-3 xl:ml-5"  @click="remove(index)" v-show="index != 0">
                                                                                <Lucide icon="Trash2" class="w-4 h-4" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                    
                                                                    </div>
                                                                </div>
                                                        
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </FormInline>
                                        </div>
                                    </div>                              
                                </div>
                            </div>
                        </div>

                    

                    </Dialog.Description>
                    <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                        <Button type="button" variant="outline-secondary" @click="setAddModal(false)" class="w-20 mr-1">
                            Cancel
                        </Button>
                        <Button variant="primary" type="button" class="w-40" @click="save">
                            Save
                        </Button>
                    </Dialog.Footer>
                
                </DialogPanel>
            </div>
        </div>

        <Dialog  size="large" :open="CariMemberModal">
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4">
                    <DialogPanel class="w-full rounded bg-white">
                        <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">
                                Cari Members
                            </h2>

                            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setCariMemberModal(false)">
                                <Lucide icon="XSquare" class="w-5 h-5" />
                            </Button>
                        </Dialog.Title>
                        
                        <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
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
                                        v-model="searchUser"
                                        />
                                        <Lucide
                                        icon="Search"
                                        class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                                        />
                                        
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
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Member Name
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Member Telp
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Member Email
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Studio
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Referal Code
                                                </Table.Th>
                                                <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                    Sales Name
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
                                            <Table.Tr v-if="state.listUser.total==0" class="intro-x">
                                                <Table.Td colspan="10" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                    <div class="flex flex-col items-center justify-end col-span-12">
                                                        <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr class="intro-x" v-for="(data, index) in state.listUser.data" :key="data.id" >
                                                <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                    <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                                        {{ state.listUser.from + index }}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.name }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.no_telp }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.email }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.deptname }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.referal_code }}
                                                </Table.Td>
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                    {{ data.namasales }}
                                                </Table.Td>
                                                
                                                <Table.Td class="whitespace-nowrap first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                                                    <div class="flex items-center justify-center">
                                                        <Tippy as="div"  content="Pilih Members">
                                                            <a class="flex items-center text-success" href="#" @click="pilihuser(data.id, data.name, data.no_telp, data.email)">
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
                                    <TailwindPagination :limit="1" :data="state.listUser" @pagination-change-page="tampilUsers"/>
                                </div>

                                <div class="hidden mx-auto md:block text-slate-500">
                                    Showing {{ state.listUser.from }} to {{ state.listUser.to }} of {{ state.listUser.total }} entries
                                </div>

                                <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                                
                                </div>
                            </div>

                        </Dialog.Description>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </Dialog>

    <Dialog  size="large" :open="modalInvoice">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Detail Transcations
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setmodalInvoice(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                    
                    
                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                
                            <div class="overflow-x-auto pt-5">
                                <Table>
                                    <Table.Thead class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No Invoice</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Tanggal</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Customers</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Email</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">No Telp</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Keterangan </Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Amount</Table.Th>
                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">Kasir</Table.Th>
                                    </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                        
                                    <Table.Tr class="intro-x" v-for="(data, index) in state.listInvoice" :key="data.id">
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                            {{ state.listData.from + index }}
                                        </div>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                        
                                        <a class="flex items-center text-success" href="#" @click="lihat(data.noinvoice)">
                                            {{ data.noinvoice }}
                                        </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.tanggal }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.nama_cust }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.email }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.no_telp }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.ket }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                            {{ (1 * data.amount).toLocaleString('id-ID', { style: 'currency',  currency: 'IDR', }).slice(0, -3) }}
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                                        {{ data.kasir }}
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
    
    <Dialog :open="deleteModalPreview">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
                <div class="mt-5 text-3xl">Apa Anda Yakin ?</div>
                <div class="mt-2 text-slate-500">
                    Apakah Anda benar-benar ingin hapus data ini? <br />
                    Proses ini tidak dapat dikembalikan jika sudah di hapus.
                </div>
                <FormInput id="modal-form-1" type="hidden" v-model="state.data.id" placeholder="Insert name Name" />
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="outline-secondary" @click="setdeleteModalPreview(false)" class="w-24 mr-1">
                    Cancel
                </Button>
                <Button type="button" variant="danger" class="w-24" @click="hapusInvoice()">
                    Batal
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>

    <Dialog :open="PrintPreview" size="full">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    Invoice
                </h2>
                <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPrintPreview(false)">
                    <Lucide icon="XSquare" class="w-5 h-5" />
                </Button>
            </Dialog.Title>
        
            <iframe :src="pdfUrl"  width="100%" height="500px"  fullscreen="true" />
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
    import Tippy from "../base-components/Tippy";
    import { useDebounceFn } from '@vueuse/core'
import { identity } from 'lodash'
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
    const modalBukti = ref(false)
    const tanggal= ref("")
    const pdfUrl = ref("");
    const search=ref("")
    const searchUser=ref("")
    const pesan = ref("")
    const image = ref("")
    const processing = ref(false)
    const courses = ref([])
    const state = reactive({
        listData: {},
        listKategori:{},
        listUser:{},
        listMemberType:{},
        listInvoice:{},
        data:{
            id:"",
            nama_cust:"",
            email:"",
            no_telp:"",
            ket:"",
            amount:"0",
            metode:"",
            payment:""
        }
    });

    const deleteModalPreview = ref(false);
    const setdeleteModalPreview = (value) => {
        deleteModalPreview.value = value;
        document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden'
        if (deleteModalPreview.value ==false) {
            document.body.style.overflow = 'none';
        }
    };


    const bukti = (id,file) => {
        state.data.id = id
        image.value = file
        modalBukti.value = true
    }
    

    const addValue = async () => {
        courses.value.push({
            varian: "",
            price: "",
        });
    }

    const remove = async (index) => {
        courses.value.splice(index, 1);
    }


    const AddModal = ref(false);
    const setAddModal = (value) => {
        AddModal.value = value
        if (AddModal.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const modalInvoice = ref(false);
    const setmodalInvoice = (value) => {
        modalInvoice.value = value
        if (modalInvoice.value ==false) {
            document.body.style.overflow = 'none';
        }
    };

    const CariMemberModal = ref(false);
    const setCariMemberModal = (value) => {
        CariMemberModal.value = value
        if (CariMemberModal.value ==false) {
            document.body.style.overflow = 'none';
            
        }
    };

    const cariMember = async (id) => {
        CariMemberModal.value = true
    
    }

    const PrintPreview = ref(false);
    const setPrintPreview = (value) => {
        PrintPreview.value = value;
        loadingsycn.value = false
        basicModalPreview.value = false
    };

    const onFileChange = (e) => {
        image.value = e.target.files[0];
    };


    const tampilData = async (page = 1) => {
        loading.value = true
        basicModalPreview.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/bayar?page=' + page+ '&q=' + search.value + '&tanggal=' + tanggal.value)
        }else{
            url = Api.get('/sales/bayar?page=' + page+ '&q=' + search.value + '&tanggal=' + tanggal.value)
        }
        await url.then(response => {
            state.listData = response.data.data
            basicModalPreview.value = false
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

    const tampilKategori = async (page = 1) => {
        loading.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Proccesing Get Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/getkatpembayaran')
        }else{
            url = Api.get('/sales/getkatpembayaran')
        }
        await url.then(response => {
            state.listKategori = response.data.data
            basicModalPreview.value = false
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

    
    const tampilUsers = async (page=state.listUser.current_page)=>{
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        if (user.roles[0].name=='studio') {
            url = Api.get('/studio/get_users?page=' + page+ '&q=' + searchUser.value)
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesManager'){
            url = Api.get('/sales/get_users?page=' + page+ '&q=' + searchUser.value)
        }else{
            url = Api.get('/admin/get_users?page=' + page+ '&q=' + searchUser.value)
        }

        await url.then(response => {
            state.listUser = response.data.data
    
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
        AddModal.value = true
    }

    const save = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        const formdata = new FormData();
        // formdata.append('file', image.value);
        // formdata.append("id", state.data.id);
        formdata.append("nama_cust", state.data.nama_cust);
        formdata.append("no_telp", state.data.no_telp);
        formdata.append("email", state.data.email);
        formdata.append("payment", state.data.payment);
        formdata.append("metode", state.data.metode);
        formdata.append("item", JSON.stringify(courses.value));
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.post('/admin/bayar', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }else{
            url = Api.post('/sales/bayar', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }
        await url.then(async (response) => {
            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Success Tambah Pembayaran"
            AddModal.value = false
            state.data.id=''
            state.data.nama_cust=''
            state.data.no_telp=''
            state.data.email=''
            state.data.payment=''
            state.data.metode=''
            state.data.ket=''
            courses.value = []
            state.data.amount='0'
            tampilData()
        
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    const saveBukti = async () => {
        processing.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Save Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        let url=''
        const formdata = new FormData();
        formdata.append('file', image.value);
        formdata.append("id", state.data.id);
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.post('/admin/saveBukti', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }else{
            url = Api.post('/sales/saveBukti', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        }
        await url.then(async (response) => {
            processing.value = false
            pesan.value = "Success Upload Pembayaran"
            modalBukti.value = false
            tampilData()
        
        }).catch(error => {

            const object1 = error.response.data.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }


    const pilihuser = (id, name, telp, email) => {
        state.data.id=id
        state.data.nama_cust=name
        state.data.no_telp = telp
        state.data.email = email
        CariMemberModal.value=false
    }

    const lihat = async (id) => {

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token

        let url=''
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            url = Api.get('/admin/bayar', {
                params: {
                    id : id
                } 
            })
        }else{
            url = Api.get('/sales/bayar', {
                params: {
                    id : id
                } 
            })
        }

        await url.then(response => {
            state.listInvoice= response.data.data
            modalInvoice.value=true
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

    const filterOption = (input, option) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

    const exportExcel = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        const tgl = tanggal.value
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get(`/admin/exportExcelPembayaran/${tgl}`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Pembayaran Yogafit.xlsx`);
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
            await Api.get(`/sales/exportExcelPembayaran/${tgl}`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Pembayaran Yogafit.xlsx`);
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

    const tampilMemberShip = async () => {
        const token = localStorage.getItem("token_yogafit");
        Api.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get("/admin/get_all_packages")
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
            await Api.get("/sales/get_all_packages")
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

    const hapus = async (id) => {
        deleteModalPreview.value = true
        state.data.id = id
    }

    const hapusInvoice = async() => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Process Delete Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/hapusInvoice', {
                id : state.data.id,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Delete"
                deleteModalPreview.value = false
            
                tampilData()
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.put('/sales/hapusInvoice', {
                id : state.data.id,
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Success Delete"
                deleteModalPreview.value = false
            
                tampilData()
            }).catch(error => {
                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })

        }
    }

    const print =  async(id) =>  {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Sabar Dikit ya, Lagi Proses Generate  Data"
        const token = localStorage.getItem('token_iss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/printInvoice', {
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
            await Api.get('/sales/printInvoice', {
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


    onMounted(async() => {
    
        await tampilData()
        await tampilKategori()
        await tampilUsers()
        await tampilMemberShip()
    })

    watch(tanggal, (newQuestion, oldQuestion) => {
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

    watch(searchUser, (newQuestion, oldQuestion) => {
        searchingUsers()
    })

    const searchingUsers = useDebounceFn(() => {
        loading.value= false
        tampilUsers()
    }, 100)

</script>

