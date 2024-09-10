<script setup>
  import { useDarkModeStore } from "../stores/dark-mode";
  import { computed, ref, defineEmits } from "vue";
  import dayjs from 'dayjs'
  const emits = defineEmits();
  const modalFilter=ref(false )
  const tanggal=ref("")
  const studio=ref([])
  const loadingSubmit=ref(false)
  const filter = () => {
    modalFilter.value = true
  };

  const modalSubmit = async (e) => {
      emits('filterChange', { studio: studio.value, startDate: tanggal.value });
      loadingButton.value = false
      loadingSubmit.value = false
      modalFilter.value = false;
  };
</script>

<template>
  <a-drawer v-model:open="modalFilter" class="custom-class" root-class-name="root-class-name" root-style="blue" style="color: #1e3a8a" title="Filter Data" placement="right">
    <div class="modal-body row g-3">
      <div class="col-12 pb-2">
          <label for="email_reset" class="form-label">Pilih tahun yang mau ditampilkan</label>
      
          <div class="input-group flex-nowrap">
            <a-range-picker v-model:value="tanggal" :bordered="true" style="width: 100%;"/>
          </div>
      </div>

      <div class="col-12 pb-2">
          <label for="email_reset" class="form-label">Pilih Studio</label>
      
          <div class="input-group flex-nowrap">
            <a-select ref="select" v-model:value="studio" style="width: 100%" placeholder="Cari Studio">
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </div>
      </div>
    </div>

    <template #footer>
        <a-button type="primary" class="bg-primary" @click="modalSubmit()">Apply</a-button>
    </template>
  </a-drawer>

  <div class="bg-primary fixed bottom-0 right-10 z-50 flex items-center justify-center w-32 h-10 mb-2 border rounded-full shadow-md cursor-pointer box" @click="filter">
  <i class="fas fa-filter text-white dark:text-slate-200 mr-2"></i>
  <div class="text-white dark:text-slate-200">Filter</div>
</div>

  <!-- END: Dark Mode Switcher -->
</template>
