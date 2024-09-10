<template>
    <a-drawer v-model:open="modalFilter" class="custom-class" root-class-name="root-class-name" root-style="blue" style="color: #1e3a8a" title="Filter Data" placement="right">
        <div class="modal-body row g-3">
            <div class="col-12 pb-2">
                <label for="email_reset" class="form-label">Pilih tahun yang mau ditampilkan</label>
            
                <div class="input-group flex-nowrap">
                    <a-range-picker v-model:value="tanggalFilter" :bordered="true" style="width: 100%;"/>
                </div>
            </div>

            <div class="col-12 pb-2" v-if="user.roles[0].name!='salesConsultant'">
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
        <div class="col-span-12">
            <Preview class="intro-y box">
                <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <!-- Kolom 1: Add New Leads -->
                    <div class="flex items-center justify-start sm:w-1/3">
                        <Button variant="primary" class="mr-2 shadow-md" @click="add" v-if="user.roles[0].name=='salesConsultant' || user.roles[0].name=='salesLeader'  || user.roles[0].name=='salesManager'">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Plus" class="w-4 h-4" />
                            </span>
                        </Button>

                        <Button variant="warning" class="mr-2 shadow-md" @click="upload">
                            <span class="flex items-center justify-center w-5 h-5">
                                <Lucide icon="Upload" class="w-4 h-4" />
                            </span>
                        </Button>

                        <Button variant="success" class="mr-2 shadow-md" @click="modalExport">
                            <span class="text-white flex items-center justify-center w-5 h-5">
                                <Lucide icon="File" class="w-4 h-4" />
                            </span>
                        </Button>
                    </div>

                    <!-- Kolom 2: CRM Database Summary -->
                    <div class="justify-center text-center sm:w-1/3">
                        <h2 class="text-base font-medium" v-if="!studio || studio.length==0">CRM Database Summary Semua Studio </h2>
                        <h2 class="text-base font-medium" v-else>CRM Database Summary Studio {{studio}}</h2>
                        <h2 class="text-base font-medium">{{ dayjs(startDate).format('D MMM YYYY') }} s/d {{ dayjs(endDate).format('D MMM YYYY') }}</h2>
                    </div>

                    <!-- Kolom 3: Upload dan Export -->
                    <div class="flex items-center justify-end sm:w-1/3">
            
                        <Button variant="success" class="mr-2 shadow-md" @click="showModal">
                            <span class="text-white flex items-center justify-center w-20 h-5">
                                <Lucide icon="Filter" class="w-4 h-4 mr-3" /> Filter
                            </span>
                        </Button>
                    </div>
                </div>

            </Preview>
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">
    
        <div class="col-span-12 2xl:col-span-3 mt-8" v-if="user.roles[0].name=='salesConsultant'"> 
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-12 intro-y" @click="tot(tanggal)">
                    <div class="p-5 box zoom-in bg-blue-500">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Total</div>
                            <div class="mt-1 text-white">{{ total }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 intro-y" @click="detail(tanggal, 0)">
                    <div class="p-5 box zoom-in bg-orange-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Need Followup</div>
                            <div class="mt-1 text-white">{{ needfu }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 intro-y" @click="detail(tanggal, 1)">
                    <div class="p-5 box zoom-in bg-yellow-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Proses Followup</div>
                            <div class="mt-1 text-white">{{ proses }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 intro-y" @click="detail(tanggal, 2)">
                    <div class="p-5 box zoom-in bg-green-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Prospect</div>
                            <div class="mt-1 text-white">{{ prospect }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 intro-y" @click="detail(tanggal, 3)">
                    <div class="p-5 box zoom-in bg-red-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Loss</div>
                            <div class="mt-1 text-white">{{ loss }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 intro-y" @click="detail(tanggal, 4)">
                    <div class="p-5 box zoom-in bg-blue-400">
                        <div class="flex items-center">
                            <div class="flex-none">
                            <div class="text-lg font-medium truncate text-white"> Join</div>
                            <div class="mt-1 text-white">{{ join }} Leads</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-8" :class="[
            'col-span-12',
            {'2xl:col-span-9': user.roles[0].name === 'salesConsultant'},
            '2xl:col-span-12'
            ]">
            <Preview class="intro-y box p-5">
                <h3>Sales Performance Dashboard</h3>

                <div class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                    <div class="items-center justify-center flex-1 px-5 lg:justify-start">
                        <div class="font-medium text-center lg:text-left lg:mt-3">
                            Sales Revenue
                        </div>
                        
                        <div class="flex justify-center items-center h-full">
                            <div class="text-xl text-base text-center">
                            {{ (DataAchive.revenue * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }} ({{ Math.round(((parseInt(DataAchive.mytarget *1 ) / parseInt(DataAchive.revenue *1)) * 100))  }} %)
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
                        <div class="font-medium text-center lg:text-left lg:mt-3">
                            Sales Achivement
                        </div>
                        <div class="items-center justify-center mt-4 lg:items-start">
                            <div class="grid grid-cols-12 gap-6">
                                <div class="col-span-6 sm:col-span-6 xl:col-span-6 intro-y">
                                    <div class="p-5 box">
                                        <div class="flex">
                                            <Lucide
                                            icon="UserCheck"
                                            class="w-[28px] h-[28px] text-primary"
                                            />
                                            <div class="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="33% Higher than last month mr-5"
                                                >
                                                    <div class=" font-medium mr-1">{{ DataAchive.newMember}}</div>
                                                </Tippy>
                                            </div>
                                        </div>
                                    
                                        <div class="mt-1 text-base text-center text-slate-500">New Members By Unit</div>
                                    </div>
                                </div>

                                <div class="col-span-6 sm:col-span-6 xl:col-span-6 intro-y">
                                    <div class="p-5 box">
                                        <div class="flex">
                                            <Lucide
                                            icon="UserPlus"
                                            class="w-[28px] h-[28px] text-primary"
                                            />
                                            <div class="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="33% Higher than last month mr-5"
                                                >
                                                    <div class=" font-medium mr-1">{{ DataAchive.Upgrade}}</div>
                                                </Tippy>
                                            </div>
                                        </div>
                                    
                                        <div class="mt-1 text-base text-center text-slate-500">Upgrade Members</div>
                                    </div>
                                </div>

                            
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
                        <div class="font-medium text-center lg:text-left lg:mt-5">
                            Sales Summary
                        </div>
                        <div class="flex items-center justify-center mt-2 lg:justify-start">
                            <div class="flex w-full mr-2">
                            Trial Appointment:
                            <span class="ml-3 font-medium text-warning">{{ DataAchive.trial}}</span>
                            </div>
                            <div class="w-3/4">
                                
                            </div>
                        </div>
                        <div class="flex items-center justify-center lg:justify-start">
                            <div class="flex w-full mr-2">
                            Trial Show: <span class="ml-3 font-medium text-success">{{ DataAchive.trialshow}}</span>
                            </div>
                            <div class="w-3/4">
                                
                            </div>
                        </div>
                        <div class="flex items-center justify-center lg:justify-start">
                            <div class="flex w-full mr-2">
                            Trial Converted: <span class="ml-3 font-medium text-primary">{{ DataAchive.trialshowConverter}}</span>
                            </div>
                            <div class="w-3/4">
                                
                            </div>
                        </div>
                        <div class="text-xl text-base text-center pt-3">
                            Target {{ (parseInt(DataAchive.mytarget) * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                            
                        </div>
                    </div>
                </div>

                <div class="col-span-12 2xl:col-span-3 hidden sm:block">
                    <div class="overflow-x-auto">
                        <Table>
                            <Table.Thead  class="bg-primary text-white">
                                <Table.Tr class="intro-x">
                                    <Table.Th colspan="8" class="border-b-0 whitespace-nowrap text-center">
                                        ACHIEVEMENT MONITORING
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
                                        TARGET UNIT
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        TARGET SALES
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        ACT UNIT
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        ACT SALES
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        % ACT UNIT
                                    </Table.Th>
                                    <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                        % ACT SALES
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr v-if="listAchiev.total===0" class="intro-x">
                                    <Table.Td colspan="7" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                        <div class="flex flex-col items-center justify-end col-span-12">
                                            <div class="mt-2 text-xs text-center">Data Not Found</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr class="intro-x" v-for="(data, index) in listAchiev.data" :key="data.id" v-else>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                        <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                                            {{ listAchiev.from + index }}
                                        </div>
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ data.name }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ data.unit }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ (data.nominal * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ data.actUnit }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        {{ (1 * data.actNominal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                    
                                        <div v-if="Number.isNaN((data.actUnit / data.unit) * 100)">0%</div>
                                        <div v-else-if="!Number.isFinite((data.actUnit / data.unit) * 100)">0%</div>
                                        <div v-else>
                                            <span :class="getColorStyle((data.actUnit / data.unit) * 100)">
                                                {{ Math.round((data.actUnit / data.unit) * 100) }}%
                                            </span>
                                        
                                        </div>

                                    </Table.Td>
                                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                        <div v-if="Number.isNaN((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">0%</div>
                                        <div v-else-if="!Number.isFinite((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">0%</div>
                                        <div v-else>
                                            <span :class="getColorStyleSales((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">
                                                {{ Math.round((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100) }}%
                                            </span>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
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
                        <div v-if="listAchiev.total==0" class="col-span-12 intro-y">
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
                        <div v-for="(data, index) in listAchiev.data" :key="data.id" class="col-span-12 intro-y">
                            <div class="box">
                                <div class="p-5">
                                    <div class="mt-5 text-slate-600 dark:text-slate-500">
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="User" class="w-4 h-4 mr-2" /> Nama Sales : {{ data.name }}
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> Target Unit : {{ data.unit }}
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> Target Sales : {{ (data.nominal * 1).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> Act Unit : {{ data.actUnit  }} 
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> Act Sales : {{ (1 * data.actNominal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3) }}
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> % Act Unit :  
                                            <div v-if="Number.isNaN((data.actUnit / data.unit) * 100)">0%</div>
                                            <div v-else-if="!Number.isFinite((data.actUnit / data.unit) * 100)">0%</div>
                                            <div v-else>
                                                <span :class="getColorStyle((data.actUnit / data.unit) * 100)">
                                                    {{ Math.round((data.actUnit / data.unit) * 100) }}%
                                                </span>
                                            
                                            </div>
                                        </div>
                                        <div class="flex items-center mt-2">
                                            <Lucide icon="TrendingUp" class="w-4 h-4 mr-2" /> % Act Sales : 
                                            <div v-if="Number.isNaN((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">0%</div>
                                            <div v-else-if="!Number.isFinite((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">0%</div>
                                            <div v-else>
                                                <span :class="getColorStyleSales((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100)">
                                                    {{ Math.round((parseInt(data.actNominal * 1) / parseInt(data.nominal * 1)) * 100) }}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">  
                    <div class="items-center sm:flex sm:mr-4">
                        <TailwindPagination :limit="1" :data="listAchiev" @pagination-change-page="tampilachiev"/>
                    </div>

                    <div class="hidden mx-auto md:block text-slate-500">
                        Showing {{ listAchiev.from }} to {{ listAchiev.to }} of {{ listAchiev.total }} entries
                    </div>

                </div>

            </Preview>
        </div>
        <div class="col-span-12 2xl:col-span-3" v-if="user.roles[0].name!='salesConsultant'">
            <div class="pb-10 -mb-10 2xl:border-l">
                <div class="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
                
                    <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8">
                        <div class="flex items-center h-10 intro-x">
                            <h2 class="mr-5 text-lg text-center font-medium truncate">Summary Status Leads</h2>
                        </div>
                        
                        <div class="mt-5">
                            <div @click="detail(tanggal, 0)"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Need Followup</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-orange-400 py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ needfu }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                            <div @click="detail(tanggal, 1)"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Proses</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-yellow-400 py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ proses }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                            <div @click="detail(tanggal, 2)"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Prospect</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ prospect }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                            <div @click="detail(tanggal, 3)"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Loss</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ loss }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                            <div @click="detail(tanggal, 4)"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Join</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-info py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ join }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <br>
                            <div @click="detail(tanggal, 'total')"
                                :class="['relative zoom-in',
                                'before:content-[\'\'] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70',
                                ]">
                                <div class="p-5 box">
                                    <div class="flex items-center justify-start">
                                    
                                        <div class="text-2xl font-medium leading-8">Total Leads</div>
                                        <div class="ml-auto">
                                        <Tippy
                                            as="div"
                                            class="cursor-pointer bg-primary py-[3px] flex rounded-full text-white text-xs pl-2 pr-2 items-center font-medium"
                                            content="33% Higher than last month"
                                        >
                                                {{ total }}
                                            
                                        </Tippy>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 2xl:col-span-9" v-if="user.roles[0].name!='salesConsultant'">
            <div class="grid grid-cols-12 gap-6">
            
                <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                    <div class="col-span-12 2xl:col-span-3 hidden sm:block">
                        <div class="overflow-x-auto">
                            <Table>
                                <Table.Thead  class="bg-primary text-white">
                                    <Table.Tr class="intro-x">
                                        <Table.Th colspan="8" class="border-b-0 whitespace-nowrap text-center">
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
                                            JOIN
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
                                            <a class="text-success" href="#" @click="sales(tanggal, data.idsales)">
                                                {{ data.create_name }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="detail(tanggal, 0, data.idsales)">
                                                {{ data.need }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="detail(tanggal, 1, data.idsales)">
                                                {{ data.process }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="detail(tanggal, 2, data.idsales)">
                                                {{ data.prospect }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="detail(tanggal,3, data.idsales)">
                                                {{ data.loss }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="detail(tanggal,4, data.idsales)">
                                                {{ data.joins }}
                                            </a>
                                        </Table.Td>
                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                            <a class="text-success" href="#" @click="tot(tanggal, data.idsales)">
                                                {{ data.total }}
                                            </a>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
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
                            <div v-else-if="state.listData.total==0" class="col-span-12 intro-y">
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
                        

                            <div class="col-span-12 px-5 pt-5 mt-5 intro-y box" v-for="(data, index) in state.listData.data" :key="data.id" v-else>
                                <div class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
                                    <div class="flex items-center justify-center flex-1 px-5 lg:justify-start">
                    
                                        <div class="ml-5">
                                            <div class="w-full text-lg font-medium  text-decoration-line-through sm:w-40 sm:whitespace-normal" @click="sales(tanggal, data.idsales)">
                                                {{ data.create_name }}
                                            </div>
                                        </div>
                                    </div>

                            
                                    <div class="flex items-center justify-center flex-1 px-5  mt-2 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0">
                                        <div class="w-20 py-3 text-center rounded-md" @click="detail(tanggal,0, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.need }}</div>
                                            <div class="text-slate-500">Need Fu</div>
                                        </div>
                                        <div class="w-20 py-3 text-center rounded-md" @click="detail(tanggal,1, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.process }}</div>
                                            <div class="text-slate-500">Process</div>
                                        </div>
                                        <div class="w-20 py-3 text-center rounded-md" @click="detail(tanggal,2, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.prospect }}</div>
                                            <div class="text-slate-500">Prospect</div>
                                        </div>
                                        <div class="w-20 py-3 text-center rounded-md" @click="detail(tanggal,3, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.loss }}</div>
                                            <div class="text-slate-500">Loss</div>
                                        </div>
                                        <div class="w-20 py-3 text-center rounded-md" @click="detail(tanggal,4, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.joins }}</div>
                                            <div class="text-slate-500">Join</div>
                                        </div>
                                        <div class="w-20 py-3 text-center rounded-md" @click="tot(tanggal, data.idsales)">
                                            <div class="text-xl font-medium text-primary">{{ data.total }}</div>
                                            <div class="text-slate-500">Total</div>
                                        </div>
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

                

                <div class="col-span-12 mt-3">
                    <Preview class="intro-y box">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">SUMMARY SOURCE LEADS</h2>
                        </div>

                        <div class="p-5">
                            <Preview.Panel>
                                <div class="grid grid-cols-12 gap-6">
                                    <div class="col-span-12 md:col-span-4 xl:col-span-4 2xl:col-span-4">
                                        <div class="table-responsive">
                                            <Table>
                                                <Table.Thead  class="bg-primary text-white">
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
                                                            <a class="text-success" href="#">
                                                                {{ item.total }}
                                                            </a>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </div>

                                    <div class="col-span-12 md:col-span-8 xl:col-span-8 2xl:col-span-8">
                                        <apexchart type="bar" height="500" :options="chartOptions" :series="series"></apexchart>
                                    </div>
                                </div>
                            </Preview.Panel>
                        </div>
                    </Preview>
                </div>

                <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-4">
                    <Preview class="intro-y box">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">SUMMARY CATEGORY LEADS</h2>
                        </div>

                        <div class="p-5">
                            <Preview.Panel>
                                <div class="grid grid-cols-12 gap-6">
                                    <div class="col-span-12 md:col-span-4 xl:col-span-4 2xl:col-span-4">
                                        <div class="table-responsive2">
                                            <Table>
                                                <Table.Thead  class="bg-primary text-white"> 
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
                                                            <a class="text-success" href="#">
                                                                {{ item.total }}
                                                            </a>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </div>

                                    <div class="col-span-12 md:col-span-8 xl:col-span-8 2xl:col-span-8">
                                        <apexchart type="bar" height="500" :options="chartOptions2" :series="series2"></apexchart>
                                    </div>
                                </div>
                            </Preview.Panel>
                        </div>
                    </Preview>
                </div>

                <div class="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-4" v-if="user.roles[0].name=='superAdmin' || user.roles[0].name=='admin' || user.roles[0].name=='salesManager'">
                    <Preview class="intro-y box">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                            <h2 class="mr-auto text-base font-medium">SUMMARY LEADS BY STUDIO</h2>
                        </div>

                        <div class="p-5">
                            <Preview.Panel>
                                <div class="grid grid-cols-12 gap-6">
                                    <div class="col-span-12 md:col-span-4 xl:col-span-4 2xl:col-span-4">
                                        <div class="table-responsive">
                                            <Table>
                                                <Table.Thead  class="bg-primary text-white">
                                                    <Table.Tr class="intro-x">
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            STUDIO
                                                        </Table.Th>
                                                        <Table.Th class="border-b-0 whitespace-nowrap text-center">
                                                            TOTAL
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    <Table.Tr v-if="state.studio.length==0" class="intro-x">
                                                        <Table.Td colspan="2" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]" >
                                                            <div class="flex flex-col items-center justify-end col-span-12">
                                                                <div class="mt-2 text-xs text-center">Data Not Found</div>
                                                            </div>
                                                        </Table.Td>
                                                    </Table.Tr>

                                                    
                                                    <Table.Tr class="intro-x" v-for="item in state.studio" :key="item.id" >
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                                                            <div class="px-2 py-1 text-xs font-medium text-white rounded-full bg-teal-500 text-center">
                                                                {{ item.studio }}
                                                            </div>
                                                        </Table.Td>
                                                        <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]  text-center">
                                                            <a class="text-success" href="#">
                                                                {{ item.total }}
                                                            </a>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    </div>

                                    <div class="col-span-12 md:col-span-4 xl:col-span-8 2xl:col-span-8">
                                        <apexchart type="pie" width="500" :options="chartOptionsStudio" :series="seriesStudio"></apexchart>
                                    </div>
                                </div>
                            </Preview.Panel>
                        </div>
                    </Preview>
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

    <Dialog  size="xl" :open="AddModal"  >
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

                    <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1" class="sm:w-60" style="text-align: left">Tanggal Leads</FormLabel>
                        <div class="relative w-full">
                        <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" class="w-4 h-4" />
                        </div>
                        <Litepicker v-model="state.data.tanggal_leads"
                        :options="singleLite(state.data.tanggal_leads)"
                            class="pl-12"/>
                        </div>
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

                    <FormInline class="mt-2">
                        <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Studio</FormLabel>
                        <TomSelect v-model="studio" :options="{placeholder: 'Select Studio'}" class="w-full">
                            <option value="">Select Studio</option>
                            <option v-for="item in state.listDepartement" :key="item.id" :value="item.deptname">{{item.deptname}}</option>
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

    <Dialog  size="lg" :open="uploadModal"  >
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

    <a-modal v-model:open="exportModal" title="Export Data">
        <div class="modal-body row g-3">


            <div class="col-12 pb-2">
                <label for="email_reset" class="form-label">Pilih Kategori</label>
                
                <div class="input-group flex-nowrap">
                    <a-select v-model:value="filterCRM"  size="large" style="width: 100%"  placeholder="Pilih Data Export">
                        <a-select-option value="CRM Leads">CRM Leads</a-select-option>
                        <a-select-option value="CRM Leads With Pembayaran">CRM Leads With Pembayaran</a-select-option>
                    </a-select>
                </div>
            </div>
        </div>

        <template #footer>
            <a-button type="primary" class="bg-primary" @click="exportExcel()">Filter</a-button>
        </template>

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
    </a-modal>

</template>

<script setup>
    import Api from '../api/Api'
    import Button from "../base-components/Button"
    import TomSelect from "../base-components/TomSelect"
    import { FormInput, FormInline, FormLabel } from "../base-components/Form"
    import { onMounted, ref, reactive , watch, computed  } from "vue"
    import { useRouter  } from 'vue-router'
    import { useStore } from "vuex"
    import Tippy from "../base-components/Tippy";
    import LoadingIcon from "../base-components/LoadingIcon"
    import { TailwindPagination } from 'laravel-vue-pagination'
    import Preview from "../base-components/Preview";
    import Lucide from "../base-components/Lucide"
    import Table from "../base-components/Table"
    import moment from 'moment'
    import Litepicker from "../base-components/Litepicker"
    import { Dialog } from "../base-components/Headless"
    import man from "../assets/images/sabar.png"
    import { useDebounceFn } from '@vueuse/core'
    import dayjs from 'dayjs'
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

    const showModal = () => {
        modalFilter.value = true;
    };


    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    const router = useRouter()
    const store = useStore()
    const modalFilter = ref(false)
    const tanggal=ref(dayjs().startOf('year').format('YYYY-MM-DD') + ' - ' + dayjs().format('YYYY-MM-DD'))
    const filterStudio=ref([])
    const tanggalFilter=ref("")
    const user = store.getters['auth/currentUser']
    const loading = ref("")
    const loadingsycn = ref("")
    const startDate = ref("")
    const baseUrl = ref('https://login.yogafitidonline.com/api/storage/foto/')
    const endDate = ref("")
    const search = ref("")
    const pesan = ref("")
    const source = ref("")
    const file = ref("")
    const DataAchive=ref({})
    const show = ref(20)
    const total = ref(0)
    const needfu = ref(0)
    const exportModal=ref(false)
    const filterCRM=ref([])
    const studio = ref("")
    const proses = ref(0)
    const loss = ref(0)
    const join = ref(0)
    const prospect = ref(0)
    const seriesData=ref([])
    const series=ref([])
    const seriesData2=ref([])
    const series2=ref([])
    const seriesStudio=ref([])
    const seriesDataStudio=ref([])
    const listAchiev=ref({})
    const state = reactive(
        {
            listSource:{},
            source:{},
            category:{},
            listData:{},
            studio:{},
            listDepartementGroup:{},
            listDepartement:{},
            data:{
                nama:"",
                telp:"",
                email:"",
                tanggal_leads:""
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

    const singleLite = (date) => {
        return {
            autoApply: false,
            singleMode: true,
            dropdowns: {
                minYear: 1990,
                maxYear: 2050,
                months: true,
                years: true,
            },
            format: "YYYY-MM-DD",
            mobileFriendly: true,
            startDate: new moment(date).format("YYYY-MM-DD")
        }
    };

    const modalSubmit = async() =>{
    
        if(!tanggalFilter.value){
            studio.value = filterStudio.value
            await tampilData()
            await tampilachiev()
        }else{
            const [timestamp1, timestamp2] = tanggalFilter.value;
            tanggal.value = dayjs(timestamp1.$d).format('YYYY-MM-DD') + ' - ' + dayjs(timestamp2.$d).format('YYYY-MM-DD')
            startDate.value = timestamp1.$d
            endDate.value = timestamp2.$d
            studio.value = filterStudio.value
            await tampilData()
            await tampilachiev()
            
        }
    
    }



    const tampilData = async (page=1) => {
        loadingsycn.value = true
        basicModalPreview.value = true
        pesan.value="Please Wait, Proccesing Get Data"
    
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/crmSummary?page=' + page+  '&tgl=' +  tanggal.value+  '&studio=' +  studio.value)
            .then(response => {
                state.listSource = response.data.data
                total.value = response.data.total
                needfu.value = response.data.needfu
                proses.value = response.data.proses
                loss.value = response.data.loss
                join.value = response.data.join
                prospect.value = response.data.prospect
                state.source = response.data.source
                state.studio = response.data.studio
                state.category = response.data.category
                state.listData = response.data.pic
                seriesData.value = response.data.source.map(dept => dept.source)
                series.value = [{
                    name: 'Data',
                    data: response.data.source.map(dept => dept.total)
                }]

                seriesData2.value = response.data.category.map(dept => dept.remarks)
                series2.value = [{
                    name: 'Data',
                    data: response.data.category.map(dept => dept.total)
                }]

    
                const datastudio=  response.data.studio.map(dept => ({
                    total : dept.total,
                    studio: dept.studio ? dept.studio : 'data belum ada studio'
                }));

                const studioArrayTotal =  datastudio.map(item => Number(item.total))

                seriesStudio.value = studioArrayTotal


                const studioArray = datastudio.map(item => item.studio);
                seriesDataStudio.value = studioArray

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
        }else if(user.roles[0].name=='salesLeader' || user.roles[0].name=='salesConsultant'  || user.roles[0].name=='salesManager'){
            await Api.get('/sales/crmSummary?page=' + page+  '&tgl=' +  tanggal.value+  '&studio=' +  studio.value)
            .then(response => {
                state.listSource = response.data.data
                total.value = response.data.total
                needfu.value = response.data.needfu
                proses.value = response.data.proses
                loss.value = response.data.loss
                join.value = response.data.join
                prospect.value = response.data.prospect
                state.source = response.data.source
                state.category = response.data.category
                state.studio = response.data.studio
                state.listData = response.data.pic

                if (user.roles[0].name=='salesLeader' || user.roles[0].name=='salesManager') {
                    seriesData.value = response.data.source.map(dept => dept.source)
                    series.value = [{
                        name: 'Data',
                        data: response.data.source.map(dept => dept.total)
                    }]

                    seriesData2.value = response.data.category.map(dept => dept.remarks)
                    series2.value = [{
                        name: 'Data',
                        data: response.data.category.map(dept => dept.total)
                    }]

        
                    const datastudio=  response.data.studio.map(dept => ({
                        total : dept.total,
                        studio: dept.studio ? dept.studio : 'data belum ada studio'
                    }));

                    const studioArrayTotal =  datastudio.map(item => Number(item.total))

                    seriesStudio.value = studioArrayTotal


                    const studioArray = datastudio.map(item => item.studio);
                    seriesDataStudio.value = studioArray
                }
    
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
        
        }else {
            await Api.get('/admin/crmSummary?page=' + page+  '&tgl=' +  tanggal.value)
            .then(response => {
                state.listSource = response.data.data
                total.value = response.data.total
                needfu.value = response.data.needfu
                proses.value = response.data.proses
                loss.value = response.data.loss
                prospect.value = response.data.prospect
                join.value = response.data.join
                seriesData.value = response.data.source.map(dept => dept.source)
                series.value = [{
                    name: 'Data',
                    data: response.data.source.map(dept => dept.total)
                }]

                seriesData2.value = response.data.category.map(dept => dept.remarks)
                series2.value = [{
                    name: 'Data',
                    data: response.data.category.map(dept => dept.total)
                }]

    
                const datastudio=  response.data.studio.map(dept => ({
                    total : dept.total,
                    studio: dept.studio ? dept.studio : 'data belum ada studio'
                }));

                const studioArrayTotal =  datastudio.map(item => Number(item.total))

                seriesStudio.value = studioArrayTotal


                const studioArray = datastudio.map(item => item.studio);
                seriesDataStudio.value = studioArray
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
        if(user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
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
        } else {
            await Api.post('/sales/import', formData)
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
    
    }


    const tot = async (tanggal, sales = 0) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        query : {
                startDate : startDate,
                endDate : endDate,
                status :'total',
                sales : sales
            }
        })
    }

    const detail = async (tanggal, statusDetail, sales=0) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        query : {
                startDate : startDate,
                endDate : endDate,
                status :statusDetail,
                sales : sales,
                studio : studio.value
            }
        })
    }


    const chartOptions = computed(() => ({
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val ;
            },
            offsetY: -5,
            style: {
                fontSize: '12px'
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: seriesData.value,
        },
        yaxis: {
            title: {
            text: 'Leads'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
            formatter: function (val) {
                return val + " Leads"
            }
            }
        }
    }));

    const chartOptions2 = computed(() => ({
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val ;
            },
            offsetY: -5,
            style: {
                fontSize: '12px'
            }
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: seriesData2.value,
        },
        yaxis: {
            title: {
            text: 'Leads'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
            formatter: function (val) {
                return val + " Leads"
            }
            }
        }
    }));

    const chartOptionsStudio = computed(() => ({
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: seriesDataStudio.value,
        responsive: [{
            breakpoint: 480,
            options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
            }
        }]
    }));

    const sales = async (tanggal, sales) => {
        const dateParts = tanggal.split(" - ");
        const startDate = dateParts[0];
        const endDate = dateParts[1];
        router.push({name: 'ListDetailCRM',
        query : {
                startDate : startDate,
                endDate : endDate,
                status : 'total',
                sales : sales,
                studio : studio.value
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
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.post('/admin/crm', {
                nama : state.data.nama,
                email : state.data.email,
                telp : state.data.telp.toString(),
                source : source.value,
                tanggal_leads : state.data.tanggal_leads,
                studio : studio.value
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                pesan.value = "Success Save Data"
                setSuccessModalPreview(true)
                
                AddModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        } else {
            await Api.post('/sales/crm', {
                nama : state.data.nama,
                email : state.data.email,
                telp : state.data.telp.toString(),
                source : source.value,
                tanggal_leads : state.data.tanggal_leads,
                studio : studio.value
            }).then(async (response) => {
                loadingsycn.value = false
                basicModalPreview.value = false
                pesan.value = "Success Save Data"
                setSuccessModalPreview(true)
                
                AddModal.value = false
                tampilData()
            }).catch(error => {

                const object1 = error.response.data.data
                pesan.value =  Object.values(object1).toString()
                setWarningModalPreview(true)
            })
        }
    }

    const modalExport = () => {
        exportModal.value= true
    }

    const exportExcel = async () => {
        loadingsycn.value = true
        basicModalPreview.value = true
        const tgl = tanggal.value
        pesan.value="Mohon Tunggu ya, Lagi Ambil Data"
        const token = localStorage.getItem('token_mdss')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            let url=''
            if(filterCRM.value=='CRM Leads'){
                url =  Api.get(`/admin/exportExcelCrm/${tgl}`, { 
                        responseType: 'blob',
                    })
            }else{
                url =  Api.get(`/admin/exportExcelCrmPembayaran/${tgl}`, { 
                    responseType: 'blob',
                })
            }
    
            await url.then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Report CRM Yogafit.xlsx`);
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
            let url=''
            if(filterCRM.value=='CRM Leads'){
                url =  Api.get(`/sales/exportExcelCrm/${tgl}`, { 
                        responseType: 'blob',
                    })
            }else{
                url =  Api.get(`/sales/exportExcelCrmPembayaran/${tgl}`, { 
                    responseType: 'blob',
                })
            }
            await url.then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Report CRM Yogafit.xlsx`);
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

    const tampilDepartement = async () => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
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

    const tampilachiev = async (page=1) => {
        const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
        if (user.roles[0].name=='superAdmin' || user.roles[0].name=='admin') {
            await Api.get('/admin/getAchiev?page=' + page+ '&tgl=' +  tanggal.value+  '&studio=' +  studio.value)
            .then(response => {
                DataAchive.value = response.data.data
                listAchiev.value = response.data.data.results
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
            await Api.get('/sales/getAchiev?page=' + page+ '&tgl=' +  tanggal.value+  '&studio=' +  studio.value)
            .then(response => {
                DataAchive.value = response.data.data
                listAchiev.value = response.data.data.results
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

    const  getColorStyle = (percent) => {
        if (percent <= 50) {
            return 'text-danger'; // Merah
        } else if (percent <= 80) {
            return 'text-yellow-400'; // Kuning
        } else {
            return 'text-success'; // Hijau
        }
    }

    const  getColorStyleSales = (percent) => {
        if (percent <= 50) {
            return 'text-danger'; // Merah
        } else if (percent <= 80) {
            return 'text-yellow-400'; // Kuning
        } else {
            return 'text-success'; // Hijau
        }
    }

    onMounted(async() => {
        if (user.roles[0].name=='studio') {
            router.push({ name: "Studio_CheckIn" });
        }else if(user.roles[0].name=='teacher'){
            router.push({ name: "Dashboard_Teacher" });
        }else if(user.roles[0].name=='member'){
            router.push({ name: "Dashboard_Member" });
        }else{
            const dateRange = tanggal.value.split(' - ');
            startDate.value = dateRange[0];
            endDate.value = dateRange[1];
            await tampilachiev()
            await tampilData()
            await tampilDepartement()

            if(user.group_studio==null){
                state.listDepartementGroup = state.listDepartement.map(dept => dept.deptname)
            }else{
                const tempatArray = user.group_studio.split(',');
                state.listDepartementGroup  = tempatArray
                
            }
        }
    
    })


    watch(show, (newQuestion, oldQuestion) => {
        tampilData()
    })


    watch(tanggal, (newQuestion, oldQuestion) => {
        tampilData()
    })

    watch(studio, (newQuestion, oldQuestion) => {
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

<style scoped>

    .table-responsive {
        max-height: 370px; /* Set your desired max height for the tbody */
        overflow-y: auto;
    }

    .table-responsive thead {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .table-responsive thead th,
    .table-responsive tbody th,
    .table-responsive tbody td {
        white-space: nowrap; /* Prevent text wrapping in cells */
    }

    .table-responsive2 {
        max-height: 400px; /* Set your desired max height for the tbody */
        overflow-y: auto;
    }

    .table-responsive2 thead {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .table-responsive2 thead th,
    .table-responsive2 tbody th,
    .table-responsive2 tbody td {
        white-space: nowrap; /* Prevent text wrapping in cells */
    }

    .table-responsive thead {
        position: sticky;
        top: 0;
        z-index: 1;
    
    }
    

</style>