function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com';
  const appKey = 'kid_HyVcenuu4';
  const username = 'guest';
  const password = 'guest';

  let loadPostsBtn = $('button#btnLoadPosts');
  let viewPostBtn = $('button#btnViewPost');
  let selectEl = $('select#posts');
  let postTitleEl = $('h1#post-title');
  let postBodyUl = $('ul#post-body');
  let commentsUl = $('ul#post-comments');

  function onLoadPostsSuccess(posts) {
    console.log(posts);
    posts.forEach(post => {
      let id = post._id;

      let option = $(`<option value="${id}">${post.title}</option>`);
      selectEl.append(option);
    });
  }

  function onLoadPostsClick() {
    $.ajax({
      method: 'GET',
      url: baseUrl + '/appdata/' + appKey + '/posts',
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      success: onLoadPostsSuccess,
      error: err => console.log(err)
    });
  }

  function onViewPostClick() {
    let selectedPostId = selectEl[0].value;

    Promise.all([
      $.ajax({
        method: 'GET',
        url: baseUrl + '/appdata/' + appKey + '/posts/' + selectedPostId,
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
      }),
      $.ajax({
        method: 'GET',
        url: baseUrl + '/appdata/' + appKey + `/comments/?query={"post_id":"${selectedPostId}"}`,
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
      })
    ]).then(data => {
      let [post, commentsArr] = data;

      postTitleEl.text(post.title);
      postBodyUl.text(post.body);

      commentsUl.empty();
      commentsArr.forEach(comment => {
        let li = $(`<li>${comment.text}</li>`);
        commentsUl.append(li);
      });
    });
  }

  loadPostsBtn.on('click', onLoadPostsClick);
  viewPostBtn.on('click', onViewPostClick);
}