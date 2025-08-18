import http from "../../utils/http";
import { AddSmDeviceReq, GetSmThresholdRes, SetSmThreshold, SmDeviceListReq } from "./types";

//获取工艺节点信息
export function smDeviceList(params: SmDeviceListReq) {
  return http.get(`/manage/smDevice`, {
    params: params
  });
}

export function addSmDevice(data: AddSmDeviceReq) {
  return http.post("/manage/smDevice", {
    data
  })
}

export function getSmThreshold(id: number) {
  return http.get("/manage/smDevice/getThreshold/" + id)
}

export function setSmThrehold(data: SetSmThreshold) {
  return http.post("/manage/smDevice/setThreshold", {
    data
  })
}


export function exportSmDevice(params: SmDeviceListReq) {
  return http.get(
    "/manage/smDevice/excel",
    {
      params,
      responseType: "blob"
    },
  );
}
