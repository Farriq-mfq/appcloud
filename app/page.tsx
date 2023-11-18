import ListFile from "@/components/ListFile";
import { paginator } from "@/utils/paginate";
import { PrismaClient, files } from "@prisma/client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page: number; search: string };
}) {
  const prisma = new PrismaClient();
  const paginate = paginator({
    page: searchParams.page ?? 1,
    perPage: 50,
  });
  const files = await paginate<files, any>(prisma.files, {
    where: searchParams.search
      ? {
          name: {
            contains: searchParams.search,
          },
        }
      : undefined,
  });
  if (files.data.length > 0) return <ListFile files={files} />;
  else return <>FIle tidak ditemukan</>;
}
