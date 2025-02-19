import { User } from '@models/User';

export class Program {
  public id: number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public status: string;
  public users: User[];
  public admin: number;
  constructor() {
  }
}
