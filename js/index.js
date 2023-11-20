//@ts-check

import { getMeals, pillTML, valToStrings } from './shared.js';

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
 * - grabs and parses a comma separated string from the `#tagInput`
 * - adds those tags to `#filterTagList`
 * - binds the {@link killPill} click handler
 * - clears `#tagInput`
 * - adds tags to `sessionStorage`
 */
function addTag() {
  const tagInput = valToStrings($('#tagInput').val());
  tagInput.forEach((tag) => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
  $('#tagInput').val('');
  // add new tags to the existing tags
  const { tags } = getSession();
  setTags(tags.concat(...tagInput));
}

/**
 * a click handler to remove the target tag from the UI and `sessionStorage`
 */
function killPill() {
  const toKill = $(this).parent().find('.c-tag-pill-data')[0].innerText;
  const { tags } = getSession();
  setTags(tags.filter((tag) => tag !== toKill));
  $(this).parent().remove();
}

/**
 * the main logic function to help decide where/what to eat
 */
function decideToEat() {
  const meals = getMeals();
  const { tags, type } = getSession();

  const results = meals.filter((meal) => {
    if (meal.type !== type) return false;
    if (!tags.length) return true;
    return meal.tags.some((mealTag) =>
      tags.some((tag) => {
        const lowerMealTag = mealTag.toLowerCase();
        const lowerTag = tag.toLowerCase();
        return lowerMealTag.includes(lowerTag) || lowerTag.includes(lowerMealTag);
      })
    );
  });

  const fallback = 'Nothing...';
  const decision =
    results.map((result) => result.name)[Math.floor(Math.random() * results.length)] || fallback;

  $('#resultsArea').empty().append(`<h1 class="display-4">${decision}</h1>`);
  if (decision === fallback) $('#resultsArea').append(`<p>No meals matched the type and tags</p>`);
}

/**
 * - toggles state of the `#eatInBtn` and untoggles the `#eatOutBtn`
 * - sets the `sessionStorage` value for `innout` to `Cook at Home`
 */
function eatIn() {
  $('#eatInBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatOutBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  setInnout('Cook at Home');
}

/**
 * - toggles the state of the `#eatOutBtn` and untoggles the `#eatInBtn`
 * - sets the `sessionStorage` value for `innout` to `Restaurant`
 */
function eatOut() {
  $('#eatOutBtn').removeClass('btn-outline-primary').addClass('btn-primary');
  $('#eatInBtn').removeClass('btn-primary').addClass('btn-outline-primary');
  setInnout('Restaurant');
}

/**
 * sets the state of `#eatOutBtn` and `#eatInBtn` based on the `sessionStorage`
 * value of `innout`
 */
function getInnout() {
  const { type } = getSession();
  if (type === 'Cook at Home') eatIn();
  else if (type === 'Restaurant') eatOut();
}

/**
 * grabs `tags` from `sessionStorage` and populates them in the UI
 */
function populateTags() {
  const { tags } = getSession();
  tags.forEach((tag) => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}

/**
 * gets session storage info
 */
export function getSession() {
  const sessionTags = window.sessionStorage.getItem('tags');
  /** @type string[] */
  const tags = sessionTags ? JSON.parse(sessionTags) : [];

  const sessionType = window.sessionStorage.getItem('innout');
  /** @type {'Cook at Home' | 'Restaurant' | null } */
  const type = sessionType === 'Cook at Home' ? sessionType : 'Restaurant';

  return { tags, type };
}

/**
 * @param {string[]} value
 */
export function setTags(value) {
  window.sessionStorage.setItem('tags', JSON.stringify(value));
}
/**
 * @param {'Cook at Home' | 'Restaurant'} value
 */
export function setInnout(value) {
  window.sessionStorage.setItem('innout', value);
}
