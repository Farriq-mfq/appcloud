"use client";

import { formatFileSize } from "@/utils/size";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/react";
import { files } from "@prisma/client";
import axios from "axios";
import Queue from "p-queue";
import { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
export default function File({ file }: { file: files }) {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const downloadQueue = new Queue({ concurrency: 1 });
  const downloadFile = () => {
    setLoading(true);
    axios
      .get(`/api/download?file=${file.id}`, {
        responseType: "blob",
        onDownloadProgress(progressEvent) {
          const progressEvt = Math.round(
            (progressEvent.loaded / file.size) * 100
          );
          setProgress(progressEvt);
        },
      })
      .then((response) => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        a.href = url;
        a.download = `${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .finally(() => {
        setLoading(false);
        setProgress(0);
      });
  };
  return (
    <Card radius="lg" shadow="sm">
      <CardHeader className="justify-between">
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold text-default-600 w-40 truncate">
            {file.name}
          </h4>
          <h5 className="text-small tracking-tight text-default-400 mt-1">
            {formatFileSize(file.size)}
          </h5>
        </div>
        {loading ? (
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={progress}
            color="warning"
            showValueLabel={true}
          />
        ) : (
          <Button
            color="primary"
            size="sm"
            isIconOnly
            onClick={(e) => {
              e.preventDefault();
              downloadQueue.add(async () => await downloadFile());
            }}
          >
            <HiOutlineDownload />
          </Button>
        )}
      </CardHeader>
    </Card>
  );
}
