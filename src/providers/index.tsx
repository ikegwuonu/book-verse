import React, { Fragment, PropsWithChildren } from "react";
import { Toaster as Sonner, Toaster } from "sonner";
import ReactQuery from "./react-query";
import AppLoader from "./app-loader";
import { TopLoader } from "next-top-loader";
import GlobalModal from "@/components/GlobalModal";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <ReactQuery>
        <AppLoader>
          {children}
          <Toaster richColors visibleToasts={1} theme="light" />
          <TopLoader color="#38bdf8" />
          <GlobalModal />
        </AppLoader>
      </ReactQuery>
    </Fragment>
  );
};

export default Providers;
