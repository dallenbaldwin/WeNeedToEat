/**
 * an initializer function for the meals page
 */
export function init() {
  loadTable();
  $('#deleteMealBtn').click(deleteMeal);
  $('#resetBtn').click(clearLocalStorage);
  $('#confirmClearBtn').click(confirmClearLocalStorage);
  $('#doneBtn').click(addMealOption);
  $('tr').click(editRow);
  $('#saveMealBtn').click(saveEdits);
  $('#modalAddTagInput').change(addTag);
}

/**
 * adds meal options from `#mealInput`, `#tagInput` and `#typeSelect` to
 * `localStorage`
 *
 * this will reload the page
 * @returns
 */
function addMealOption() {
  if ($('#mealInput').val() === '' || $('#typeSelect').val() === '') return;
  let type = $('#typeSelect').val();
  let tags = $('#tagInput')
    .val()
    .split(',')
    .map(x => x.trim())
    .filter(x => x.length > 0);
  tags.push(type === 'in' ? 'Cook at Home' : 'Restaurant');
  let row = {
    name: $('#mealInput').val(),
    tags: tags,
  };
  window.localStorage.setItem(row.name, JSON.stringify(row));
  location.reload();
}

/**
 * finds a meal from the `placeholder` of `#modalMealNameInput` and removes it
 * from `localStorage`
 *
 * this will reload the page
 */
function deleteMeal() {
  let key = $('#modalMealNameInput').attr('placeholder');
  window.localStorage.removeItem(key);
  location.reload();
}

/**
 * toggles the `#clearDBModal` modal
 */
function clearLocalStorage() {
  $('#clearDBModal').modal('toggle');
}

/**
 * deletes all data from `localStorage`
 *
 * this will reload the page
 */
function confirmClearLocalStorage() {
  window.localStorage.clear();
  location.reload();
}

/**
 * gets data from `localStorage` and populates `#mealsTable` with "jsx"
 */
function loadTable() {
  let db = Object.values(window.localStorage).map(x => JSON.parse(x));
  let table = $('#mealsTable');
  table.empty();
  db.forEach(row => {
    table.append(`<tr class="c-clickable">
            <td>${row.name}</td>
            <td>${row.tags.join(', ')}</td>
         </tr>`);
  });
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
             : `<span class="c-tag-pill-delete">&times;</span>`
         }
      </li>`;
}

/**
 * populates and adds click hanlders for a comma separated list of tags
 * defined with `#modalAddTagInput`
 */
function addTag() {
  let newTags = $('#modalAddTagInput').val().split(',');
  newTags.forEach(tag => {
    $('#editModalTagList').append(pillTML(tag));
  });
  $('.c-tag-pill-delete').click(killPill);
  $('#modalAddTagInput').val('');
}

/**
 * a click handler to remove a pill from a list
 */
function killPill() {
  $(this).parent().remove();
}

/**
 * toggles the `#editRecordModal` modal and populates it with metadata found in
 * `localStorage` for the clicked row
 *
 * binds {@link killPill} to each pill generated with {@link pillTML}
 */
function editRow() {
  $('#editRecordModal').modal('toggle');
  let mealData = JSON.parse(window.localStorage.getItem($(this).children()[0].innerText));
  $('#modalMealNameInput').attr('placeholder', mealData.name);
  let list = $('#editModalTagList');
  list.empty();
  mealData.tags.forEach(tag => {
    $('#editModalTagList').append(pillTML(tag));
  });
  $('.c-tag-pill-delete').click(killPill);
}

/**
 * replaces metadata in `localStorage` with metadata for the key
 * found in the `placeholder` for `#modalMealNameInput`
 *
 * this will reload the page
 */
function saveEdits() {
  let input = $('#modalMealNameInput');
  let mealName = input.val() === '' ? input.attr('placeholder') : input.val();
  let tags = [];
  $('#editModalTagList')
    .find('.c-tag-pill-data')
    .each(function () {
      tags.push($(this).text());
    });
  let newData = {
    name: mealName,
    tags: tags,
  };
  let db = window.localStorage;
  db.removeItem(input.attr('placeholder'));
  db.setItem(mealName, JSON.stringify(newData));
  location.reload();
}
