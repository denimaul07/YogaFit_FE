<script setup lang="ts">
import { computed, reactive, onMounted } from "vue";
import { ChartData, ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "../../stores/color-scheme";
import { useDarkModeStore } from "../../stores/dark-mode";
import Chart from "../../base-components/Chart";
import { getColor } from "../../utils/colors";
import Api from '../../api/Api'

const state = reactive({
    bulan  : '0',
    tahun  : '0',
    new  : '0',
    need  : '0',
})

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const chartData = [state.new, 10, 65, 10, 65, 10, 65, 10];
const chartColors = () => [
  "#6467f1",
  "#eab309",
  "#ef4545",
  "#84cc17",
  "#0fa5e9",
  "#0f7590",
  "#046aa1",
  "#6c7380",
];
const data = computed<ChartData>(() => {
  return {
    labels: ["New Request", "Need Attention", "Top Priority", "Tanda Terima", "Terima User", "Cash Advance", "Close SPBJ", "Batal SPBJ"],
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 5,
        borderColor: darkMode.value
          ? getColor("darkmode.700")
          : getColor("white"),
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: getColor("slate.500", 0.8),
        },
      },
    },
  };
});

const tampilData = async () => {
      const token = localStorage.getItem('token')
      Api.defaults.headers.common['Authorization'] = "Bearer " +token
      await Api.get('/admin/purchase?bulan=' +  state.bulan + '&tahun=' + state.tahun)
      .then(response => {
          state.new = response.data.new
          state.need = response.data.need
      }).catch(error => {
          
          
      })
}


onMounted(async() => {
    await tampilData()
})
</script>

<template>
  <Chart
    type="pie"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
