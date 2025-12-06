import http from "../../utils/http";

export function getKongTiaoDeviceList(params: any) {
    return http.get(`/manage/kongTiaoDevice`, {
        params
    })
}