import './styles/main.css'
import { validateUrl } from './validateUrl.js'
import translate from './locales/translate.js'

translate().then((t) => {
  document.querySelector('#app').innerHTML = `
  <main class="flex-grow-1">
    <section class="container-fluid bg-dark p-5">
      <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto text-white">
          <h1 class="display-3 mb-0">${t('ui.title')}</h1>
          <p class="lead">${t('ui.description')}</p>
          <form action="" class="rss-form text-body">
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input id="url-input" autofocus="" type="text" required="" name="url" aria-label="${t('ui.rssForm.ariaLabel')}" class="form-control w-100" placeholder="${t('ui.rssForm.inputPlaceholder')}" autocomplete="off">
                  <label for="url-input">${t('ui.rssForm.inputLabel')}</label>
                </div>
              </div>
              <div class="col-auto">
                <button type="submit" aria-label="${t('ui.rssForm.buttonAriaLabel')}" class="h-100 btn btn-lg btn-primary px-sm-5">${t('ui.rssForm.submitButton')}</button>
              </div>
            </div>
          </form>
          <p class="mt-2 mb-0 text-secondary">${t('ui.rssForm.example')}</p>
          <p class="feedback m-0 position-absolute small"></p>
        </div>
      </div>
    </section>
    <section class="container-fluid container-xxl p-5">
      <div class="row">
        <div class="col-md-10 col-lg-8 order-1 mx-auto posts">

        </div>
        <div class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">

        </div>
      </div>
    </section>
  </main>
`
  const form = document.querySelector('.rss-form')
  const input = document.getElementById('url-input')
  const feedback = document.querySelector('.feedback')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const url = formData.get('url')

    validateUrl({ t, url }).then(({ isValid, errors }) => {
      feedback.classList.remove('text-danger')
      feedback.classList.remove('text-success')
      input.classList.remove('is-invalid')

      if (!isValid) {
        feedback.classList.add('text-danger')
        feedback.textContent = errors[0]['message']
        input.classList.add('is-invalid')

        return
      }

      feedback.classList.add('text-success')
      feedback.textContent = t('feedback.success')

      form.reset()
    })
  })
})
