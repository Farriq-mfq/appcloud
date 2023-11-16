"use client";
import Upload from "@/components/upload";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, Progress } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { HiOutlineUpload, HiX } from "react-icons/hi";
import axios from "axios";
export default function FormUpload() {
  const [files, setFiles] = useState<Array<File>>();
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  let formdata = new FormData();
  useEffect(() => {
    if (files && files.length > 0) {
      formdata.append("file", files[0]);
    }
  }, [files, setFiles]);
  const onReset = () => {
    setProgress(0);
    setFiles(undefined);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/upload", formdata, {
        onUploadProgress(e) {
          if (e.total) setProgress((e.loaded / e.total) * 100);
        },
      })
      .then(() => {
        alert("Upload success");
        onReset();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {files && files.length ? (
        <>
          <Card shadow="none" className="border mt-2" isDisabled={loading}>
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
                isLoading={loading}
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
      {/* <Input
        type="text"
        variant="bordered"
        placeholder="Masukan nama disini...."
        size="sm"
        isDisabled={loading}
      /> */}
      {loading && (
        <Progress
          aria-label="Uploading..."
          size="md"
          value={progress}
          classNames={{
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-red-500 to-success-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          showValueLabel={true}
        />
      )}
      <Button
        type="submit"
        size="sm"
        color="primary"
        startContent={!loading && <HiOutlineUpload />}
        isLoading={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
