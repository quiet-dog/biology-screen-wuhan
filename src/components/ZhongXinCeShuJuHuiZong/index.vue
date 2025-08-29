<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";
// @ts-expect-error
import Vue3SeamlessScroll from "../../package/vue3-seamless-scroll/packages/Vue3SeamlessScroll.vue";
import { ref } from "vue";
const props = defineProps<{
    type: string,
    address: string,
    url: string
}>()

const urls = reactive(["http://192.168.1.141:9200", "http://192.168.1.141:9200", "http://192.168.1.141:9200"])

const tableList = ref([{
    source: '北京',
    description: '123',
    createTime: '2025-04-01 12:00:00',
},
{
    source: '武汉',
    description: '123',
    createTime: '2025-04-01 12:00:00',
},
{
    source: '123',
    description: '123',
    createTime: '2025-04-01 12:00:00',
},
])

const timer = useIntervalFn(async() => {
    timer.pause()
    for(let i=0;i<urls.length;i++){
        const res = await axios.get(urls[i] + "/api/manage/event", {
            headers: {
                "Authorization": "Bearer MASTER_TOKEN_123456"
            },
            timeout: 3000,
            params: {
                pageNum: 1,
                pageSize: 1,
                orderColumn: 'createTime',
                orderType: 'desc'
            }
        })
        
        if (res.status === 200) {
            if (Array.isArray(res.data.data.rows) && res.data.data.rows.length > 0) {
                tableList.value[i].createTime = res.data.data.rows[0].createTime
                tableList.value[i].description = res.data.data.rows[0].description
            }
        }
    }
    
  
    timer.resume()

}, 2000)

</script>

<template>
    <div class="title_box">
        <div class="title_box_content">
            <img src="/public/img/光标.png" alt="" />
            <span>监测设备状态</span>
        </div>
    </div>
    <div class="table_box">
        <div class="table_box_column">
            <span>数据来源</span>
            <span>数据描述</span>
            <span>时间</span>
        </div>
        <div class="table_box_content">
            <Vue3SeamlessScroll :visibleCount="5" :list="tableList" :step="1":singleHeight="70" hover>
                <template v-slot="{ data }">
                    <div class="table_box_content_item">
                        <span>
                            <el-tooltip :content="data.source" placement="top">
                                <span>{{ data.source }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.description" placement="top">
                                <span>{{ data.description }}</span>
                            </el-tooltip>
                        </span>
                        <span>
                            <el-tooltip :content="data.createTime" placement="top">
                                <span>{{ data.createTime }}</span>
                            </el-tooltip>
                        </span>
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
    flex-direction: column;
    flex: 1;


    .table_box_column {
        width: 100%;
        // 让下面的span均匀分布
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: adaptiveHeight(5) adaptiveWidth(20);
        background: url("/public/img/equipment/tabletop.png") no-repeat;
        background-size: 100% 100%;

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
}


.table_box_content_item span {
    text-align: center; // 文字居中
    white-space: nowrap; // 不换行
    overflow: hidden; // 超出隐藏
    text-overflow: ellipsis; // 超出显示省略号
}

// 可选：如果最左最右 span 不需要占剩余空间
.table_box_content_item span:first-child {
    text-align: left;
    flex: 1; // 每个 span 占等宽
}

.table_box_content_item span:nth-child(2) {
    // font-size: adaptiveFontSize(10);
    flex: 3;
}

.table_box_content_item span:last-child {
    text-align: right;
    flex: 1; // 每个 span 占等宽
}

.table_box_column span {
    text-align: center; // 文字居中
}

.table_box_column span:nth-child(2) {
    flex: 3;
}

.table_box_column span:first-child {
    flex: 1; // 每个 span 占等宽
    text-align: left;
}

.table_box_column span:last-child {
    flex: 1; // 每个 span 占等宽
    text-align: right;
}
</style>