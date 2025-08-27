import { ref } from "vue"
import { smDataList } from "../../api/smData"
import { useIntervalFn } from "@vueuse/core"
import { smDeviceList } from "../../api/smDevice"
import { getBaoJingCiShuTongJiByRecentWeek, getLiShiYiChangPaiMing } from "../../api/smAlarm"
import * as echarts from "echarts"
export function useTiZhengJianCe() {
    const tiZhengJianCeList = ref([])
    const tiZhengPageInfo = ref({
        pageNum: 1,
        pageSize: 10,
        deviceSn: ""
    })
    async function getTiZhengJianList() {
        // @ts-expect-error
        smDataList(tiZhengPageInfo.value).then(res => {
            tiZhengJianCeList.value = res.data.data.rows;
        })
    }

    const tiZhengJianCeTimer = useIntervalFn(() => {
        tiZhengJianCeTimer.pause()
        getTiZhengJianList().finally(() => {
            tiZhengJianCeTimer.resume()
        })
    }, 5000)


    const tiZhengJianDetailVis = ref(false)
    const tiZhengJianDetail = ref()
    const xinDianEchartRef = ref()
    function handleTiZhengOpen(item) {
        tiZhengJianDetailVis.value = true
        tiZhengJianDetail.value = item

        nextTick(() => {
            xinDianOption.value.series[0].data = item.xinDian
            xinDianOption.value.xAxis.data = item.xinDian.map((_, index) => index)
            if (xinDianEchartRef.value.render != undefined) {
                xinDianEchartRef.value.render();
            }
            console.log("item", item.huxi)
            huXiLvOption.value.xAxis.data = item.huxi.map((_, index) => index)
            huXiLvOption.value.series[0].data = item.huxi
            if (huXiLvRef.value.render != undefined) {
                huXiLvRef.value.render();
            }
        })
    }

    function handleTiZhengClose() {
        tiZhengJianDetailVis.value = false
    }

    const xinDianOption = ref({
        title: {
            text: '心电图',
            left: 'center',
            textStyle: {
                color: '#fff'  // 字体颜色白色
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                return `采样点: ${params[0].dataIndex}<br/>电压: ${params[0].data}`
            }
        },
        xAxis: {
            type: 'category',
            show: false,
            // data: ecgData.map((_, index) => index)
            data: []
        },
        yAxis: {
            type: 'value',
            name: '电压',
            axisLabel: {
                color: '#fff'   // 这里设置字体颜色为白色
            },
            axisLine: {
                lineStyle: { color: '#fff' }
            },
        },
        grid: {
            left: '10%',
            right: '10%',
            top: 40,
            bottom: 40
        },
        series: [
            {
                name: '心电信号',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: []
            }
        ]
    })


    const huXiLvOption = ref({
        title: {
            text: '呼吸图',
            left: 'center',
            textStyle: {
                color: '#fff'  // 字体颜色白色
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                return `采样点: ${params[0].dataIndex}<br/>呼吸值: ${params[0].data}`
            }
        },
        xAxis: {
            type: 'category',
            show: false,
            // data: breathData.map((_, i) => i)
            data: []
        },
        yAxis: {
            type: 'value',
            name: '幅度',
            axisLabel: {
                formatter: '{value}',
                color: '#fff'   // 这里设置字体颜色为白色
            },

            axisLine: {
                lineStyle: { color: '#fff' }
            },
        },
        grid: {
            left: '8%',
            right: '8%',
            top: 50,
            bottom: 40
        },
        series: [
            {
                name: '呼吸信号',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 2
                },
                data: []
            }
        ]
    })

    const huXiLvRef = ref()


    onMounted(() => {
        getTiZhengJianList()
    })

    window.addEventListener("resize", () => {
        if (smAlarmQuShiFenXiChart != null) {
            smAlarmQuShiFenXiChart.resize()
        }
        if (huXiLvRef.value != null && huXiLvRef.value.render != null) {
            huXiLvRef.value.render()
        }
    })
    return {
        tiZhengJianCeList,
        tiZhengPageInfo,
        getTiZhengJianList,
        handleTiZhengOpen,
        handleTiZhengClose,
        tiZhengJianDetailVis,
        tiZhengJianDetail,
        xinDianOption,
        xinDianEchartRef,
        huXiLvRef,
        huXiLvOption
    }
}


export function useZaiXianShengMingDevice() {
    const smDeviceListTable = ref([])
    const pageInfo = ref({
        pageNum: 1,
        pageSize: 10,
    })

    async function getZaiXianShengMingDevice() {
        smDeviceList(pageInfo.value).then(res => {
            smDeviceListTable.value = res.data.data.rows;
        })
    }

    const smDeviceTimer = useIntervalFn(() => {
        smDeviceTimer.pause()
        getZaiXianShengMingDevice().finally(() => {
            smDeviceTimer.resume()
        })
    }, 5000)

    onMounted(() => {
        getZaiXianShengMingDevice()
    })
    return {
        smDeviceListTable
    }
}

export function useLiShiYiChangPaiMing() {
    const liShiYiChangRef = ref()
    let liShiYaChangChart = null
    let options = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                data: []
            }
        ],
        tooltip: {
            show: true
        }
    };

    async function getLiShiYiChangZhiBiao() {
        getLiShiYiChangPaiMing().then(res => {
            if (liShiYaChangChart == null) {
                liShiYaChangChart = echarts.init(liShiYiChangRef.value)
            }
            options.xAxis.data = res.data.data.xData
            options.series[0].data = res.data.data.seris
            liShiYaChangChart.setOption(options, true)
        })
    }

    const liShiYaChangTimer = useIntervalFn(() => {
        liShiYaChangTimer.pause()
        getLiShiYiChangZhiBiao().finally(() => {
            liShiYaChangTimer.resume()
        })
    }, 5000)


    const smAlarmQuShiFenXiVis = ref(false)
    const smAlarmQuShiFenXiRef = ref()
    // @ts-expect-error
    let smAlarmQuShiFenXiChart = null
    let smAlarmQuShiFenXiOption = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            axisLine: { lineStyle: { color: '#fff' } },
            axisLabel: { color: '#fff' },
        },
        series: [
            {
                data: [],
                type: 'line'
            }
        ]
    }
    function handleSmAlarmOpen() {
        smAlarmQuShiFenXiVis.value = true
        // @ts-expect-error
        if (smAlarmQuShiFenXiChart == null) {
            smAlarmQuShiFenXiChart = echarts.init(smAlarmQuShiFenXiRef.value)
        }
        getBaoJingCiShuTongJiByRecentWeek().then(res => {
            console.log("res", res.data)
            smAlarmQuShiFenXiOption.xAxis.data = res.data.data.xData
            smAlarmQuShiFenXiOption.series[0].data = res.data.data.series
            // @ts-expect-error
            smAlarmQuShiFenXiChart.setOption(smAlarmQuShiFenXiOption, true)
        })
    }

    function handleSmAlarmClose() {
        smAlarmQuShiFenXiVis.value = false
    }

    onMounted(() => {
        getLiShiYiChangZhiBiao()
    })

    window.addEventListener("resize", () => {
        if (smAlarmQuShiFenXiChart != null) {
            smAlarmQuShiFenXiChart.resize()
        }
        if (liShiYaChangChart != null) {
            liShiYaChangChart.resize()
        }
    })

    return {
        liShiYiChangRef,
        handleSmAlarmOpen,
        handleSmAlarmClose,
        smAlarmQuShiFenXiVis,
        smAlarmQuShiFenXiRef
    }
}