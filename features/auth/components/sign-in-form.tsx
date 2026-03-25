"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { signIn } from "@/features/auth/service"
import { AuthFormContainer } from "./auth-form-container"

const schema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(1, "비밀번호를 입력하세요"),
})

type SignInFormType = z.infer<typeof schema>

export function SignInForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormType>({ resolver: zodResolver(schema) })

  async function onSubmit(data: SignInFormType) {
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setError("root", {
        message: "로그인에 실패했습니다.",
      })
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <AuthFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">비밀번호</FieldLabel>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <FieldError errors={errors.password ? [errors.password] : []} />
          </Field>

          {errors.root && <FieldError>{errors.root.message}</FieldError>}
        </FieldGroup>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          계정이 없으신가요?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-accent-foreground underline-offset-4"
          >
            회원가입
          </Link>
        </p>
      </form>
    </AuthFormContainer>
  )
}
