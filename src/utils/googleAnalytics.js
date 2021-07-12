const warn = (...args) => {
    if (process.env.REACT_APP_ENV !== 'dev') {
        return;
    }
    console.warn(...args);
};

class GTM {
    #id = null;
    #init = false;

    configure(containerId) {
        this.#id = containerId;
    }

    initialize(containerId) {
        if(process.env.REACT_APP_ENV !== 'prod'){
            warn('Google analytics só deverá ser inicializado em produção')
            return
        }

        if (this.#init) {
            warn('Container já foi inicializado');
            return;
        }

        if (!document) {
            warn('GTM só funciona no cliente');
            return;
        }

        if (!containerId) {
            warn('Nenhum ID de container encontrado');
            return;
        }

        this.configure(containerId);

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.#id}`;

        const script2 = document.createElement('script');

        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
        
          gtag('config', '${this.#id}');
        `;

        document.head.insertBefore(script2, document.head.childNodes[0]);
        document.head.insertBefore(script, document.head.childNodes[0]);
    }

    push(...args) {
        if (!window) {
            warn('Google Analytics só funciona no cliente');
            return;
        }

        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        window.dataLayer.push(...args);
    }
}

const gtm = new GTM();

export default gtm;

//G-DXXF86J5D9