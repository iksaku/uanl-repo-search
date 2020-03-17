import { ref, inject } from '@vue/composition-api'

const isSidebarOpen = ref<boolean>(false)

const setSidebar = (open: boolean): void => {
    console.log(open)
}

export const sidebarStore = {
    isSidebarOpen,
    setSidebar
}

export const useSidebar = () => inject('SidebarStore', sidebarStore)

