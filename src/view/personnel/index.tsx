import { ref } from "vue"
import { smDataList } from "../../api/smData"
import { useIntervalFn } from "@vueuse/core"
import { smDeviceList } from "../../api/smDevice"
import { getBaoJingCiShuTongJiByRecentWeek, getDayExceptionCount, getLiShiYiChangPaiMing } from "../../api/smAlarm"
import * as echarts from "echarts"
export function useTiZhengJianCe() {
    const tiZhengJianCeList = ref([])
    const tiZhengJianCeListTotal = ref(0)
    const tiZhengPageInfo = ref({
        pageNum: 1,
        pageSize: 10,
        smDeviceSn: ""
    })
    async function getTiZhengJianList(value) {
        // @ts-expect-error
        smDataList(tiZhengPageInfo.value).then(res => {
            if (res.data.data.total != tiZhengJianCeListTotal.value) {
                tiZhengJianCeListTotal.value = res.data.data.total;
            }
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
    const xinDianEchartRef = ref(null)
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

    const huXiLvRef = ref(null)


    onMounted(() => {
        getTiZhengJianList()
    })

    window.addEventListener("resize", () => {

        console.log("huXiLvRef.value", huXiLvRef.value)
        if (huXiLvRef.value != null) {
            huXiLvRef.value.resize()
        }
        if (xinDianEchartRef.value != null) {
            xinDianEchartRef.value.resize()
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
        huXiLvOption,
        tiZhengJianCeListTotal
    }
}


export function useZaiXianShengMingDevice() {
    const smDeviceListTable = ref([])
    const pageInfo = ref({
        pageNum: 1,
        pageSize: 10,
    })

    const smDeviceListTableTotal = ref(0)

    async function getZaiXianShengMingDevice() {
        smDeviceList(pageInfo.value).then(res => {
            if (res.data.data.total != smDeviceListTableTotal.value) {
                smDeviceListTableTotal.value = res.data.data.total;
            }
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
        smDeviceListTable,
        smDeviceListTableTotal
    }
}

export function useLiShiYiChangPaiMing() {
    const liShiYiChangRef = ref()
    let liShiYaChangChart = null
    let options = {
        title: {
            text: '当天异常人数',
            left: 'center',
            textStyle: {
                color: '#fff'
            },
            // 靠左边
            left: '10px',
        },
        xAxis: {
            type: 'category',
            data: [],
            // 字体白色
            axisLabel: { color: '#fff' }
        },
        yAxis: {
            type: 'value',
            // 字体白色
            axisLabel: { color: '#fff' }
        },
        series: [
            {
                type: 'bar',
                data: [],
                itemStyle: {
                    color: function (params) {
                        // 可以自定义颜色数组
                        let colorList = [
                            "#E74C3C", // 心率 - 红色 (心脏/血液)
                            "#1ABC9C", // 血氧 - 青绿色 (氧气/健康)
                            "#F1C40F", // 提问 - 黄色 (提示/关注)
                            "#3498DB", // CO₂ - 蓝色 (气体/呼吸)
                            "#2ECC71", // 呼吸 - 绿色 (呼吸/生命)
                            "#9B59B6"  // 心电 - 紫色 (医疗仪器/电信号)
                        ];
                        return colorList[params.dataIndex % colorList.length];
                    }
                }
            }
        ],
        tooltip: {
            show: true
        }
    };

    async function getLiShiYiChangZhiBiao() {

        getDayExceptionCount().then(res => {
            options.title.text = `当天异常人数:${res.data.data}`
        })

        getLiShiYiChangPaiMing().then(res => {
            // @ts-expect-error
            if (liShiYaChangChart == null) {
                liShiYaChangChart = echarts.init(liShiYiChangRef.value)
            }
            options.xAxis.data = res.data.data.xData
            options.series[0].data = res.data.data.seris
            // @ts-expect-error
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
            data: [],
            // 字体为白色
            axisLabel: { color: '#fff' }
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
            if (smAlarmQuShiFenXiOption.series[0].data.every(item => item == 0)) {
                smAlarmQuShiFenXiOption.yAxis.min = 0
                smAlarmQuShiFenXiOption.yAxis.max = 5
            } else {
                smAlarmQuShiFenXiOption.yAxis.min = null
                smAlarmQuShiFenXiOption.yAxis.max = null
            }
            // 如过data都是0或者null，则不展示,纵坐标显示
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