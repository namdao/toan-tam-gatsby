import { IResponseType } from "constant/commonType";
import { useAppDispatch } from "store";
import { apiGetInfoHochiminhCity, apiGetCity } from "../redux/api";
import { cityActions, IDistrict, IWard } from "../redux/city.slice";
import { IResCity, IResCityDistrictWard } from "../redux/types";

function getDistrictsAndWard(city: IResCity): {
  listWards: IWard[] | [];
  listDistricts: IDistrict[] | [];
} {
  const districts = city?.districts || [];
  const listWards: IWard[] = [];
  const listDistricts: IDistrict[] = [];
  districts.map((val) => {
    listDistricts.push({
      label: val?.name,
      id: val?.id,
    });
    listWards.push({
      id: val?.id,
      wards: val?.wards,
    });
    return { listDistricts, listWards };
  });
  return { listDistricts, listWards };
}
export const useCity = () => {
  const dispatch = useAppDispatch();
  const getDataCity = async () => {
    const result: IResponseType<IResCity> = await apiGetInfoHochiminhCity();
    if (result.data) {
      const { listWards, listDistricts } = getDistrictsAndWard(result.data);
      dispatch(cityActions.setListDistrictSuccess(listDistricts));
      dispatch(cityActions.setListWardSuccess(listWards));
    }
  };
  const getAllCity = async () => {
    const result: IResponseType<IResCityDistrictWard[]> = await apiGetCity();
    if (result.data) {
      dispatch(cityActions.setListCitySuccess(result.data));
    }
  };
  return { getDataCity, getAllCity };
};
