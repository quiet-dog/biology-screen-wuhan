import http from "../../utils/http";

//获取维修记录列表
export interface equipmentRepairListRes {
  equipmentCode: string;
  pageNum: number;
  pageSize: number;
  orderColumn: string;
  orderDirection: string;
}
export function equipmentRepairList(params: equipmentRepairListRes) {
  return http.get("/manage/equipment-repair", { params });
}
//获取日常巡检记录列表
export interface dailyInspectionRes {
  pageNum: number;
  pageSize: number;
  orderColumn: string;
  orderDirection: string;
}

export interface CiShu {
  startTime: string;
  endTime: string;
}
export function dailyInspectionList(params: dailyInspectionRes) {
  return http.get("/manage/equipment-daily-inspection", {
    params,
  });
}

export function dailyCishuInspectionList(params: CiShu) {
  return http.get("/manage/equipment-daily-inspection/getCishu", {
    params,
  });
}

//获取设备档案列表
export interface equipmentListRes {
  equipmentName: string;
  pageNum: number;
  pageSize: number;
  orderColumn: string;
  orderDirection: string;
}
export function equipmentList(params: equipmentListRes) {
  return http.get("/manage/equipment", { params });
}

//获取设备数据历史统计
export interface historicalStatisticsRes {
  thresholdId: number;
}
export function historicalStatisticsList(params: historicalStatisticsRes) {
  return http.get("/manage/equipment-data/history", { params });
}

// 获取运行时长
export function getRunningTime(id: number) {
  return http.get("/manage/threshold/runTime/" + id);
}

export function getAllTime(id: number) {
  return http.get("/manage/equipment-data/totalTime", {
    params: {
      equipmentId: id
    }
  });
}

//维修统计分析
export interface repairStatisticsRes {
  dayType: string;
}
export function repairStatistics(params: repairStatisticsRes) {
  return http.get("/manage/equipment-repair/repair-record-count-by-time", {
    params,
  });
}
