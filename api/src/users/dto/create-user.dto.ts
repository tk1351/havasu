import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '名前を入力してください' })
  @IsString({ message: '名前を文字で入力してください' })
  name: string;

  @IsNotEmpty({ message: 'メールアドレスを入力してください' })
  @IsEmail({}, { message: 'メールアドレスの形式で入力してください' })
  @MinLength(8, { message: '8文字以上で入力してください' })
  @MaxLength(256, { message: '256文字以内で入力してください' })
  email: string;

  @IsNotEmpty({ message: 'パスワードを入力してください' })
  @IsString({ message: 'パスワードを文字で入力してください' })
  @MinLength(8, { message: '8文字以上で入力してください' })
  @MaxLength(256, { message: '256文字以内で入力してください' })
  password: string;

  @IsNotEmpty({ message: '写真を入力してください' })
  @IsUrl()
  picture: string;
}
