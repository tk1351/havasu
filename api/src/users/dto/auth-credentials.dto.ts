import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @IsEmail({}, { message: 'メールアドレスの形式で入力してください' })
  email: string;

  @IsNotEmpty({ message: 'パスワードを入力してください' })
  @IsString({ message: 'パスワードを文字で入力してください' })
  password: string;
}
