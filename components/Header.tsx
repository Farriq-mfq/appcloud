import { Input } from "@nextui-org/input";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { HiOutlineDownload } from "react-icons/hi";
import ToggleTheme from "./ToggleTheme";
export default function Header() {
  return (
    <Navbar className="border-b py-1">
      <NavbarBrand>
        <p className="font-bold text-inherit">Appcloud</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Input
          isClearable
          radius="full"
          size="sm"
          className="max-w-xs"
          placeholder="Cari aplikasi"
          startContent={
            <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <NavbarItem>
          <ToggleTheme />
          <Button color="primary" className="ml-2" isIconOnly>
            <HiOutlineDownload />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
