"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { IGetMaterial, IGetTextBook } from "@/lib/types";
import { X } from "lucide-react";
import { useModal } from "@/zustand/modalStore";
import { convertTimestamp } from "@/lib/utils";
import Link from "next/link";

type Props = {
  textbook: IGetMaterial & { id: string };
};

export default function ViewModal({ textbook }: Props) {
  const { closeModal } = useModal();

  const statusBadgeColors: Record<string, string> = {
    published: "bg-green-100 text-green-800",
    draft: "bg-amber-100 text-amber-800",
    review: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in-0 slide-in-from-bottom-10">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="relative w-20 h-28 rounded-md overflow-hidden border border-gray-200">
            <Image
              src={textbook.cover || "/placeholder.svg"}
              alt={textbook.topic}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{textbook.topic}</h2>
            <p className="text-sm text-gray-500">
              {textbook.lecturer} {textbook.year}
            </p>
            <Badge
              className={`mt-2 ${statusBadgeColors[textbook.status] || "bg-gray-100 text-gray-800"}`}
            >
              {textbook.status.charAt(0).toUpperCase() +
                textbook.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Level:</span> {textbook.level}
          </p>
          <p>
            <span className="font-medium">Semester:</span> {textbook.semester}
          </p>
          <p>
            <span className="font-medium">Department:</span>{" "}
            {textbook.department}
          </p>

          <p>
            <span className="font-medium">Faculty:</span> {textbook.faculty}
          </p>
          <p>
            <span className="font-medium">Format:</span> {textbook.format}
          </p>

          <p>
            <span className="font-medium">Added By:</span> {textbook.added_by}
          </p>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {convertTimestamp(textbook.created_at)}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={closeModal}>Close</Button>
          <Button asChild>
            {" "}
            <Link href={`/material/${textbook.document}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
