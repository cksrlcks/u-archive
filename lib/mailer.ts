import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port : Number(process.env.SMTP_PORT),
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await transporter.sendMail({
    from: `"u-archive" <${process.env.SMTP_FROM}>`,
    to,
    subject: "비밀번호 재설정",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>비밀번호 재설정</h2>
        <p>아래 버튼을 클릭하여 비밀번호를 재설정하세요.</p>
        <p>이 링크는 1시간 동안 유효합니다.</p>
        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            margin-top: 16px;
            padding: 12px 24px;
            background-color: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
          "
        >
          비밀번호 재설정
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 12px;">
          본인이 요청하지 않았다면 이 메일을 무시하세요.
        </p>
      </div>
    `,
  })
}
