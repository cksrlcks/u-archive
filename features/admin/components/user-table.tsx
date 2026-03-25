"use client"

import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useUpdateUserApproved,
  useUsers,
} from "@/features/admin/query/use-users"

export default function UserTable() {
  const { data: users = [] } = useUsers()
  const { mutate: updateApproved } = useUpdateUserApproved()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>승인</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name}</TableCell>
            <TableCell className="text-muted-foreground">{u.email}</TableCell>
            <TableCell>{u.role}</TableCell>
            <TableCell>
              <Switch
                checked={u.approved}
                disabled={u.role === "admin"}
                onCheckedChange={(checked) =>
                  updateApproved({ id: u.id, approved: checked })
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
