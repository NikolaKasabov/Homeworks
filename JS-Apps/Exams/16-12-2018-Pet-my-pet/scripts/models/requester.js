let requester = (() => {
  const kinveyBaseUrl = "https://baas.kinvey.com/";
  const kinveyAppKey = "kid_rJFvCbiFE";   // kid_rJFvCbiFE
  const kinveyAppSecret = "22b25975aa7647269b089d7babcbe4cd";   // 22b25975aa7647269b089d7babcbe4cd

  // Creates the authentication header
  function makeAuth(type) {
    return type === 'basic'
      ? 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
      : 'Kinvey ' + sessionStorage.getItem('authtoken');
  }

  // Creates request object to kinvey
  function makeRequest(method, firstPart, endpoint, auth) {
    return req = {
      method,
      url: kinveyBaseUrl + firstPart + '/' + kinveyAppKey + '/' + endpoint,
      headers: {
        'Authorization': makeAuth(auth)
      }
    };
  }

  // Function to return GET promise
  function get(firstPart, endpoint, auth) {
    return $.ajax(makeRequest('GET', firstPart, endpoint, auth));
  }

  // Function to return POST promise
  function post(firstPart, endpoint, auth, data) {
    let req = makeRequest('POST', firstPart, endpoint, auth);
    req.data = data;
    return $.ajax(req);
  }

  // Function to return PUT promise
  function update(firstPart, endpoint, auth, data) {
    let req = makeRequest('PUT', firstPart, endpoint, auth);
    req.data = data;
    return $.ajax(req);
  }

  // Function to return DELETE promise
  function remove(firstPart, endpoint, auth) {
    return $.ajax(makeRequest('DELETE', firstPart, endpoint, auth));
  }

  return {
    get,
    post,
    update,
    remove
  }
})()