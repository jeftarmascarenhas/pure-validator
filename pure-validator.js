(function(win, doc, undefined){
  'use strict';

  function Validator(options) {

      let formValidator = doc.querySelectorAll('form'),
          defaultConfig = {};

      if(typeof options != 'object' && options === undefined) {
            defaultConfig.emailFormat = 'Invalid E-mail format';
          }

      const dispatchEvents = (elems) => {
            let inputs = elems.querySelectorAll('input');
            let textAreas = elems.querySelectorAll('textarea');


              const blurValidation = (e) => {
                        let targetElement = e.target,
                            getBorder     = win.getComputedStyle(targetElement, null).getPropertyValue('border-color'),
                            colorError    = '#d67575',
                            validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        if(targetElement.value  === '') {
                                    targetElement.nextElementSibling.textContent = targetElement.dataset.errorTitle;
                                    targetElement.setAttribute('style', 'border-color:' + colorError);
                                  }
                        else if(targetElement.type == 'email' && !validEmail.test(targetElement.value)) {
                                    targetElement.nextElementSibling.textContent =  options ? options.emailFormat: defaultConfig.emailFormat;
                                  }
                        else {
                                    targetElement.nextElementSibling.textContent = '';
                                    targetElement.setAttribute('style', getBorder);
                                  }
                      };

              const addEventsInputs = (input) => {
                        if(input.dataset.errorTitle != undefined) {
                                    input.addEventListener('blur', blurValidation, false);
                                  }
                      };

              Array.prototype.forEach.call(inputs, addEventsInputs);

          };

      Array.prototype.forEach.call(formValidator, dispatchEvents);

    }

  win.Validator = Validator;

})(window, document, undefined);
