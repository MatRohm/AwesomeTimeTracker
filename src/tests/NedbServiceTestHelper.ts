import Nedb from 'nedb';
import { NedbService } from '../shared/NedbService';

export class NedbServiceTestHelper {
  public static getTestInstance(): NedbService {
    const nedb = new Nedb('./awesomeTimeTracker.tests.db');
    const nedbService = new NedbService(nedb);
    return nedbService;
  }

  public static clearDatabase() {
    const nedb = new Nedb('./awesomeTimeTracker.tests.db');
    nedb.loadDatabase();
    nedb.remove({}, { multi: true }, (err, numRemoved) => {
      nedb.loadDatabase();
    });
  }
}
