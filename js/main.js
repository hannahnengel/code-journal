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

var $dataViewEntryForm = document.querySelector('[data-view= "entry-form"');
var $dataViewEntries = document.querySelector('[data-view="entries"]');
var $newEntryButton = document.querySelector('.new-entry-button');
var $form = document.querySelector('form');
var $entriesLink = document.querySelector('.entries-link');
var $ulListEntries = document.querySelector('ul.list-entries');
var $pNoEntries = document.querySelector('p.center-text');

$form.addEventListener('submit', handleInputs);
function handleInputs(event) {
  event.preventDefault();
  var objectOfValues = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value
  };
  objectOfValues.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(objectOfValues);
  $displayedImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  $dataViewEntries.classList.remove('hidden');
  $dataViewEntryForm.classList.add('hidden');
  data.view = 'entries';

  $ulListEntries.prepend(renderEntries(objectOfValues));
  $pNoEntries.classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', addAnEntry);
function addAnEntry(entry) {
  if (data.entries.length > 0) {
    for (var i = 0; i < data.entries.length; i++) {
      var newEntry = renderEntries(data.entries[i]);
      $ulListEntries.prepend(newEntry);
      $pNoEntries.classList.add('hidden');
    }

  } else {
    $pNoEntries.classList.remove('hidden');
  }
  if (data.view === 'entry-form') {
    $dataViewEntries.classList.add('hidden');
    $dataViewEntryForm.classList.remove('hidden');
  } else if (data.view === 'entries') {
    $dataViewEntries.classList.remove('hidden');
    $dataViewEntryForm.classList.add('hidden');
  }
  return $dataViewEntries;
}

function renderEntries(entry) {
  var liRowListItem = document.createElement('li');
  liRowListItem.setAttribute('class', 'row list-item');
  liRowListItem.setAttribute('data-entry-id', entry.nextEntryId);

  var div1ColumnHalf = document.createElement('div');
  div1ColumnHalf.setAttribute('class', 'column-half');

  var imgDisplayedImage = document.createElement('img');
  imgDisplayedImage.setAttribute('src', entry.url);
  imgDisplayedImage.setAttribute('alt', entry.title);
  imgDisplayedImage.setAttribute('class', 'displayed-image');

  var div2ColumnHalf = document.createElement('div');
  div2ColumnHalf.setAttribute('class', 'column-half');

  var h1 = document.createElement('h1');
  h1.textContent = entry.title;
  h1.setAttribute('class', 'display-flex-wrap-between');
  var icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-pen editing-pen-icon');

  var p = document.createElement('p');
  p.textContent = entry.notes;

  liRowListItem.appendChild(div1ColumnHalf);
  div1ColumnHalf.appendChild(imgDisplayedImage);
  liRowListItem.appendChild(div2ColumnHalf);
  div2ColumnHalf.appendChild(h1);
  h1.appendChild(icon);
  div2ColumnHalf.appendChild(p);

  return liRowListItem;
}

$newEntryButton.addEventListener('click', function (event) {
  data.view = 'entry-form';
  $dataViewEntries.classList.add('hidden');
  $dataViewEntryForm.classList.remove('hidden');
});

$entriesLink.addEventListener('click', function (event) {
  data.view = 'entries';
  $dataViewEntries.classList.remove('hidden');
  $dataViewEntryForm.classList.add('hidden');
});
