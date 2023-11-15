import { Button } from "@nextui-org/button";
import Link from "next/link";
import FormUpload from "./components/FormUpload";
export default function AdminPage() {
  return (
    <>
      <Button as={Link} href="/" size="sm" color="primary">
        Kembali
      </Button>
      <div className="grid gap-2 mt-2">
        <FormUpload />
      </div>
    </>
  );
}
