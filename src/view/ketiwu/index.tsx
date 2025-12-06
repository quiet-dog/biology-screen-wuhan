import { reactive, ref } from "vue";
import { getKongTiaoDeviceList } from "../../api/kongTiaoDevice";

export function useAllCity() {
    const beiJing = "https://" + location.hostname + ":7677/#/home"
    const wuhan = "https://" + location.hostname + ":27677/#/home"
    const changChun = "https://" + location.hostname + ":17677/#/home"

    const beiJingUrl = "https://" + location.hostname + ":7677"
    const wuhanUrl = "https://" + location.hostname + ":27677"
    const changChunUrl = "https://" + location.hostname + ":17677"

    const leftConfig = ref([
        // {
        //     type: "中心侧数据汇总",
        //     Url: beiJingUrl,
        //     address: "北京",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: beiJing
        // },
        // {
        //     type: "细节处理",
        //     Url: beiJingUrl,
        //     address: "北京",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: beiJing
        // },
        // {
        //     type: "细节处理",
        //     Url: wuhanUrl,
        //     address: "武汉",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: wuhan
        // },

    ])

    const rightConfig = ref([
        // {
        //     type: "细节处理",
        //     Url: changChunUrl,
        //     address: "长春",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: changChun
        // },
        // {
        //     type: "人体生命数据数据",
        //     Url: wuhanUrl,
        //     address: "中国农业科学院哈尔滨兽医研究所",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: wuhan
        // },
        // {
        //     type: "浓度数据",
        //     Url: wuhanUrl,
        //     address: "中国疾控预防控制中心",
        //     component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
        //     link: wuhan
        // },
    ])

    onMounted(() => {
        getKongTiaoDeviceList({
            pageSize: 10,
            pageNum: 1,
        }).then(res => {
            if (Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
                res.data.data.rows.forEach((item: any) => {
                    leftConfig.value.push({
                        type: item.deviceType,
                        Url: "",
                        address: item.area,
                        deviceSn: item.deviceSn,
                        component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
                        link: ""
                    })
                })
            }
        })

        getKongTiaoDeviceList({
            pageSize: 10,
            pageNum: 2,
        }).then(res => {
            if (Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
                res.data.data.rows.forEach((item: any) => {
                    rightConfig.value.push({
                        type: item.deviceType,
                        Url: "",
                        address: item.area,
                        deviceSn: item.deviceSn,
                        component: markRaw(defineAsyncComponent(() => import("../../components/kongTiao/index.vue"))),
                        link: ""
                    })
                })
            }
        })

    })

    return {
        leftConfig,
        rightConfig
    }
}