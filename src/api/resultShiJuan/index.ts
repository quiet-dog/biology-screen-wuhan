import http from "../../utils/http";
import { AddResultShiJuanReq, ResultShiJuanListReq, SetGanYu, SetResult, ShiJuanListReq, UpdateResultShiJuanReq } from "./types";

//获取工艺节点信息
export function resultShiJuanList(params: ResultShiJuanListReq) {
  return http.get(`/manage/resultShiJuan`, {
    params: params
  });
}

export function addResultShiJuan(data: AddResultShiJuanReq) {
  return http.post("/manage/resultShiJuan", {
    data
  })
}

export function setResultShiJuan(data: SetResult) {
  return http.post("/manage/resultShiJuan/setResult", {
    data
  })
}

export function setResultGanYu(data: SetGanYu) {
  return http.post("/manage/resultShiJuan/setGanYu", {
    data
  })
}

export function updateResultShiJuan(id: number, data: UpdateResultShiJuanReq) {
  return http.put("/manage/resultShiJuan/" + id, {
    data: data
  })
}

export function getResultShiJuan(data: number) {
  return http.get(`/manage/resultShiJuan/` + data)
}


export function getShiJuan(params: ShiJuanListReq) {
  return http.get(`/manage/resultShiJuan/shiJuanList`, {
    params
  })
}

export function resultShiJuanListByCreator(params: ResultShiJuanListReq) {
  return http.get(`/manage/resultShiJuan/listByCreator`, {
    params: params
  });
}


export function resultShiJuanListByUser(params: ResultShiJuanListReq) {
  return http.get(`/manage/resultShiJuan/listByUser`, {
    params: params
  });
}


export function exportResultShiJuanByCreator(params: ResultShiJuanListReq) {
  return http.get(
    "/manage/resultShiJuan/excelByCreator",
    {
      params,
      responseType: "blob"

    },
  );
}

export function exportResultShiJuanByUser(params: ResultShiJuanListReq) {
  return http.get(
    "/manage/resultShiJuan/excelByUser",
    {
      params,
      responseType: "blob"

    },
  );
}


export function getResultNum(fangAnId: number) {
  return http.get("/manage/resultShiJuan/getResultNum/" + fangAnId)
}


export function getPingGuJieGuoFenXi(data: {
  type?: string
}) {
  return http.post("/manage/resultShiJuan/pingGuJieGuoFenXi", data)
}

export function cePingJieGuoTongJi(data: {
  xlFangAnId: number
}) {
  return http.post("/manage/resultShiJuan/cePingJieGuoTongJi", data)
}