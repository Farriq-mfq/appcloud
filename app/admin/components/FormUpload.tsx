"use client";
import Upload from "@/components/upload";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import { HiOutlineUpload, HiX } from "react-icons/hi";

export default function FormUpload() {
  const [files, setFiles] = useState<Array<File>>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        alert("ok");
      }}
      className="space-y-5"
    >
      {files && files.length ? (
        <>
          <Card shadow="none" className="border mt-2">
            <CardHeader className="justify-between">
              <h4 className="text-small font-semibold leading-none text-default-600 ">
                {files[0].name}
              </h4>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setFiles(undefined);
                }}
                color="danger"
                isIconOnly
              >
                <HiX />
              </Button>
            </CardHeader>
          </Card>
        </>
      ) : (
        <Upload setFiles={setFiles} />
      )}
      <Input
        type="text"
        variant="bordered"
        placeholder="Masukan nama disini...."
        size="sm"
      />
      <Button type="submit" size="sm" color="primary" startContent={<HiOutlineUpload />}>
        Upload
      </Button>
    </form>
  );
}
