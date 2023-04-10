/**
 * initializing function for the main page
 */
export function init() {
  getInnout();
  populateTags();
  $('#decideBtn').click(decideToEat);
  $('#eatInBtn').click(eatIn);
  $('#eatOutBtn').click(eatOut);
  $('#tagInput').change(addTag);
}

/**
 * returns the "jsx" for a pill style tag
 *
 * tags with zero length are ignored
 *
 * if the tag is `Restaurant` or `Cook at Home`, it won't be deletable
 *
 * @param {string} tag the text to put inside the tag
 * @returns nothing or poor man's jsx
 */
function pillTML(tag) {
  if (tag.length === 0) return;
  return `<li class="c-tag-pill">
         <span class="c-tag-pill-data">${tag}</span>
         ${
           tag === 'Restaurant' || tag === 'Cook at Home'
             ? ''
             : `<span class="c-tag-pill-delete c-clickable">&times;</span>`
         }
      </li>`;
}

/**
 * - grabs and parses a comma separated string from the `#tagInput`
 * - adds those tags to `#filterTagList`
 * - binds the {@link killPill} click handler
 * - clears `#tagInput`
 * - adds tags to `sessionStorage`
 */
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

/**
 * a click handler to remove the target tag from the UI and `sessionStorage`
 */
function killPill() {
  let tag = $(this).parent().find('.c-tag-pill-data')[0].innerText;
  let tempDB = window.sessionStorage;
  let tags = JSON.parse(tempDB.getItem('tags'));
  tempDB.setItem('tags', JSON.stringify(tags.filter(x => x !== tag)));
  $(this).parent().remove();
}

/**
 * the main logic function to help decide where/what to eat
 */
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

/**
 * - toggles state of the `#eatInBtn` and untoggles the `#eatOutBtn`
 * - sets the `sessionStorage` value for `innout` to `Cook at Home`
 */
function eatIn() {
  $('#eatInBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatOutBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  window.sessionStorage.setItem('innout', 'Cook at Home');
}

/**
 * - toggles the state of the `#eatOutBtn` and untoggles the `#eatInBtn`
 * - sets the `sessionStorage` value for `innout` to `Restaurant`
 */
function eatOut() {
  $('#eatOutBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatInBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  window.sessionStorage.setItem('innout', 'Restaurant');
}

/**
 * sets the state of `#eatOutBtn` and `#eatInBtn` based on the `sessionStorage`
 * value of `innout`
 */
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

/**
 * grabs `tags` from `sessionStorage` and populates them in the UI
 */
function populateTags() {
  let tags = window.sessionStorage.getItem('tags');
  if (tags === null) return;
  JSON.parse(tags).forEach(tag => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}
