import mongoose from 'mongoose';
import isURL from 'validator/lib/isURL.js';

const cardSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле со страной создания фильма является обязательным'],
    },
    director: {
      type: String,
      required: [true, 'Поле с именем режиссёра фильма является обязательным'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле с длительностью фильма является обязательным'],
    },
    year: {
      type: String,
      required: [true, 'Поле с годом выпуска фильма является обязательным'],
    },
    description: {
      type: String,
      required: [true, 'Поле с описанием фильма является обязательным'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} не валидный адрес ссылки на постер к фильму!`,
      },
      required: [true, 'Поле с ссылкой на постер к фильму является обязательным'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} не валидный адрес ссылки на трейлер фильма!`,
      },
      required: [true, 'Поле с ссылкой на трейлер фильма является обязательным'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} не валидный адрес ссылки на миниатюрное изображение постера к фильму!`,
      },
      required: [true, 'Поле с ссылкой на миниатюрное изображение постера к фильму является обязательным'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле с id фильма является обязательным'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле с названием фильма на русском языке является обязательным'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле с названием фильма на английском  языке является обязательным'],
    },
  },
  { versionKey: false },
);

export default mongoose.model('movie', cardSchema);
