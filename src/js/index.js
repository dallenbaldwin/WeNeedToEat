function decideToEat() {
   type = $('#typeBtn').text().trim().toLowerCase();
   alert(`We're gonna ${type}!`);
}

function changeType() {
   btn = $('#typeBtn');
   if (btn.text().trim() === 'Eat in') btn.text('Eat out');
   else if (btn.text().trim() === 'Eat out') btn.text('Eat in');
}
