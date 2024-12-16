import { Tag } from "./tag.enum";

export type Excuse = {
  http_code: number;
  message: string;
  tag: Tag;
};
