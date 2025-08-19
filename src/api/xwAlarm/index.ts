import http from "../../utils/http";
import { AddXwAlarmReq, XwAlarmListReq } from "./types";

export function xwAlarmList(params: XwAlarmListReq) {
  return http.get(`/manage/xwAlarm`, {
    params: params
  });
}

export function addXwAlarm(data: AddXwAlarmReq) {
  return http.post("/manage/xwAlarm", {
    data
  })
}

export function jiWeiBaoJingZhanBi(params: {
  dayType?: string
}) {
  return http.get("/manage/xwAlarm/jiWeiBaoJingZhanBi", {
    params
  })
}


export function jianCeShuJuTongJi() {
  return http.get("/manage/xwAlarm/jianCeShuJuTongJi")
}

export function jiWeiQuShiBianHua(data: {
  dayType?: string;
  seatNumber: string;
}) {
  return http.get("/manage/xwAlarm/jiWeiQuShiBianHua", {
    params: data
  })
}



