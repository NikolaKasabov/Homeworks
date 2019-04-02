function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/appdata';
  const appKey = 'kid_HyJ875xtV';
  const collection = 'players';
  const authString = `Basic ${btoa('guest:guest')}`;
  const $players = $('div#players');
  const $newPlayerName = $('input#addName');
  const $addPlayerBtn = $('button#addPlayer');
  let players;

  // get players from kinvey
  async function getPlayers() {
    console.log('in get players...');
    try {
      players = await $.ajax({
        method: 'GET',
        url: `${baseUrl}/${appKey}/${collection}`,
        headers: {
          Authorization: authString,
        },
      });
    } catch (error) {
      console.log(error);
    }

    displayPlayers(players);
  }

  getPlayers();

  // display all players in div#players
  function displayPlayers(playersArr) {
    $players.empty();

    playersArr.forEach((player) => {
      const playerTemplate = `<div class="player" data-id="${player._id}">
        <div class="row">
          <label>Name:</label>
          <label class="name">${player.name}</label>
        </div>
        <div class="row">
          <label>Money:</label>
          <label class="money">${player.money}</label>
        </div>
        <div class="row">
          <label>Bullets:</label>
          <label class="bullets">${player.bullets}</label>
        </div>
        <button class="play">Play</button>
        <button class="delete">Delete</button>
      </div>`;

      $players.append(playerTemplate);
    });

    // add click event handlers to 'Play' and 'Delete' buttons
    $('button.play').on('click', onPlayClick);
    $('button.delete').on('click', onDeleteClick);
  }

  // add new player to kinvey
  function onAddPlayerClick() {
    const name = $newPlayerName.val();
    $.ajax({
      method: 'POST',
      url: `${baseUrl}/${appKey}/${collection}`,
      headers: {
        Authorization: authString,
      },
      data: {
        name,
        money: 500,
        bullets: 6,
      },
      success: () => getPlayers(),
      error: err => console.log(err),
    });
  }

  // add click event listener to 'Add Player' button
  $addPlayerBtn.on('click', onAddPlayerClick);

  // on click 'Play' button
  async function onPlayClick(ev) {
    const currentId = $(ev.target).parent().data('id');

    // TODO...
    try {
      const currentPlayer = await $.ajax({
        method: 'GET',
        url: `${baseUrl}/${appKey}/${collection}/${currentId}`,
        headers: {
          Authorization: authString,
        },
      });
      saving(currentId);   ///////
      showCanvasSaveReload();
      loadCanvas({
        name: currentPlayer.name,
        money: Number(currentPlayer.money),
        bullets: Number(currentPlayer.bullets),
      });
    } catch (error) {
      console.log(error);
    }
  }

  // on click 'Delete' button
  function onDeleteClick(ev) {
    const currentId = $(ev.target).parent().data('id');

    // TODO...
  }

  // on click 'Save' button
  function onSaveClick(ev) {
    // TODO...
  }

  function saving(playerId) {
    
  }

  function showCanvasSaveReload() {
    $('button#save').show();
    $('button#reload').show();
    $('canvas').show();
  }

  function hideCanvasSaveReload() {
    $('button#save').hide();
    $('button#reload').hide();
    $('canvas').hide();
  }
}
