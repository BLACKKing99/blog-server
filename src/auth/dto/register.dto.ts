/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsNotExists } from 'src/rule/file.rule';

export default class RegisterDto {
  @IsNotEmpty({
    message:'用户名不能为空'
  })
  name: string;
  @IsNotExists('user',{
    message:'邮箱已存在'
  })
  @IsEmail({},{
    message:'邮箱格式不正确'
  })
  email: string
  @IsNotEmpty({
    message:'密码不能为空'
  })
  password: string;
}
