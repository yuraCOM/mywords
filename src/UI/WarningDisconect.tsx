import { FC } from "react";

const WarningDisconect: FC = () => {
  return (
    <div
      className="p-1 mb-1 text-center alert d-flex alert-danger align-items-center"
      role="alert"
    >
      No connect to server! Try again later! Your data is not saved!
    </div>
  );
};

export default WarningDisconect;
