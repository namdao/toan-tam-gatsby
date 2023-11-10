export enum PAPER_NAME_TABS {
  Bristol = "Bristol",
  Couche = "Couche",
  Duplex = "Duplex",
  Ivory = "Ivory",
  Fort = "Fort",
  MyThuat = "Mỹ Thuật",
  Decal = "Decal",
  Other = "Khác",
}

export enum PAPER_OTHERS {
  CanDiamond = "Can Diamond",
  Carton = "Carton",
  GiayAnh = "Giấy Ánh",
  GiayDau = "Giấy Dầu",
  KhongThamDau = "Không Thấm Dầu",
  Kraft = "Kraft",
  Nhua = "Nhựa",
  Null = "Null",
}
export type IPaperTabs = {
  value: string;
  label: string;
};
export const PAPER_TABS = [
  {
    value: "Bristol-Couche",
    label: "Bristol - Couche",
  },
  {
    value: "Sticker",
    label: "Sticker - Nhãn dán",
  },
  {
    value: "Fort-Kraft",
    label: "Fort - Kraft",
  },
  {
    value: "Ivory-Duplex",
    label: "Ivory - Duplex",
  },
  {
    value: "Other",
    label: "Giấy khác - Mỹ thuật",
  },
];
