function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/appdata/';
  const appKey = 'kid_HJ6K0HidV';
  const collectionName = 'biggestCatches';
  const authString = 'Basic ' + btoa('guest:guest');
  const $catchesDiv = $('div#catches');

  function onLoadClick() {
    $.ajax({
      method: 'GET',
      url: baseUrl + appKey + '/' + collectionName,
      headers: {
        Authorization: authString
      },
      success: onLoadDataSuccess
    });
  }

  $('button.load').on('click', onLoadClick);

  function onLoadDataSuccess(data) {
    $catchesDiv.empty();
    data.forEach(obj => {
      let $mainDiv = $(`<div class="catch" data-id="${obj._id}"></div`);
      let $angler = $(`<input type="text" class="angler" value="${obj.angler}" />`);
      let $weight = $(`<input type="number" class="weight" value="${obj.weight}" />`);
      let $species = $(`<input type="text" class="species" value="${obj.species}" />`);
      let $location = $(`<input type="text" class="location" value="${obj.location}" />`);
      let $bait = $(`<input type="text" class="bait" value="${obj.bait}" />`);
      let $captureTime = $(`<input type="number" class="captureTime" value="${obj.captureTime}" />`);
      let $updateBtn = $('<button class="update">Update</button>').click(onUpdateClick);
      let $deleteBtn = $('<button class="delete">Delete</button>').click(onDeleteClick);

      $mainDiv.append(
        '<label>Angler</label>',
        $angler,
        '<label>Weight</label>',
        $weight,
        '<label>Species</label>',
        $species,
        '<label>Location</label>',
        $location,
        '<label>Bait</label>',
        $bait,
        '<label>Capture Time</label>',
        $captureTime,
        $updateBtn,
        $deleteBtn
      );

      $catchesDiv.append($mainDiv);
    });
  }

  function onUpdateClick(ev) {
    let currentDiv = $(ev.target).parent(); 
    let currentId = currentDiv.attr('data-id');
    let angler = currentDiv.find('.angler').val();
    let weight = currentDiv.find('.weight').val();
    let species = currentDiv.find('.species').val();
    let location = currentDiv.find('.location').val();
    let bait = currentDiv.find('.bait').val();
    let captureTime = currentDiv.find('.captureTime').val();

    $.ajax({
      method: 'PUT',
      url: `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${currentId}`,
      headers: {
        'Content-type': 'application/json',
        Authorization: authString
      },
      data: JSON.stringify({
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
      })
    });
  }

  function onDeleteClick(ev) {
    let currentDiv = $(ev.target).parent();
    let currentId = currentDiv.attr('data-id');

    $.ajax({
      method: 'DELETE',
      url: `https://baas.kinvey.com/appdata/${appKey}/biggestCatches/${currentId}`,
      headers: {
        'Content-type': 'application/json',
        Authorization: authString
      },
      success: () => currentDiv.remove()
    });
  }

  function onAddClick() {
    let angler = $('#addForm .angler').val();
    let weight = Number($('#addForm .weight').val());
    let species = $('#addForm .species').val();
    let location = $('#addForm .location').val();
    let bait = $('#addForm .bait').val();
    let captureTime = Number($('#addForm .captureTime').val());

    $.ajax({
      method: 'POST',
      url: `https://baas.kinvey.com/appdata/${appKey}/biggestCatches`,
      headers: {
        Authorization: authString,
        'Content-type': 'application/json'
      },
      data: JSON.stringify({
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
      })
    });
  }

  $('button.add').on('click', onAddClick);
}