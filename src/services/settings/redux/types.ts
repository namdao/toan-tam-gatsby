export type IResCityDistrictWard = {
  id: number;
  name: string;
  address_type: "quan";
  splug: string;
  parent_id: number;
  wards: IResCityDistrictWard[];
};
export type IResCity = {
  id: 10958;
  name: "TP Hồ Chí Minh";
  address_type: "thanh-pho";
  slug: "ho-chi-minh";
  parent_id: null;
  districts: IResCityDistrictWard[];
};
