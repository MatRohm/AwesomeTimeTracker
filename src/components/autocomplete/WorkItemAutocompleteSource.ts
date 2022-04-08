import { WorkItem } from '../../domain/WorkItem';
import { repository } from '../../domain/WorkRepository';
import { AutocompleteSource } from './autocompleteSource';

class WorkItemAutoCompleteSource implements AutocompleteSource<WorkItem> {
  public getValues(): WorkItem[] {   
    const workItems = repository.getWorkItems();
    return workItems;
  }

  public search(searchValue: string): WorkItem[] {
    const workItems = repository.getWorkItems();
    const filteredWorkItems = workItems.filter(workItem => workItem.name.includes(searchValue));
    return filteredWorkItems;
  }
}

export const workItemAutoCompleteSource = new WorkItemAutoCompleteSource();