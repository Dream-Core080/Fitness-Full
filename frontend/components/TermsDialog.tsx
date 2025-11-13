import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

export type Props = {
  openModal: boolean;
  handleModal: () => void;
};

export default function TermDialog({ openModal, handleModal }: Props) {
  return (
    <Dialog
      placeholder={"Dialog"}
      open={openModal}
      size="sm"
      handler={handleModal}
    >
      <div className="flex items-center justify-between">
        <DialogHeader
          placeholder={"Dialog Header"}
          className="flex flex-col items-start"
        >
          {" "}
          <Typography placeholder={"Terms & Conditions"} variant="h4">
            Terms & Conditions
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
        <Typography
          placeholder={"Contents"}
          className="mb-8 -mt-7 text-white/60"
          variant="h6"
        >
          You should read this!
        </Typography>
        <div className="grid text-white/60 indent-2 mb-6">
          <h1>
            Usage Data is collected automatically when using the Service. Usage
            Data may include information such as Your Device&apos;s Internet
            Protocol address (e.g. IP address), browser type, browser version,
            the pages of our Service that You visit, the time and date of Your
            visit, the time spent on those pages, unique device identifiers and
            other diagnostic data. When You access the Service by or through a
            mobile device, We may collect certain information automatically,
            including, but not limited to, the type of mobile device You use,
            Your mobile device unique ID, the IP address of Your mobile device,
            Your mobile operating system, the type of mobile Internet browser
            You use, unique device identifiers and other diagnostic data. We may
            also collect information that Your browser sends whenever You visit
            our Service or when You access the Service by or through a mobile
            device.
          </h1>
        </div>
      </DialogBody>
    </Dialog>
  );
}
