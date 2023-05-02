export type IColor = {
  group: string;
  id: number;
  max_select: number;
  print_type_name: string;
  isNew?: boolean;
};
export type IResPrintType = {
  color: IColor[];
};

export type IReqPrintType = {
  name: string;
  group: string;
};
