import 'server-only'

const dictionaries = {
  en: () =>
    import('../components/dictionaries/en.json').then(
      (module) => module.default,
    ),
  vi: () =>
    import('../components/dictionaries/vi.json').then(
      (module) => module.default,
    ),
}

const getDictionary = async (locale: string) => {
  switch (locale) {
    case 'en':
      return dictionaries.en()
    case 'vi':
      return dictionaries.vi()
    default:
      return dictionaries.en()
  }
}

export default getDictionary
