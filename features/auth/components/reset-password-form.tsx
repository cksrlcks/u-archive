"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/features/auth/service"

const schema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력하세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })

type ResetPasswordFormType = z.infer<typeof schema>

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") ?? ""
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormType>({ resolver: zodResolver(schema) })

  async function onSubmit(data: ResetPasswordFormType) {
    if (!token) {
      setError("root", { message: "유효하지 않은 링크입니다." })
      return
    }

    const { error } = await resetPassword(data.password, token)
    if (error) {
      setError("root", {
        message: error.message ?? "비밀번호 재설정에 실패했습니다.",
      })
      return
    }
    setDone(true)
  }

  if (!token) {
    return (
      <div className="w-full max-w-sm space-y-4 text-center">
        <h2 className="text-lg font-semibold">유효하지 않은 링크</h2>
        <p className="text-sm text-muted-foreground">
          비밀번호 재설정 링크가 올바르지 않습니다.
        </p>
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          다시 요청하기
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="w-full max-w-sm space-y-4 text-center">
        <h2 className="text-lg font-semibold">비밀번호가 변경되었습니다</h2>
        <p className="text-sm text-muted-foreground">
          새 비밀번호로 로그인해 주세요.
        </p>
        <Button className="w-full" onClick={() => router.push("/sign-in")}>
          로그인으로 이동
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="mb-4 space-y-1">
          <h2 className="text-lg font-semibold">새 비밀번호 설정</h2>
          <p className="text-sm text-muted-foreground">
            사용할 새 비밀번호를 입력해 주세요.
          </p>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password">새 비밀번호</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <FieldError errors={errors.password ? [errors.password] : []} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">비밀번호 확인</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <FieldError
              errors={errors.confirmPassword ? [errors.confirmPassword] : []}
            />
          </Field>

          {errors.root && <FieldError>{errors.root.message}</FieldError>}
        </FieldGroup>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </form>
    </div>
  )
}
