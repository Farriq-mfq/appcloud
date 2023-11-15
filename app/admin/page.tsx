import Upload from "@/components/upload";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
export default function AdminPage() {
  return (
    <>
      <Button as={Link} href="/" size="sm" color="primary">
        Kembali
      </Button>
      <div className="grid gap-2 mt-2">
        <form action="">
          <Upload />
        </form>
      </div>
    </>
  );
}
