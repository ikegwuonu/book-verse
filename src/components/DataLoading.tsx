import { Loader } from "lucide-react";
import React from "react";

const DataLoading = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-40">
      <Loader className="animate-spin text-navy-700" />
    </div>
  );
};

export default DataLoading;
