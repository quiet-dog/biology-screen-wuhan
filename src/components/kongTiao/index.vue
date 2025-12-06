<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core";
import { ElDescriptions } from 'element-plus';
import { getKongTiaoDataFirst, KongTiaoDataDTO } from "../../api/kongTiaoData";

const { type = "", address = "", url = "", link = "", deviceSn = "" } = defineProps<{
    type?: string,
    address?: string,
    url?: string,
    link?: string,
    deviceSn?: string
}>()

const deviceInfo = ref<KongTiaoDataDTO>({
    deviceSn: "",
    zhiBanGongKuanYaLiSheDing: 0,
    zhiBanGongKuanFengLiangSheDing: 0,
    fengFaWenDingZhuangTai: 0,
    faWeiFanKuan: 0,
    qiangZhiFaWeiSheDing: 0,
    qiangZhiMoShiKaiGuan: 0,
    pidKongZhiJiFenXiShu: 0,
    fengLiangFanKuan: 0,
    fangJianShiJiYaLi: 0,
    gongKuangMoShi: "",
    shuangGongKuangQieHuanShiJian: 0,
    fengLiangSheDing: 0,
    yaLiSheDing: 0,
    deviceType: "",
    huiFengJiShouZiDong: "",
    huiFengJiGuZhang: "",
    huiFengJiYunXing: "",
    huiFengMiBiKaiGuanKongZhi: "",
    huiFengMiBiGuanDaoWei: "",
    huiFengMiBiKaiDaoWei: "",
    huiFengJiQiTing: "",
    yuanXinFengKouZengJiaXinFengFaKaiGuanKongZhi: "",
    zengJiaXinFengKouXinFengFaKaiGuanKongZhi: "",
    yuanXinFengKouZengJiaXinFengFaGuanDaoWei: "",
    zengJiaXinFengKouXinFengFaGuanDaoWei: "",
    yuanXinFengKouZengJiaXinFengFaKaiDaoWei: "",
    zengJiaXinFengKouXinFengFaKaiDaoWei: "",
    moShiQieHuan: "",
    gongKuangQieHuan: "",
    huiFengJiPinLvFanKuan: "",
    paiFengFaZhiGuanFengFaFanKuan: "",
    createTime: "",
})

const tableList = ref([])

const key = ref(false)
const total = ref(0)

const timer = useIntervalFn(async () => {
    timer.pause()

    getKongTiaoDataFirst(deviceSn).then(res => {
        deviceInfo.value = res.data.data
    })
    timer.resume()
}, 5000)

onMounted(() => {

})

</script>

<template>
    <div class="title_box">
        <div class="title_box_content">
            <img src="/public/img/光标.png" alt="" />
            <span style="cursor: pointer;">
                {{ address }}
            </span>
        </div>
    </div>
    <div class="table_box">
        <div class="table_box_content">
            <el-scrollbar height="100%">
                <ElDescriptions   class="my-descriptions" title="" :column="2">
                    <!-- 大写冒号 -->
                    <ElDescriptionsItem label="设备SN号: ">
                        {{ deviceInfo.deviceSn }}123
                    </ElDescriptionsItem>
                    <ElDescriptionsItem label="设备名称: ">
                        {{ address }}
                    </ElDescriptionsItem>
                    <ElDescriptionsItem label="时间: ">
                        {{ deviceInfo.createTime }}
                    </ElDescriptionsItem>
                    <template v-if="type == '空调'">
                        <ElDescriptionsItem label="值班工况压力设定值: ">
                            {{ deviceInfo.zhiBanGongKuanYaLiSheDing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="值班工况风量设定值: ">
                            {{ deviceInfo.zhiBanGongKuanFengLiangSheDing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="风阀稳定状态标志位: ">
                            {{ deviceInfo.fengFaWenDingZhuangTai }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="阀位反馈: ">
                            {{ deviceInfo.faWeiFanKuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="强制阀位的设定值: ">
                            {{ deviceInfo.qiangZhiFaWeiSheDing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="强制模式开关: ">
                            {{ deviceInfo.qiangZhiMoShiKaiGuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="PID控制积分系数: ">
                            {{ deviceInfo.pidKongZhiJiFenXiShu }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="PID控制比例系数: ">
                            {{ deviceInfo.pidKongZhiBiLiXiShu }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="风量反馈: ">
                            {{ deviceInfo.fengLiangFanKuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="房间实际压力: ">
                            {{ deviceInfo.fangJianShiJiYaLi }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="工况模式: ">
                            {{ deviceInfo.gongKuangMoShi }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="双工况切换时间: ">
                            {{ deviceInfo.shuangGongKuangQieHuanShiJian }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="风量的设定值: ">
                            {{ deviceInfo.fengLiangSheDing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="压力的设定值: ">
                            {{ deviceInfo.yaLiSheDing }}
                        </ElDescriptionsItem>

                    </template>

                    <template v-else>
                        <ElDescriptionsItem label="回风机手自动: ">
                            {{ deviceInfo.huiFengJiShouZiDong }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风机故障: ">
                            {{ deviceInfo.huiFengJiGuZhang }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风机运行: ">
                            {{ deviceInfo.huiFengJiYunXing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风密闭阀-开关控制: ">
                            {{ deviceInfo.huiFengMiBiKaiGuanKongZhi }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风密闭阀-关到位: ">
                            {{ deviceInfo.huiFengMiBiGuanDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风密闭阀-开到位: ">
                            {{ deviceInfo.huiFengMiBiKaiDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风机启停: ">
                            {{ deviceInfo.huiFengJiQiTing }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="原新风口增加新风阀-开关控制: ">
                            {{ deviceInfo.yuanXinFengKouZengJiaXinFengFaKaiGuanKongZhi }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="增加新风口新风阀-开关控制: ">
                            {{ deviceInfo.zengJiaXinFengKouXinFengFaKaiGuanKongZhi }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="原新风口增加新风阀-关到位: ">
                            {{ deviceInfo.yuanXinFengKouZengJiaXinFengFaGuanDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="增加新风口新风阀-关到位: ">
                            {{ deviceInfo.zengJiaXinFengKouXinFengFaGuanDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="原新风口增加新风阀-开到位: ">
                            {{ deviceInfo.yuanXinFengKouZengJiaXinFengFaKaiDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="增加新风口新风阀-开到位: ">
                            {{ deviceInfo.zengJiaXinFengKouXinFengFaKaiDaoWei }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="模式切换: ">
                            {{ deviceInfo.moShiQieHuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="工况切换: ">
                            {{ deviceInfo.gongKuangQieHuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="回风机频率反馈: ">
                            {{ deviceInfo.huiFengJiPinLvFanKuan }}
                        </ElDescriptionsItem>
                        <ElDescriptionsItem label="排风阀支管风阀反馈: ">
                            {{ deviceInfo.paiFengFaZhiGuanFengFaFanKuan }}
                        </ElDescriptionsItem>
                    </template>

                </ElDescriptions>
            </el-scrollbar>
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


  

    .table_box_content {
        // height: calc(100% - adaptiveHeight(40));
        flex: 1;
        min-height: 0; // 允许内部 swiper 收缩
        overflow: hidden; // 或 auto
        width: 100%;
        padding: adaptiveHeight(5) adaptiveWidth(0);
        padding-left: adaptiveWidth(10);
        box-sizing: border-box;
    }
}

.my-descriptions {
    --el-fill-color-light: transparent !important;
    --el-fill-color-blank: transparent !important;
    --el-text-color-primary: white !important;
    --el-text-color-regular: white !important;
}
</style>