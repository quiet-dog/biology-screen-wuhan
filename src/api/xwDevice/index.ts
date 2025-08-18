import http from "../../utils/http";
import { AddXwDeviceReq, XwDeviceListReq } from "./types";

export function xwDeviceList(params: XwDeviceListReq) {
  return http.get(`/manage/xwDevice`, {
    params: params
  });
}

export function addXwDevice(data: AddXwDeviceReq) {
  return http.post("/manage/xwDevice", {
    data
  })
}




