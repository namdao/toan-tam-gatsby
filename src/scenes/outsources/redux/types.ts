export type IResOutSourceType = Record<string, IOutSource[]>;

export type IOutSource = {
  id: number;
  group: string;
  max_select: number;
  name: string;
  isNew?: boolean;
};

export type IReqAddOutSource = {
  name: string;
  group: string;
};

export type IResAddOutOSource = IOutSource[];
