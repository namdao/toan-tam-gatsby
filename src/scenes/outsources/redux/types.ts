export type IResOutSourceType = Record<string, IOutSource[]>;

export type IOutSource = {
  id: number;
  group: string;
  max_select: number;
  name: string;
};
