/**
 * initializing function
 */
function init() {
  getInnout();
  populateTags();
  $('#decideBtn').click(decideToEat);
  $('#eatInBtn').click(eatIn);
  $('#eatOutBtn').click(eatOut);
  $('#tagInput').change(addTag);
}

function pillTML(tag) {
  if (tag.length === 0) return;
  return `<li class="c-tag-pill">
         <span class="c-tag-pill-data">${tag}</span>
         ${
           tag === 'Restaurant' || tag === 'Cook at Home'
             ? ''
             : `<span class="c-tag-pill-delete">&times;</span>`
         }
      </li>`;
}

function addTag() {
  let newTags = $('#tagInput')
    .val()
    .split(',')
    .map(x => x.trim())
    .filter(x => x.length > 0);
  newTags.forEach(tag => {
    $('#filterTagList').append(pillTML(tag));
  });
  $('.c-tag-pill-delete').click(killPill);
  $('#tagInput').val('');
  // add new tags to the existing tags
  let tempDB = window.sessionStorage;
  let currentTags = tempDB.getItem('tags');
  if (currentTags === null) {
    tempDB.setItem('tags', JSON.stringify(newTags));
  } else {
    let totalTags = JSON.parse(currentTags).concat(newTags);
    tempDB.setItem('tags', JSON.stringify(totalTags));
  }
}

function killPill() {
  let tag = $(this).parent().find('.c-tag-pill-data')[0].innerText;
  let tempDB = window.sessionStorage;
  let tags = JSON.parse(tempDB.getItem('tags'));
  tempDB.setItem('tags', JSON.stringify(tags.filter(x => x !== tag)));
  $(this).parent().remove();
}

function decideToEat() {
  let db = Object.values(window.localStorage).map(x => JSON.parse(x));
  let tempDB = window.sessionStorage;
  let tags = JSON.parse(tempDB.getItem('tags'));
  let type = tempDB.getItem('innout').toLowerCase();
  // remove entries that aren't the selected type
  let results = db.filter(entry =>
    entry.tags.map(tag => tag.toLowerCase()).includes(type)
  );
  // remove entries that don't have the desired tags
  if (tags && tags.length > 0)
    results = results.filter(x => x.tags.some(y => tags.includes(y)));

  let rand =
    results.map(x => x.name)[Math.floor(Math.random() * results.length)] || 'Nothing...';
  // <h1 class="display-4"></h1>

  $('#resultsArea').empty().append(`<h1 class="display-4">${rand}</h1>`);
  if (rand === 'Nothing...')
    $('#resultsArea').append(`<p>No meals matched the type and tags</p>`);
}

function eatIn() {
  $('#eatInBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatOutBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  window.sessionStorage.setItem('innout', 'Cook at Home');
}

function eatOut() {
  $('#eatOutBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatInBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  window.sessionStorage.setItem('innout', 'Restaurant');
}

function getInnout() {
  let innout = window.sessionStorage.getItem('innout');
  if (innout === null) {
    eatIn();
  } else if (innout === 'Cook at Home') {
    eatIn();
  } else if (innout === 'Restaurant') {
    eatOut();
  }
}

function populateTags() {
  let tags = window.sessionStorage.getItem('tags');
  if (tags === null) return;
  JSON.parse(tags).forEach(tag => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}
