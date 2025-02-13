import * as echarts from "echarts";
import { getAllEnvironmentAreaEchart, getAllEquipmentAreaEchart, getAllEventEchart } from "../../api/home";
export function useAlarmHook() {
    const yzRef = ref()
    const yzOption = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            left: 'center',
            top: '5%',
            // 颜色白色
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '50%',
                data: [
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    const et = ref()
    const etDialog = ref(false)
    function handleDialogClose() {
        etDialog.value = false
    }
    function handleDialogOpen() {
        etDialog.value = true
    }

    function getEchartData() {
        getAllEventEchart().then(res => {
            yzOption.series[0].data = res.data.data.map(item => {
                if (item.name === "设备报警") {
                    return {
                        name: item.name,
                        value: item.value,
                    }
                }
                if (item.name === "环境报警") {
                    return {
                        name: item.name,
                        value: item.value,
                    }
                }
            })
            et.value.setOption(yzOption)
        })
    }

    const yzTableData = ref([])

    onMounted(() => {
        nextTick(() => {
            et.value = echarts.init(yzRef.value)
            getEchartData()
            et.value.off().on("click", (params) => {
                if (params.name === "设备报警") {
                    getAllEquipmentAreaEchart().then(res => {
                        yzTableData.value = res.data.data
                    }).finally(() => {
                        etDialog.value = true
                    })
                }
                if (params.name === "环境报警") {
                    getAllEnvironmentAreaEchart().then(res => {
                        yzTableData.value = res.data.data
                    }).finally(() => {
                        etDialog.value = true
                    })
                }
            })
        })
    })

    return {
        yzRef,
        yzOption,
        yzTableData,
        et,
        etDialog,
        handleDialogClose,
    }
}