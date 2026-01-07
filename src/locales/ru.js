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
        buttonAriaLabel: 'добавить',
      },
      post: {
        viewButton: 'Просмотр',
      },
    },
    errors: {
      notUrl: 'Ссылка должна быть валидным URL',
      alreadyInList: 'RSS уже существует',
      notRss: 'Ресурс не содержит валидный RSS',
      networkError: 'Ошибка сети',
      unknown: 'Что-то пошло не так',
      empty: 'Не должно быть пустым',
    },
    status: {
      sending: 'RSS загружается',
      success: 'RSS успешно загружен',
    },
  },
}
