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

  $dataViewEntries.classList.remove('hidden');
  $dataViewEntryForm.classList.add('hidden');
  data.view = 'entries';
  location.reload();
}

window.addEventListener('DOMContentLoaded', addAnEntry);
function addAnEntry(entry) {
  var ulListEntries = document.createElement('ul');
  ulListEntries.setAttribute('class', 'list-entries');
  if (data.entries.length > 0) {
    for (var i = 0; i < data.entries.length; i++) {
      var liRowListItem = document.createElement('li');
      liRowListItem.setAttribute('class', 'row list-item');

      var div1ColumnHalf = document.createElement('div');
      div1ColumnHalf.setAttribute('class', 'column-half');

      var imgDisplayedImage = document.createElement('img');
      imgDisplayedImage.setAttribute('src', data.entries[i].url);
      imgDisplayedImage.setAttribute('alt', data.entries[i].title);
      imgDisplayedImage.setAttribute('class', 'displayed-image');

      var div2ColumnHalf = document.createElement('div');
      div2ColumnHalf.setAttribute('class', 'column-half');

      var h1 = document.createElement('h1');
      h1.textContent = data.entries[i].title;

      var p = document.createElement('p');
      p.textContent = data.entries[i].notes;

      ulListEntries.appendChild(liRowListItem);
      liRowListItem.appendChild(div1ColumnHalf);
      div1ColumnHalf.appendChild(imgDisplayedImage);
      liRowListItem.appendChild(div2ColumnHalf);
      div2ColumnHalf.appendChild(h1);
      div2ColumnHalf.appendChild(p);
    }
    $dataViewEntries.appendChild(ulListEntries);
  } else {
    var pNoEntries = document.createElement('p');
    pNoEntries.textContent = 'No entries have been recorded.';
    pNoEntries.setAttribute('class', 'center-text');
    $dataViewEntries.appendChild(pNoEntries);
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
