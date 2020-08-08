// import runtime from 'workbox-webpack-plugin/build/lib/r';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  }
};

export default swRegister;

// if ('serviceWorker' in navigator) {
//   console.log('service worker di install...');
//   await runtime.register();
//   return;
// }
// console.log('Service worker not supported in this browser');
