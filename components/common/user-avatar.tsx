type UserAvatarProps = {
  name?: string | null
  email?: string | null
}

export default function UserAvatar({ name, email }: UserAvatarProps) {
  const initial = (name?.[0] ?? email?.[0] ?? "?").toUpperCase()

  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white md:h-7 md:w-7 md:text-xs">
      {initial}
    </div>
  )
}
