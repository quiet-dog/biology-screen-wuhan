import { ref } from "vue"
import { cePingJieGuoTongJi, getPingGuJieGuoFenXi, getResultNum } from "../../api/resultShiJuan"
import * as echarts from "echarts"
import { useIntervalFn } from "@vueuse/core"
import { xlFangAnList } from "../../api/xlFangAn"
import { jianCeShuJuTongJi, jiWeiBaoJingZhanBi, jiWeiQuShiBianHua, xwAlarmList } from "../../api/xwAlarm"

const kongData = {
    title: {
        text: '',
        left: 'center'
    },
    xAxis: {
        type: 'category',
        data: [] // 没有数据
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type: 'bar',
            data: [] // 没有数据
        }
    ],
    graphic: [
        {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
                text: '暂无数据',
                fill: '#ffffff',
                fontSize: 30,
                fontWeight: 'bold'
            }
        }
    ]
}

export function userOther() {
    const resultDetail = ref()
    const resultDetailVis = ref(false)
    const resultFangAn = ref()
    const handleResultDetailVis = (item: any) => {
        resultFangAn.value = item
        getResultNum(item.xlFangAnId).then(res => {
            resultDetail.value = res.data.data
        })
        resultDetailVis.value = true;
    }



    return {
        resultDetail,
        handleResultDetailVis,
        resultDetailVis,
        resultFangAn
    }
}

export function useCePingJieGuoFenXi() {
    let option = {
        title: {
            text: '',
            left: 'center',
            "textStyle": {
                "color": "#ffffff"  // 标题字体颜色
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                // params.percent 是该扇区的百分比
                return `${params.name}: ${params.percent}%`;
            },
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            "textStyle": {
                "color": "#ffffff"  // 标题字体颜色
            },
            show: false
        },
        series: [
            {
                name: '心理测评结果',
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
    const selectValue = ref("心理调查评估问卷")
    //     bigscreenRBChart = echarts.init(bigscreenRBRef.value);
    // bigscreenRBChart.setOption(bigscreenRBoption,true);
    let cePingJieGuoFenXiChart: any = null;
    const cePingJieGuoFenXiRef = ref()
    async function changeSelectValue(value: string) {
        getPingGuJieGuoFenXi({
            type: value
        }).then(res => {
            option.series[0].data = res.data.data.series
            if (cePingJieGuoFenXiChart == null || cePingJieGuoFenXiChart === undefined) {
                cePingJieGuoFenXiChart = echarts.init(cePingJieGuoFenXiRef.value)
            }
            let isShow = false
            res.data.data.series.forEach(item => {
                if (item.value > 0) {
                    isShow = true
                }
            })
            if (isShow) {
                cePingJieGuoFenXiChart.setOption(option, true)
            } else {
                cePingJieGuoFenXiChart.setOption(kongData, true)
            }
            // 如果data为空，则不显示
        })
    }

    const timer = useIntervalFn(() => {
        timer.pause()
        changeSelectValue(selectValue.value).finally(() => {
            timer.resume()
        })
    }, 5000)

    onMounted(() => {
        changeSelectValue(selectValue.value)
    })

    window.addEventListener("resize", () => {
        if (cePingJieGuoFenXiChart != null) {
            cePingJieGuoFenXiChart.resize();
        }
    })

    return {
        selectValue,
        changeSelectValue,
        cePingJieGuoFenXiRef,
        cePingJieGuoFenXiChart
    }
}


export function useCePingJieGuoTongJi() {
    const cePingJieGuoTongJiRef = ref()
    const isShow = ref(false)

    // @ts-expect-error
    let cePingJieGuoTongJiChart;
    const cePingJieGuoTongJiSelect = ref(0)
    const cePingJieGuoTongJiSelectName = ref("")
    function handleSelectCePingJieGuoTongJi(value: string) {
        cePingJieGuoTongJi({
            // xlFangAnId: value
            fangAnName: cePingJieGuoTongJiSelectName.value
        }).then(res => {
            let option = generatePsychChartOption(res.data)
            // @ts-expect-error
            if (cePingJieGuoTongJiChart == null || cePingJieGuoTongJiChart == undefined) {
                cePingJieGuoTongJiChart = echarts.init(cePingJieGuoTongJiRef.value)
            }
            isShow.value = false
            option.series.forEach(item => {
                if (Array.isArray(item.data) && item.data.length > 0) {
                    item.data.forEach(i => {
                        if (i > 0) {
                            isShow.value = true
                        }
                    })
                }
            })
            if (isShow.value) {
                // @ts-expect-error
                cePingJieGuoTongJiChart.setOption(option, true)
            } else {
                // 直接在ecahrt写上暂无数据放在中间
                // @ts-expect-error
                cePingJieGuoTongJiChart.setOption(kongData, true)
            }
        })
    }

    const searchXlFangAnParam = ref({
        pageNum: 1,
        pageSize: 10,
    })
    const selectXlFangAnList = ref({
        data: [],
        total: 0
    })


    function getTongJiSelect() {
        // @ts-expect-error
        xlFangAnList(searchXlFangAnParam.value).then(res => {
            selectXlFangAnList.value.data = res.data.data.rows;
            selectXlFangAnList.value.total = res.data.data.total;
        })
    }

    function loadMoreCePingJieGuoTongJiSelect() {
        if (((searchXlFangAnParam.value.pageNum - 1) * searchXlFangAnParam.value.pageSize) > selectXlFangAnList.value.total) {
            return
        }
        // @ts-expect-error
        xlFangAnList(searchXlFangAnParam.value).then(res => {
            // @ts-expect-error
            selectXlFangAnList.value.data = [...selectXlFangAnList.value.data, ...res.data.data.rows];
            selectXlFangAnList.value.total = res.data.data.total;
            console.log("selectXlFangAnList.value.data", res)
        })
        searchXlFangAnParam.value.pageNum++
    }
    onMounted(() => {
        // getTongJiSelect()
        loadMoreCePingJieGuoTongJiSelect()

        handleSelectCePingJieGuoTongJi("")
    })

    window.addEventListener("resize", () => {
        if (cePingJieGuoTongJiChart != null) {
            cePingJieGuoTongJiChart.resize();
        }
    })
    return {
        handleSelectCePingJieGuoTongJi,
        cePingJieGuoTongJiRef,
        cePingJieGuoTongJiSelect,
        loadMoreCePingJieGuoTongJiSelect,
        selectXlFangAnList,
        cePingJieGuoTongJiChart,
        isShow,
        cePingJieGuoTongJiSelectName
    }
}

function generatePsychChartOption(responseData) {
    // 提取数据
    const data = responseData.data || {};
    const datasets = {
        '心理调查评估': data['心理调查评估问卷'] || {},
        'SDS量表': data['SDS量表'] || {},
        'SAS量表': data['SAS量表'] || {}
    };

    // 主类别（X轴）
    const mainCategories = Object.keys(datasets).filter(name => Object.keys(datasets[name]).length > 0);

    // 子类别按主类别分组
    const subCategoriesByMain = {};
    Object.entries(datasets).forEach(([mainCategory, obj]) => {
        if (Object.keys(obj).length > 0) {
            subCategoriesByMain[mainCategory] = Object.keys(obj);
        }
    });

    // 所有子类别（用于系列）
    const allSubCategories = [...new Set(
        Object.values(datasets)
            .filter(obj => Object.keys(obj).length > 0)
            .flatMap(obj => Object.keys(obj))
    )];

    // 准备系列数据，每个子类别作为一个非堆叠的柱状图系列
    const series = allSubCategories.map(subCategory => ({
        name: subCategory,
        type: 'bar',
        data: mainCategories.map(mainCategory => datasets[mainCategory][subCategory] || 0),
        barGap: 0, // 确保同主类别下的柱子紧挨着,
        // 字体白色
        textStyle: {
            color: '#ffffff'
        }
    }));

    // 如果没有有效数据，返回空图表配置
    if (series.length === 0 || mainCategories.length === 0) {
        return {
            title: {
                text: '心理评估数据分布',
                left: 'center',
                show: false,
                // 字体白色
                textStyle: {
                    color: '#ffffff'
                }
            },
            grid: {
                top: 0,
                left: 10,
                right: 10,
                bottom: 10,
                containLabel: true
            },
            xAxis: { type: 'category', data: [], axisLabel: { color: '#ffffff' } },
            yAxis: { type: 'value', name: '人数', axisLabel: { color: '#ffffff' } },
            series: [],
            tooltip: { show: false },
            legend: { show: false }
        };
    }

    // 自定义 tooltip，只显示当前主类别的子类别
    const tooltipFormatter = (params) => {
        const mainCategory = mainCategories[params[0].dataIndex];
        const relevantSubCategories = subCategoriesByMain[mainCategory] || [];
        let tooltipContent = `<strong>${mainCategory}</strong><br/>`;
        relevantSubCategories.forEach(subCategory => {
            const value = datasets[mainCategory][subCategory] || 0;
            tooltipContent += `${subCategory}: ${value}<br/>`;
        });
        return tooltipContent;
    };

    // 返回 ECharts option 配置
    return {
        title: {
            text: '心理评估数据分布',
            left: 'center',
            show: false,
            textStyle: {
                color: '#ffffff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: tooltipFormatter
        },
        legend: {
            data: allSubCategories,
            top: 0,
            selectedMode: series.length > 1 ? 'multiple' : false,
            show: true,
            icon: "circle", // 圆点
            itemWidth: 8,   // 小圆点直径
            itemHeight: 8,  // 小圆点直径
            textStyle: {
                fontSize: 12, // 字体大小
                color: '#fff'  // 字体颜色白色
            }
        },
        grid: {
            top: 70,
            left: 10,
            right: 10,
            bottom: 5,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: mainCategories,
            axisLabel: {
                rotate: 0,
                interval: 0,
                fontSize: 10,
                color: '#ffffff'
            },
        },
        yAxis: {
            type: 'value',
            name: '人数',
            minInterval: 1,
            axisLabel: {
                color: '#ffffff'
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff'
                }
            }
        },
        series: series
    };
}

export function useRenYuanXingWeiShiBieShuJu() {
    const xwAlarmFormData = ref({
        pageNum: 1,
        pageSize: 100,
        orderColumn: "createTime",
        orderDirection: "descending",
    });
    const xwAlarmlist = ref<any[]>([]);
    const xwAlarmListFun = async () => {
        // @ts-expect-error
        const { data } = await xwAlarmList(xwAlarmFormData.value);
        xwAlarmlist.value = data.data.rows
        console.log("xwAlarmlist.value", xwAlarmlist.value)
    };
    const xwAlarmlistTimer = useIntervalFn(() => {
        xwAlarmlistTimer.pause();
        xwAlarmListFun().finally(() => {
            xwAlarmlistTimer.resume();
        })
    }, 10000)
    onMounted(() => {
        xwAlarmListFun()
    })
    return {
        xwAlarmlist
    }
}

export function useJianCeShuJuTongJi() {
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                // params 是一个数组，柱状图通常只有一个系列，所以取 params[0]
                let item = params[0];
                return item.axisValue + '月: ' + item.data;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: []
            }
        ]
    }
    const jianCeShuJuTongJiRef = ref()
    // @ts-expect-error
    let jianCeShuJuTongJiChart = null;

    const getData = async () => {
        jianCeShuJuTongJi().then(res => {
            // @ts-expect-error
            if (jianCeShuJuTongJiChart == null) {
                jianCeShuJuTongJiChart = echarts.init(jianCeShuJuTongJiRef.value)
            }
            option.xAxis[0].data = res.data.data.xData;
            option.series[0].data = res.data.data.sData;
            jianCeShuJuTongJiChart.setOption(option, true);
        })
    }

    const jianCeShuJuTongJiTimer = useIntervalFn(() => {
        jianCeShuJuTongJiTimer.pause()
        getData().finally(() => {
            jianCeShuJuTongJiTimer.resume()
        })
    }, 5000)


    const jiWeiQuShiBianHuaVis = ref(false)
    let jiWeiQuShiBianHuaVisOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // 文字白色
            axisLabel: {
                color: '#ffffff'
            },
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            axisLabel: {
                color: '#ffffff'
            },
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ],
        grid: {
            left: 30,
            right: 10,
            bottom: 60,
            top: 10
        }
    }
    const jiWeiQuShiBianHuaRef = ref()
    const jiWeiQuShiBianHuaRadio = ref("week")
    const jiWeiQuShiBianHuaInput = ref("")
    // @ts-expect-error
    let jiWeiQuShiBianHuaChart = null
    const jiWeiQuShiBianHuaGet = () => {
        jiWeiQuShiBianHua({ dayType: jiWeiQuShiBianHuaRadio.value, seatNumber: jiWeiQuShiBianHuaInput.value }).then(res => {
            jiWeiQuShiBianHuaVisOption.xAxis.data = res.data.data.xData;
            jiWeiQuShiBianHuaVisOption.series[0].data = res.data.data.sData;
            let show = false;
            if (Array.isArray(jiWeiQuShiBianHuaVisOption.series[0].data) && jiWeiQuShiBianHuaVisOption.series[0].data.length > 0) {
                jiWeiQuShiBianHuaVisOption.series[0].data.forEach(item => {
                    if (item > 0) {
                        show = true
                    }
                })
            }
            if (!show) {
                jiWeiQuShiBianHuaVisOption.yAxis.min = 0
                jiWeiQuShiBianHuaVisOption.yAxis.max = 5
            } else {
                jiWeiQuShiBianHuaVisOption.yAxis.min = null
                jiWeiQuShiBianHuaVisOption.yAxis.max = null
            }
            // @ts-expect-error
            if (jiWeiQuShiBianHuaChart == null) {
                jiWeiQuShiBianHuaChart = echarts.init(jiWeiQuShiBianHuaRef.value)
            }
            // @ts-expect-error
            jiWeiQuShiBianHuaChart.setOption(jiWeiQuShiBianHuaVisOption, true);
        })
    }

    const jiWeiQuShiBianHuaChangeRadio = () => {
        jiWeiQuShiBianHuaGet()
    }


    const jiWeiQuShiBianHuaOpen = () => {
        jiWeiQuShiBianHuaVis.value = true
        jiWeiQuShiBianHuaGet()
    }

    const jiWeiQuShiBianHuaClose = () => {
        jiWeiQuShiBianHuaVis.value = false
        jiWeiQuShiBianHuaChart = null
    }


    onMounted(() => {
        getData()
    })

    window.addEventListener("resize", () => {
        if (jianCeShuJuTongJiChart != null) {
            jianCeShuJuTongJiChart.resize();
        }
    })

    return {
        jianCeShuJuTongJiRef,
        jiWeiQuShiBianHuaOpen,
        jiWeiQuShiBianHuaVis,
        jiWeiQuShiBianHuaInput,
        jiWeiQuShiBianHuaRef,
        jiWeiQuShiBianHuaClose,
        jiWeiQuShiBianHuaRadio,
        jiWeiQuShiBianHuaChangeRadio,
        jiWeiQuShiBianHuaGet,
        jianCeShuJuTongJiChart
    }

}

export function useJiWeiBaoJingZhanBi() {
    let option = {
        title: {
            text: '机位报警占比',
            left: 'center',
            "textStyle": {
                "color": "#ffffff"  // 标题字体颜色
            },
            show: false
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                // params.percent 是该扇区的百分比
                return `${params.name}: ${params.percent}%`;
            },
            // 白色文字
            textStyle: {
                // color: '#ffffff'
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            "textStyle": {
                "color": "#ffffff"  // 标题字体颜色
            },
            show: false
        },
        series: [
            {
                name: '机位报警占比',
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
                },
                textStyle: {
                    color: '#ffffff'
                },
                label: {
                    color: '#fff',   // ✅ 设置标签文字为白色
                    fontSize: 14
                },
                labelLine: {
                    lineStyle: {
                        color: '#fff'  // ✅ 如果连线也要白色，可以加上这个
                    }
                }
            }
        ]
    }

    const rbRadio = ref("week")
    // @ts-expect-error
    let jiWeiBaoJingZhanBiChart = null;
    let jiWeiBaoJingZhanBiRef = ref()
    async function getJiWeiAlarm() {
        jiWeiBaoJingZhanBi({
            dayType: rbRadio.value
        }).then(res => {
            option.series[0].data = res.data.data.series
            if (jiWeiBaoJingZhanBiChart == null || jiWeiBaoJingZhanBiChart === undefined) {
                jiWeiBaoJingZhanBiChart = echarts.init(jiWeiBaoJingZhanBiRef.value)
            }
            jiWeiBaoJingZhanBiChart.setOption(option, true)
        })
    }
    function changeRbRadio() {
        getJiWeiAlarm()
    }
    const jiWeiBaoJingZhanBiTimer = useIntervalFn(() => {
        jiWeiBaoJingZhanBiTimer.pause()
        getJiWeiAlarm().finally(() => {
            jiWeiBaoJingZhanBiTimer.resume();
        })
    }, 5000)
    onMounted(() => {
        getJiWeiAlarm()
    })
    window.addEventListener("resize", () => {
        if (jiWeiBaoJingZhanBiChart != null) {
            jiWeiBaoJingZhanBiChart.resize();
        }
    })
    return {
        jiWeiBaoJingZhanBiRef,
        rbRadio,
        changeRbRadio,
        jiWeiBaoJingZhanBiChart
    }
}