import { Tag } from "./tag.enum";

export type ExcuseType = {
  http_code: number;
  message: string;
  tag: Tag;
};
