import IMember from "./IMember";

export interface IRoom{
    id: number;
    name: string;
    capacity: number;
    code: number;
    budget: number;
    startDate: number;
    endDate: number;
    owner: {
      id: number;
      username: string;
      email: string;
      password: string;
    };
    members: IMember[];
}

export default IRoom;