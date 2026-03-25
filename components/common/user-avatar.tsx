type UserAvatarProps = {
  name?: string | null
  email?: string | null
}

export default function UserAvatar({ name, email }: UserAvatarProps) {
  const initial = (name?.[0] ?? email?.[0] ?? "?").toUpperCase()

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
      {initial}
    </div>
  )
}
