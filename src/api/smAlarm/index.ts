import http from "../../utils/http";

export function getLiShiYiChangPaiMing() {
    return http.get(`/manage/smAlarm/getLiShiYiChangPaiMing`);
}


export function getBaoJingCiShuTongJiByRecentWeek() {
    return http.get("/manage/smAlarm/getBaoJingCiShuTongJiByRecentWeek")
}

export function getDayExceptionCount() {
    return http.get("/manage/smAlarm/getDayExceptionCount")
}
