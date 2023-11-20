"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
export default function Upload({
  setFiles,
}: {
  setFiles: Dispatch<SetStateAction<File[] | undefined>>;
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      "application/zip": [".zip"],  
      "application/x-rar-compressed": [".rar"],
    },
  });

  return (
    <div {...getRootProps()}>
      <Card
        shadow="none"
        className={`border border-dashed h-64 mt-4 ${
          isDragActive ? "border-primary" : "border-default"
        }`}
      >
        <CardBody
          className={`grid place-items-center text-sm ${
            isDragActive ? "text-primary" : "text-default"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
