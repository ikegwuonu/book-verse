import React, { Fragment, PropsWithChildren } from "react";
import { Toaster as Sonner, Toaster } from "sonner";
import ReactQuery from "./react-query";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <>
        {children}
        <Toaster richColors visibleToasts={1} theme="light" />
      </>
    </Fragment>
  );
};

export default Providers;
