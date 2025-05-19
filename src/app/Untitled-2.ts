import React from "react";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("../textbook/page") as Promise<{ default: React.ComponentType }>,
  {
    ssr: false,
  }
);

export default function Page() {
  return <PDFViewer />;
}
