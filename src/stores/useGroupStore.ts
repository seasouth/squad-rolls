import { create } from 'zustand';

interface GroupStore {
    groupName: string;
    setGroupName: (name: string) => void;
}

const useGroupStore = create<GroupStore>()((set) => ({
    groupName: "",
    setGroupName: (name: string) => set(() => ({ groupName: name }))
}));

export default useGroupStore;