function loadRepos() {
  let xhr = new XMLHttpRequest();
  let divEl = document.querySelector('div#res');

  xhr.open('get', 'https://api.github.com/users/testnakov/repos');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      divEl.textContent = xhr.responseText;
    }
  };
  xhr.send();
}