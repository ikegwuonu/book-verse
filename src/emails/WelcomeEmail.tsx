import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeEmail = ({ name }: { name: string }) => {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <Image
            src={
              "https://ik.imagekit.io/ikegwuonu/images.png?updatedAt=1746199738095"
            }
            width={50}
            height={50}
            alt="logo "
            className="mx-auto pb-4"
          />
          <h1 className="text-3xl font-bold text-center text-indigo-600">
            Welcome, {name}!
          </h1>
          <p className="mt-4 text-base">
            Thank you for being a part BookVerse! We're excited to have you as
            part of team. We promise to make the onboarding process as smooth as
            possible.
          </p>
          <p className="mt-4 text-sm text-red-400">
            Login to bookverse and change your password. Do so as immediately.
            Your current password is your email
          </p>
          <Button asChild className="  bg-blue-950 text-white mt-5 w-full">
            <Link href={config.env.prodApiEndpoint}>Login</Link>
          </Button>
          <div className="mt-6">
            <p className="text-sm text-center text-gray-500">
              If you have any questions or need assistance, feel free to reach
              out to us anytime!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmail;
