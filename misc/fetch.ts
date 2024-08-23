export function fetchTimeout(url: string, data: any, timeout: number) {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  
    return fetch(url, { ...data, signal })
      .then(response => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          throw new Error('Cannot access DSpace resources\n\nTry with different network or try again later.');
        }
        throw error;
      });
  }
  