let db = window.localStorage;

function addMealOption() {
   let row = {
      name: $('#mealInput').val(),
      type: $('#typeSelect').val(),
      tags: $('#tagInput')
         .val()
         .split(',')
         .map(x => x.trim()),
   };
   if (row.name === '' || row.type === '') return;
   db.setItem(row.name, JSON.stringify(row));
   location.reload();
}

function clearLocalStorage() {
   if (
      confirm('This will remove all your meal ideas. Are you sure you want to continue?')
   )
      db.clear();
   location.reload();
}

function loadTable() {
   let db = Object.values(window.localStorage).map(x => JSON.parse(x));
   let table = $('#mealsTable');
   table.empty();
   db.forEach(row => {
      table.append(`<tr class="c-clickable">
         <td>${row.name}</td>
         <td>${row.type === 'in' ? 'Cook at Home' : 'Restaurant'}</td>
         <td>${row.tags}</td>
      </tr>`);
   });
}
