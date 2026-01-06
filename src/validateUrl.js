import yup from './settings/yup.js'

export const validateUrl = ({ t, url, existingUrls = [] }) => {
  const validation = yup(t)

  const schema = validation.object().shape({
    url: validation
      .string()
      .required()
      .url()
      .test(
        'is-unique',
        t('validation.validateUrl.duplicate'),
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
