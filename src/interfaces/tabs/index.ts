export interface ITabs {
 id: number;
 name: string;
 tabId: string;
}

export const initialTabs: ITabs[] = [
 {
  id: 1,
  name: 'Abaut',
  tabId: 'tab_link_1',
 },
 {
  id: 2,
  name: 'Stat',
  tabId: 'tab_link_2',
 },
 ]