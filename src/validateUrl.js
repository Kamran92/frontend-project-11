import * as yup from 'yup'

export const validateUrl = ({ url, existingUrls = [] }) => {
  const schema = yup.object().shape({
    url: yup
      .string()
      .required('URL не должен быть пустым')
      .url('Ссылка должна быть валидным URL')
      .test(
        'is-unique',
        'RSS уже существует',
        value => !existingUrls.includes(value),
      ),
  })

  return new Promise((resolve) => {
    schema
      .validate({ url }, { abortEarly: false })
      .then(() => {
        resolve({ isValid: true, errors: [] })
      })
      .catch((error) => {
        const errors = error.inner.map(err => ({ path: err.path, message: err.message }))

        resolve({ isValid: false, errors })
      })
  })
}
