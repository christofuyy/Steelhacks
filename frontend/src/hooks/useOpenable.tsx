import { useState } from "react";

const useOpenable = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleOpen = () => setOpen(!open);

  return { open, setOpen, handleOpen, handleClose, toggleOpen };
};

export default useOpenable;
