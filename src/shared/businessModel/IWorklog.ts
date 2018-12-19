export interface IWorklog {
  startDate: Date;
  endDate: Date;

  getWorkedTimeInSeconds(): number;
}
