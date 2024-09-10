<template>
  <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
    <h2 class="mr-auto text-lg font-medium">Permission Groups</h2>
    <div class="flex w-full mt-4 sm:w-auto sm:mt-0">

      <div class="text-center">
        <Button class="mr-2 shadow-md" as="a" href="#" variant="primary" @click="setHeaderFooterModalPreview(true)">
          Add New Data
        </Button>
      </div>
    </div>
  </div>

  <!-- BEGIN: HTML Table Data -->
  <div class="p-5 mt-5 intro-y box">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">

        <div class="items-center sm:flex sm:mr-4">
          <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
            Filter
          </label>
          <FormSelect
      
            v-model="field"
            class="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto"
          >
            <option value="">Filter</option>
            <option value="0">Active</option>
            <option value="1">Inactive</option>
          </FormSelect>
        </div>
      
        <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
          <label class="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
            Search
          </label>
          <FormInput
            v-model="value"
            type="text"
            class="mt-2 sm:w-40 2xl:w-full sm:mt-0"
            placeholder="Search..."
          />
        </div>
      
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="table" class="mt-5"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <Dialog :open="headerFooterModalPreview" @close="setHeaderFooterModalPreview(false)">
        <Dialog.Panel>
            <Dialog.Title>
                <h2 class="mr-auto text-base font-medium">
                    {{ headers }}
                </h2>
        
            </Dialog.Title>
            <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-1"> Group Name </FormLabel>
                    <FormInput id="modal-form-1" type="hidden" v-model="id" placeholder="Insert Group Name" />
                    <FormInput id="modal-form-1" type="text" v-model="group" placeholder="Insert Group Name" />
                    <FormInput id="modal-form-1" type="hidden" v-model="action" placeholder="Insert Group Name" />
                </div>

                <div class="col-span-12 sm:col-span-6">
                    <FormLabel htmlFor="modal-form-6"> Status </FormLabel>
                    <select  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" id="modal-form-6" v-model="status">
                        <option value="0">Active</option>
                        <option value="1">In Active</option>
                    </select>
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
                <Button variant="primary" type="button" class="w-20" @click="saveData">
                    Send
                </Button>
            </Dialog.Footer>
        </Dialog.Panel>
  </Dialog>

  <Dialog :open="warningModalPreview" @close="
            () => {
            setWarningModalPreview(false);
            }
        ">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-warning" />
                <div class="mt-5 text-3xl">Oops... Something went wrong!</div>
                <div class="mt-2 text-slate-500"> {{ pesan }}</div>
            </div>
            <div class="px-5 pb-8 text-center">
                <Button type="button" variant="primary" @click="
                            () => {
                            setWarningModalPreview(false);
                            }
                        " class="w-24">
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
  import Api from '../../api/Api'
  import Button from "../../base-components/Button";
  import { FormInput, FormSelect, FormLabel } from "../../base-components/Form";
  import { onMounted, ref, watch } from "vue";
  import { createIcons, icons } from "lucide";
  import { TabulatorFull as Tabulator } from "tabulator-tables";
  import { stringToHTML } from "../../utils/helper";
  import { Dialog } from "../../base-components/Headless";
  import { useRouter } from 'vue-router'
  import Lucide from "../../base-components/Lucide";
  
  const warningModalPreview = ref(false);
  const setWarningModalPreview = (value) => {
      warningModalPreview.value = value;
  };

  const successModalPreview = ref(false);
  const setSuccessModalPreview = (value) => {
      successModalPreview.value = value;
  };

  const pesan = ref("");
  const table = ref(null); //reference to your table element
  const tabulator = ref(null); //variable to hold your table
  const tableData = ref(null); //data for table to display
  const field = ref("")
  const value  = ref("")
  const group  = ref("")
  const status  = ref("")
  const id  = ref("")
  const datas  = ref("")
  const action  = ref("INSERT")
  const headers  = ref("Add New Data")
  const headerFooterModalPreview = ref(false);
  const router = useRouter()
  const setHeaderFooterModalPreview = (value) => {
    headerFooterModalPreview.value = value;
    if(headerFooterModalPreview.value==false){
      group.value = '';
      status.value = '';
      id.value = '';
      action.value = 'INSERT';
      headers.value = 'Add New Data';

    }
  };


  //Start Tampil Data
  const tampilData = async () => {
    const token = localStorage.getItem('token_yogafit')
    Api.defaults.headers.common['Authorization'] = "Bearer " +token
    await Api.get('/admin/permissiongroup')
    .then(response => {
      tableData.value = response.data
      // page.value = response.data.data.current_page
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

  //End Tampil Data

  //Start Save Data 
  const saveData = async () => {
    if(action.value=="INSERT"){
      const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
      await Api.post('/admin/permissiongroup', {
        group : group.value,
        active : status.value
      })
      .then(async (response) => {
        await tampilData()

        setSuccessModalPreview(true)
        pesan.value = "Data Success Added"
      
        setHeaderFooterModalPreview(false)
        tabulator.value.replaceData(tableData.value.data);
        

      }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
      })
    }else{
      const token = localStorage.getItem('token_yogafit')
        Api.defaults.headers.common['Authorization'] = "Bearer " +token
      await Api.put('/admin/permissiongroup', {
        id : id.value,
        group : group.value,
        active : status.value
      }).then(async (response) => {

        await tampilData()

        setSuccessModalPreview(true)
        pesan.value = "Data Success Updated"
      
        setHeaderFooterModalPreview(false)
        tabulator.value.replaceData(tableData.value.data);
        

      }).catch(error => {
        const object1 = error.response.data.data
        pesan.value =  Object.values(object1).toString()
        setWarningModalPreview(true)
      })
    }
  }
  //End Save Data


  onMounted(async() => {
    await tampilData()
    tabulator.value = new Tabulator(table.value, {
      data:  tableData.value.data,
      filterMode: "local",
      sortMode: "local",
      printAsHtml: true,
      printStyled: true,
      pagination:"local",
      paginationSize:5,
      paginationSizeSelector:[5, 10, 15, 20],
      movableColumns:true,
      paginationCounter:"rows",
      columnHeaderVertAlign:"middle",
      layout: "fitColumns",
      responsiveLayout: "collapse",
      placeholder: "No matching records found",
      columns: [ {
          title: "",
          formatter: "responsiveCollapse",
          width: 40,
          minWidth: 30,
          hozAlign: "center",
          resizable: false,
          headerSort: false,
        },

        // For HTML table
        {
          title: "GROUP NAME",
          minWidth: 200,
          responsive: 0,
          field: "group",
          vertAlign: "middle",
          print: false,
          download: false,
        },
        {
          title: "STATUS",
          minWidth: 200,
          field: "active",
          hozAlign: "center",
          headerHozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response= cell.getData();
            if(response.active==0){
              return `<div class="flex items-center lg:justify-center text-success">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i>Active
              </div>`;
            }else{
              return `<div class="flex items-center lg:justify-center text-danger">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i>In Active
              </div>`;
            }
          },
        },
        {
          title: "ACTIONS",
          minWidth: 200,
          field: "actions",
          responsive: 1,
          hozAlign: "center",
          headerHozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
                const data= cell.getData();
                const edit = stringToHTML(`<div class="flex items-center lg:justify-center">
                                <a class="flex items-center mr-3" href="javascript:void(0)">
                                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit 
                                </a>`)
                              edit.addEventListener("click", function () {
                                const token = localStorage.getItem('token_yogafit')
                              Api.defaults.headers.common['Authorization'] = "Bearer " +token
                              Api.get('/admin/permissiongroup', {
                                params: {
                                  id : data.id
                                } 
                              })
                              .then(response => {
                                
                                datas.value = response.data.data
                                id.value = datas.value[0].id
                                group.value = datas.value[0].group
                                status.value = datas.value[0].active
                                action.value = "UPDATE"
                                headers.value = "Update Data"
                                setHeaderFooterModalPreview(true)
                              }).catch(error => {
                                const object1 = error.response.data.data
                                pesan.value =  Object.values(object1).toString()
                                setWarningModalPreview(true)
                              })
                          });

  

            
              return edit
              
            },
        },
      
      ],
    });

    tabulator.value?.on("renderComplete", () => {
      createIcons({
        icons,
        attrs: {
          "stroke-width": 1.5,
        },
        nameAttr: "data-lucide",
      });
    });
    reInitOnResizeWindow()


  })

  
  // Redraw table onresize
  const reInitOnResizeWindow = () => {
    window.addEventListener("resize", () => {
    
        tabulator.value.redraw();
        createIcons({
          icons,
          attrs: {
            "stroke-width": 1.5,
          },
          nameAttr: "data-lucide",
        });
      
    });
  };

  watch(field, async (newQuestion, oldQuestion) => {
    tabulator.value.setFilter("active","=",field.value);
  })

  watch(value, async (newQuestion, oldQuestion) => {
    tabulator.value.setFilter("group","like",value.value);
  })


  
</script>