"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { files } from "@prisma/client";
import Link from "next/link";
import { HiOutlineDownload } from "react-icons/hi";
export default function File({ file }: { file: files }) {
  return (
    <Card radius="lg" shadow="sm">
      <CardHeader className="justify-between">
        <div className="flex flex-col gap-1 items-start justify-center">
          <Link
            href={"/"}
            className="text-small font-semibold leading-none text-default-600 w-40 truncate"
          >
            {file.name}
          </Link>
          <h5 className="text-small tracking-tight text-default-400">
            Lorem, ipsum.
          </h5>
        </div>
        <Button
          color="primary"
          size="sm"
          isIconOnly
        >
          <HiOutlineDownload />
        </Button>
      </CardHeader>
    </Card>
  );
}
