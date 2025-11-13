import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export type Props = {
  openModal: boolean;
  headTitle: string;
  note: string;
  handleModal: () => void;
  onConfirm: (note: string) => void;
};

export default function NoteDialog({
  openModal,
  headTitle,
  note,
  handleModal,
  onConfirm,
}: Props) {
  const [noteContent, setNoteContent] = useState("");
  useEffect(() => {
    setNoteContent(note);
  }, [note]);

  return (
    <Dialog
      open={openModal}
      size="xs"
      handler={handleModal}
      placeholder="Dialog"
    >
      <div className="flex items-center justify-between">
        <DialogHeader
          className="flex flex-col items-start"
          placeholder="Dialog Header"
        >
          {" "}
          <Typography className="mb-1" variant="h4" placeholder="Typography">
            {headTitle}
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5"
          onClick={handleModal}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <DialogBody placeholder="Dialog Body">
        <Typography
          className="mb-10 -mt-7 text-white/60"
          variant="h6"
          placeholder="Typography"
        >
          Write the note about this exercise.
        </Typography>
        <div className="grid gap-6">
          <Textarea
            label="Note"
            rows={10}
            color="blue-gray"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2" placeholder="Dialog Footer">
        <Button
          variant="gradient"
          color="red"
          onClick={handleModal}
          placeholder="Cancel Button"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="red"
          onClick={() => onConfirm(noteContent)}
          placeholder="Save Button"
        >
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
