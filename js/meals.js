// @ts-check

import { getMeals, pillTML, valToStrings } from './shared.js';

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
  const [selectedType] = valToStrings($('#typeSelect').val());
  if (!name || !selectedType) return;
  setMeal({
    name,
    tags: valToStrings($('#tagInput').val()),
    type: selectedType === 'in' ? 'Cook at Home' : 'Restaurant',
  });
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
  const meals = getMeals();
  // fix any exisiting values where the type is in the tags
  meals.forEach((meal) => {
    const index = meal.tags.findIndex((tag) => tag === 'Restaurant' || tag === 'Cook at Home');
    if (index === -1) return;
    const [type] = meal.tags.splice(index, 1);
    // @ts-expect-error we're checking it above
    meal.type = type;
    setMeal(meal);
  });
  const table = $('#mealsTable');
  table.empty();
  meals.forEach(({ name, tags, type }) => {
    table.append(`<tr class="c-clickable">
  <td>${name}</td>
  <td>${type}</td>
  <td>${tags.join(', ')}</td>
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
  const meal = getMeal($(this).children()[0].innerText);
  if (!meal) return;
  $('#modalMealNameInput').attr('placeholder', meal.name);
  $('#modalMealTypeInput').val(meal.type);
  const list = $('#editModalTagList');
  list.empty();
  meal.tags.forEach((tag) => $('#editModalTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}

/**
 * replaces metadata in `localStorage` with metadata for the key
 * found in the `placeholder` for `#modalMealNameInput`
 *
 * this will reload the page
 */
function saveEdits() {
  const nameInput = $('#modalMealNameInput');
  const [inputVal] = valToStrings(nameInput.val());
  const namePlaceholder = nameInput.attr('placeholder');
  const name = !inputVal ? namePlaceholder : inputVal;
  if (!name) throw new Error('name is undefined!');

  const [type] = valToStrings($('#modalMealTypeInput').val());
  if (!type) throw new Error('type is undefined!');

  const tags = [];
  $('#editModalTagList')
    .find('.c-tag-pill-data')
    .each(function () {
      tags.push($(this).text());
    });

  window.localStorage.removeItem(name);
  setMeal({ name, tags, type: type === 'Cook at Home' ? 'Cook at Home' : 'Restaurant' });
  location.reload();
}

/**
 * gets an item from local storage
 *
 * @param {string} name
 */
export function getMeal(name) {
  const item = window.localStorage.getItem(name);
  if (!item) return null;
  const parsed = JSON.parse(item);
  return {
    name: `${parsed.name}`,
    /** @type {'Cook at Home' | 'Restaurant'} */
    type: parsed.type === 'Cook at Home' ? 'Cook at Home' : 'Restaurant',
    /** @type {string[]} */
    tags: Array.isArray(parsed.tags) ? parsed.tags.map((t) => `${t}`) : [],
  };
}

/**
 * sets the supplied value into local storage
 *
 * @param {{
 *  name: string,
 *  tags: string[],
 *  type: 'Restaurant' | 'Cook at Home'
 * }} value the data item
 */
export function setMeal(value) {
  window.localStorage.setItem(value.name, JSON.stringify(value));
}
