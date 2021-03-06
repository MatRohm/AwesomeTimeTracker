import Nedb from 'nedb';
import { ArgumentUtility } from './Arguments/ArgumentUtility';

export class NedbService {
  public static getDefault(): NedbService {
    if (this.s_workItemInstance == null) {
      const workItemDatabase = new Nedb('./awesomeTimeTracker.db');
      workItemDatabase.loadDatabase();
      this.s_workItemInstance = new NedbService(workItemDatabase);
    }

    return this.s_workItemInstance;
  }

  private static s_workItemInstance: NedbService;

  private _database: Nedb;

  public constructor(nedb: Nedb) {
    ArgumentUtility.checkDefined('nedb', nedb);

    this._database = nedb;
    this._database.loadDatabase();
  }

  public find(query: object): Promise<any[]> {
    return new Promise((resolve, reject) => {
      ArgumentUtility.checkDefinedAndObjectLiteral('query', query);
      this._database.find(query, (error: Error, docs: object[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(docs);
        }
      });
    });
  }

  public async insert(itemToInsert: object): Promise<void> {
    ArgumentUtility.checkObjectHasContent('itemToInsert', itemToInsert);
    this._database.insert(itemToInsert);
  }
}
