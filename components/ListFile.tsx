"use client";
import File from "@/components/File";
import { PaginatedResult } from "@/utils/paginate";
import { Pagination } from "@nextui-org/pagination";
import { files } from "@prisma/client";
import { useRouter } from "next/navigation";
export default function ListFile({ files }: { files: PaginatedResult<files> }) {
  const router = useRouter();
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {files.data.map((file) => {
          return <File key={file.id} file={file} />;
        })}
      </div>
      <Pagination
        onChange={(page: number) => {
          router.push(`/?page=${page}`);
        }}
        className="mt-2"
        radius="full"
        showControls
        total={files.meta.lastPage}
        initialPage={files.meta.currentPage}
      />
    </>
  );
}
