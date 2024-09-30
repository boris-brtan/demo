import { PaletteMode } from '@mui/material'
import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from './util'

export interface ThemeStore {
    /**
     * Current theme palette mode.
     */
    mode: PaletteMode
    /**
     * Sets or toogles current theme palette mode.
     *
     * @param mode palette mode for theme
     */
    toggleMode(mode?: PaletteMode): void
}

const name = 'ThemeStore'

export const useThemeStore = create<ThemeStore>(
    persist(
        (set, get) => ({
            mode: 'dark',

            toggleMode(mode?: PaletteMode) {
                if (mode === undefined) {
                    mode = get().mode === 'dark' ? 'light' : 'dark'
                }
                set({ mode }, undefined, 'toogleMode')
            },
        }),
        {
            name,
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
    name,
)
