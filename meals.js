function addMealOption() {
   if ($('#mealInput').val() === '' || $('#typeSelect').val() === '') return;

   let type = $('#typeSelect').val();
   let tags = $('#tagInput')
      .val()
      .split(',')
      .map(x => x.trim());
   tags.push(type === 'in' ? 'Cook at Home' : 'Restaurant');

   let row = {
      name: $('#mealInput').val(),
      tags: tags,
   };

   window.localStorage.setItem(row.name, JSON.stringify(row));
   location.reload();
}

function deleteMeal() {
   let modal = $('#editRecordModal');
   console.log(modal);
   // window.localStorage.removeItem();
   // location.reload();
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
   <td>${row.tags.map(x => ` ${x}`)}</td>
</tr>`);
   });
}

function editRow() {
   $('#editRecordModal').modal('toggle');
   let mealData = JSON.parse(
      window.localStorage.getItem($(this).children()[0].innerText)
   );
   $('#modalMealNameInput').attr('placeholder', mealData.name);
   let list = $('#editModalTagList');
   list.empty();
   mealData.tags.forEach(tag => {
      $('#editModalTagList').append(`<li class="c-tag-pill">
         ${tag}
         ${
            tag === 'Restaurant' || tag === 'Cook at Home'
               ? ''
               : `<span class="c-tag-pill-delete">&times;</span>`
         }
      </li>`);
   });
}
