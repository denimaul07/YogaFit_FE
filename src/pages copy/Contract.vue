<template>
  <div v-if="loadingsycn == true">
    <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false)">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div class="p-5 text-center pt-10">
            <br /><br />
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

  <div v-if="loading == true">
    <Dialog :open="basicModalPreview" @close="setBasicModalPreview(false)">
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div class="p-5 text-center pt-10">
            <br /><br />
            <div class="flex flex-col items-center justify-end col-span-12">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="w-1/2 -mt-16 -intro-x"
                :src="man"
              />
              <div class="mt-2 text-1xl text-center">
                Mohon Tunggu Ya, Lagi Proses Ambil Data :)
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 2xl:col-span-4">
      <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-nowrap">
        <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="Home" class="w-4 h-4 mr-3" /> Home</RouterLink>
        <RouterLink :to="{ name: 'contract' }" class="flex items-center pr-4 text-primary mt-5"><Lucide icon="ChevronRight" class="w-4 h-4 mr-3" /> Master Contract</RouterLink>
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-4">
      <h2 class="mt-4 text-lg font-medium intro-y items-center text-center">
        List Data Contract
      </h2>
    </div>
    <div class="col-span-12 2xl:col-span-4"></div>
  </div>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-12 pt-12">
      <div class="grid grid-cols-12 gap-6">
        <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <div class="items-center sm:flex sm:mr-4">
            <Button  variant="primary" class="mr-2 shadow-md" @click="add">
              <span class="flex items-center justify-center w-40 h-5">
                <Lucide icon="Plus" class="w-4 h-4" /> Add New Contract
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
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Name Member</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Email</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Type</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Package </Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Sessions</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Studio</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Start</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">End</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Status</Table.Th>
                    <Table.Th class="border-b-0 whitespace-nowrap text-center">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  <Table.Tr v-if="state.listData.total == 0" class="intro-x">
                    <Table.Td colspan="11" class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div class="flex flex-col items-center justify-end col-span-12">
                        <div class="mt-2 text-xs text-center">Data Not Found</div>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr class="intro-x" v-for="(data, index) in state.listData.data" :key="data.id">
                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div class="px-2 py-1 text-xs font-medium rounded-full bg-white text-center">
                        {{ state.listData.from + index }}
                      </div>
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.name }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.email }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.type }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.packages_name }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.sessions }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.deptname }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.start_date }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] text-center whitespace-nowrap">
                      {{ data.end_date }}
                    </Table.Td>
                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] whitespace-nowrap">
                      <div class="flex items-center justify-center" >
                        <!-- <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" /> -->
                        <div class="text-success" v-if="data.status_contract == 0">Active</div>
                        <div class="text-danger" v-else>Non Active</div>
                      </div>
                    </Table.Td>

                    <Table.Td class="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                      <div class="flex items-center justify-center">
                        <a class="flex items-center text-success" href="#" @click="edit(data.idcontract)">
                          <Lucide icon="Pencil" class="w-4 h-4 mr-1" />
                        </a>

                        <a class="flex items-center text-primary ml-5" href="#" @click="print(data.idcontract)">
                          <Lucide icon="Printer" class="w-4 h-4 mr-1" />
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
        <div class="mt-2 text-slate-500">{{ pesan }}</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <Button type="button" variant="primary"  @click="setWarningModalPreview(false)" class="w-24">
          Ok
        </Button>
      </div>
      <div class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400">
        <a href="" class="text-primary"> Why do I have this issue? </a>
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
        <Button type="button" variant="primary" @click="setSuccessModalPreview(false)" class="w-24">
          Ok
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>

  <Dialog size="xl" :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <DialogPanel class="w-full rounded bg-white">
          <Dialog.Title>
            <h2 class="mr-auto text-base font-medium">
              {{ action }} Contract
            </h2>

            <Button type="button" variant="danger" class="mb-2 mr-1" @click="setHeaderFooterModalPreview(false)">
                <Lucide icon="XSquare" class="w-5 h-5" />
            </Button>
          </Dialog.Title>
          <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12 sm:col-span-12">
              <FormWizard @on-complete="onComplete('image/jpeg')" color="#094899">
                <TabContent title="Personal details" icon="fa fa-user" :before-change="beforeTabSwitch">
                  <div class="grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40"  style="text-align: left">Type Contract</FormLabel >
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.type_contract">
                          <option value="">Select Type Contract</option>
                          <option value="New">New</option>
                          <option value="Renewal">Renewal</option>
                          <option value="Updrage">Updrage</option>
                        </TomSelect>
                      </FormInline>
                      
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Member</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="member">
                          <option value="">Select Members</option>
                          <option v-for="item in state.listMember" :key="item.id" :value="item.id" >{{ item.name }}</option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left" >Studio</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.studio">
                          <option value="">Select Studio</option>
                          <option v-for="item in state.listDepartement"  :key="item.id" :value="item.id" >
                            {{ item.deptname }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">No Telp</FormLabel>
                        <input type="number" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.telp"  placeholder="Insert No Telp" />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel   htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Email</FormLabel>
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.email" placeholder="Insert Email"/>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Date Of Birth</FormLabel>
                        <div class="relative w-full">
                          <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" class="w-4 h-4" />
                          </div>
                          <Litepicker v-model="state.data.date_birth"
                            :options="{
                              autoApply: true,
                              showWeekNumbers: true,
                              dropdowns: {
                                minYear: 1990,
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
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Gender</FormLabel>
                        <TomSelect class="w-full"  id="modal-form-6"  v-model="state.data.gender">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female" selected>Female</option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Marital Status</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.marital">
                          <option value="">Select Maritial Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                        </TomSelect>
                      </FormInline>

                    </div>

                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Passport/ID</FormLabel >
                        <input type="text" class="w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.passport" placeholder="Insert Passport/ID" />
                      </FormInline>

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

                    </div>

                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                      
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> District</FormLabel >
                        <TomSelect class="w-full" id="modal-form-6" v-model="district">
                          <option value="">Select District</option>
                          <option  v-for="item in state.listDistrict" :key="item.id" :value="item.id">
                            {{ item.district }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Sub District</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="sub_district">
                          <option value="">Select Sub District</option>
                          <option v-for="item in state.listSubDistrict"  :key="item.id"  :value="item.id">
                            {{ item.sub_district }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">RT</FormLabel>
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.rt"  placeholder="Insert RT"/>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left" > RW</FormLabel>
                        <input  type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.rw" placeholder="Insert RW" />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Relation Name</FormLabel >
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.relation_name" placeholder="Insert Name" />
                      </FormInline>


                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Relation Phone</FormLabel >
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.relation_telp"  placeholder="Insert Phone" />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-20" style="text-align: left">Relation</FormLabel>
                        <FormSelect  class="w-full ml-8" id="modal-form-6" v-model="state.data.relation">
                          <option value="">Select Relation</option>
                          <option value="Family">Family</option>
                          <option value="Friend">Friend</option>
                        </FormSelect>
                      </FormInline>
                    </div>
                  </div>
                </TabContent>
                <TabContent title="Membership" icon="fa fa-check">
                  <div class="grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Membership Type</FormLabel>
                        <TomSelect class="w-full " id="modal-form-6" v-model="packages" >
                          <option value="">Membership Type</option>
                          <option  v-for="item in state.listMemberType" :key="item.id" :value="item.type">
                            {{ item.type }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Package Name</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6"  v-model="packages_name">
                          <option value="">Package Name</option>
                          <option  v-for="item in state.listPackages" :key="item.id" :value="item.id">
                            {{ item.packages_name }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left">Teacher</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.teacher">
                          <option value="">Select Teacher</option>
                          <option v-for="item in state.listTeacher" :key="item.id" :value="item.id">
                            {{ item.name }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left" >Membership Price</FormLabel>
                        <input  type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.price"   placeholder="Price Membership Price"  readonly />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40"  style="text-align: left">Valid For Session</FormLabel  >
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.sessions" placeholder="Valid For Session" readonly />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Valid For Months/Year</FormLabel>
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.validity" placeholder="Valid For Months/Year" readonly />
                      </FormInline>

                  
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Discount %</FormLabel>
                        <input type="number" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="disc" placeholder="Insert Disc" />
                      </FormInline>

                    
                    </div>

                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left">Fee</FormLabel>
                        <input type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.fee" placeholder="Insert Fee" readonly/>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40"   style="text-align: left"> Amount Paid</FormLabel>
                        <CurrencyInput type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="amount"  :options="{ currency: 'IDR' }" placeholder="Insert Amount"   />
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Balance</FormLabel >
                        <input type="text"  class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="balance"  placeholder="Insert Fee"  readonly/>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Payment Type</FormLabel >
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.payment_type">
                          <option value="">Select Payment Type</option>
                          <option value="Deposit">Deposit</option>
                          <option value="Full Payment">Full Payment</option>
                          <option value="Installment">Installment</option>
                        </TomSelect>
                      </FormInline>
                      
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Payment Method</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="state.data.payment_method">
                          <option value="">Select Payment Method</option>
                          <option value="Amex">Amex</option>
                          <option value="Cash">Cash</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Debit">Debit</option>
                          <option value="Master">Master</option>
                          <option value="Visa">Visa</option>
                          <option value="Others">Others</option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left">Studio</FormLabel>
                        <TomSelect class="w-full" id="modal-form-6" v-model="studio">
                          <option value="">Select Studio</option>
                          <option v-for="item in state.listDepartement" :key="item.id" :value="item.id">
                            {{ item.deptname }}
                          </option>
                        </TomSelect>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Contract Description</FormLabel>
                        <textarea type="text" class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.desc" placeholder="Insert Contract Description" />
                      </FormInline>
                    </div>

                    <div class="col-span-12 sm:col-span-4 xl:col-span-4 intro-y">
                    
                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Start Date</FormLabel>
                        <div class="relative w-full">
                          <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" class="w-4 h-4" />
                          </div>
                          <Litepicker v-model="state.data.start_date"
                          :options="singleLite(state.data.start_date)"
                            class="pl-12" />
                        </div>
                      </FormInline>

                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1"  class="sm:w-40" style="text-align: left">End Date</FormLabel>
                        <div class="relative w-full">
                          <div class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" class="w-4 h-4" />
                          </div>
                          <Litepicker v-model="state.data.end_date"
                          :options="singleLite(state.data.end_date)"
                            class="pl-12"  />
                        </div>
                      </FormInline>
                      
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Referral Code</FormLabel >
                        <input type="text"  class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.referalcode"  placeholder="Insert Referral Code"/>
                      </FormInline>

                      
                      <FormInline class="mt-5">
                        <FormLabel htmlFor="modal-form-1" class="sm:w-40" style="text-align: left">Nama Sales</FormLabel >
                        <input type="text"  class="transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80" v-model="state.data.nama_sales"  placeholder="Insert Name Sales" readonly/>
                      </FormInline>

                    

                      
                      <FormInline class="mt-5">
                        <FormLabel  htmlFor="modal-form-1" class="sm:w-40" style="text-align: left"> Status Contract</FormLabel>
                        <TomSelect  class="w-full" id="modal-form-6" v-model="state.data.status_contract">
                          <option value="">Select Status Contract</option>
                          <option value="0">Active</option>
                          <option value="1">In Active</option>
                        </TomSelect>
                      </FormInline>
                    </div>

                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y" v-if="action=='Add New'">
                      <Preview class="intro-y box">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                            <h2 class="mr-auto text-base font-medium">Signature And Payment Document</h2>
                        </div>

                        <div class="p-5">
                            <Preview.Panel>
                              <div class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                  <FormInline>
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Proof Payment </FormLabel>
                                    <Button variant="primary" @click="take">Tak a Picture</Button>
                                  </FormInline>

                                  <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60 mt-5" style="text-align: left;"> Image Preview </FormLabel>
                      
                                  <canvas ref="canvas" width="250" height="250"></canvas>
                                  <img v-if="capturedPhoto" :src="capturedPhoto" alt="Captured Photo" />
                                
                                </div>

                                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Signature </FormLabel>
                                    <Vue3Signature  ref="signature1" :sigOption="state.option" :w="'400px'" :h="'250px'"
                                        :disabled="state.disabled" class="example"  :style="{ 'border': '1px solid black' }"></Vue3Signature>
                                    <Button variant="primary" @click="clearTTD">Clear</Button>
                                </div>
                              </div>
                            </Preview.Panel>
                        </div>
                      </Preview>
                    </div>

                    <div class="col-span-12 sm:col-span-12 xl:col-span-12 intro-y" v-else>
                      <Preview class="intro-y box">
                        <div class="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60">
                            <h2 class="mr-auto text-base font-medium">My Document</h2>
                        </div>

                        <div class="p-5">
                            <Preview.Panel>
                              <div class="grid grid-cols-12 gap-4 gap-y-3">
                                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                  <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Proof Payment </FormLabel>
                                  <FormInline class="mt-1">
                                  <img  :src="baseUrl+state.data.file">
                                  <canvas ref="canvas" width="250" height="250"></canvas>
                                  <img v-if="capturedPhoto" :src="capturedPhoto" alt="Captured Photo" />
                                  </FormInline>
                              
                                  <Button variant="success" class="flex items-center text-white mt-2" href="#" @click="editPayment(state.data.id)">
                                    <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> Edit Proof Payment
                                  </Button>
                                </div>

                                <div class="col-span-12 sm:col-span-6 xl:col-span-6 intro-y">
                                    <FormLabel  htmlFor="horizontal-form-2" class="sm:w-60" style="text-align: left;"> Signature </FormLabel>
                                    <img :src="baseUrl+state.data.ttd">
                                    <Button variant="success" class="flex items-center text-white mt-2" href="#" @click="editSiganture(state.data.id)">
                                      <Lucide icon="Pencil" class="w-4 h-4 mr-1" /> Edit Signature
                                    </Button>
                                </div>
                              </div>
                            </Preview.Panel>
                        </div>
                      </Preview>
                    </div>
                  </div>
                </TabContent>
              </FormWizard>
            </div>
          </Dialog.Description>
        </DialogPanel>

        <Dialog :open="PhotoPreview" @close="setPhotoPreview(false)">
            <Dialog.Panel>
                <Dialog.Title>
                    <h2 class="mr-auto text-base font-medium">
                      Take a picture
                    </h2>

                </Dialog.Title>
                <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-12">
                      <video ref="videoElement" width="400" height="250" autoplay></video>
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
            </Dialog.Panel>
        </Dialog>

        <Dialog :open="editPaymentModal" @close="seteditPaymentModal(false)">
            <Dialog.Panel>
                <Dialog.Title>
                    <h2 class="mr-auto text-base font-medium">
                      Take a picture
                    </h2>

                </Dialog.Title>
                <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                    <div class="col-span-12 sm:col-span-12">
                      <video ref="videoElement" width="400" height="250" autoplay></video>
            
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
            </Dialog.Panel>
        </Dialog>

        <Dialog :open="editSigantureModal" @close="seteditSigantureModal(false)">
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
      </div>
    </div>
  </Dialog>

  <Dialog :open="PrintPreview" size="full" @close="setPrintPreview(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    Contract Member
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
import Api from "../api/Api";
import moment from 'moment'
import listMenu from "./Menu.vue";
import Button from "../base-components/Button";
import {
  FormInput,
  FormSelect,
  FormLabel,
  FormInline,
  FormCheck,
} from "../base-components/Form";
import TomSelect from "../base-components/TomSelect";
import { onMounted, ref, reactive, watch, computed, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDebounceFn } from "@vueuse/core";
import { TailwindPagination } from "laravel-vue-pagination";
import Tippy from "../base-components/Tippy";
import Lucide from "../base-components/Lucide";
import Table from "../base-components/Table";
import Preview from "../base-components/Preview";
import LoadingIcon from "../base-components/LoadingIcon";
import { Dialog, Menu } from "../base-components/Headless";
import { DialogPanel } from "@headlessui/vue";
import CurrencyInput from "./CurrencyInput.vue";
import man from "../assets/images/sabar.png";
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.ssr.css";
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import Litepicker from "../base-components/Litepicker";
import {useStore } from "vuex";
const videoElement = ref(null);
let videoStream = null;
const canvas = ref(null);
let capturedPhoto = null;

const loading = ref(true);
const loadingsycn = ref("");
const pesan = ref("");
const roles = ref("");
const dept = ref("");
const search = ref("");
const selected = ref([]);
const pdfUrl = ref("");
const province = ref("");
const status = ref("");
const action = ref("Add New");
const headers = ref("Add New Data");
const headerFooterModalPreview = ref(false);
const baseUrl = ref("http://127.0.0.1:8000/storage/contract/");
const router = useRouter();
const store = useStore();
const user = store.getters['auth/currentUser']
const member = ref("");
const city = ref("");
const district = ref("");
const studio = ref("");
const sub_district = ref("");
const packages = ref("");
const disc = ref(0);
const balance=ref(0)
const amount = ref(0);
const price = ref(0);
const fee = ref(0);
const showFoto=ref(0)
const packages_name = ref("");
const signature1 = ref(null)
const singleLite = (date) => {
    return {
        autoApply: false,
        singleMode: true,
        dropdowns: {
            minYear: 1990,
            maxYear: null,
            months: true,
            years: true,
        },
        format: "YYYY-MM-DD",
        mobileFriendly: true,
        startDate: new moment(date).format("YYYY-MM-DD")
    }
};
const state = reactive({
  listData: {},
  listMember: {},
  listDepartement: {},
  listTeacher:{},
  listProvince: {},
  listSubDistrict: {},
  listCity: {},
  listDistrict: {},
  listMemberType: {},
  listPackages: {},
  datas: {},
  data: {
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
    teacher: "",
    sub_district: "",
    rt: "",
    rw: "",
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
    type_contract: "",
    status_contract: "",
    file:"",
    desc: "",
    referalcode: "",
    nama_sales: user.name,
  },
});


const basicModalPreview = ref(false);
const warningModalPreview = ref(false);
const setWarningModalPreview = (value) => {
  warningModalPreview.value = value;
  loadingsycn.value = false
  basicModalPreview.value = false
};

const successModalPreview = ref(false);
const setSuccessModalPreview = (value) => {
  successModalPreview.value = value;
  if (successModalPreview.value==false) {
    member.value=''
    state.data.studio=''
    state.data.telp=''
    state.data.email=''
    state.data.date_birth=''
    state.data.gender=''
    state.data.marital=''
    state.data.address=''
    province.value=''
    city.value=''
    district.value=''
    sub_district.value=''
    state.data.file =  ''
    state.data.ttd =  ''
    packages.value=''
    packages_name.value=''
    amount.value=''
    state.data.payment_type=''
    state.data.payment_method=''
    studio.value=''
    state.data.desc=''
    state.data.start_date=''
    state.data.end_date=''
    state.data.type_contract=''
    state.data.status_contract=''
    capturedPhoto=null
    signature1.value =''
  }
    loadingsycn.value = false
    basicModalPreview.value = false
};

const clearTTD = async () => {
    signature1.value.clear()
}

const add = async () => {
    action.value='Add New'
    headerFooterModalPreview.value=true
}

const setHeaderFooterModalPreview = (value) => {
  headerFooterModalPreview.value = value;
  if (headerFooterModalPreview.value==false) {
    member.value=''
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
    state.data.relation_name=''
    state.data.relation=''
    state.data.relation_telp=''
    state.data.fee=''
    amount.value=''
    fee.value=''
    state.data.balance=''
    state.data.teacher=''
    balance.value=''
    state.data.referalcode=''
    province.value=''
    city.value=''
    district.value=''
    sub_district.value=''
    state.data.file =  ''
    state.data.ttd =  ''
    packages.value=''
    packages_name.value=''
    amount.value=''
    state.data.payment_type=''
    state.data.payment_method=''
    studio.value=''
    state.data.desc=''
    state.data.start_date=''
    state.data.end_date=''
    state.data.type_contract=''
    state.data.status_contract=''
    capturedPhoto=null
    signature1.value =''
  }
};


const PhotoPreview = ref(false);
const setPhotoPreview = (value) => {
    PhotoPreview.value = value;
    loadingsycn.value = false
    basicModalPreview.value = false
};

const PrintPreview = ref(false);
const setPrintPreview = (value) => {
    PrintPreview.value = value;
    loadingsycn.value = false
    basicModalPreview.value = false
};


const editPaymentModal = ref(false);
const seteditPaymentModal = (value) => {
    editPaymentModal.value = value;
    loadingsycn.value = false
    basicModalPreview.value = false
};


const editSigantureModal = ref(false);
const seteditSigantureModal = (value) => {
    editSigantureModal.value = value;
    loadingsycn.value = false
    basicModalPreview.value = false
};

const take = async () => {
  initCamera();
  showFoto.value=0
  PhotoPreview.value=true
}

const capturePhoto = () => {
  const context = canvas.value.getContext('2d');
  context.drawImage(videoElement.value, 0, 0, canvas.value.width, canvas.value.height);
  capturedPhoto = canvas.value.toDataURL('image/png');
  PhotoPreview.value = false
  showFoto.value=1
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
    formdata.append("id", state.data.idcontract);
    await Api.post('/admin/update_payment', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(async (response) => {

      await tampilData();
      setSuccessModalPreview(true);
      pesan.value = "Payment Success Update";
      editPaymentModal.value = false
      headerFooterModalPreview.value = false
    })
    .catch((error) => {
      const object1 = error.response.data;
      pesan.value = Object.values(object1).toString();
      setWarningModalPreview(true);
    });
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
    await Api.post('/admin/update_signature', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(async (response) => {

      await tampilData();
      setSuccessModalPreview(true);
      pesan.value = "Signagture Success Update";
      editSigantureModal.value = false
      headerFooterModalPreview.value = false
    })
    .catch((error) => {
      const object1 = error.response.data;
      pesan.value = Object.values(object1).toString();
      setWarningModalPreview(true);
    });
};

const beforeTabSwitch = () => {
  if (!member.value) {
      pesan.value =  'Please Select Members'
      setWarningModalPreview(true)
      return false;
  }

  if (!state.data.studio) {
      pesan.value =  'Please Select Studio'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.telp) {
      pesan.value =  'Please Insert Telp'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.email) {
      pesan.value =  'Please Insert Email'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.date_birth) {
      pesan.value =  'Please Insert Date Of Birth'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.gender) {
      pesan.value =  'Please Select Gender'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.marital) {
      pesan.value =  'Please Select Maritial'
      setWarningModalPreview(true)
      return false;
  }

  if (!state.data.address) {
      pesan.value =  'Please Insert Home Address'
      setWarningModalPreview(true)
      return false;
  }

  if (!province.value) {
      pesan.value =  'Please Select Province'
      setWarningModalPreview(true)
      return false;
  }
  
  if (!city.value) {
      pesan.value =  'Please Select City'
      setWarningModalPreview(true)
      return false;
  } 
  
  if (!district.value) {
      pesan.value =  'Please Select District'
      setWarningModalPreview(true)
      return false;
  } 
  
  if (!sub_district.value) {
      pesan.value =  'Please Select Sub District'
      setWarningModalPreview(true)
      return false;
  }else{
    return true;
  }

};

const print =  async(id) =>  {
    loadingsycn.value = true
    basicModalPreview.value = true
    pesan.value="Sabar Dikit ya, Lagi Proses Generate  Data"
    const token = localStorage.getItem('token_iss')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
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

};

const tampilData = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  await Api.get("/admin/contract?page=" + page + "&q=" + search.value)
    .then((response) => {
      state.listData = response.data.data;
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

const tampilMember = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  await Api.get("/admin/get_member")
    .then((response) => {
      state.listMember = response.data.data;
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

const tampilTeacher = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
};

const tampilProvince = async (page = 1) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
};

const edit = async (id) => {
  loadingsycn.value = true;
  basicModalPreview.value = true;
  pesan.value = "Mohon Tunggu ya, Lagi Ambil Data";
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  await Api.get("/admin/contract", {
    params: {
      id: id,
    },
  })
    .then((response) => {
      state.datas = response.data.data;
      state.data.id = state.datas[0].idcontract;
      member.value = state.datas[0].id_member.toString();
      state.data.relation =  state.datas[0].relation;
      state.data.relation_name =  state.datas[0].relation_name;
      state.data.relation_telp =  state.datas[0].relation_number ?? '';
      disc.value=  state.datas[0].disc;
      packages_name.value = state.datas[0].id_package.toString();
      packages.value =  state.datas[0].type;
      fee.value= state.datas[0].price;
      balance.value = (fee.value - amount.value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR', // You can change the currency code as needed
      }).slice(0, -3);
      let teacher;
      if (state.datas[0].id_teacher==null) {
        teacher=''
      }else{
        teacher=state.datas[0].id_teacher.toString()
      }

      amount.value =  state.datas[0].amount_paid;
      state.data.payment_type =  state.datas[0].payment_type;
      state.data.payment_method =  state.datas[0].payment_method;
      studio.value=  state.datas[0].id_studio.toString();
      state.data.desc =  state.datas[0].desc;
      state.data.teacher =  teacher;
      state.data.start_date =  moment(state.datas[0].start_date).format('YYYY-MM-DD');
      state.data.end_date =   moment(state.datas[0].end_date).format('YYYY-MM-DD');
      state.data.referalcode =  state.datas[0].referral_code;
      state.data.status_contract =  state.datas[0].status_contract.toString();
      state.data.type_contract =  state.datas[0].type_contract;
      state.data.file =  state.datas[0].file;
      state.data.ttd =  state.datas[0].ttd;
      action.value = "Update";
      headerFooterModalPreview.value = true;
      loadingsycn.value = false;
      basicModalPreview.value = false;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.data.status_code == 403) {
        router.push({ name: "403" });
      } else {
        const object1 = error.response.data;
        pesan.value = Object.values(object1).toString();
        setWarningModalPreview(true);
      }
    });
};

const editSiganture = async (id) => {
  editSigantureModal.value = true;
};

const editPayment = async (id) => {
  initCamera();
  editPaymentModal.value = true;
};

const onComplete = async (t) => {
  if (!packages.value) {
      pesan.value =  'Please Select Packages'
      setWarningModalPreview(true)
      return false;
  }

  if (packages.value=='Personal Training') {
    if (!state.data.teacher) {
      pesan.value =  'Please Select Teacher'
      setWarningModalPreview(true)
      return false;
    }
  }

  if (!packages_name.value) {
      pesan.value =  'Please Select Packages Name'
      setWarningModalPreview(true)
      return false;
  }


  if (!amount.value) {
      pesan.value =  'Please Insert Amount'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.payment_type) {
      pesan.value =  'Please Select Payment Type'
      setWarningModalPreview(true)
      return false;
  }
  if (!state.data.payment_method) {
      pesan.value =  'Please Select Payment Method'
      setWarningModalPreview(true)
      return false;
  }

  if (!studio.value) {
      pesan.value =  'Please Select Studio'
      setWarningModalPreview(true)
      return false;
  }

  if (!state.data.desc) {
      pesan.value =  'Please Select Desc'
      setWarningModalPreview(true)
      return false;
  }
  
  if (!state.data.start_date) {
      pesan.value =  'Please Insert Start Date'
      setWarningModalPreview(true)
      return false;
  } 
  
  if (!state.data.end_date) {
      pesan.value =  'Please Insert End Date'
      setWarningModalPreview(true)
      return false;
  } 
  

  if (!state.data.type_contract) {
      pesan.value =  'Please Select Type Contract'
      setWarningModalPreview(true)
      return false;
  } 
  if (!state.data.status_contract) {
      pesan.value =  'Please Insert Status Contract'
      setWarningModalPreview(true)
      return false;
  }
  
  if (!capturedPhoto && action.value=='Add New') {
      pesan.value =  'Please Insert Take Payment'
      setWarningModalPreview(true)
      return false;
  }
  

  loadingsycn.value = true
  basicModalPreview.value = true
  pesan.value="Please Wait, Process Save Data"
  const token = localStorage.getItem('token_iss')
  Api.defaults.headers.common['Authorization'] = "Bearer " +token
  if (action.value=='Add New') {
    const formdata = new FormData();
    formdata.append("ttd", signature1.value.save(t));
    formdata.append('file', capturedPhoto);
    formdata.append("kode", state.data.studio);
    formdata.append("email", state.data.email);
    formdata.append("no_telp", state.data.telp);
    formdata.append("passport", state.data.passport);
    formdata.append("gender", state.data.gender);
    formdata.append("marital", state.data.marital);
    formdata.append("date_birth", state.data.date_birth);
    formdata.append("address", state.data.address);
    formdata.append('address1', state.data.address1);
    formdata.append("address2", state.data.address2);
    formdata.append("province", province.value);
    formdata.append("city", city.value);
    formdata.append("district", district.value);
    formdata.append("sub_district", sub_district.value);
    formdata.append("rt", state.data.rt);
    formdata.append("rw", state.data.rw);
    formdata.append("id_member", member.value);
    formdata.append('id_studio', studio.value);
    formdata.append("relation_name", state.data.relation_name);
    formdata.append("relation_number", state.data.relation_telp);
    formdata.append("relation", state.data.relation);
    formdata.append("id_package", packages_name.value);
    formdata.append("id_teacher", state.data.teacher);
    formdata.append("start_date", state.data.start_date);
    formdata.append("end_date", state.data.end_date);
    formdata.append("disc", disc.value);
    formdata.append("amount_paid", amount.value);
    formdata.append("payment_type", state.data.payment_type);
    formdata.append("payment_method", state.data.payment_method);
    formdata.append("type_contract", state.data.type_contract);
    formdata.append("desc", state.data.desc);
    formdata.append("referral_code", state.data.referalcode);
    formdata.append("sales", state.data.nama_sales);
    formdata.append("status_contract", state.data.status_contract);
    await Api.post('/admin/contract', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(async (response) => {

      await tampilData();
      setSuccessModalPreview(true);
      pesan.value = "Contact Success Added";
      headerFooterModalPreview.value=false
    })
    .catch((error) => {
      const object1 = error.response.data;
      pesan.value = Object.values(object1).toString();
      setWarningModalPreview(true);
    });
  }else{
    const formdata = new FormData();
    formdata.append("id", state.data.id);
    formdata.append("kode", state.data.studio);
    formdata.append("email", state.data.email);
    formdata.append("no_telp", state.data.telp);
    formdata.append("passport", state.data.passport);
    formdata.append("gender", state.data.gender);
    formdata.append("marital", state.data.marital);
    formdata.append("date_birth", state.data.date_birth);
    formdata.append("address", state.data.address);
    formdata.append('address1', state.data.address1);
    formdata.append("address2", state.data.address2);
    formdata.append("province", province.value);
    formdata.append("city", city.value);
    formdata.append("district", district.value);
    formdata.append("sub_district", sub_district.value);
    formdata.append("rt", state.data.rt);
    formdata.append("rw", state.data.rw);
    formdata.append("id_member", member.value);
    formdata.append('id_studio', studio.value);
    formdata.append("id_teacher", state.data.teacher);
    formdata.append("relation_name", state.data.relation_name);
    formdata.append("relation_number", state.data.relation_telp);
    formdata.append("relation", state.data.relation);
    formdata.append("id_package", packages_name.value);
    formdata.append("start_date", state.data.start_date);
    formdata.append("end_date", state.data.end_date);
    formdata.append("disc", disc.value);
    formdata.append("amount_paid", amount.value);
    formdata.append("payment_type", state.data.payment_type);
    formdata.append("payment_method", state.data.payment_method);
    formdata.append("type_contract", state.data.type_contract);
    formdata.append("desc", state.data.desc);
    formdata.append("referral_code", state.data.referalcode);
    formdata.append("sales", state.data.nama_sales);
    formdata.append("status_contract", state.data.status_contract);
    await Api.post('/admin/contract_update', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(async (response) => {

      await tampilData();
      setSuccessModalPreview(true);
      pesan.value = "Contact Success Update";
      headerFooterModalPreview.value=false
    })
    .catch((error) => {
      const object1 = error.response.data.data;
      pesan.value = Object.values(object1).toString();
      setWarningModalPreview(true);
    });
  }
  

};

const tampilDepartement = async () => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  await Api.get("/admin/department")
    .then((response) => {
      state.listDepartement = response.data.data;
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

const tampilMemberShip = async () => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
};

const initCamera = async () => {
  try {
    // Dapatkan media dari pengguna
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Berikan aliran ke elemen video
    videoElement.value.srcObject = stream;

    // Simpan aliran untuk ditutup nanti jika diperlukan
    videoStream = stream;
  } catch (error) {
    console.error('Error mengakses kamera:', error);
  }
};


onBeforeUnmount(() => {
  // Tutup aliran video ketika komponen di-unmount
  if (videoStream) {
    const tracks = videoStream.getTracks();
    tracks.forEach(track => track.stop());
  }
});

onMounted(async () => {
  await tampilData();
  await tampilMember();
  await tampilDepartement();
  await tampilProvince();
  await tampilMemberShip();
  await tampilTeacher()
});

watch(search, (newQuestion, oldQuestion) => {
  searching();
});

watch(status, (newQuestion, oldQuestion) => {
  loading.value = false;
  tampilData();
});

watch(dept, (newQuestion, oldQuestion) => {
  loading.value = false;
  tampilData();
});

watch(member, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  Api.get("/admin/member?id=" + member.value)
    .then((response) => {
      state.data.telp = response.data.data[0].no_telp;
      state.data.email = response.data.data[0].email;
      state.data.studio = response.data.data[0].departments.id.toString();
      state.data.passport = response.data.data[0].passport;
      state.data.gender = response.data.data[0].gender ?? '';
      state.data.marital = response.data.data[0].marital ?? '';
      state.data.date_birth = moment(response.data.data[0].date_birth).format('YYYY-MM-DD');
      state.data.address = response.data.data[0].address;
      state.data.address1 = response.data.data[0].address1;
      state.data.address2 = response.data.data[0].address2;
      province.value = response.data.data[0].province ?? '';
      city.value = response.data.data[0].city ?? '';
      district.value = response.data.data[0].district ?? '';
      sub_district.value = response.data.data[0].sub_district ?? '';
      state.data.rt = response.data.data[0].rt;
      state.data.rw = response.data.data[0].rw;
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

watch(province, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
});

watch(city, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
});

watch(district, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
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
});

watch(packages, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  Api.get("/admin/get_packages?id=" + packages.value)
    .then((response) => {
      state.listPackages = response.data.data;
      state.data.validity = "";
      state.data.sessions = "";
      state.data.price=""
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

watch(packages_name, (newQuestion, oldQuestion) => {
  const token = localStorage.getItem("token_yogafit");
  Api.defaults.headers.common["Authorization"] = "Bearer " + token;
  Api.get("/admin/get_packages?packages_name=" + packages_name.value)
    .then((response) => {
      state.data.price = response.data.data[0].price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR', // You can change the currency code as needed
      }).slice(0, -3);
      state.data.validity = response.data.data[0].validity;
      state.data.sessions = response.data.data[0].sessions;
      price.value=response.data.data[0].price;
      state.data.fee = (price.value * (1 - disc.value / 100) * 1).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR', // You can change the currency code as needed
      }).slice(0, -3);
      fee.value = response.data.data[0].price
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

watch(disc, (newQuestion, oldQuestion) => {
  state.data.fee = (price.value * (1 - disc.value / 100) * 1).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR', // You can change the currency code as needed
      }).slice(0, -3);
  fee.value=price.value * (1 - disc.value / 100) * 1
});

watch(amount, (newQuestion, oldQuestion) => {
  balance.value = (fee.value - amount.value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR', // You can change the currency code as needed
      }).slice(0, -3);
});

const searching = useDebounceFn(() => {
  loading.value = false;
  tampilData();
}, 500);
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");
</style>
