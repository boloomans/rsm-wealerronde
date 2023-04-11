import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  await OneSignal.init({ appId: '761d2559-6eb0-4ab7-b435-200072f18c0d', allowLocalhostAsSecureOrigin: true}).then(() => {
    OneSignal.showSlidedownPrompt().then(() => {
      // do other stuff
      console.log("Prompt displayed");
    });
  });
}
