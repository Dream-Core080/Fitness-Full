"use client";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

export type Props = {
  openModal: boolean;
  handleModal: () => void;
  onConfirm: () => void;
};

export default function ResendDialog({
  openModal,
  handleModal,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={openModal}
      size="xs"
      handler={handleModal}
      placeholder={"Resend Dialog"}
    >
      <div className="flex items-center justify-between">
        <DialogHeader
          placeholder={"Dialog Header"}
          className="flex flex-col items-start"
        >
          {" "}
          <Typography
            placeholder={"Unverified Email"}
            className="mb-1"
            variant="h4"
          >
            Email is not verified.
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
      <DialogBody placeholder={"Dialog Body"}>
        <div className="grid text-white/60 indent-2 mb-6">
          <h1>Haven&apos;t received verification email?</h1>
        </div>
      </DialogBody>
      <DialogFooter placeholder={"Dialog Footer"} className="space-x-2">
        <Button
          placeholder={"Cancel Button"}
          variant="gradient"
          color="red"
          onClick={handleModal}
        >
          Cancel
        </Button>
        <Button
          placeholder={"Resend Button"}
          variant="gradient"
          color="red"
          onClick={onConfirm}
        >
          Resend
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
