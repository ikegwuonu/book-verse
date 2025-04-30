import React, { Fragment, PropsWithChildren } from "react";
import { Toaster as Sonner, Toaster } from "sonner";
import ReactQuery from "./react-query";
import AppLoader from "./app-loader";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <AppLoader>
        {children}
        <Toaster richColors visibleToasts={1} theme="light" />
      </AppLoader>
    </Fragment>
  );
};

export default Providers;
