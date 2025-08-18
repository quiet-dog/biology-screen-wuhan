import http from "../../utils/http";
import { AddXsDeviceReq, XsDeviceListReq } from "./types";

export function xsDeviceList(params: XsDeviceListReq) {
  return http.get(`/manage/xsDevice`, {
    params: params
  });
}

export function addXsDevice(data: AddXsDeviceReq) {
  return http.post("/manage/xsDevice", {
    data
  })
}
