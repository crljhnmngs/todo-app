import { RootState } from '../../store/root';

export const selectSidebarState = (state: RootState) => state.sidebar.isOpen;
