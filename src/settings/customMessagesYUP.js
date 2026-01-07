export default {
  string: {
    url: () => ({ key: 'notUrl' }),
    required: () => ({ key: 'empty' }),
  },
  mixed: {
    notOneOf: () => ({ key: 'alreadyInList' }),
  },
}
