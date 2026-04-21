// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

// Instalação GA4
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WGZ8FFGZ');

// Fução de disparo de eventos de click
function disparoClick(EVENT, ELEMENT, GROUP) {
    window.dataLayer.push({
        'event': EVENT,
        'element_name': ELEMENT,
        'element_group': GROUP,
        'page_location': window.location.href
    });
}

//Função de disparo de eventos no form
function disparoForm(EVENT, ID, NAME, DESTINATION, TEXT) {
    window.dataLayer.push({
        'event': EVENT,
        'page_location': window.location.href,
        'form_id': ID,
        'form_name': NAME,
        'form_destination': DESTINATION,
        'form_submit_text': TEXT
    });
}

// Tracking do menu
const menu = document.querySelector('.menu-lista');
    if (menu){
      menu.addEventListener('click', function(event){
        const itemClicado = event.target.closest('[data-track-event-name]');
        if (!itemClicado) return;

        disparoClick(
            itemClicado.dataset.trackEventName,
            itemClicado.dataset.trackElementName,
            itemClicado.dataset.trackElementGroup
        );
      });  
    }

// Tracking analise
const cardsMontadora = document.querySelector('.cards-montadoras');
    if (cardsMontadora){
      cardsMontadora.addEventListener('click', function(event){
        const itemClicado = event.target.closest('[data-track-event-name]');
        if (!itemClicado) return;

        disparoClick(
            itemClicado.dataset.trackEventName,
            itemClicado.dataset.trackElementName,
            itemClicado.dataset.trackElementGroup
        );
      });  
    }

//Tracking Formulário
const formElement = document.querySelector('.contato');
    if (formElement){

      let isFormStarted = false;

      formElement.addEventListener('input', function(event) {
        if (isFormStarted === false) {
          disparoForm(
            formElement.dataset.trackEventName,
            formElement.id,
            formElement.name,
            formElement.action
          );

          isFormStarted = true
        }
      });

      formElement.addEventListener('submit', function(event){
        const botaoEnvio = document.querySelector('[type="submit"]');
        if (!botaoEnvio) return;

        disparoForm(
            botaoEnvio.dataset.trackEventName,
            formElement.id,
            formElement.name,
            formElement.action,
            botaoEnvio.dataset.trackBtnText
        );
      });  
    }



// Tracking Modal
const bodyElement = document.querySelector('body');
const lightboxHeader = document.querySelector('.lightbox-header');

if (bodyElement && lightboxHeader) {
    
    const observadorDeBody = new MutationObserver(function(mutacoes) {
        mutacoes.forEach(function(mutacao) {
            
            if (mutacao.attributeName === 'class' && bodyElement.classList.contains('lightbox-open')) {
                
                disparoForm(
                    lightboxHeader.dataset.trackEventName || 'view_modal',
                    lightboxHeader.id || 'sem_id',
                    lightboxHeader.getAttribute('name') || 'sem_nome'
                );                
            }
        });
    });

    observadorDeBody.observe(bodyElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}