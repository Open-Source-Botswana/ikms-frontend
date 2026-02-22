import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CommunityCluster, KnowledgeRecord } from '@/lib/types/community';
import { communities as initialCommunities } from '@/app/utils/data/community-data';

interface CommunityStore {
  communities: CommunityCluster[];
  activeCommunityId: string | null;
  activeKnowledgeDomain: string;

  setActiveCommunity: (id: string | null) => void;
  setActiveKnowledgeDomain: (domain: string) => void;
  getCommunityById: (id: string) => CommunityCluster | undefined;
  addKnowledgeRecord: (communityId: string, record: KnowledgeRecord) => void;
  getPublicRecords: (communityId: string) => KnowledgeRecord[];
}

export const useAppCommunityStore = create<CommunityStore>()(
  persist(
    (set, get) => ({
      communities: initialCommunities,
      activeCommunityId: null,
      activeKnowledgeDomain: 'all',

      setActiveCommunity: (id) => set({ activeCommunityId: id }),
      setActiveKnowledgeDomain: (domain) => set({ activeKnowledgeDomain: domain }),

      getCommunityById: (id) => get().communities.find(c => c.id === id),

      addKnowledgeRecord: (communityId, record) =>
        set((state) => ({
          communities: state.communities.map(c =>
            c.id === communityId
              ? { ...c, knowledgeRecords: [...c.knowledgeRecords, record], totalRecords: c.totalRecords + 1, publicRecords: record.accessLevel === 'public' ? c.publicRecords + 1 : c.publicRecords }
              : c
          ),
        })),

      getPublicRecords: (communityId) => {
        const community = get().communities.find(c => c.id === communityId);
        return community?.knowledgeRecords.filter(r => r.accessLevel === 'public') ?? [];
      },
    }),
    {
      name: 'app-community-store-0000001',
      partialize: (state) => ({ communities: state.communities }),
    }
  )
);
