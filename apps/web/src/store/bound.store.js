import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createFilterSlice } from './filters/filter.slice'

export const useBoundStore = create(
  persist(
    devtools((set, get) => ({
      ...createFilterSlice(set, get),
    })),
    {
      name: 'my-store',
      getStorage: () => localStorage
    }
  )
);