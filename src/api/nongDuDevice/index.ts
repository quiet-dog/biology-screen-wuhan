import http from "../../utils/http";

export function nongDuDeviceList(params: any) {
    return http.get(`/manage/nongDuDevice`, {
        params: params
    });
}

export function getJcOnlineCount() {
    return http.get("/manage/nongDuDevice/getOnlineCount")
}