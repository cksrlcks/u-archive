"use client"

import { useState } from "react"
import Link from "next/link"
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
import { requestPasswordReset } from "@/features/auth/service"
import { AuthFormContainer } from "./auth-form-container"

const schema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
})

type ForgotPasswordFormType = z.infer<typeof schema>

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormType>({ resolver: zodResolver(schema) })

  async function onSubmit(data: ForgotPasswordFormType) {
    const { error } = await requestPasswordReset(data.email)
    if (error) {
      setError("root", {
        message: error.message ?? "요청에 실패했습니다.",
      })
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <AuthFormContainer className="space-y-4 text-center">
        <h2 className="text-lg font-semibold">메일을 확인해 주세요</h2>
        <p className="text-sm text-muted-foreground">
          비밀번호 재설정 링크를 이메일로 발송했습니다.
          <br />
          메일함을 확인해 주세요.
        </p>
        <Link
          href="/sign-in"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          로그인으로 돌아가기
        </Link>
      </AuthFormContainer>
    )
  }

  return (
    <AuthFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="mb-4 space-y-1">
          <h2 className="text-lg font-semibold">비밀번호 찾기</h2>
          <p className="text-sm text-muted-foreground">
            가입한 이메일 주소를 입력하면 재설정 링크를 보내드립니다.
          </p>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">이메일</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError errors={errors.email ? [errors.email] : []} />
          </Field>

          {errors.root && <FieldError>{errors.root.message}</FieldError>}
        </FieldGroup>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "발송 중..." : "재설정 링크 보내기"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          <Link
            href="/sign-in"
            className="font-medium text-accent-foreground underline-offset-4 hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </form>
    </AuthFormContainer>
  )
}
