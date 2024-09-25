import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";

const Modal = ({ form, icon, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Avoid wrapping a button inside another button */}
        <div>{icon}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update {title}</DialogTitle>
        </DialogHeader>
        {/* Render the form directly here */}
        <div>{form}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
