"use client";

import { LoginValidations, LoginValidationsType } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationsType>({
    resolver: zodResolver(LoginValidations),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params?.get("callbackUrl") ?? "/";
  const onSubmit: SubmitHandler<LoginValidationsType> = (data) => {
    setLoading(true);
    signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })
      .then((response) => {
        if (response!.ok) {
          router.replace(callbackUrl);
        } else {
          alert("error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Card className="py-4 px-2">
      <CardHeader>
        <h4 className="text-center font-bold leading-5 w-full text-xl uppercase border-b pb-4">
          Login Appcloud
        </h4>
      </CardHeader>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="grid gap-3 w-full">
          <Input
            isDisabled={loading}
            type="text"
            placeholder="Masukan username"
            variant="bordered"
            {...register("username")}
            errorMessage={errors.username ? errors.username.message : ""}
            isInvalid={errors.username != undefined}
          />
          <Input
            isDisabled={loading}
            type="password"
            placeholder="Masukan password"
            variant="bordered"
            {...register("password")}
            errorMessage={errors.password ? errors.password.message : ""}
            isInvalid={errors.password != undefined}
          />
        </CardBody>
        <CardFooter>
          <Button isLoading={loading} type="submit" color="primary">
            Masuk
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
