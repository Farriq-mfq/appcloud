import ListFile from "@/components/ListFile";
import { paginator } from "@/utils/paginate";
import { PrismaClient, files } from "@prisma/client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  const prisma = new PrismaClient();
  const paginate = paginator({
    page: searchParams.page ?? 1,
    perPage: 50,
  });
  const files = await paginate<files, any>(prisma.files);
  if (files.data.length > 0) return <ListFile files={files} />;
  else return <>FIle kosong</>;
}
