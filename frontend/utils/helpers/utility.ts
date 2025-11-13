export const isServer = () => typeof window === "undefined";

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const delay = (ms : number) => new Promise((res) => setTimeout(res, ms));

