// @ts-check

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
  const permanent = ['Restaurant', 'Cook at Home'].includes(tag);
  if (permanent) return '';
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
 * @param {string | number | string[] | undefined} val the value that comes back from jQuery's `val()` method
 */
export function valToStrings(val) {
  if (!val) return [];
  let parsed;
  if (typeof val === 'number') parsed = [val.toString()];
  else if (!Array.isArray(val))
    parsed = val
      .split(',')
      .map((v) => v.trim())
      .filter((v) => !!v.length);
  else parsed = val;
  return parsed;
}
