import React from "react";
import { LogoIcon } from "../svg/icon";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center ">
      <Image alt="logo" priority width={60} height={60} src={"/icons-96.svg"} />
      <p className="font-extrabold text-2xl font-pacifico">ClxCloud</p>
    </div>
  );
}
