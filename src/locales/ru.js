export default {
  translation: {
    ui: {
      title: 'RSS агрегатор',
      description: 'Начните читать RSS сегодня! Это легко, это красиво.',
      rssForm: {
        inputPlaceholder: 'ссылка RSS',
        inputLabel: 'Ссылка RSS',
        submitButton: 'Добавить',
        example: 'Пример: https://lorem-rss.hexlet.app/feed',
        ariaLabel: 'ссылка RSS',
        buttonAriaLabel: 'добавить',
      },
    },
    feedback: {
      success: 'RSS успешно загружен',
    },
    validation: {
      common: {
        required: 'Не должно быть пустым',
        url: 'Ссылка должна быть валидным URL',
      },
      validateUrl: {
        duplicate: 'RSS уже существует',
      },
    },
  },
}
