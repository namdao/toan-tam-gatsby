export type IResPaperType = {
  id: number;
  paper_code: string;
  paper_name: string;
  isNew?: boolean;
};

export type IPaperType = IResPaperType;

export type IReqPaper = {
  code: string;
  name: string;
};
