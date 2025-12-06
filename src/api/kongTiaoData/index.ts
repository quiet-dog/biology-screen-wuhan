import http from "../../utils/http";


export interface KongTiaoDataDTO {
    kongTiaoDataId?: number;
    deviceSn?: string;
    zhiBanGongKuanYaLiSheDing?: number;
    zhiBanGongKuanFengLiangSheDing?: number;
    fengFaWenDingZhuangTai?: number;
    faWeiFanKuan?: number;
    qiangZhiFaWeiSheDing?: number;
    qiangZhiMoShiKaiGuan?: number;
    pidKongZhiJiFenXiShu?: number;
    pidKongZhiBiLiXiShu?: number;
    fengLiangFanKuan?: number;
    fangJianShiJiYaLi?: number;
    gongKuangMoShi?: string;
    shuangGongKuangQieHuanShiJian?: number;
    fengLiangSheDing?: number;
    yaLiSheDing?: number;
    deviceType?: string;
    huiFengJiShouZiDong?: string;
    huiFengJiGuZhang?: string;
    huiFengJiYunXing?: string;
    huiFengMiBiKaiGuanKongZhi?: string;
    huiFengMiBiGuanDaoWei?: string;
    huiFengMiBiKaiDaoWei?: string;
    huiFengJiQiTing?: string;
    yuanXinFengKouZengJiaXinFengFaKaiGuanKongZhi?: string;
    zengJiaXinFengKouXinFengFaKaiGuanKongZhi?: string;
    yuanXinFengKouZengJiaXinFengFaGuanDaoWei?: string;
    zengJiaXinFengKouXinFengFaGuanDaoWei?: string;
    yuanXinFengKouZengJiaXinFengFaKaiDaoWei?: string;
    zengJiaXinFengKouXinFengFaKaiDaoWei?: string;
    moShiQieHuan?: string;
    gongKuangQieHuan?: string;
    huiFengJiPinLvFanKuan?: string;
    paiFengFaZhiGuanFengFaFanKuan?: string;
    createTime?: string; // 或 Date
}

export function getKongTiaoDataFirst(deviceSn: string) {
    return http.get(`/manage/kongTiaoDevice/getKongTiaoDataFirst`, {
        params: {
            deviceSn
        }
    })
}