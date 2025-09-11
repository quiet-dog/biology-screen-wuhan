<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";
// @ts-expect-error
import Vue3SeamlessScroll from "../../package/vue3-seamless-scroll/packages/Vue3SeamlessScroll.vue";
import { ref } from "vue";

const { type = "", address = "", url = "" } = defineProps<{
    type: string,
    address: string,
    url: string
}>()

const tableList = ref([
])

const key = ref(false)

const timer = useIntervalFn(async () => {
    timer.pause()
    const res = await axios.get(url + "/api/manage/smData", {
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
            tableList.value = res.data.data.rows
            key.value = true
        }
    }
    timer.resume()
}, 5000)

onMounted(() => {

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
        <!-- <div class="table_box_column">
            <span>设备SN号</span>
            <span>操作员</span>
            <span>心率</span>
            <span>体温</span>
            <span>时间</span>
        </div> -->
        <div class="table_box_content">
            <Vue3SeamlessScroll :key="key" :list="tableList" :step="1" :direction="'up'" hover>
                <template v-slot="{ data }">
                    <div class="table_box_content_item">
                        <div class="personnel_info">
                            <span>
                                <el-tooltip :content="data?.personnelName" placement="top">
                                    <span>{{ data?.personnelName }}</span>
                                </el-tooltip>
                            </span>
                            <span>
                                <el-tooltip :content="data?.code" placement="top">
                                    <span>{{ data?.code }}</span>
                                </el-tooltip>
                            </span>
                        </div>
                        <div class="personnel_renti">
                            <el-descriptions class="personnel_renti_descriptions" :column="2">
                                <el-descriptions-item label="体温">
                                    {{ data?.temp }}°C
                                </el-descriptions-item>
                                <el-descriptions-item label="心率">
                                    {{ data?.xinlv }}/分
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions class="personnel_renti_descriptions">
                                <el-descriptions-item label="时间">
                                    {{ data?.createTime }}
                                </el-descriptions-item>
                            </el-descriptions>
                        </div>
                        <!-- <span>
                            <el-tooltip :content="data.deviceSn" placement="top">
                                <span>{{ data.deviceSn }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.personnelName" placement="top">
                                <span>{{ data.personnelName }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.xinlv" placement="top">
                                <span>{{ data.xinlv }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.temp" placement="top">
                                <span>{{ data.temp }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.createTime" placement="top">
                                <span>{{ data.createTime }}</span>
                            </el-tooltip>
                        </span> -->
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
    height: 100%;
    margin-top: adaptiveHeight(5);
    background: url("/public/img/背景下层.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    flex: 1;


    // .table_box_column {
    //     width: 100%;
    //     // 让下面的span均匀分布
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     box-sizing: border-box;
    //     padding: adaptiveHeight(5) adaptiveWidth(20);
    //     background: url("/public/img/equipment/tabletop.png") no-repeat;
    //     background-size: 100% 100%;

    // }

    .table_box_content {
        // height: calc(100% - adaptiveHeight(40));
        flex: 1;
        min-height: 0; // 允许内部 swiper 收缩
        overflow: hidden; // 或 auto
        width: 100%;
        height: 100%;
        padding: adaptiveHeight(5) adaptiveWidth(20);
        box-sizing: border-box;
    }
}


.table_box_content_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: url("./img/特质指标.png") no-repeat;
    height: adaptiveHeight(60);
    background-size: 100% 100%;
    width: 100%;
    padding-left: adaptiveWidth(10);
}


.personnel_info {
    width: adaptiveWidth(70);
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: adaptiveFontSize(12);
    text-align: center;
    // 下面的内容都向右对齐
    // 文字超出省略号隐藏
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    gap: 2px;
}

.personnel_info>span:nth-child(1) {
    box-sizing: border-box;
    margin: 0 adaptiveWidth(5);
    border: 0.85px solid transparent;
    /* 背景渐变 */
    background:#126760;
    background-blend-mode: screen;
    box-shadow: inset 0px 0px 5.09px 0px #126760;

    /* 裁成五边形 */
    clip-path: polygon(
        0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%
    );
}

.personnel_info>span:nth-child(1)::before {
    content: "";
    position: absolute;
    inset: 0; /* 填满父元素 */
    padding: 0.85px; /* 边框宽度 */
    // background:#126760;
    background-blend-mode: screen;

    clip-path: polygon(
        0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%
    );

    -webkit-mask: polygon(
        0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%
    );
    -webkit-mask-composite: destination-out;
    mask: polygon(
        0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%
    );
    mask-composite: exclude;
    pointer-events: none; /* 不挡住鼠标 */
    z-index: -1;
}

.personnel_renti {
    flex: 1;
}

.personnel_renti_descriptions {
    --el-border-color-lighter: transparent;
    --el-text-color-primary: white;
    --el-fill-color-blank: transparent;
    --el-text-color-regular: white;
}


// .table_box_content_item span {
//     text-align: center; // 文字居中
//     white-space: nowrap; // 不换行
//     overflow: hidden; // 超出隐藏
//     text-overflow: ellipsis; // 超出显示省略号
//     flex: 1;

// }

// // 可选：如果最左最右 span 不需要占剩余空间
// .table_box_content_item span:first-child {
//     text-align: left;
//     flex: 1; // 每个 span 占等宽
// }



// .table_box_content_item span:last-child {
//     text-align: right;
//     flex: 1; // 每个 span 占等宽
// }

// .table_box_column span {
//     text-align: center; // 文字居中
//     flex: 1;
// }


// .table_box_column span:first-child {
//     flex: 1; // 每个 span 占等宽
//     text-align: left;
// }

// .table_box_column span:last-child {
//     flex: 1; // 每个 span 占等宽
//     text-align: right;
// }</style>