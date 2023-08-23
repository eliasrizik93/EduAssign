export type User = {
  id: number;
  name: string;
  time: Date;
  unreadMessages: number;
  lastMessage: string;
  iconImage: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
}
