"use client";
import { Input } from "@nextui-org/input";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import ToggleTheme from "./ToggleTheme";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const router = useRouter();
  const session = useSession();
  return (
    <Navbar className="border-b py-1">
      <NavbarBrand>
        <Link href={'/'}>
          <p className="font-bold text-inherit">Appcloud</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Input
            isClearable
            radius="full"
            size="sm"
            className="max-w-xs"
            placeholder="Cari aplikasi"
            startContent={
              <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            onChange={(e) => {
              if (e.target.value.length > 0)
                router.push(`/?search=${e.target.value}`);
              else router.push("/");
            }}
          />
        </NavbarItem>
        <NavbarItem>
          <ToggleTheme />
          {session.status === "authenticated" && (
            <Button
              onClick={async (e) => {
                e.preventDefault();
                await signOut();
              }}
              color="danger"
              className="ml-2"
              isIconOnly
            >
              <HiLogout />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
