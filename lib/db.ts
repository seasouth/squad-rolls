// lib/db.ts
import Dexie, { EntityTable } from 'dexie';

interface Message {
  id?: number;
  threadId: string;
  senderId: string;
  content: string;
  timestamp: number;
  synced: boolean;
}

interface Group {
  id?: number;
  uuid: string;
  name: string;
  lastMessage: string;
}

const groupsDB = new Dexie('GroupsDatabase') as Dexie & {
  groups: EntityTable<Group, 'id'>;
};

groupsDB.version(1).stores({
  groups: '++id, uuid, name, lastMessage'
});

export { groupsDB };