import { useState } from "react";

export const useToggle = (defaultValue: boolean) => {
  const [open, setToggle] = useState<boolean>(defaultValue);

  const show = () => setToggle(true);
  const hide = () => setToggle(false);

  return { open, show, hide };
};
