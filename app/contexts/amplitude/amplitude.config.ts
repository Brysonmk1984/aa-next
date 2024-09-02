import Amplitude from 'amplitude-js';

let amplitude: Amplitude.AmplitudeClient;
export const getAmplitude = (token: string, userId = undefined) => {
  // Amplitude is not available on the server
  if (typeof window === 'undefined') {
    return;
  }

  if (amplitude) {
    return amplitude;
  }

  amplitude = Amplitude.getInstance();

  amplitude.init(token, userId, {
    includeReferrer: true,
    saveParamsReferrerOncePerSession: false,
  });

  return amplitude;
};
