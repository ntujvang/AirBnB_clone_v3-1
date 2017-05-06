$(document).ready(function () {
  let dlist = {};
  $('.small-list li input').change(function () {
    if (this.checked) {
      dlist[($(this).attr('data-id'))] = $(this).attr('data-name');
    } else {
      delete dlist[($(this).attr('data-id'))];
    }
    let string = Object.values(dlist).join(', ');
    $('.amenities H4').text(string);
  });
});
