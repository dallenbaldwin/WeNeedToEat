//@ts-check

import { pillTML, valToStrings } from './shared.js';

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
  const tags = valToStrings($('#tagInput').val());
  tags.forEach((tag) => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
  $('#tagInput').val('');
  // add new tags to the existing tags
  const session = window.sessionStorage;
  const currentTags = session.getItem('tags');
  if (currentTags === null) {
    session.setItem('tags', JSON.stringify(tags));
  } else {
    const totalTags = JSON.parse(currentTags).concat(tags);
    session.setItem('tags', JSON.stringify(totalTags));
  }
}

/**
 * a click handler to remove the target tag from the UI and `sessionStorage`
 */
function killPill() {
  const toKill = $(this).parent().find('.c-tag-pill-data')[0].innerText;
  const session = window.sessionStorage;
  const sessionValue = session.getItem('tags');
  if (!sessionValue) return;
  const tags = JSON.parse(sessionValue);
  session.setItem('tags', JSON.stringify(tags.filter((tag) => tag !== toKill)));
  $(this).parent().remove();
}

/**
 * the main logic function to help decide where/what to eat
 */
function decideToEat() {
  const db = Object.values(window.localStorage).map((x) => JSON.parse(x));
  const session = window.sessionStorage;
  const sessionValue = session.getItem('tags');
  if (!sessionValue) return;
  const tags = JSON.parse(sessionValue);
  const type = session.getItem('innout')?.toLowerCase();
  // remove entries that aren't the selected type
  let results = db.filter((entry) => entry.tags.map((tag) => tag.toLowerCase()).includes(type));
  // remove entries that don't have the desired tags
  if (tags && !!tags.length)
    results = results.filter((result) => result.tags.some((tag) => tags.includes(tag)));

  const fallback = 'Nothing...';
  const rand =
    results.map((result) => result.name)[Math.floor(Math.random() * results.length)] || fallback;
  // <h1 class="display-4"></h1>

  $('#resultsArea').empty().append(`<h1 class="display-4">${rand}</h1>`);
  if (rand === fallback) $('#resultsArea').append(`<p>No meals matched the type and tags</p>`);
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
  JSON.parse(tags).forEach((tag) => $('#filterTagList').append(pillTML(tag)));
  $('.c-tag-pill-delete').click(killPill);
}
