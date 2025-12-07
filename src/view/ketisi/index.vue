<template>
    <div class="bigscreen_lt">
        <div class="bigscreen_lt_top">
            <div class="bigscreen_lt_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>监测设备状态</span>
            </div>
        </div>
        <div class="bigscreen_lt_bottom">
            <div class="bigscreen_lt_bottom_nei_t">
                <span>设备编号</span>
                <span>所属区域</span>
                <span>状态</span>
            </div>
            <div class="bigscreen_lt_bottomnei">
                <Vue3SeamlessScroll :key="jianCeListTotal" :list="jianCeList" :singleHeight="70" class="scrool">

                    <template v-slot="{ data }">
                        <div class="bigscreen_lt_bottom_nei">
                            <div>
                                <ElTooltip :content="data?.name">
                                    <span>{{ data?.name }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.area">
                                    <span>{{ data?.area }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.isOnlineStr">
                                    <span>{{ data?.isOnlineStr }}</span>
                                </ElTooltip>
                            </div>
                        </div>
                    </template>

                </Vue3SeamlessScroll>
            </div>
        </div>
    </div>
    <div class="bigscreen_lc">
        <div class="bigscreen_lc_top">
            <div class="bigscreen_lc_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>采集设备状态</span>
            </div>
        </div>
        <div class="bigscreen_lc_bottom">
            <div class="bigscreen_lc_bottom_nei_t">
                <span>设备编号</span>
                <span>所属区域</span>
                <span>状态</span>
            </div>
            <div class="bigscreen_lc_bottomnei">
                <Vue3SeamlessScroll :key="caiYangListTotal" :list="caiYangList" :step="1" :singleHeight="70" hover
                    class="scrool">
                    <template v-slot="{ data }">
                        <div class="bigscreen_lc_bottom_nei">
                            <div>
                                <ElTooltip :content="data?.name">
                                    <span>{{ data?.name }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.area">
                                    <span>{{ data?.area }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.isOnlineStr">
                                    <span>{{ data?.isOnlineStr }}</span>
                                </ElTooltip>
                            </div>
                        </div>
                    </template>
                </Vue3SeamlessScroll>
            </div>
        </div>
    </div>
    <div class="bigscreen_lb">
        <div class="bigscreen_lb_top">
            <div class="bigscreen_lb_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>消杀设备状态</span>
            </div>
        </div>
        <div class="bigscreen_lb_bottom">
            <div class="bigscreen_lb_bottom_nei_t">
                <span>设备名称</span>
                <span>所属区域</span>
                <span>状态</span>
            </div>
            <div class="bigscreen_lb_bottomnei">
                <Vue3SeamlessScroll :key="xsListTotal" :list="xsList" :step="1" :singleHeight="70" hover class="scrool">
                    <template v-slot="{ data }">
                        <div class="bigscreen_lb_bottom_nei">
                            <div>
                                <ElTooltip :content="data?.name">
                                    <span>{{ data?.name }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.area">
                                    <span>{{ data?.area }}</span>
                                </ElTooltip>
                                <ElTooltip :content="data?.isOnlineStr">
                                    <span>{{ data?.isOnlineStr }}</span>
                                </ElTooltip>
                            </div>
                        </div>
                    </template>
                </Vue3SeamlessScroll>
            </div>
        </div>
    </div>
    <center></center>
    <div class="bigscreen_rt">
        <div class="bigscreen_rt_top">
            <div class="bigscreen_rt_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>监测设备统计</span>
            </div>
        </div>
        <div class="bigscreen_rt_bottom" ref="jianCeRef">
        </div>
    </div>
    <div class="bigscreen_rc">
        <div class="bigscreen_rc_top">
            <div class="bigscreen_rc_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>采集设备统计</span>
            </div>
            <div class="bigscreen_rc_top_r">
            </div>
        </div>
        <div class="bigscreen_rc_bottom">
            <div class="bigscreen_rc_bottom_nei" ref="caiYangRef">
            </div>
        </div>
    </div>
    <div class="bigscreen_rb">
        <div class="bigscreen_rb_top">
            <div class="bigscreen_rb_top_l">
                <img src="/public/img/光标.png" alt="" />
                <span>消杀设备统计</span>
            </div>
        </div>
        <div class="bigscreen_rb_bottom" ref="xsDeviceRef">

        </div>
    </div>




</template>

<script lang="ts" setup>
import center from "../../components/center.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { useCaiYangDeviceStatus, useJianCeDeviceStatus, useXsDeviceStatus } from "./other.tsx";

const { caiYangList, caiYangRef, caiYangListTotal } = useCaiYangDeviceStatus()
const { xsList, xsDeviceRef, xsListTotal } = useXsDeviceStatus()
const { jianCeList, jianCeRef, jianCeListTotal } = useJianCeDeviceStatus()



</script>

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

.rb_dialog {
    width: adaptiveWidth(350);
    height: adaptiveHeight(270);
    position: absolute;
    top: 0;
    left: - adaptiveWidth(350);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
}

.rb_dialog_top {
    width: 100%;
    height: adaptiveHeight(45);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rb_dialog_top_x {
        position: absolute;
        right: adaptiveWidth(7);
    }

    span {
        font-family: youshe;
        font-size: adaptiveFontSize(20);
        color: #ffffff;
        padding-left: adaptiveWidth(15);
    }
}

.rb_dialog_bottom {
    height: adaptiveHeight(225);
}

.rb_dialog_bottom_echart {
    width: adaptiveWidth(350);
    ;
    height: adaptiveHeight(225);
}

.yzInput {
    position: relative;
    left: adaptiveWidth(20);
    top: adaptiveHeight(5);
}

.bigscreen_rb_top_l_rg {
    margin-left: adaptiveWidth(260);
}

.pickerCss {

    width: adaptiveWidth(155);
    height: adaptiveHeight(24);
    border: 1px solid rgba(227, 233, 243, 0.2);
    border-radius: 5px;
    margin-right: adaptiveWidth(11);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: adaptiveWidth(6);
    left: - adaptiveWidth(20);

    span {
        color: #ffffff;
        font-size: adaptiveFontSize(10);
        font-family: unset !important;
        font-weight: 100 !important;
    }
}



.bigscreen_lt,
.bigscreen_lc,
.bigscreen_lb,
.bigscreen_rt,
.bigscreen_rc,
.bigscreen_rb {
    width: adaptiveWidth(443);
    height: adaptiveHeight(292);
}

.bigscreen_lt {
    position: absolute;
    top: adaptiveHeight(91);
    left: adaptiveWidth(26);

    .bigscreen_lt_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        background-size: 110% 110%;
        display: flex;
        align-items: center;

        .bigscreen_lt_top_l {
            display: flex;
            align-items: center;

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

    .bigscreen_lt_bottom {
        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 adaptiveWidth(10);

        .bigscreen_lt_bottom_nei_t {
            width: 100%;
            height: adaptiveHeight(30);
            margin-top: adaptiveHeight(15);
            background: url("/public/img/equipment/tabletop.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                width: 25%;
                color: #9eabb7;
                font-size: adaptiveFontSize(14);
                text-align: center;
                font-size: adaptiveFontSize(12);

            }
        }

        .bigscreen_lt_bottomnei {
            overflow: hidden;
            height: adaptiveHeight(251);
            width: 100%;

            .bigscreen_lt_bottom_nei {
                display: flex;
                // justify-content: center;
                align-items: center;
                padding: 0 adaptiveWidth(10);

                div {
                    width: 100%;
                    height: adaptiveHeight(39);
                    display: flex;
                    align-items: center;
                    //   gap: adaptiveWidth(40);

                    &:nth-child(2) {
                        margin: adaptiveHeight(18) 0;
                    }

                    span {
                        color: white;

                        &:nth-child(1) {
                            font-size: adaptiveFontSize(12);
                            color: #ffffff;
                            padding: 0 0 0 adaptiveWidth(20);
                            width: adaptiveWidth(165);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                        }

                        &:nth-child(2) {
                            font-size: adaptiveFontSize(12);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                            width: adaptiveWidth(150);
                        }

                        &:nth-child(3) {
                            // font-family: youshe;
                            font-size: adaptiveFontSize(12);
                            margin: auto;
                        }
                    }
                }
            }
        }
    }
}

.bigscreen_lc {
    position: absolute;
    top: adaptiveHeight(395);
    left: adaptiveWidth(26);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bigscreen_lc_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        background-size: 110% 110%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bigscreen_lc_top_l {
            display: flex;
            align-items: center;

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

    .bigscreen_lc_bottom {
        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 adaptiveWidth(10);


        .bigscreen_lc_bottom_nei_t {
            width: 100%;
            height: adaptiveHeight(30);
            margin-top: adaptiveHeight(15);
            background: url("/public/img/equipment/tabletop.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                width: 25%;
                color: #9eabb7;
                font-size: adaptiveFontSize(14);
                text-align: center;
                font-size: adaptiveFontSize(12);

            }
        }

        .bigscreen_lc_bottomnei {
            overflow: hidden;
            height: adaptiveHeight(251);
            width: 100%;

            .bigscreen_lc_bottom_nei {
                display: flex;
                // justify-content: center;
                align-items: center;
                padding: 0 adaptiveWidth(10);

                div {
                    width: 100%;
                    height: adaptiveHeight(39);
                    display: flex;
                    align-items: center;
                    //   gap: adaptiveWidth(40);

                    &:nth-child(2) {
                        margin: adaptiveHeight(18) 0;
                    }

                    span {
                        color: white;

                        &:nth-child(1) {
                            font-size: adaptiveFontSize(12);
                            color: #ffffff;
                            padding: 0 0 0 adaptiveWidth(20);
                            width: adaptiveWidth(165);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                        }

                        &:nth-child(2) {
                            font-size: adaptiveFontSize(12);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                            width: adaptiveWidth(150);
                        }

                        &:nth-child(3) {
                            // font-family: youshe;
                            font-size: adaptiveFontSize(12);
                            margin: auto;
                        }
                    }
                }
            }
        }
    }
}

.bigscreen_lb {
    position: absolute;
    bottom: adaptiveHeight(85);
    left: adaptiveWidth(26);

    .bigscreen_lb_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        background-size: 110% 110%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bigscreen_lb_top_l {
            display: flex;
            align-items: center;

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

    .bigscreen_lb_bottom {

        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 adaptiveWidth(10);

        .bigscreen_lb_bottom_nei_t {
            width: 100%;
            height: adaptiveHeight(30);
            margin-top: adaptiveHeight(15);
            background: url("/public/img/equipment/tabletop.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                width: 25%;
                color: #9eabb7;
                font-size: adaptiveFontSize(14);
                text-align: center;
                font-size: adaptiveFontSize(12);
            }
        }

        .bigscreen_lb_bottomnei {
            overflow: hidden;
            height: adaptiveHeight(251);
            width: 100%;

            .bigscreen_lb_bottom_nei {
                display: flex;
                // justify-content: center;
                align-items: center;
                padding: 0 adaptiveWidth(10);

                div {
                    width: 100%;
                    height: adaptiveHeight(39);
                    display: flex;
                    align-items: center;
                    //   gap: adaptiveWidth(40);

                    &:nth-child(2) {
                        margin: adaptiveHeight(18) 0;
                    }

                    span {
                        color: white;

                        &:nth-child(1) {
                            font-size: adaptiveFontSize(12);
                            color: #ffffff;
                            padding: 0 0 0 adaptiveWidth(20);
                            width: adaptiveWidth(165);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                        }

                        &:nth-child(2) {
                            font-size: adaptiveFontSize(12);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                            width: adaptiveWidth(150);
                        }

                        &:nth-child(3) {
                            // font-family: youshe;
                            font-size: adaptiveFontSize(12);
                            margin: auto;
                        }
                    }
                }
            }
        }
    }
}

.bigscreen_rt {
    position: absolute;
    top: adaptiveHeight(91);
    right: adaptiveWidth(26);

    .bigscreen_rt_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        background-size: 110% 110%;
        display: flex;
        align-items: center;

        .bigscreen_rt_top_l {
            display: flex;
            align-items: center;

            img {
                margin-left: adaptiveWidth(11);
            }

            span {
                font-weight: 600;
                font-size: adaptiveFontSize(16);
                text-align: center;
                font-style: normal;
                text-transform: none;
                min-width: adaptiveWidth(120);
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

    .bigscreen_rt_bottom {
        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .bigscreen_rt_bottom_nei_t {
            width: 100%;
            height: adaptiveHeight(30);
            margin-top: adaptiveHeight(15);
            background: url("/public/img/equipment/tabletop.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                width: 25%;
                color: #9eabb7;
                font-size: adaptiveFontSize(14);
                text-align: center;
            }
        }

        .bigscreen_rt_bottomnei {
            overflow: hidden;
            height: adaptiveHeight(251);
            width: 100%;

            .bigscreen_rt_bottom_nei {
                display: flex;
                // justify-content: center;
                align-items: center;
                padding: 0 adaptiveWidth(10);

                div {
                    width: 100%;
                    height: adaptiveHeight(39);
                    display: flex;
                    align-items: center;
                    //   gap: adaptiveWidth(40);

                    &:nth-child(2) {
                        margin: adaptiveHeight(18) 0;
                    }

                    span {
                        color: white;

                        &:nth-child(1) {
                            font-size: adaptiveFontSize(12);
                            color: #ffffff;
                            padding: 0 0 0 adaptiveWidth(0);
                            width: adaptiveWidth(100);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                            text-align: center;

                        }

                        &:nth-child(2) {
                            font-size: adaptiveFontSize(12);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                            /* 超出部分显示省略号 */
                            width: adaptiveWidth(100);
                            text-align: center;
                        }

                        &:nth-child(3) {
                            // font-family: youshe;
                            font-size: adaptiveFontSize(12);
                            margin: auto;
                            text-align: center;
                        }

                        &:nth-child(4) {
                            margin-left: adaptiveWidth(4);
                            white-space: nowrap;
                            /* 不换行 */
                            overflow: hidden;
                            /* 超出隐藏 */
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }
    }
}


.bigscreen_rc {
    position: absolute;
    top: adaptiveHeight(395);
    right: adaptiveWidth(26);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bigscreen_rc_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        background-size: 110% 110%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .bigscreen_rc_top_l {
            display: flex;
            align-items: center;

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

        .bigscreen_rc_top_r {
            margin-right: adaptiveWidth(11);
        }
    }

    .bigscreen_rc_bottom {
        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;

        .bigscreen_rc_bottom_nei {
            width: adaptiveWidth(407);
            height: 100%;
            margin: 0 auto;

            .bigscreen_rc_bottom_nei_t {
                width: 100%;
                height: adaptiveHeight(30);
                margin-top: adaptiveHeight(15);
                background: url("/public/img/equipment/tabletop.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    width: 33%;
                    color: #9eabb7;
                    font-size: adaptiveFontSize(14);
                    text-align: center;
                }
            }

            .bigscreen_rc_bottom_b {
                width: 100%;
                height: adaptiveHeight(200);
                overflow: hidden;

                .bigscreen_rc_bottom_nei_b {
                    width: 100%;
                    height: adaptiveHeight(33);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: adaptiveHeight(5);
                    cursor: pointer;

                    span {
                        width: 33%;
                        color: #ffffff;
                        font-size: adaptiveFontSize(12);
                        text-align: center;
                    }
                }

                .bigscreen_rc_bottom_nei_active {
                    width: 100%;
                    height: adaptiveHeight(33);
                    background: url("/public/img/equipment/tableactive.png") no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: adaptiveHeight(5);
                    cursor: pointer;

                    span {
                        width: 33%;
                        color: #58a4cb;
                        font-size: adaptiveFontSize(12);
                        text-align: center;
                        position: relative;

                        &:nth-child(1) {
                            img {
                                position: absolute;
                                width: adaptiveWidth(18);
                                height: adaptiveHeight(17);
                                left: adaptiveWidth(25);
                            }
                        }
                    }
                }
            }
        }
    }
}

.bigscreen_rb {
    position: absolute;
    bottom: adaptiveHeight(85);
    right: adaptiveWidth(26);

    .bigscreen_rb_top {
        width: 100%;
        height: adaptiveHeight(40);
        background: url("/public/img/背景-上层(1).gif") no-repeat;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-size: 110% 110%;

        .bigscreen_rb_top_l {
            display: flex;
            align-items: center;

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

        .bigscreen_rb_top_r {
            display: flex;
            align-items: center;
            margin-right: adaptiveWidth(11);
        }
    }

    .bigscreen_rb_bottom {
        width: 100%;
        height: adaptiveHeight(251);
        margin-top: adaptiveHeight(5);
        background: url("/public/img/背景下层.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: adaptiveWidth(99);
            height: adaptiveHeight(211);
        }

        .bigscreen_rb_bottom_r {
            width: adaptiveWidth(290);
            height: adaptiveHeight(211);
            margin-left: adaptiveWidth(15);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .bigscreen_rb_bottom_r_t {
                width: 100%;
                height: adaptiveHeight(30);
                background: url("/public/img/equipment/tabletop.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    width: 33%;
                    color: #9eabb7;
                    font-size: adaptiveFontSize(14);
                    text-align: center;
                }
            }

            .bigscreen_rb_bottom_r_b {
                width: 100%;
                height: adaptiveHeight(171);
                overflow: hidden;
            }

            .bigscreen_rb_bottom_r_nei {
                width: 100%;
                height: adaptiveHeight(35);
                background: rgba(4, 30, 62);
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: adaptiveHeight(10);
                cursor: pointer;

                .bigscreen_rb_bottom_r_neis {
                    width: 33%;

                    &:nth-child(1) {
                        color: #ffffff;
                        font-size: adaptiveFontSize(12);
                        display: flex;
                        align-items: center;
                    }

                    &:nth-child(2),
                    &:nth-child(3) {
                        text-align: center;
                    }
                }
            }
        }
    }
}

.rcDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: adaptiveHeight(400);
    right: adaptiveWidth(480);
    z-index: 10;

    .rcDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-family: youshe;
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rcDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(200);
        margin: adaptiveHeight(10) auto;

        img {
            width: adaptiveWidth(99);
            height: adaptiveHeight(99);
        }

        .rcDialog_bottoml {
            height: adaptiveHeight(200);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div {
                margin-left: adaptiveWidth(20);

                &:nth-child(1) {
                    margin-top: 0;
                }

                span {
                    font-size: adaptiveFontSize(14);

                    &:nth-child(1) {
                        color: #687f92;
                    }

                    &:nth-child(2) {
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.rtDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: adaptiveHeight(100);
    right: adaptiveWidth(480);
    z-index: 10;

    .rtDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
            font-family: youshe;
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rtDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(215);
        margin-left: adaptiveWidth(10);
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;

        .rtDialog_bottom_video {
            :deep(#container) {
                width: adaptiveWidth(420);
                height: adaptiveHeight(215);
                object-fit: cover;
            }

            object-fit: cover;
        }

        // :deep(.rtDialog_bottom_video) {
        //   #container[data-v-39551662] {
        //     width: adaptiveWidth(420);
        //     height: adaptiveHeight(215);
        //     object-fit: cover;
        //   }
        //   object-fit: cover;
        // }
        img {
            width: 100%;
            height: adaptiveHeight(195);
        }

        div {
            font-size: adaptiveFontSize(14);
            color: #ffffff;
        }
    }
}

.rbDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: adaptiveHeight(90);
    right: adaptiveWidth(480);
    z-index: 10;

    .rbDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-family: youshe;
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rbDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(200);
        margin: adaptiveHeight(10) auto;

        img {
            width: adaptiveWidth(99);
            height: adaptiveHeight(99);
        }

        .rbDialog_bottoml {
            height: adaptiveHeight(200);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div {
                margin-left: adaptiveWidth(20);

                &:nth-child(1) {
                    margin-top: 0;
                }

                span {
                    font-size: adaptiveFontSize(14);

                    &:nth-child(1) {
                        color: #687f92;
                    }

                    &:nth-child(2) {
                        color: #ffffff;
                    }
                }
            }
        }
    }
}

.rctDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: adaptiveHeight(400);
    right: adaptiveWidth(480);
    z-index: 10;

    .rctDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-family: youshe;
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rctDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(150);
        margin: adaptiveHeight(10) auto;
    }

    .rctDialog_content {}
}




.ltDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: adaptiveHeight(100);
    left: adaptiveWidth(480);
    z-index: 10;

    .rctDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-family: youshe;
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rctDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(200);
        margin: adaptiveHeight(10) auto;
    }
}



.rzDialog {
    width: adaptiveWidth(440);
    height: adaptiveHeight(280);
    background: url("/public/img/弹窗背景.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: adaptiveHeight(100);
    right: adaptiveWidth(480);
    z-index: 10;

    .rctDialog_top {
        width: 100%;
        height: adaptiveHeight(45);
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-family: youshe;
            font-size: adaptiveFontSize(20);
            color: #ffffff;
            padding-left: adaptiveWidth(15);
        }

        img {
            width: adaptiveWidth(8);
            height: adaptiveHeight(8);
            padding-right: adaptiveWidth(10);
            cursor: pointer;
        }
    }

    .rctDialog_bottom {
        width: adaptiveWidth(420);
        height: adaptiveHeight(200);
        margin: adaptiveHeight(10) auto;
    }
}


:deep(.cascaderCss) {
    width: adaptiveWidth(200);
    height: adaptiveHeight(24);
    margin-right: adaptiveWidth(11);

    .el-input__wrapper {
        background: none;
        height: adaptiveHeight(24);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
    }
}

:deep(.selectcss) {
    .el-select__wrapper {
        background-color: transparent !important;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
    }

    .el-select__placeholder {
        color: rgba(255, 255, 255, 0.6) !important;
    }

    .el-select__selected-item {
        color: rgba(255, 255, 255, 0.6) !important;
    }
}

.inputcss {
    --el-fill-color-blank: transparent !important;
    // --el-border-color:transparent !important;
    width: adaptiveWidth(148);
    height: adaptiveHeight(24);
    margin-right: adaptiveWidth(11);
    // margin-left: adaptiveWidth(200);
    --el-text-color-placeholder: white;
    --el-input-text-color: white;
}

// .inputcss :deep(.el-input__wrapper) {
//     background-color: rgba(255, 255, 255, 0);
//     border: 1px solid rgba(255, 255, 255, 0.2);
//     box-shadow: none;
//     font-size: adaptiveFontSize(12);
// }

.scroll {
    height: adaptiveHeight(195);
    width: 100%;
    overflow: hidden;
}

.yzRadio {
    position: relative;
    top: adaptiveHeight(5);
}


.cssRadio {
    float: right;
    margin-right: adaptiveWidth(10);
    margin-top: adaptiveHeight(6);
    // position: relative;
    // top: adaptiveHeight(5);
}

.group :deep(.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) + .el-radio-button__inner) {
    background: rgba(255, 255, 255, 0.8);
    color: rgba(7, 36, 57, 1);
    border-color: rgba(255, 255, 255, 0);
    font-size: adaptiveFontSize(12);
}

.group :deep(.el-radio-button .el-radio-button__inner) {
    padding: 2px 8px;
    background: rgba(255, 255, 255, 0);
    border-color: rgba(255, 255, 255, 0);
    font-size: adaptiveFontSize(12);
    border-radius: 2px;
}


.single-line-ellipsis {
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 溢出隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
}

.labelClassName {}

.resultDetailCss {
    --el-fill-color-blank: transparent !important;
    --el-text-color-primary: white !important;
}

.inputcssright {
    --el-fill-color-blank: transparent !important;

    height: adaptiveHeight(24);
    margin-right: adaptiveWidth(11);
    margin-left: adaptiveWidth(180);
}

.rctDialog_content_inputcss {
    margin-left: adaptiveWidth(20);
    margin-top: adaptiveHeight(5);
}
</style>
