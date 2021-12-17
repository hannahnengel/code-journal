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
var $formActions = document.querySelector('div.form-actions');
var $deleteLink = document.querySelector('.delete-link');

$form.addEventListener('submit', handleInputs);
function handleInputs(event) {
  event.preventDefault();
  var objectOfValues = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value
  };

  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].itemEntryId === data.editing.itemEntryId) {
        objectOfValues.itemEntryId = data.entries[i].itemEntryId;
        objectOfValues.nextEntryId = data.entries[i].nextEntryId;
        var itemEntryId = data.editing.itemEntryId;
        data.entries.splice(i, 1);
        var $oldData = document.querySelector('[data-entry-id =' + CSS.escape(itemEntryId) + ']');
        $ulListEntries.removeChild($oldData);
        $formActions.classList.remove('justify-content-space-between');
        $deleteLink.classList.add('hidden');
        data.editing = null;
      }
    }
  } else {
    objectOfValues.itemEntryId = data.nextEntryId;
    data.nextEntryId++;
    objectOfValues.nextEntryId = data.nextEntryId;
  }
  data.entries.push(objectOfValues);
  $displayedImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  openEntriesGallery();
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
    openEntryForm();
  } else if (data.view === 'entries') {
    openEntriesGallery();
  }
  return $dataViewEntries;
}

function renderEntries(entry) {
  var liRowListItem = document.createElement('li');
  liRowListItem.setAttribute('class', 'row list-item');
  liRowListItem.setAttribute('data-entry-id', entry.itemEntryId);

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

$newEntryButton.addEventListener('click', openEntryForm);
function openEntryForm() {
  data.view = 'entry-form';
  $dataViewEntries.classList.add('hidden');
  $dataViewEntryForm.classList.remove('hidden');
}

$entriesLink.addEventListener('click', openEntriesGallery);
function openEntriesGallery() {
  data.view = 'entries';
  $dataViewEntries.classList.remove('hidden');
  $dataViewEntryForm.classList.add('hidden');
  data.editing = null;
}

$ulListEntries.addEventListener('click', function (event) {
  if (event.target && event.target.nodeName === 'I') {
    var closestTarget = event.target.closest('.list-item');
    openEntryForm();
    var closestTargetEntryIdValue = parseInt(closestTarget.getAttribute('data-entry-id'), 10);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].itemEntryId === closestTargetEntryIdValue) {
        data.editing = data.entries[i];
        prePopulateForm(data.editing);
        $formActions.classList.add('justify-content-space-between');
        $deleteLink.classList.remove('hidden');
      }
    }
  }
});

function prePopulateForm(dataToEdit) {
  var $h1Edit = document.querySelector('[data-view= "entry-form"] > h1');
  $h1Edit.textContent = 'Edit Entry';

  var $imgEdit = document.querySelector('img.displayed-image');
  $imgEdit.setAttribute('src', data.editing.url);
  $imgEdit.setAttribute('alt', data.editing.title);

  var $titleEdit = document.querySelector('#title');
  $titleEdit.setAttribute('value', data.editing.title);

  var $urlValueEdit = document.querySelector('#url');
  $urlValueEdit.setAttribute('value', data.editing.url);

  var $notesEdit = document.querySelector('#notes');
  $notesEdit.textContent = data.editing.notes;
}
