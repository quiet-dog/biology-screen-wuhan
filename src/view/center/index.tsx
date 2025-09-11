import { reactive, ref } from "vue";

export function useAllCity() {
    const leftConfig = reactive([
        {
            type: "中心测数据汇总",
            Url: "http://192.168.0.11",
            address: "北京",
            component: markRaw(defineAsyncComponent(() => import("../../components/ZhongXinCeShuJuHuiZong/index.vue")))
        },
        {
            type: "细节处理",
            Url: "http://192.168.1.141:9200",
            address: "北京",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue")))
        },
        {
            type: "细节处理",
            Url: "http://192.168.1.141:9200",
            address: "武汉",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue")))
        },


    ])

    const rightConfig = reactive([
        {
            type: "细节处理",
            Url: "http://192.168.1.141:9200",
            address: "长春",
            component: markRaw(defineAsyncComponent(() => import("../../components/XiJie/index.vue")))
        },
        {
            type: "人体生命数据数据",
            Url: "http://192.168.1.141:9200",
            address: "哈兽研",
            component: markRaw(defineAsyncComponent(() => import("../../components/RenTiXiJie/index.vue")))
        },
        {
            type: "浓度数据",
            Url: "http://192.168.1.141:9200",
            address: "建研院",
            component: markRaw(defineAsyncComponent(() => import("../../components/NongDuXiJie/index.vue")))
        },
        {
            type: "阀门数据",
            Url: "http://192.168.1.141:9200",
            address: "建研院",
            component: markRaw(defineAsyncComponent(() => import("../../components/FaMenXiJie/index.vue")))
        },
    ])

    return {
        leftConfig,
        rightConfig
    }
}