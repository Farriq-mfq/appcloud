"use client";
import { Input } from "@nextui-org/input";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
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
        <NavbarItem className="relative">
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
          <Card
            className="absolute top-14 h-40 z-[999] bottom-0 right-0 left-0 bg-default-50 border max-w-md"
            shadow="none"
          >
            <CardHeader>
              <h4>Hasil pencarian : </h4>
            </CardHeader>
            <CardBody className="m-0 p-2">
              <ul>
                <li className="truncate">
                  {/* <Link></Link> */}
                </li>
              </ul>
            </CardBody>
          </Card>
        </NavbarItem>
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
