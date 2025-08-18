import http from "../../utils/http";
import { AddSmDataReq, SmDataListReq } from "./types";

//获取工艺节点信息
export function smDataList(params: SmDataListReq) {
  return http.get(`/manage/smData`, {
    params: params
  });
}

export function addSmData(data: AddSmDataReq) {
  return http.post("/manage/smData", {
    data
  })
}

export function getSmData(data: number) {
  return http.get(`/manage/smData/` + data)
}

export function exportSmData(params: SmDataListReq) {
  return http.get(
    "/manage/smData/excel",
    {
      params,
      responseType: "blob"

    },
  );
}