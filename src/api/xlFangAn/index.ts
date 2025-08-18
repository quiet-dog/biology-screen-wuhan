import http from "../../utils/http";

import { AddXlFangAnReq, XlFangAnListReq } from "./types";

export function xlFangAnList(params: XlFangAnListReq) {
  return http.get(`/manage/xlFangAn`, {
    params: params
  });
}

export function addXlFangAn(data: AddXlFangAnReq) {
  return http.post("/manage/xlFangAn", {
    data
  })
}


export function getXiLiGroup() {
  return http.get<string[]>(`/manage/xlFangAn/getDeptGroup`, {
  });
}




