// @ts-check

import { pillTML, valToStrings } from './shared.js';

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
  const [name] = valToStrings($('#mealInput').val());
  const [type] = valToStrings($('#typeSelect').val());
  if (!name || !type) return;
  const tags = valToStrings($('#tagInput').val());
  // TODO don't add this as a tag. add it as a prop
  tags.push(type === 'in' ? 'Cook at Home' : 'Restaurant');
  const row = { name, tags };
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
  const key = $('#modalMealNameInput').attr('placeholder');
  if (!key) return;
  window.localStorage.removeItem(key);
  location.reload();
}

/**
 * toggles the `#clearDBModal` modal
 */
function clearLocalStorage() {
  // @ts-expect-error bootstrap wants to you access the modal this way
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
  let db = Object.values(window.localStorage).map((x) => JSON.parse(x));
  let table = $('#mealsTable');
  table.empty();
  db.forEach((row) => {
    table.append(`<tr class="c-clickable">
            <td>${row.name}</td>
            <td>${row.tags.join(', ')}</td>
         </tr>`);
  });
}

/**
 * populates and adds click hanlders for a comma separated list of tags
 * defined with `#modalAddTagInput`
 */
function addTag() {
  const tags = valToStrings($('#modalAddTagInput').val());
  tags.forEach((tag) => $('#editModalTagList').append(pillTML(tag)));
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
  // @ts-expect-error bootstrap wants to you access the modal this way
  $('#editRecordModal').modal('toggle');
  const key = window.localStorage.getItem($(this).children()[0].innerText);
  if (!key) return;
  const mealData = JSON.parse(key);
  $('#modalMealNameInput').attr('placeholder', mealData.name);
  const list = $('#editModalTagList');
  list.empty();
  mealData.tags.forEach((tag) => $('#editModalTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}

/**
 * replaces metadata in `localStorage` with metadata for the key
 * found in the `placeholder` for `#modalMealNameInput`
 *
 * this will reload the page
 */
function saveEdits() {
  const input = $('#modalMealNameInput');
  const [inputVal] = valToStrings(input.val());
  const placeholder = input.attr('placeholder');
  const name = !inputVal ? placeholder : inputVal;
  if (!name) throw new Error('name is undefined!');
  const tags = [];
  $('#editModalTagList')
    .find('.c-tag-pill-data')
    .each(function () {
      tags.push($(this).text());
    });
  const db = window.localStorage;
  db.removeItem(name);
  db.setItem(name, JSON.stringify({ name, tags }));
  location.reload();
}
