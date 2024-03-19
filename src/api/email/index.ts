import emailjs from '@emailjs/browser';
import { TemplateParams } from '../../types';

export const sendEmail = (templateParams: TemplateParams | any) => {
  emailjs
    .send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParams,
      {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      }
    )
    .then(
      () => {
        console.log('success');
      },
      (err) => {
        console.warn('FAILED...', err);
      }
    );
};
