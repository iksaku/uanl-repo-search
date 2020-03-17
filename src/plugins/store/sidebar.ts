import { ref, computed, Ref, inject } from '@vue/composition-api'

interface SidebarStore {
    isSidebarOpen: Readonly<Ref<boolean>>

    setSidebar: (open: boolean) => void
}

const state = ref<boolean>(false)

const isSidebarOpen = computed<boolean>(() => state.value)

const setSidebar = (open: boolean): void => {
    state.value = open
}

const store: SidebarStore = {
    isSidebarOpen,
    setSidebar
}

export const useSidebar = () => inject<SidebarStore>(Symbol.for('SidebarStore'), store)

