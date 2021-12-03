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

function addAnEntry(entry) {
  var ulListEntries = document.createElement('ul');
  ulListEntries.setAttribute('class', 'list-entries');

  var liRowListItem = document.createElement('li');
  liRowListItem.setAttribute('class', 'row list-item');

  var div1ColumnHalf = document.createElement('div');
  div1ColumnHalf.setAttribute('class', 'column-half');

  var imgDisplayedImage = document.createElement('img');
  imgDisplayedImage.setAttribute('src', 'https://www.bbvaopenmind.com/wp-content/uploads/2015/12/Ada_Lovelace_Chalon_portrait-1-1024x1024-1.jpg');
  imgDisplayedImage.setAttribute('alt', 'Ada Lovelace');
  imgDisplayedImage.setAttribute('class', 'displayed-image');

  var div2ColumnHalf = document.createElement('div');
  div2ColumnHalf.setAttribute('class', 'column-half');

  var h1 = document.createElement('h1');
  h1.textContent = 'Ada Lovelace';

  var p = document.createElement('p');
  p.textContent = 'Augusta Ada King, Countess of Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage\'s proposed mechanical general-purpose computer, the Analytical Engine.';

  ulListEntries.appendChild(liRowListItem);
  liRowListItem.appendChild(div1ColumnHalf);
  div1ColumnHalf.appendChild(imgDisplayedImage);
  liRowListItem.appendChild(div2ColumnHalf);
  div2ColumnHalf.appendChild(h1);
  div2ColumnHalf.appendChild(p);

  return ulListEntries;
}
addAnEntry();
