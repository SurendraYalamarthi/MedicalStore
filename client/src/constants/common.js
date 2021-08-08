export const env = {
  apiUrl: "http://localhost:5000/",
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const callPostApi = (url, req) => {
  let timeout = 30000;
  let timeout_err = {
    ok: false,
    status: 408,
    message: "Request timeout",
  };
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req),
    }).then(resolve, reject);
    setTimeout(reject.bind(null, timeout_err), timeout);
  });
};
