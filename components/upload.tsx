"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
export default function Upload() {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <Card >
        <CardBody>
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
