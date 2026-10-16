export const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbw9pGE8zPfM3h2_Q-kwhQkluqiby2tK9Vis_ZBlBUCghPSCaKtPjYNrkxP1LntDGJlL/exec";

export function syncUserSession(payload) {
  if (!API_ENDPOINT || typeof API_ENDPOINT !== 'string' || !API_ENDPOINT.trim()) {
    return Promise.resolve(false);
  }

  
  try {
    return fetch(API_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      
    });
  } catch (err) {
    return Promise.resolve(false);
  }
}
