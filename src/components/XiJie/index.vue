<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";
// @ts-expect-error
import Vue3SeamlessScroll from "../../package/vue3-seamless-scroll/packages/Vue3SeamlessScroll.vue";
import { ref } from "vue";
import 北京 from "./img/北京图标.png";
import 武汉 from "./img/武汉图标.png";
import 长春 from "./img/长春图标.png";

const { type = "", address = "", url = "" } = defineProps<{
    type: string,
    address: string,
    url: string
}>()

const tableList = ref([{
    description: "123",
    createTime: "2025-04-01 12:00:00"
},
{
    description: "123",
    createTime: "2025-04-01 12:00:00"
},
])

const key = ref(false)

const timer = useIntervalFn(async () => {
    timer.pause()
    const res = await axios.get(url + "/api/manage/event", {
        headers: {
            "Authorization": `Bearer MASTER_TOKEN_123456`
        },
        params: {
            pageNum: 1,
            pageSize: 10,
            orderColumn: "createTime",
            orderType: "desc"
        }
    })
    if (res.status === 200) {
        if (Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
            // console.log(res.data.data.rows)
            tableList.value = res.data.data.rows
            key.value = true
            console.log("==============", tableList.value)
        }
    }
    timer.resume()
}, 5000)

function getImgUrl() {
    if (address === "北京") {
        return 北京
    } else if (address === "武汉") {
        return 武汉
    } else if (address === "长春") {
        return 长春
    }
}



onMounted(() => {
    axios.get(url + "/api/manage/event", {
        headers: {
            "Authorization": `Bearer MASTER_TOKEN_123456`
        },
        params: {
            pageNum: 1,
            pageSize: 10,
            orderColumn: "createTime",
            orderType: "desc"
        }
    }).then(res => {
        if (res.status === 200) {
            if (Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
                key.value = true
                tableList.value = res.data.data.rows
            }
        }
    })
})

</script>

<template>
    <div class="title_box">
        <div class="title_box_content">
            <img src="/public/img/光标.png" alt="" />
            <span>{{ address }}</span>
        </div>
    </div>
    <div class="table_box">
        <div class="table_box_left">
            <img :src="getImgUrl()" alt="" srcset="">
            <span>{{ address }}</span>
        </div>
        <div class="table_box_content">
            <Vue3SeamlessScroll :key="key" :list="tableList" :step="1" :direction="'up'" hover>
                <template v-slot="{ data }">
                    <div class="table_box_content_item">

                        <!-- <span>
                            <el-tooltip :content="data.description" placement="top">
                                <span>{{ data.description }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.createTime" placement="top">
                                <span>{{ data.createTime }}</span>
                            </el-tooltip>
                        </span> -->

                        <el-tooltip :content="data.description" placement="top">
                            {{ data.description }}
                        </el-tooltip>
                    </div>
                </template>
            </Vue3SeamlessScroll>
        </div>
    </div>
</template>
<style lang="scss" scoped>
$design-width: 1920;
$design-height: 1080;

@function adaptiveWidth($px) {
    @return #{$px / $design-width * 100}vw;
}

@function adaptiveHeight($px) {
    @return #{$px / $design-height * 100}vh;
}

@function adaptiveFontSize($px) {
    @return #{$px / $design-width * 100}vw;
}


.title_box {
    width: 100%;
    background: url("/public/img/背景-上层(1).gif") no-repeat;
    background-size: 110% 110%;
    display: flex;
    align-items: center;
    height: adaptiveHeight(40);
    box-sizing: border-box;


    .title_box_content {
        display: flex;
        align-items: center;
        height: adaptiveHeight(40);


        img {
            margin-left: adaptiveWidth(11);
        }

        span {
            font-weight: 600;
            font-size: adaptiveFontSize(16);
            text-align: center;
            font-style: normal;
            text-transform: none;
            background: linear-gradient(to bottom,
                    #c7e5fd 42%,
                    #3582c7 100%);
            /* 渐变背景 */
            background-clip: text;
            /* 让背景应用到文本 */
            -webkit-text-fill-color: transparent;
            /* 使文本颜色透明 */
            padding-left: adaptiveWidth(10);
        }
    }
}


.table_box {
    width: 100%;
    height: adaptiveHeight(251);
    margin-top: adaptiveHeight(5);
    background: url("/public/img/背景下层.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    flex: 1;


    .table_box_left {
        width: adaptiveWidth(120);
        height: adaptiveHeight(100);
        align-self: center;
        justify-content: center;
        text-align: center;
        font-family: "youshe";
        font-size: adaptiveFontSize(26);

        img {
            width: 100%;
            height: 100%;
        }

        span {
            /* 上下渐变文字 */
            background: linear-gradient(to bottom, #ffffff, #006fd0);
            /* 上红下蓝，可换颜色 */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            display: inline-block;
        }
    }

    .table_box_content {
        // height: calc(100% - adaptiveHeight(40));
        flex: 1;
        min-height: 0; // 允许内部 swiper 收缩
        overflow: hidden; // 或 auto
        width: 100%;
        padding: adaptiveHeight(5) adaptiveWidth(20);
        box-sizing: border-box;
    }
}


.table_box_content_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: url("./img/工艺要素文案背景.png") no-repeat;
    height: adaptiveHeight(50);
    width: 100%;
    // 文字超出省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: adaptiveFontSize(10);
    box-sizing: border-box;
    padding-left: adaptiveWidth(5);
    // 上下居中
    align-items: center;
    // justify-content: center;
    margin-bottom: adaptiveHeight(5);
}


// .table_box_content_item span {
//     text-align: center; // 文字居中
//     white-space: nowrap; // 不换行
//     overflow: hidden; // 超出隐藏
//     text-overflow: ellipsis; // 超出显示省略号
// }

// // 可选：如果最左最右 span 不需要占剩余空间
// .table_box_content_item span:first-child {
//     text-align: left;
//     flex: 1; // 每个 span 占等宽
// }



// .table_box_content_item span:last-child {
//     text-align: right;
//     flex: 1; // 每个 span 占等宽
// }</style>