/* global data */
/* exported data */

var $photoURLInput = document.querySelector('#url');
var $displayedImage = document.querySelector('.displayed-image');

$photoURLInput.addEventListener('input', showPhotoPreview);
function showPhotoPreview(event) {
  var urlLink = event.target.value;
  function isURL(urlLink) {
    var url;
    try {
      url = new URL(urlLink);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }
  if (isURL(urlLink) !== false) {
    $displayedImage.setAttribute('src', urlLink);
  }
}

var $form = document.querySelector('form');
$form.addEventListener('submit', handleInputs);
function handleInputs(event) {
  event.preventDefault();
  var objectOfValues = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value
  };
  objectOfValues.nextEntryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(objectOfValues);
  $displayedImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
