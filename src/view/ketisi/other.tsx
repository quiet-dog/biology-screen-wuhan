import { ref } from "vue"
import { nongDuDeviceList, getJcOnlineCount } from "../../api/nongDuDevice"
import { useIntervalFn } from "@vueuse/core"
import { getXsOnlineCount, xsDeviceList } from "../../api/xsDevice"
import * as echart from "echarts"
import { getJcDeviceOnlineCount, jianCeDeviceList } from "../../api/jianCeDevice"

export function useCaiYangDeviceStatus() {
    const caiYangList = ref()
    async function getJianCeDeviceList() {
        nongDuDeviceList({
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            caiYangList.value = res.data.data.rows
        })
    }
    const jianCeTimer = useIntervalFn(() => {
        jianCeTimer.pause()
        getJianCeDeviceList().finally(() => {
            jianCeTimer.resume()
        })
    })

    const caiYangRef = ref()
    // @ts-expect-error
    let jianCeEchart = null
    let jianCeOption = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
            show: false
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal', // 水平布局（默认就是 horizontal）
            left: 'center',       // 水平居中
            top: 'top',           // 顶部位置（你也可以改成 'bottom' 或具体数值）
            textStyle: {
                color: '#ffffff'  // 文字颜色为白色
            },
        },
        series: [
            {
                name: 'Access From',
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
    async function getJianCeOption() {
        getJcOnlineCount().then(res => {
            jianCeOption.series[0].data = res.data.data.series
            // @ts-expect-error
            if (jianCeEchart == null) {
                jianCeEchart = echart.init(caiYangRef.value)
            }
            // @ts-expect-error
            jianCeEchart.setOption(jianCeOption, true)
        })
    }
    const jianCeOptionTimer = useIntervalFn(() => {
        jianCeOptionTimer.pause()
        getJianCeOption().finally(() => {
            jianCeOptionTimer.resume()
        })
    }, 5000)

    onMounted(() => {
        getJianCeDeviceList()
        getJianCeOption()
    })


    return {
        caiYangList,
        caiYangRef
    }
}

export function useJianCeDeviceStatus() {
    const jianCeList = ref()
    async function getJianCeDeviceList() {
        jianCeDeviceList({
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            jianCeList.value = res.data.data.rows
        })
    }
    const jianCeTimer = useIntervalFn(() => {
        jianCeTimer.pause()
        getJianCeDeviceList().finally(() => {
            jianCeTimer.resume()
        })
    })

    const jianCeRef = ref()
    // @ts-expect-error
    let jianCeEchart = null
    let jianCeOption = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
            show: false
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal', // 水平布局（默认就是 horizontal）
            left: 'center',       // 水平居中
            top: 'top',           // 顶部位置（你也可以改成 'bottom' 或具体数值）
            textStyle: {
                color: '#ffffff'  // 文字颜色为白色
            },
        },
        series: [
            {
                name: 'Access From',
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
    async function getJianCeOption() {
        getJcDeviceOnlineCount().then(res => {
            jianCeOption.series[0].data = res.data.data.series
            // @ts-expect-error
            if (jianCeEchart == null) {
                jianCeEchart = echart.init(jianCeRef.value)
            }
            // @ts-expect-error
            jianCeEchart.setOption(jianCeOption, true)
        })
    }
    const jianCeOptionTimer = useIntervalFn(() => {
        jianCeOptionTimer.pause()
        getJianCeOption().finally(() => {
            jianCeOptionTimer.resume()
        })
    }, 5000)

    onMounted(() => {
        getJianCeDeviceList()
        getJianCeOption()
    })


    return {
        jianCeList,
        jianCeRef
    }
}


export function useCaiJiDeviceStatus() {
    const caiJiList = ref()
}

export function useXsDeviceStatus() {
    const xsList = ref()
    async function getXsDeviceList() {
        xsDeviceList({
            pageNum: 1,
            pageSize: 10
        }).then(res => {
            xsList.value = res.data.data.rows
        })
    }

    const xsTimer = useIntervalFn(() => {
        xsTimer.pause()
        getXsDeviceList().finally(() => {
            xsTimer.resume()
        })
    }, 5000)


    let option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
            show: false
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal', // 水平布局（默认就是 horizontal）
            left: 'center',       // 水平居中
            top: 'top',           // 顶部位置（你也可以改成 'bottom' 或具体数值）
            textStyle: {
                color: '#ffffff'  // 文字颜色为白色
            },
        },
        series: [
            {
                name: 'Access From',
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

    const xsDeviceRef = ref()
    // @ts-expect-error
    let xsDeviceEchart = null;

    async function getXsOptions() {
        getXsOnlineCount().then(res => {
            // @ts-expect-error
            if (xsDeviceEchart == null) {
                xsDeviceEchart = echart.init(xsDeviceRef.value)
            }
            option.series[0].data = res.data.data.series
            // @ts-expect-error
            xsDeviceEchart.setOption(option, true)
        })
    }

    const xsOptionTimer = useIntervalFn(() => {
        xsOptionTimer.pause()
        getXsOptions().finally(() => {
            xsOptionTimer.resume()
        })
    }, 5000)

    onMounted(() => {
        getXsDeviceList();
        getXsOptions()
    })


    return {
        xsList,
        xsDeviceRef
    }
}