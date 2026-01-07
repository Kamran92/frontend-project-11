import i18next from 'i18next'
import 'bootstrap'
import resources from './locales/index.js'
import app from './app.js'
import './styles/main.css'

const i18nextInstance = i18next.createInstance()

i18nextInstance.init({
  lng: 'ru',
  debug: false,
  resources,
}).then((t) => {
  document.querySelector('#app').innerHTML = `
  <main class="flex-grow-1">
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <a class="btn btn-primary full-article" href="#" role="button" target="_blank" rel="noopener noreferrer">
              Читать полностью 
            </a > 
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" > Закрыть </button>
          </div>
        </div>
      </div>
    </div>

    <section class="container-fluid bg-dark p-5">
      <div class="row">
        <div class="col-md-10 col-lg-8 mx-auto text-white">
          <h1 class="display-3 mb-0">${t('ui.title')}</h1>
          <p class="lead">${t('ui.description')}</p>
          <form action="" class="rss-form text-body">
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input id="url-input" autofocus="" type="text" required="" name="url" aria-label="url" class="form-control w-100" placeholder="${t('ui.rssForm.inputPlaceholder')}" autocomplete="off">
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

  app(t)
})
