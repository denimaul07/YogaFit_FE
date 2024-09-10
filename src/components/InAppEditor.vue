<template>
  <div class="flex flex-col items-center  bg-gray-100 min-h-screen">
    
    <div class="z-10 top-25 left-0 right-0 h-12 flex justify-center items-center">

      <!-- <input type="file" id="image"  name="image"  class="hidden"  @change="onUploadImage"/>

      <div class="relative mr-3 flex h-8 bg-gray-400 rounded-sm overflow-hidden md:mr-4">
        <label
            class="flex items-center justify-center h-full w-8 hover:bg-gray-500
        cursor-pointer"
            for="image"
            :class="[selectedPageIndex < 0 ?'cursor-not-allowed bg-gray-500':'']">
          <img src="/image.svg" alt="An icon for adding images"/>
        </label>
        <label
            class="flex items-center justify-center h-full w-8 hover:bg-gray-500
        cursor-pointer"
            @click="onAddDrawing"
            :class="[selectedPageIndex < 0 ?'cursor-not-allowed bg-gray-500':'']">
          <img src="/gesture.svg" alt="An icon for adding drawing"/>
        </label>
      </div> -->
  
      <Button @click="savePDF" class="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 md:px-4 mr-3 md:mr-4 rounded"
          :class="[(pages.length === 0 || saving || !pdfFile) ?'cursor-not-allowed bg-blue-700':'']">
          {{ saving ? 'Saving' : 'Save' }}
      </Button>
    </div>
    <div v-if="addingDrawing">
      <Dialog :open="PrintTTDPreview" size="sm"  @close="setPrintTTDModalPreview(false)">
          <Dialog.Panel>
              <Dialog.Title>
                  <h2 class="mr-auto text-base font-medium">
                      Masukan Tanda Tangan Anda
                  </h2>
                  <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPrintTTDModalPreview(false)">
                      <Lucide icon="XSquare" class="w-5 h-5" />
                  </Button>
              </Dialog.Title>
              <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                  <div class="col-span-12 sm:col-span-12">
                      <FormLabel htmlFor="modal-form-1"> TTD Di Sini </FormLabel>
                      <!-- <vueSignarture ref="signature" :sigOption="option"></vueSignarture> 
                      <button @click="clearTTD">Clear</button> -->
                      <Vue3Signature  ref="signature1" :sigOption="option" :w="'100%'" :h="'250px'" class="example"></Vue3Signature>
                      <!-- <Button @click="clearTTD">Clear</Button>
                      <Button @click="onFinishDrawingCanvas('image/jpeg')" type="button" variant="primary" class="mb-2 mr-1">Add</Button> -->
                </div>
              <!-- 
                <div
                    class="fixed z-10 left-0 right-0 border-b border-gray-300 bg-white
                shadow-lg"
                    style="height: 50%;">
                  <DrawingCanvas
                      @onFinish="onFinishDrawingCanvas"
                      @onCancel="onCancelDrawingCanvas"/>
                </div> -->
              </Dialog.Description>
            
          
              <Dialog.Footer>
                    <Button type="button" variant="outline-secondary"  @click="clearTTD" class="w-20 mr-1">
                      Clear
                    </Button>
                    <Button variant="primary" type="button" class="w-20" @click="onFinishDrawingCanvas('image/png')" >
                        Add
                    </Button>
                </Dialog.Footer>
          </Dialog.Panel>
      </Dialog>
      
    </div>
    <div v-if="addingText">
      <Dialog :open="PrintTextPreview" size="sm"  @close="setPrintTextModalPreview(false)">
          <Dialog.Panel>
              <Dialog.Title>
                  <h2 class="mr-auto text-base font-medium">
                      Masukan Nama Anda
                  </h2>
                  <Button type="button" variant="danger" class="mb-2 mr-1" @click="setPrintTextModalPreview(false)">
                      <Lucide icon="XSquare" class="w-5 h-5" />
                  </Button>
              </Dialog.Title>
              <Dialog.Description class="grid grid-cols-12 gap-4 gap-y-3">
                  <div class="col-span-12 sm:col-span-12">
                      <FormInput id="modal-form-1" type="text" v-model="nama" class="sig1" placeholder="Insert Your Name" />
                </div>

              </Dialog.Description>
            
          
              <Dialog.Footer>
              
                    <Button variant="primary" type="button" class="w-20" @click="onFinishTextCanvas('image/png')" >
                        Add
                    </Button>
                </Dialog.Footer>
          </Dialog.Panel>
      </Dialog>
      
    </div>


    <div v-if="pages.length" class="w-full">
    
      <div class="w-full">
        <div v-for="(page,pIndex) in pages" :key="pIndex">
          <div
              class="p-5 w-full flex flex-col items-center overflow-hidden"
              @mousedown="selectPage(pIndex)"
              @touchstart="selectPage(pIndex)">
            <div
                class="relative shadow-lg"
                :class="[pIndex === selectedPageIndex ?'shadowOutline':'']">
                <input type="file" id="image"  name="image"  class="hidden"  @change="onUploadImage"/>

              <div class="relative mr-3 flex h-8 w-full bg-gray-400 rounded-sm overflow-hidden md:mr-4 items-center">
                <label style="margin-left: 17.5rem"
                    class="flex justify-center h-full w-8 hover:bg-gray-500
                cursor-pointer"
                    for="image"
                    :class="[selectedPageIndex < 0 ?'cursor-not-allowed bg-gray-500':'']">
                  <img src="/image.svg" alt="An icon for adding images"/>
                </label>
                <label
                    class="flex  justify-center h-full w-8 hover:bg-gray-500
                cursor-pointer"
                    @click="onAddDrawing"
                    :class="[selectedPageIndex < 0 ?'cursor-not-allowed bg-gray-500':'']">
                  <img src="/gesture.svg" alt="An icon for adding drawing"/>
                </label>

                <label
                    class="flex  justify-center h-full w-8 hover:bg-gray-500
                cursor-pointer"
                    @click="onAddText"
                    :class="[selectedPageIndex < 0 ?'cursor-not-allowed bg-gray-500':'']">
                  <img src="/text.svg" alt="An icon for adding drawing"/>
                </label>
              </div>

              <!-- <Button @click="savePDF" class="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 md:px-4 mr-3 md:mr-4 rounded"
                  :class="[(pages.length === 0 || saving || !pdfFile) ?'cursor-not-allowed bg-blue-700':'']">
                  {{ saving ? 'Saving' : 'Save' }}
              </Button> -->
              <PDFPage
                  :ref="`page${pIndex}`"
                  :data-key="pIndex"
                  @onMeasure="onMeasure($event, pIndex)"
                  :page="page"/>
              <div
                  class="absolute top-0 left-0 transform origin-top-left noTouchAction"
                  :style="{transform: `scale(${pagesScale[pIndex]})`}"
              >
                <div v-for="(object, oIndex) in allObjects[pIndex]" :key="oIndex">
                  <div>
                    <div v-if="object.type === 'image'">
                      <ImageItem
                          @onUpdate="updateObject(object.id, $event)"
                          @onDelete="deleteObject(object.id)"
                          :file="object.file"
                          :payload="object.payload"
                          :x="object.x"
                          :y="object.y"
                          :width="object.width"
                          :height="object.height"
                          :originWidth="object.originWidth"
                          :originHeight="object.originHeight"
                          :pageScale="pagesScale[pIndex]"/>
                    </div>
                    <div v-else-if="object.type === 'text'">
                      <TextItem
                          @onUpdate="updateObject(object.id, $event)"
                          @onDelete="deleteObject(object.id)"
                          @onSelectFont="selectFontFamily"
                          :text="object.text"
                          :x="object.x"
                          :y="object.y"
                          :size="object.size"
                          :lineHeight="object.lineHeight"
                          :fontFamily="object.fontFamily"
                          :pageScale="pagesScale[pIndex]"/>
                    </div>
                    <div v-else-if="object.type === 'drawing'">
                      <Drawing
                          @onUpdate="updateObject(object.id, $event)"
                          @onDelete="deleteObject(object.id)"
                          :path="object.path"
                          :x="object.x"
                          :y="object.y"
                          :width="object.width"
                          :originWidth="object.originWidth"
                          :originHeight="object.originHeight"
                          :pageScale="pagesScale[pIndex]"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full flex-grow flex justify-center items-center">
        <span class=" font-bold text-3xl text-gray-500">Drag something here</span>
      </div>
    </div>
  </div>

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
                    Sukses Di Tanda Tangan
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


</template>

<script setup>
  import "pdfjs-dist/web/pdf_viewer.css";

  import { PDFJS } from 'pdfjs-dist'
  import { GlobalWorkerOptions } from 'pdfjs-dist';
  GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker";

  // import * as PDFLib from 'pdf-lib';
  import Api from '../api/Api'
  import {getAsset} from "@/utils/prepareAssets";
  import { Dialog, Menu } from "../base-components/Headless"
  import { onMounted, ref, reactive , watch, computed } from "vue"
  import { useStore } from "vuex";
  import { useRouter } from 'vue-router'
  import PDFPage from "../components/PDFPage.vue";
  import { FormInput, FormSelect, FormLabel, FormInline, FormTextarea } from "../base-components/Form"
  import Lucide from "../base-components/Lucide"
  import Button from "../base-components/Button"
  import ImageItem from "../components/Image.vue";
  import TextItem from "../components/TextItem.vue";
  import Drawing from "../components/Drawing.vue";
  import DrawingCanvas from "../components/DrawingCanvas.vue";
  import {fetchFont} from "../utils/prepareAssets.js";
  import {
    readAsImage,
    readAsPDF,
    readAsDataURL
  } from "@/utils/asyncReader.js";
  import {save} from "@/utils/PDF.js";
  import { defineProps  } from 'vue';
  import '../assets/font/style.css';

  const props = defineProps(['dataFromPage', 'dataAnother', 'bulan', 'tahun']);

  getAsset('makeTextPDF');
  const PrintTTDPreview = ref(false);
  const setPrintTTDModalPreview = (value) => {
      PrintTTDPreview.value = value;
  };
  const PrintTextPreview = ref(false);
  const setPrintTextModalPreview = (value) => {
      PrintTextPreview.value = value;
  };
  const router = useRouter()
  const pdfFile = ref(null);
  const pdfName = ref(props.dataFromPage);
  const numPages = ref(null);
  const pdfDocument = ref(null);
  const pages = ref([]);
  const pagesScale = ref([]);
  const allObjects = ref([]);
  const currentFont = ref("Times-Roman");
  const selectedPageIndex = ref(-1);
  const saving = ref(false);
  const pageRefs = ["page"];
  const addingDrawing = ref(false);
  const addingText= ref(false);
  const signature1=ref("")
  const nama=ref("")
  const loading = ref(true)
  const loadingsycn = ref("")
  const pesan = ref("")
  // const DEBUG_LINK = "http://192.168.5.65:5050/storage/pdf/"+ props.dataFromPage;
  const DEBUG_LINK = "https://portal.hondaimora.com/iss/api/storage/pdf/"+ props.dataFromPage;

  const basicModalPreview = ref(false);
  const successModalPreview = ref(false);
  const setSuccessModalPreview = (value) => {
      successModalPreview.value = value;
      if (successModalPreview.value == false) {
  
        router.push({name: 'ListDetailSignatureTTD',
        params : {
                bulan : props.bulan,
                tahun : props.tahun,
                status : 1
            }
        })

        window.location.reload();
      }
      document.body.style.overflow = document.body.style.overflow == 'hidden' ? 'auto' : 'hidden'
    
  };

  const warningModalPreview = ref(false);
    const setWarningModalPreview = (value) => {
        warningModalPreview.value = value;
    };

  const option = ref({
    penColor:"rgb(0, 0, 0)",
    backgroundColor:"rgb(255,255,255)",
    thickness : 1
  })
  const genID = (() => {
    let id = 0;
    return () => id++;
  })();

  const init = async () => {
    try {
      const res = await fetch(DEBUG_LINK);
      const pdfBlob = await res.blob();
      await addPDF(pdfBlob);
      selectedPageIndex.value = 0;
      setTimeout(() => {
        fetchFont(currentFont.value);
        // prepareAssets();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishDrawingCanvas = (e) => {
    const imageUrl = signature1.value.save(e);
    
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        // Membuat objek berkas dengan informasi yang diberikan
        const file = new File([blob], "honda.png", {
          type: blob.type,
          lastModified: Date.now(), // Menggunakan waktu sekarang
        });

        if (file && selectedPageIndex.value >= 0) {
          // Membaca file sebagai gambar
          const reader = new FileReader();
          reader.onload = async () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
              // Membuat elemen canvas
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // Mengatur ukuran canvas sesuai dengan gambar
              canvas.width = img.width;
              canvas.height = img.height;

              // Menggambar gambar ke dalam canvas
              ctx.drawImage(img, 0, 0);

              // Mendapatkan data piksel dari canvas
              const imageData = ctx.getImageData(0, 0, img.width, img.height);
              const data = imageData.data;

              // Mengubah piksel putih menjadi piksel transparan
              for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];

                // Cek apakah piksel adalah warna putih (nilai RGB = 255, 255, 255)
                if (red === 255 && green === 255 && blue === 255) {
                  // Mengatur tingkat transparansi (alpha channel) menjadi 0
                  data[i + 3] = 0;
                }
              }

              // Menempatkan data piksel yang telah diubah kembali ke dalam canvas
              ctx.putImageData(imageData, 0, 0);

              // Mengambil hasil canvas sebagai blob
              canvas.toBlob(transBlob => {
                // Membuat File baru dari blob yang telah diubah
                const transparentFile = new File([transBlob], "honda_transparent.png", {
                  type: transBlob.type,
                  lastModified: Date.now(),
                });

                // Menambahkan gambar dengan latar belakang transparan
                addImage(transparentFile);
              }, 'image/png');
            };
          };
          reader.readAsDataURL(file);
        }
      });

    PrintTTDPreview.value = false;
  };

  const onFinishTextCanvas = (e) => {
    const sentenceText = nama.value; // Assuming nama is an input element or some text input
    const canvasElement = document.createElement("canvas");
    const ctx = canvasElement.getContext('2d');

    // Set the canvas size
    canvasElement.width = 300; // Set the width to an appropriate value
    canvasElement.height = 70; // Set the height to an appropriate value

    // Set font and text color
    ctx.font = '30px "Signature"';
    ctx.fillStyle = 'black';

    // Clear the canvas
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Draw text on the canvas
    ctx.fillText(sentenceText, 10, 30); // Adjust the position as needed

    // Convert the canvas to a data URL (PNG)
    const imageUrl = canvasElement.toDataURL('image/png');

  
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
      // Membuat objek berkas dengan informasi yang diberikan
      const file = new File([blob], "honda.png", {
        type: blob.type,
        lastModified: Date.now(), // Menggunakan waktu sekarang
      });

      if (file && selectedPageIndex.value >= 0) {
        // Membaca file sebagai gambar
        const reader = new FileReader();
        reader.onload = async () => {
          const img = new Image();
          img.src = reader.result;

          img.onload = () => {
            // Membuat elemen canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Mengatur ukuran canvas sesuai dengan gambar
            canvas.width = img.width;
            canvas.height = img.height;

            // Menggambar gambar ke dalam canvas
            ctx.drawImage(img, 0, 0);

            // Mendapatkan data piksel dari canvas
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;

            // Mengubah piksel putih menjadi piksel transparan
            for (let i = 0; i < data.length; i += 4) {
              const red = data[i];
              const green = data[i + 1];
              const blue = data[i + 2];

              // Cek apakah piksel adalah warna putih (nilai RGB = 255, 255, 255)
              if (red === 255 && green === 255 && blue === 255) {
                // Mengatur tingkat transparansi (alpha channel) menjadi 0
                data[i + 3] = 0;
              }
            }

            // Menempatkan data piksel yang telah diubah kembali ke dalam canvas
            ctx.putImageData(imageData, 0, 0);

            // Mengambil hasil canvas sebagai blob
            canvas.toBlob(transBlob => {
              // Membuat File baru dari blob yang telah diubah
              const transparentFile = new File([transBlob], "honda_transparent.png", {
                type: transBlob.type,
                lastModified: Date.now(),
              });

              // Menambahkan gambar dengan latar belakang transparan
              addImage(transparentFile);
            }, 'image/png');
          };
        };
        reader.readAsDataURL(file);
      }
    });

    PrintTextPreview.value = false;
  };


  const onCancelDrawingCanvas = () => {
    addingDrawing.value = false;
  };

  const onUploadPDF= async (e) => {
    const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
    const file = files[0];
    if (!file || file.type !== "application/pdf") return;
    selectedPageIndex.value = -1;
    try {
      await addPDF(file);
      selectedPageIndex.value = 0;
    } catch (e) {
      console.log(e);
    }
  }

  const resetDefaultState = async () => {
    pdfFile.value = null;
    pdfName.value = "";
    numPages.value = null;
    pdfDocument.value = null;
    pages.value = [];
    pagesScale.value = [];
    allObjects.value = [];
  }

  const getPdfDocument = async (file) =>{
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return PDFJS.getDocument(url).promise;
  }

  const addPDF = async (file) =>{
    try {
      resetDefaultState();

      pdfFile.value = file;
      pdfName.value = file.name;

      pdfDocument.value = await readAsPDF(file);
      if (pdfDocument.value) {
        numPages.value = pdfDocument.value.numPages;
        pages.value = Array(numPages.value)
            .fill()
            .map((_, i) => pdfDocument.value.getPage(i + 1));
        allObjects.value = pages.value.map(() => []);
        pagesScale.value = Array(numPages.value).fill(1);
      }
    } catch (e) {
      console.log("Failed to add pdf.");
      throw e;
    }
  }

  const onUploadImage = async (e) =>{
    // console.log(e.target.files[0]);
      const file = e.target.files[0];
      if (file && selectedPageIndex.value >= 0) {
        await addImage(file);
      }
      e.target.value = null;
  }

  const clearTTD = async () => {

    signature1.value.clear()
  }


  const addImage = async (file) =>{
      // console.log(file);
      try {
        // get dataURL to prevent canvas from tainted
        const url = await readAsDataURL(file);
        const img = await readAsImage(url);
        const id = genID();
        const {width, height} = img;

        const object = {
          id,
          type: "image",
          width,
          height,
          originWidth: width,
          originHeight: height,
          canvasWidth: 70,
          canvasHeight: 70,
          x: 0,
          y: 0,
          payload: img,
          file
        };
        allObjects.value = allObjects.value.map((objects, pIndex) =>
            pIndex === selectedPageIndex.value ? [...objects, object] : objects
        );
      } catch (e) {
        console.log(`Fail to add image.`, e);
      }
  }

  const onAddTextField = async () =>{
    if (selectedPageIndex.value >= 0) {
      addTextField();
    }
  }

  const addTextField  = async (text = "New Text Field") =>{
      const id = genID();
      fetchFont(currentFont);
      const object = {
        id,
        text,
        type: "text",
        size: 16,
        width: 0, // recalculate after editing
        lineHeight: 1.4,
        fontFamily: currentFont,
        x: 0,
        y: 0
      };
      allObjects.value = allObjects.value.map((objects, pIndex) =>
          pIndex === selectedPageIndex.value ? [...objects, object] : objects
      );
  }

  const onAddDrawing = async () =>{
    if (selectedPageIndex.value >= 0) {
        addingDrawing.value = true;
        PrintTTDPreview.value = true
    }
  }

  const onAddText = async () =>{
    if (selectedPageIndex.value >= 0) {
        addingText.value = true;
        PrintTextPreview.value = true
    }
  }



  const addDrawing = async (originWidth, originHeight, path, scale = 1) => {
    const id = genID();
    const object = {
      id,
      path,
      type: "drawing",
      x: 0,
      y: 0,
      originWidth,
      originHeight,
      width: originWidth * scale,
      scale
    };
    allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex === selectedPageIndex.value ? [...objects, object] : objects
    );

    console.log( allObjects.value);
  }

  const selectFontFamily = async (event) => {
    const name = event.name;
    fetchFont(name);
    currentFont.value = name;
  }

  const selectPage = async (index) =>{
    selectedPageIndex.value = index;
  }

  const  updateObject = async (objectId, payload) => {
    allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex === selectedPageIndex.value
            ? objects.map(object =>
                object.id === objectId ? {...object, ...payload} : object
            )
            : objects
    );
  }

  const  deleteObject = async (objectId) => {
    allObjects.value = allObjects.value.map((objects, pIndex) =>
        pIndex === selectedPageIndex.value
            ? objects.filter(object => object.id !== objectId)
            : objects
    );
  }

  const  onMeasure = async  (e, i) => {
      pagesScale[i] = e.scale;
  }
// FIXME: Should wait all objects finish their async work
  const savePDF= async () =>{
    if (!pdfFile.value || saving.value || !pages.value.length) return;
    saving.value = true;
    try {
      // await save(pdfFile.value, allObjects.value, pdfName.value, pagesScale.value);
      const byte = await save(pdfFile.value, allObjects.value, pdfName.value, pagesScale.value)
      // console.log(byte);
      // const combinedData = (pdfFile.value, allObjects.value, pagesScale.value);
      // // const blobData = new Blob([combinedData], { type: 'application/octet-stream' });

      // // console.log(pdfFile.value, allObjects.value, pdfName.value, pagesScale.value);
      // // console.log(combinedData);

      var blob = new File([new Uint8Array(byte)], { type: 'application/pdf' });
  
      // // console.log(blob);
      
      const token = localStorage.getItem('token_iss')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      Api.defaults.headers.post['Content-Type'] = "multipart/form-data"
      const formdatas = new FormData();
      formdatas.append('file', blob);
      formdatas.append("fileName", props.dataFromPage);
      formdatas.append("no_surat", props.dataAnother);
      await Api.post('/staff/ttdsignature', formdatas).then(async (response) => {
        
          successModalPreview.value = true
          pesan.value = "Document Success Di Tanda Tangan"
      
        

      }).catch(error => {
          console.log(error);
          // const object1 = error.response.data
          // pesan.value =  Object.values(object1).toString()
          // setWarningModalPreview(true)
      })
    } catch (e) {
      console.log(e);
    } finally {
      saving.value = false;
    }
  }

  onMounted(async() => {
    await init()
  })


  

// export default {
//   name: 'InAppEditor',
//   components: {
//     PDFPage,
//     ImageItem,
//     TextItem,
//     Drawing,
//     DrawingCanvas
//   },
//   props: {
//     msg: String
//   },
//   data() {
//     return {
//       pdfFile: null,
//       pdfName: "",
//       numPages: null,
//       pdfDocument: null,
//       pages: [],
//       pagesScale: [],
//       allObjects: [],
//       currentFont: "Times-Roman",
//       focusId: null,
//       selectedPageIndex: -1,
//       saving: false,
//       addingDrawing: false,
//       DEBUG_LINK: "http://192.168.5.65:5050/storage/pdf/Proposal%20Penawaran.pdf"
//     }
//   },
//   async mounted() {
//     await this.init();
//   },
//   created() {
//   },
//   watch: {},
//   methods: {
//     async init() {
//       try {
//         const res = await fetch(this.DEBUG_LINK);
//         const pdfBlob = await res.blob();
//         await this.addPDF(pdfBlob);
//         this.selectedPageIndex = 0;
//         setTimeout(() => {
//           fetchFont(this.currentFont);
//           // prepareAssets();
//         }, 5000);
//       } catch (e) {
//         console.log(e);
//       }
//     },

//     onFinishDrawingCanvas(e) {
//       const {originWidth, originHeight, path} = e;
//       let scale = 1;
//       if (originWidth > 500) {
//         scale = 500 / originWidth;
//       }
//       this.addDrawing(originWidth, originHeight, path, scale);
//       this.onCancelDrawingCanvas();
//     },
//     onCancelDrawingCanvas() {
//       this.addingDrawing = false;
//     },
//     genID() {
//       let id = 0;
//       return function genId() {
//         return id++;
//       };
//     },
//     async onUploadPDF(e) {
//       const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
//       const file = files[0];
//       if (!file || file.type !== "application/pdf") return;
//       this.selectedPageIndex = -1;
//       try {
//         await this.addPDF(file);
//         this.selectedPageIndex = 0;
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     resetDefaultState() {
//       this.pdfFile = null;
//       this.pdfName = "";
//       this.numPages = null;
//       this.pdfDocument = null;
//       this.pages = [];
//       this.pagesScale = [];
//       this.allObjects = [];
//     },
//     async getPdfDocument(file) {
//       const blob = new Blob([file]);
//       const url = window.URL.createObjectURL(blob);
//       return PDFJS.getDocument(url).promise;
//     },
//     async addPDF(file) {
//       try {
//         this.resetDefaultState();

//         this.pdfFile = file;
//         this.pdfName = file.name;

//         this.pdfDocument = await readAsPDF(file);
//         if (this.pdfDocument) {
//           this.numPages = this.pdfDocument.numPages;
//           this.pages = Array(this.numPages)
//               .fill()
//               .map((_, i) => this.pdfDocument.getPage(i + 1));
//           this.allObjects = this.pages.map(() => []);
//           this.pagesScale = Array(this.numPages).fill(1);
//         }
//       } catch (e) {
//         console.log("Failed to add pdf.");
//         throw e;
//       }
//     },
//     async onUploadImage(e) {
//       const file = e.target.files[0];
//       if (file && this.selectedPageIndex >= 0) {
//         await this.addImage(file);
//       }
//       e.target.value = null;
//     },
//     async addImage(file) {
//       try {
//         // get dataURL to prevent canvas from tainted
//         const url = await readAsDataURL(file);
//         const img = await readAsImage(url);
//         const id = this.genID();
//         const {width, height} = img;

//         const {canvasWidth, canvasHeight} =
//             this.$refs[
//                 `page${this.selectedPageIndex}`
//                 ][0].getCanvasMeasurement();

//         const object = {
//           id,
//           type: "image",
//           width,
//           height,
//           originWidth: width,
//           originHeight: height,
//           canvasWidth: canvasWidth,
//           canvasHeight: canvasHeight,
//           x: 0,
//           y: 0,
//           payload: img,
//           file
//         };
//         this.allObjects = this.allObjects.map((objects, pIndex) =>
//             pIndex === this.selectedPageIndex ? [...objects, object] : objects
//         );
//       } catch (e) {
//         console.log(`Fail to add image.`, e);
//       }
//     },
//     onAddTextField() {
//       if (this.selectedPageIndex >= 0) {
//         this.addTextField();
//       }
//     },

//     addTextField(text = "New Text Field") {
//       const id = this.genID();
//       fetchFont(this.currentFont);
//       const object = {
//         id,
//         text,
//         type: "text",
//         size: 16,
//         width: 0, // recalculate after editing
//         lineHeight: 1.4,
//         fontFamily: this.currentFont,
//         x: 0,
//         y: 0
//       };
//       this.allObjects = this.allObjects.map((objects, pIndex) =>
//           pIndex === this.selectedPageIndex ? [...objects, object] : objects
//       );
//     },

//     onAddDrawing() {
//       if (this.selectedPageIndex >= 0) {
//         this.addingDrawing = true;
//       }
//     },

//     addDrawing(originWidth, originHeight, path, scale = 1) {
//       const id = this.genID();
//       const object = {
//         id,
//         path,
//         type: "drawing",
//         x: 0,
//         y: 0,
//         originWidth,
//         originHeight,
//         width: originWidth * scale,
//         scale
//       };
//       this.allObjects = this.allObjects.map((objects, pIndex) =>
//           pIndex === this.selectedPageIndex ? [...objects, object] : objects
//       );
//     },

//     selectFontFamily(event) {
//       const name = event.name;
//       fetchFont(name);
//       this.currentFont = name;
//     },

//     selectPage(index) {
//       this.selectedPageIndex = index;
//     },

//     updateObject(objectId, payload) {
//       this.allObjects = this.allObjects.map((objects, pIndex) =>
//           pIndex === this.selectedPageIndex
//               ? objects.map(object =>
//                   object.id === objectId ? {...object, ...payload} : object
//               )
//               : objects
//       );
//     },

//     deleteObject(objectId) {
//       this.allObjects = this.allObjects.map((objects, pIndex) =>
//           pIndex === this.selectedPageIndex
//               ? objects.filter(object => object.id !== objectId)
//               : objects
//       );
//     },

//     onMeasure(e, i) {
//       this.pagesScale[i] = e.scale;
//     },

// // FIXME: Should wait all objects finish their async work
//     async savePDF() {
//       if (!this.pdfFile || this.saving || !this.pages.length) return;
//       this.saving = true;
//       try {
//         await save(this.pdfFile, this.allObjects, this.pdfName, this.pagesScale);
//       } catch (e) {
//         console.log(e);
//       } finally {
//         this.saving = false;
//       }
//     },
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .shadowOutline {
      box-shadow: 0 0 0 3px rgb(66 153 225 / 50%);
    }

    .noTouchAction {
      touch-action: none
    }

    h3 {
      margin: 40px 0 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }

    a {
      color: #42b983;
    }
    .sig1 {
      font-family: 'Signature', cursive;
      font-size: 1.8em;
    }
</style>
