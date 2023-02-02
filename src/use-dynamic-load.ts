import { useState } from 'react';

export const useDynamicLoad = <T extends string>(
  initialOpen: T | null = null,
  initialLoad: Partial<Record<T, boolean>> = {},
) => {
  const [open, setOpen] = useState<T | null>(initialOpen);
  const [load, setLoad] = useState<Partial<Record<T, boolean>>>(initialLoad);
  const openComponent = (component: T) => {
    setOpen(component);
    if (component != null) {
      setLoad(prevState => ({
        ...prevState,
        [component]: true,
      }));
    }
  };

  return {
    open,
    load,
    openComponent,
    close: () => setOpen(null),
    handleClose: () => setOpen(null),
    handleOpen: (component: T) => () => openComponent(component),
  };
};
