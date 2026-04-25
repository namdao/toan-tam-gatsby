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
  GiayDau = "Giấy Dầu",
  KhongThamDau = "Không Thấm Dầu",
  Nhua = "Nhựa",
  Null = "Null",
  Giay = "Giấy",
  GiayNen = "Giay nen",
  GiayAnh = "Giấy Ảnh",
  MyThuat = "Mỹ Thuật",
}
export type IPaperTabs = {
  value: string;
  label: string;
  /** Explicit keyword list for paper name matching. When defined, these are
   *  used instead of splitting `value` by "-". */
  keywords?: string[];
};
export const PAPER_TABS: IPaperTabs[] = [
  {
    value: "Bristol-Couche",
    label: "Bristol - Couche",
  },
  // {
  //   value: "Sticker",
  //   label: "Sticker - Nhãn dán",
  // },
  {
    value: "Decal",
    label: "Decal (New)",
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
    value: "MT",
    label: "Mỹ thuật",
    keywords: ["Mỹ Thuật", "My Thuat"],
  },
  {
    value: "other",
    label: "Khác",
  },
];
