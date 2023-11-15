import File from "@/components/File";
import { paginator } from "@/utils/paginate";
import { PrismaClient, files } from "@prisma/client";

export default async function HomePage() {
  const prisma = new PrismaClient();
  const paginate = paginator({
    page: 1,
    perPage: 10,
  });
  const files = await paginate<files, any>(prisma.files);
  if (files.data.length > 0)
    return (
      <div className="grid md:grid-cols-4 gap-4">
        {files.data.map((file) => {
          return <File key={file.id} file={file} />;
        })}
      </div>
    );
  else return <>FIle kosong</>;
}
