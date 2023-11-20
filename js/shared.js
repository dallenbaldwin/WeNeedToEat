// @ts-check

/**
 * pulls the database from local storage
 */
export function getMeals() {
  const meals = Object.values(window.localStorage).map((value) => {
    const parsed = JSON.parse(value);
    return {
      name: `${parsed.name}`,
      /** @type {string[]} */
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      /** @type {'Cook at Home' | 'Restaurant'} */
      type: parsed.type === 'Cook at Home' ? 'Cook at Home' : 'Restaurant',
    };
  });
  return meals;
}

/**
 * creates the html for a pill shaped tag
 *
 * - an li will be the container and will have the `c-tag-pill` class
 * - the tag value will be in a span with `c-tag-pill-data`
 * - if the tag doesn't contain reserved values, it will get a span with
 *   `c-tag-pill-delete` and `c-clickable`
 *
 * @param {string} tag the name of the tag to create a pill style tag for
 */
export function pillTML(tag) {
  if (tag.length === 0) return '';
  return `<li class="c-tag-pill">
    <span class="c-tag-pill-data">${tag}</span>
    <span class="c-tag-pill-delete c-clickable">&times;</span>
  </li>`;
}

/**
 * parses a value that comes from jQuery's `val()` method
 *
 * if a string comes back, it will try to be split on a comma
 *
 * @param value {string | number | string[] | undefined} value the value that comes back from jQuery's `val()` method
 */
export function valToStrings(value = []) {
  if (Array.isArray(value)) return value;
  else if (typeof value === 'number') return [value.toString()];
  else if (typeof value === 'string')
    return value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => !!v.length);
  return [];
}
