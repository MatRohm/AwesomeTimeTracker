import Nedb from 'nedb';
import { ArgumentUtility } from './Arguments/ArgumentUtility';

export class NedbService {
  public static GetDefault(): NedbService {
    if (this.s_workItemInstance == null) {
      const workItemDatabase = new Nedb('./awesomeTimeTracker.db');
      this.s_workItemInstance = new NedbService(workItemDatabase);
      workItemDatabase.loadDatabase();
    }

    return this.s_workItemInstance;
  }

  private static s_workItemInstance: NedbService;

  private _database: Nedb;

  public constructor(nedb: Nedb) {
    ArgumentUtility.CheckDefined('nedb', nedb);

    this._database = nedb;
    this._database.loadDatabase();
  }

  public find(query: object,
              onSucces: (documents: object[]) => void,
              onError?: (errror: Error) => void): void {
    ArgumentUtility.CheckDefinedAndIsObjectLiteral('query', query);
    ArgumentUtility.CheckDefined('onSucces', onSucces);

    const results = this._database.find(query);
    results.limit(10);
    results.exec((error, docs) => {
      if (error) {
        if (onError) {
          onError(error);
        } else {
          throw error;
        }
      } else {
        onSucces(docs);
      }
    });
  }

  public insert(item: object): void {
    ArgumentUtility.CheckDefinedAndIsObjectLiteral(item);

    this._database.insert();
  }
}
