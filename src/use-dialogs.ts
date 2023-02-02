import { useDynamicLoad } from './use-dynamic-load';

export const useDialogs = <T extends string>(
  initialOpen: T | null = null,
  initialLoad: Partial<Record<T, boolean>> = {},
) => {
  const { openComponent, close, handleClose, handleOpen, ...rest } = useDynamicLoad(
    initialOpen,
    initialLoad,
  );
  return {
    ...rest,
    closeDialog: close,
    handleCloseDialog: handleClose,
    openDialog: openComponent,
    handleOpen,
  };
};
