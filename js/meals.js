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

function deleteMeal() {
  let key = $('#modalMealNameInput').attr('placeholder');
  window.localStorage.removeItem(key);
  location.reload();
}

function clearLocalStorage() {
  $('#clearDBModal').modal('toggle');
}

function confirmClearLocalStorage() {
  window.localStorage.clear();
  location.reload();
}

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
  let newTags = $('#modalAddTagInput').val().split(',');
  newTags.forEach(tag => {
    $('#editModalTagList').append(pillTML(tag));
  });
  $('.c-tag-pill-delete').click(killPill);
  $('#modalAddTagInput').val('');
}

function killPill() {
  $(this).parent().remove();
}

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
