import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
import { createFilterSlice } from './filters/filter.slice'


export const useBoundStore = create()(
  devtools(
    (...a) => ({
      ...createFilterSlice(...a),
    })
  )
)