import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (v) => isEmail(v),
        message: (props) => `${props.value} не валидный адрес электронной почты!`,
      },
      required: [true, 'Поле с адресом электронной почты является обязательным'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Поле с паролем является обязательным'],
      select: false, // do not return this by default to the client
      minlength: [3, 'Минимальная длина пароля 3 символов'],
    },
    name: {
      type: String,
      required: [true, 'Поле с именем пользователя является обязательным'],
      minlength: [2, 'Минимальная длина строки 2 символа'],
      maxlength: [30, 'Максимальная длина строки 30 символов'],
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userSchema);
