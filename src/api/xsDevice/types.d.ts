export interface AddXsDeviceReq {
  deviceSn: string;
  name: string;
  area: string;
}

export interface UpdateXsDeviceReq extends AddXsDeviceReq {
  xsDeviceId: number
}

export interface XsDeviceListReq {
  deviceSn?: string;
  area?: string;
}

export interface XsDeviceRow extends UpdateXsDeviceReq {

}