function addTag() {
   let input = $('#tagInput');
   pageData.tags[input.val()] = input.val();
   console.log(pageData.tags);
   input.val('');
}

function decideToEat() {
   type = $('#typeBtn').text().trim().toLowerCase();
   let db = Object.values(window.localStorage);
   console.log(db);
   $('#resultsArea').empty().append(pageData.innout);
}

function eatIn() {
   $('#eatInBtn').removeClass('btn-outline-primary').addClass('btn-primary');
   $('#eatOutBtn').removeClass('btn-primary').addClass('btn-outline-primary');
   pageData.innout = 'in';
}

function eatOut() {
   $('#eatOutBtn').removeClass('btn-outline-primary').addClass('btn-primary');
   $('#eatInBtn').removeClass('btn-primary').addClass('btn-outline-primary');
   pageData.innout = 'out';
}
