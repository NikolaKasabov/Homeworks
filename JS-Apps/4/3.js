function loadRepos() {
  let ulEl = $('ul#repos');
  let username = $('input#username').val();
  let url = `https://api.github.com/users/${username}/repos`;

  $.ajax({
    method: 'GET',
    url,
    success: onLoadReposSuccess,
    error: err => console.log(err)
  });

  function onLoadReposSuccess(reposArr) {
    ulEl.empty();

    reposArr.forEach(repo => {
      let li = $('<li>');
      let a = $(`<a href="${repo.html_url}">${repo.full_name}</a>`);
      li.append(a);
      ulEl.append(li);
    });
  }
}