import * as yup from 'yup'

export default (t) => {
  yup.setLocale({
    mixed: {
      required: () => t('validation.common.required'),
    },
    string: {
      url: () => t('validation.common.url'),
    },
  })

  return yup
}
