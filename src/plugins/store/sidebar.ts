import { ref, inject } from '@vue/composition-api'

const isSidebarOpen = ref<boolean>(false)

const setSidebar = (open: boolean): void => {
    isSidebarOpen.value = open
}

export const useSidebar = () => inject('SidebarStore', {
    isSidebarOpen,
    setSidebar
})

