import http from "../../utils/http";

export function jianCeDeviceList(params: any) {
    return http.get(`/manage/jianCeDevice`, {
        params: params
    });
}

export function getJcDeviceOnlineCount() {
    return http.get("/manage/jianCeDevice/getOnlineCount")
}