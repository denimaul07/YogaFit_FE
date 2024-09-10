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
                <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
            </div>
        
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">Sales List</h2>
        </div>
        <div class="col-span-12 2xl:col-span-4">
            <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap justify-end">       
                <div class="items-center sm:flex">
                    <div class="items-center sm:flex sm:mr-4">
                        <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                            Filter
                        </label>
                        <Litepicker v-model="tglawal" :options="{
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
                                startDate: new moment().format('DD-MMM-YYYY'),
                                endDate: new moment().format('DD-MMM-YYYY'),
                                }" class="block w-56 mx-auto" />
                        <Button @click="addTransactions" class="px-2 box bg-primary text-white">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" />
                            </span> Add
                        </Button>
                    </div>
                </div>  
            </div>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 2xl:col-span-12 pt-10"> 
    
            <div class="grid grid-cols-3 gap-4">
            
                <div>
                    <FormInline class="mt-1" v-if="user.roles[0].name=='superAdmin'">
                        <FormLabel  htmlFor="horizontal-form-2" > Filter </FormLabel>
                        
                        <TomSelect v-model="studio" class="w-60 bg-white">
                            <option value="">Select All Studio</option>
                            <option v-for="item in state.listDepartement" :key="item.id"  :value="item.id">{{item.deptname}}</option>
                        </TomSelect>
                    </FormInline>
                    <!-- <Button @click="syncData" class="px-2 box bg-primary text-white" v-if="user.roles[0].name=='kasir'">
                        <span class="flex items-center justify-center w-5 h-5">
                            <Lucide icon="Database" class="w-4 h-4" />
                        </span> Upload Transaction
                    </Button>
                    <Button @click="rekap" class="ml-2 px-2 box bg-primary text-white" v-if="user.roles[0].name=='kasir'">
                        <span class="flex items-center justify-center w-5 h-5">
                            <Lucide icon="File" class="w-4 h-4" />
                        </span> Report
                    </Button> -->
                    <!-- <Button @click="updateProduct" class="px-2 ml-2 box bg-success text-white" v-if="user.roles[0].name=='kasir'">
                        <span class="flex items-center justify-center w-5 h-5">
                            <Lucide icon="Database" class="w-4 h-4" />
                        </span> Update Product
                    </Button> -->
                </div>
                <div>
                    <!-- Content for the second section goes here -->
                </div>
                <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
                    <div class="relative w-full text-slate-500">
                        <FormInline class="mr-1">
                                <FormLabel  htmlFor="horizontal-form-2" > Show </FormLabel>
                                <FormSelect v-model="show" class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </FormSelect>
                                <FormInput  type="text"  class="w-56 pr-10 !box"    placeholder="Search..." v-model="search"  />
                                <Lucide icon="Search"  class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
                                <Button @click="exportExcel" class="px-2 box bg-success text-white">
                                    <span class="flex items-center justify-center w-5 h-5">
                                        <Lucide icon="File" class="w-4 h-4" />
                                    </span>
                                </Button>
                        </FormInline>
                    </div>
                </div>
            </div>

            
            <div class="col-span-12 overflow-auto intro-y lg:overflow-visible">
                <div class="overflow-x-auto">
                    <Table class="border-spacing-y-[10px] border-separate -mt-2 pt-2">
                        <Table.Thead class="bg-primary text-white">
                            <Table.Tr>
                            
                                <Table.Th class="border-b-0 whitespace-nowrap"> No </Table.Th>
                                <!-- <Table.Th class="text-center border-b-0 whitespace-nowrap"> Action </Table.Th> -->
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Tanggal Transaksi </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> No Transaksi </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Item Code </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Item Name </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Harga Awal </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Harga Jual </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Qty </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Total Harga </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Kasir </Table.Th>
                                <Table.Th class="text-center border-b-0 whitespace-nowrap"> Studio </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                
                            <Table.Tr v-if="loading" class="intro-x">
                                <Table.Td colspan="17" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                    <div class="flex flex-col items-center justify-end col-span-12">
                                        <LoadingIcon icon="audio" class="w-8 h-8" />
                                        <div class="mt-2 text-xs text-center">Processing Data</div>
                                    </div>
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr v-if="state.listData.total==0" class="intro-x">
                                <Table.Td colspan="17" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                    <div class="flex flex-col items-center justify-end col-span-12">
                                        <div class="mt-2 text-xs text-center">Data Not Found</div>
                                    </div>
                                </Table.Td>
                            </Table.Tr>

                            <Table.Tr v-for="(data, index) in state.listData.data" :key="data.id" class="intro-x">
                                
                                <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                    {{ state.listData.from + index }}
                                </Table.Td>
                                <!-- <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                    <a class="flex items-center mr-auto text-primary" href="#" @click="cetak(data.notransaksi)">
                                        <Lucide icon="Printer" class="w-4 h-4 mr-1" />
                                    </a>
                                </Table.Td> -->
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.tanggal }}
                                </Table.Td>
                                <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.notransaksi }}
                                </Table.Td>
                                <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.kode_product }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.product_name }}
                                </Table.Td>
                
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ (data.cogs * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ (data.harga_jual * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.qty }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ (data.harga_jual * Math.abs(data.qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                </Table.Td>
                            
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.pic }}
                                </Table.Td>
                                <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                                    {{ data.deptname }}
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
                    <!-- <div class="relative w-56 text-slate-500">
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
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <Dialog class="relative" size="xl" :open="addModal"  @close="setaddModal(false)"  :initialFocus="barcodeInput">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
                <DialogPanel class="w-full rounded bg-white">
                    <Dialog.Title class="flex items-center px-5 py-1 border-b border-slate-200/60 dark:border-darkmode-400">
                        <h2 class="mr-auto text-base font-medium">
                            Add New Transactions
                        </h2>

                        <Button type="button" variant="danger" class="mb-2 mr-1" @click="setaddModal(false)">
                            <Lucide icon="XSquare" class="w-5 h-5" />
                        </Button>
                    </Dialog.Title>
                    
                    <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                    
                        <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                
                            <FormInline>
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                                <TomSelect v-model="studio" class="w-full bg-white">
                                    <option value="">Select All Studio</option>
                                    <option v-for="item in state.listDepartement" :key="item.id"  :value="item.id">{{item.deptname}}</option>
                                </TomSelect>
                            </FormInline>

                            <FormInline class="mt-1">
                                <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Search Product</FormLabel>
                                <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="barcode" @keyup.enter="cart" placeholder="Insert Barcode, Item Code, Item Name" />
                            </FormInline>
                        </div>

    
                        <div class="col-span-12 sm:col-span-8 xl:col-span-8 intro-y">
                            <div class="relative p-5 mt-0 overflow-hidden box bg-primary intro-y">
                                <div class="leading-[2.15rem] w-full sm:w-72 text-white text-xl -mt-3">
                                    Total Price
                                </div>
                                
                                <div class="w-full leading-relaxed sm:w-72 text-2xl text-white/70 dark:text-slate-500" >
                                    {{ totalHarga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }} 
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                            <div class="overflow-x-auto">
                                
                                <Table class="border-spacing-y-[1px] border-separate -mt-2 pt-1" sm>
                                    <Table.Thead class="bg-primary text-white">
                                        <Table.Tr>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Action </Table.Th>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Item Code </Table.Th>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Item Name </Table.Th>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Harga Jual </Table.Th>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Qty </Table.Th>
                                            <Table.Th class="text-center border-b-0 whitespace-nowrap"> Total </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    <Table.Tbody>
                                        <Table.Tr v-if="daftarKeranjang.length == 0" class="intro-x">
                                            <Table.Td colspan="7" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                <div class="flex flex-col items-center justify-end col-span-12">
                                                    <div class="mt-2 text-xs text-center">Data Not Found Transactions</div>
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr v-for="(item, index) in daftarKeranjang" :key="index" class="intro-x">
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.kode_product" :value="item.kode_product" placeholder="Insert Name Request" />
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.product_name" :value="item.product_name" placeholder="Insert Name Request" />
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.harga_jual" :value="item.harga_jual" placeholder="Insert Name Request" />
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.qty" :value="item.qty" placeholder="Insert Name Request" />
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.studio" :value="item.studio" placeholder="Insert Name Request" />
                                            <FormInput id="modal-form-1" type="hidden" v-model.text="item.deptname" :value="item.deptname" placeholder="Insert Name Request" />
                                            <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <a class="flex items-center mr-auto text-primary" href="#" @click="removeFromCart(index)">
                                                    <Lucide icon="Trash" class="w-4 h-4 mr-1" />
                                                </a>
                                            </Table.Td>
                                            <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {{ item.kode_product }}
                                            </Table.Td>
                                            <Table.Td  class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {{ item.product_name }}
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {{ (item.harga_jual * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }} 
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                <FormInput type="number" class="w-20" v-model.number="item.qty" :value="item.qty" />
                                            </Table.Td>
                                            <Table.Td class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                {{ (item.harga_jual * Math.abs(item.qty)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                            </Table.Td>
                                        </Table.Tr>

                    
                                    </Table.Tbody>
                                </Table>
                            </div>
                        </div>
                        
                    </Dialog.Description>

                    <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                        <Button type="button" variant="outline-secondary" @click="setaddModal(false)" class="w-20 mr-1">
                            Cancel
                        </Button>
                        <Button variant="primary" type="button" class="w-20" @click="bayar">
                            Bayar
                        </Button>
                    </Dialog.Footer>
                </DialogPanel>

                <Dialog  size="lg" :open="addModalBayar" @close="setaddModalBayar(false)" :initialFocus="paymentInput">
                    <Dialog.Panel>
                        <Dialog.Title class="flex items-center px-5 py-1 border-b border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">
                                Pembayaran
                            </h2>

                            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setaddModalBayar(false)">
                                <Lucide icon="XSquare" class="w-5 h-5" />
                            </Button>
                        </Dialog.Title>
                        
                        <Dialog.Description  class="grid grid-cols-12 gap-4 gap-y-3">
                            <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y">
                                <FormInline class="mt-0">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Total</FormLabel>
                                    <div class="relative p-5 mt-0 overflow-hidden box bg-primary intro-y">
                                        <div class="w-full leading-relaxed sm:w-72 text-2xl text-white dark:text-slate-500" >
                                            {{ totalHarga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }} 
                                            <!-- {{ totalHarga }} -->
                                        </div>
                                    </div>
                                </FormInline>

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Cash</FormLabel>
                                    <CurrencyInput type="text" class="transition duration-200 ease-in-out w-40 text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.cash" :options="{ currency: 'IDR' }" placeholder="Price" />
                                </FormInline>

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Card</FormLabel>
                                    <CurrencyInput type="text" class="transition duration-200 ease-in-out w-40 text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.card" :options="{ currency: 'IDR' }" placeholder="Price" />
                                </FormInline>

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Bank Name</FormLabel>
                                    <TomSelect v-model="state.data.bank"  class="w-80 bg-white" >
                                        <option value="">Select Bank</option>
                                        <option value="BCA">BCA</option>
                                        <option value="MANDIRI">MANDIRI</option>
                                        <option value="BRI">BRI</option>
                                        <option value="BNI">BNI</option>
                                        <option value="BSI">BSI</option>
                                        <option value="CIMB">CIMB</option>
                                        <option value="PERMATA">PERMATA</option>
                                        <option value="BTPN">BTPN</option>
                                        <option value="BTN">BTN</option>
                                        <option value="DANAMON">DANAMON</option>
                                        <option value="MUALAMAT">MUALAMAT</option>
                                        <option value="BUKOPIN">BUKOPIN</option>
                                        <option value="OTHERS">OTHERS</option>
                                    </TomSelect>
                                </FormInline>

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Number Card</FormLabel>
                                    <FormInput type="number" class="col-span-8" v-model="state.data.nocard"  placeholder="No Card Bank"/>
                                </FormInline>

                                <!-- <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Total Bayar</FormLabel>
                                    <CurrencyInput type="text" class="transition duration-200 ease-in-out w-40 text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.bayar" :options="{ currency: 'IDR' }" placeholder="Price" />
                                </FormInline> -->

                                <FormInline class="mt-2">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-40" style="text-align: left;"> Kembalian</FormLabel>
                                    <div class="relative p-5 mt-0 overflow-hidden box bg-yellow-500 intro-y">
                                        <div class="w-full leading-relaxed sm:w-72 text-2xl text-white dark:text-slate-500" >
                                            {{ ((state.data.cash + state.data.card) - totalHarga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }} 
                                    
                                        </div>
                                    </div>
                                </FormInline>

                            </div>

                        
                        </Dialog.Description>

                        <Dialog.Footer class="px-5 py-3 text-right border-t border-slate-200/60 dark:border-darkmode-400">
                            <Button type="button" variant="outline-secondary" @click="setaddModalBayar(false)" class="w-20 mr-1">
                                Cancel
                            </Button>
                            <Button variant="primary" type="button" class="w-20" @click="save">
                                Simpan
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Panel>
                </Dialog>

            </div>
        </div>
    </Dialog>

   


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


    <Dialog :open="successModalPreview" @close="
            () => {
            setSuccessModalPreview(false);
            }
        ">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="CheckCircle" class="w-16 h-16 mx-auto mt-3 text-success" />
                <div class="mt-5 text-3xl">Yeyyyy Success!</div>
                <div class="mt-2 text-slate-500">
                    {{ pesan }}
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="
                () => {
                    setSuccessModalPreview(false);
                }
                " class="w-24">
                    Ok
                </Button>
            </div>
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
    const pesan = ref("")
    const studio = ref("")
    const toko = ref("")
    const show = ref(20)
    const tglawal = ref("")
    const barcode = ref('')
    const daftarKeranjang = computed(() => store.state.keranjang)
    const barcodeInput = ref()
    const paymentInput = ref()
    const bank = ref("")
    const totalHarga = computed(() => {
        return daftarKeranjang.value.reduce((total, item) => {
            return total += (item.harga_jual  * Math.abs(item.qty))
        }, 0)
    })
    const state = reactive({
        listDepartement:{},
        listData:{},
        cartItems: [],
        data:{
            notransaksi:"",
            tglawal:"",
            product:"",
            pembayaran:"",
            toko:"",
            nocard:"",
            bank:"",
            cash:"",
            card:"",
            bayar:""

        }
    })


    const addModal = ref(false);
    const setaddModal = (value) => {
        addModal.value = value;
        document.body.style.overflow == "hidden" ? "auto" : "hidden";
        if (addModal.value == false) {
            document.body.style.overflow = "none";
        }
    };

    const addModalBayar = ref(false);
    const setaddModalBayar = (value) => {
        addModalBayar.value = value;
        document.body.style.overflow == "hidden" ? "auto" : "hidden";
        if (addModalBayar.value == false) {
            document.body.style.overflow = "none";
        }
    };
    

    const tampilData = async (page = state.listData.current_page) => {
        loading.value = true
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'){
                await Api.get('/admin/get_transactions?page=' + page+ '&q=' + search.value + '&show=' + show.value+ '&tgl=' + tglawal.value+ '&studio=' + studio.value)
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
            await Api.get('/sales/get_transactions?page=' + page+ '&q=' + search.value + '&show=' + show.value+ '&tgl=' + tglawal.value)
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

    
    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'){
            await Api.get('/admin/get_department')
            .then(response => {
                state.listDepartement = response.data.data
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
            await Api.get('/sales/get_department')
            .then(response => {
                state.listDepartement = response.data.data
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


    const addTransactions = () => {
        addModal.value = true
    }

    const bayar = () => {
        addModalBayar.value = true
    }


    const cart = () => {
        if(!studio.value){
            pesan.value =  'Please Select Studio'
            setWarningModalPreview(true)
            return false;
        }

        loading.value= false
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'){
            Api.get('/admin/getProduct?id=' + barcode.value+ '&studio=' + studio.value)
            .then(response => {
                // barcode.value = ''
                
                if (response.data.data.length > 0) {

                    const item = {
                        id_product: response.data.data[0].id_product,
                        kode_product: response.data.data[0].kode_product,
                        product_name :  response.data.data[0].product_name,
                        cogs: response.data.data[0].cogs,
                        harga_jual: response.data.data[0].harga_jual,
                        deptname : response.data.data[0].deptname,
                        studio : response.data.data[0].studio,
                        qty: 1
                    };
                    barcode.value = ''

                    // state.cartItems.push(item);     
                    store.commit('tambahKeKeranjang', item)
            
                } else {
                    pesan.value =  'Item Tidak Di Temukan'
                    setWarningModalPreview(true)
                    return;
                }


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
            Api.get('/sales/getProduct?id=' + barcode.value+ '&studio=' + studio.value)
            .then(response => {
                // barcode.value = ''
                
                if (response.data.data.length > 0) {

                    const item = {
                        id_product: response.data.data[0].id_product,
                        kode_product: response.data.data[0].kode_product,
                        product_name :  response.data.data[0].product_name,
                        cogs: response.data.data[0].cogs,
                        harga_jual: response.data.data[0].harga_jual,
                        deptname : response.data.data[0].deptname,
                        studio : response.data.data[0].studio,
                        qty: 1
                    };
                    barcode.value = ''

                    // state.cartItems.push(item);     
                    store.commit('tambahKeKeranjang', item)
            
                } else {
                    pesan.value =  'Item Tidak Di Temukan'
                    setWarningModalPreview(true)
                    return;
                }


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

    const save = async () => {

        if (state.data.cash=='0' && state.data.card=='0') {
            pesan.value =  'Total Bayar Harap Di Isi'
            setWarningModalPreview(true)
            return;
        }

        if (state.data.card!='0') {
            if (!state.data.bank) {
                pesan.value =  'BANK Harap Di Isi'
                setWarningModalPreview(true)
                return;
            }

            if (!state.data.nocard) {
                pesan.value =  'No Card Harap Di Isi'
                setWarningModalPreview(true)
                return;
            }
            
        }


        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Harap Sabar, Invoice Di Proses"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.defaults.headers.post['Content-Type'] = "multipart/form-data"
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'){
            await Api.post('/admin/prosesBayar', {
                data: daftarKeranjang.value,
                studio : studio.value,
                // pembayaran : state.data.pembayaran,
                bank : state.data.bank,
                nocard : state.data.nocard,
                cash : state.data.cash,
                card : state.data.card,
            }).then(async (response) => {

                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Transaksi Sukses"
                addModal.value = false
                studio.value = ''
                // state.data.pembayaran = ''
                state.data.bank =''
                state.data.cash =''
                state.data.card =''
                barcode.value = ''
                store.commit('hapussemua')
                tampilData()
                addModal.value = false
                addModalBayar.value = false

            }).catch(error => {
                console.log(error);
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }else{
            await Api.post('/sales/prosesBayar', {
                data: daftarKeranjang.value,
                studio : studio.value,
                // pembayaran : state.data.pembayaran,
                bank : state.data.bank,
                nocard : state.data.nocard,
                cash : state.data.cash,
                card : state.data.card,
            }).then(async (response) => {

                loadingsycn.value = false
                basicModalPreview.value = false
                setSuccessModalPreview(true)
                pesan.value = "Transaksi Sukses"
                addModal.value = false
                studio.value = ''
                // state.data.pembayaran = ''
                state.data.bank =''
                state.data.cash =''
                state.data.card =''
                barcode.value = ''
                store.commit('hapussemua')
                tampilData()
                addModal.value = false
                addModalBayar.value = false

            }).catch(error => {
                console.log(error);
                const object1 = error.response.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    }

    const removeFromCart = (index) => {
        store.commit('hapusDariKeranjang', index)
    }

    const exportExcel = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        const tgl = tglawal.value // Contoh nilai parameter id
        const sts = studio.value ?? '0' // Contoh nilai parameter id
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin'){
            await Api.get(`/admin/exportExcelSales/${tgl}/${sts}`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `List Transaction Sales.xlsx`);
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
            await Api.get(`/sales/exportExcelSales/${tgl}/${sts}`, { 
                responseType: 'blob',
            })
            .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `List Transaction Sales.xlsx`);
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


    const cetak = async (id) => {

        

        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Harap Sabar, Invoice Di Proses"
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        Api.defaults.headers.post['Content-Type'] = "multipart/form-data"
        await Api.post('/kasir/cetak', {
        
            notransaksi : id
        }).then(async (response) => {

            loadingsycn.value = false
            basicModalPreview.value = false
            setSuccessModalPreview(true)
            pesan.value = "Sukses Cetak Struk"
            
        }).catch(error => {
            console.log(error);
            const object1 = error.response.data
            pesan.value =  Object.values(object1).toString()
            setWarningModalPreview(true)
        })
    }

    onMounted(async() => {
    
        await tampilData()
        await tampilDepartement()
    })


    watch(show, (newQuestion, oldQuestion) => {
        tampilData()
    })

    watch(studio, (newQuestion, oldQuestion) => {
        tampilData()
    })

    watch(tglawal, (newQuestion, oldQuestion) => {
        tampilData()
    })

    watch(toko, (newQuestion, oldQuestion) => {
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

