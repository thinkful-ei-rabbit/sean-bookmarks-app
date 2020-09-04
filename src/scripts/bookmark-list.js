'use_strict';

import $ from 'jquery';
import api from './api';
import store from './store';
import '../css/main.css';

function generateMainPage() {
  return `
  <section class="container">
    <h1>my bookmarks</h1>
    <div class="error-container "></div>
    <div class="even-flex js-add-bookmark-button ">
      <button class='js-add-bookmark '></button>
        <label> rating filter
          <select class='js-filter-rating aria-labelledby="rating">'>
            <option value="0">Sort by stars</option>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
            <option value="5">5 stars</option>
          </select>
        </label>
      </div>
    <div id="js-add-new-bookmark" class="js-add-new-bookmark"></div>
  </section>
  <section class="container">
    <ul id="js-bookmark-list" class="bookmark-list">
    </ul>
  </section>
  `;
};

function generateBookmarkAddForm() {
  return `
    <form id="js-add-new-bookmark-form" class="js-add-new-bookmark-form">
      <div class="even-flex flex-direction">
        <fieldset class="flex-desktop">
          <legend>title</legend>
          <input type="text" name="title" class="js-bookmark-title-entry" placeholder="Enter Bookmark Name" required />
        </fieldset>
        <fieldset class="flex-desktop">
          <legend>url</legend>
          <input type="text" name="url" class="js-bookmark-url-entry" placeholder="Enter URL" required />
        </fieldset>
      </div>
        <fieldset>
          <legend>description</legend>
          <textarea name="desc" class="js-bookmark-desc-entry textarea-newadd" maxlength="255" placeholder="Say something about the site" required></textarea>
        </fieldset>
      <figure class="flex-between">
        <div class="rating left-side star-size">
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>   
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
        </div>
        <button class="right-side add-button" type="submit">add bookmark</button>
      </figure>
    </form>
  `;
};

function generateBookmarkElement(bookmark, stars) {
  return `
    <li class="js-bookmark-item " data-item-id="${bookmark.id}">
      <section class="top-half" tabindex=0>
        <h2>${bookmark.title}</h2>
      </div>
      <div class="bottom-half">
        <div class="rating even-flex">
        <span class="icon background-stars">✵✵✵✵✵</span>
        ${stars}
        </div>
      </section>
    </li>
  `;
};

function generateExpandedBookmarkElement(bookmark) {
  return `

    <li class="js-bookmark-item" data-item-id="${bookmark.id}">
      <section class="top-half flex-details" tabindex=0>
      <h2>${bookmark.title}</h2>
          <button class="flex-button" onclick=" window.open('${bookmark.url}','_blank')">visit</button>
          <textarea name="desc" class="js-bookmark-desc-entry flex-desc" maxlength="255" required>${bookmark.desc}</textarea>
      </section>
      <div class="bottom-half flex-between">
        <div class="rating left-side">
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating == 1 ? 'checked' : '' } required/>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating == 2 ? 'checked' : '' } />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating == 3 ? 'checked' : '' } />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>   
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating == 4 ? 'checked' : '' } />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
          <label>
            <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating == 5 ? 'checked' : '' } />
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
            <span class="icon">✵</span>
          </label>
        </div>
        <div class="right-side">
          <button class="js-bookmark-save expand-buttons ">save</button>
          <button class="js-bookmark-delete expand-buttons ">delete</button>
        </div>
      </div>
    </li>
  `;
};

function generateStarRating(number) {
  let stars = '';
  for(let i = 0; i < number; i++) {
    stars += '✵'; 
  }
  return `<span class="icon colored-stars">${stars}</span>`;
};

function generateBookmarkListString(bookmarkList) {
  const bookmarks = bookmarkList
    .filter((bookmark) => {
      return bookmark.rating >= store.rating;
    }).map((bookmark) => (!bookmark.expand) ? generateBookmarkElement(bookmark, generateStarRating(bookmark.rating)) : generateExpandedBookmarkElement(bookmark));
  return bookmarks.join('');
};

function render() {
  renderError();
  $('main').html(generateMainPage);
  if (store.addNewBookmark) {
    $('.js-add-new-bookmark').html(generateBookmarkAddForm());
  } else {
    $('.js-add-new-bookmark').empty();
  }
  let bookmarks = [...store.bookmarks];
  const bookmarkListString = generateBookmarkListString(bookmarks);
  $('.js-add-bookmark').html(!store.addNewBookmark ? 'add bookmark' : 'cancel');
  $('#js-bookmark-list').html(bookmarkListString);
};

function generateError(message) {
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
};

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

function handleCloseError() {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};

function getItemIdFromElement(item) {
  return $(item)
    .closest('.js-bookmark-item')
    .data('item-id');
};

function handleNewBookmarkClick() {
  $('main').on('click','.js-add-bookmark', event => {
    store.toggleAddNewBookmark();
    render();
  });
};

function handleSubmitNewBookmark() {
  $('main').on('submit', '.js-add-new-bookmark-form', event => {
    event.preventDefault();
    const newBookmarkData = $(event.target).serializeJson();
    api.createBookmark(newBookmarkData)
      .then((newBookmark) => {
        store.addBookmark(newBookmark);
        store.toggleAddNewBookmark();
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

function handleClickToExpandBookmark() {
  $('main').on('click', '.top-half', event => {
    const bookmarkId = getItemIdFromElement(event.currentTarget);
    const bookmark = store.findById(bookmarkId);
    store.findAndUpdate(bookmarkId, {expand: !bookmark.expand});
    render();
    store.bookmarks.forEach(bookmark => bookmark.expand = false);
  });
};

function handleKeyPressToExpandBookmark() {
  $('main').on('keydown', '.top-half', event => {
    if (event.key === 'Enter') {
      const bookmarkId = getItemIdFromElement(event.currentTarget);
      const bookmark = store.findById(bookmarkId);
      store.findAndUpdate(bookmarkId, {expand: !bookmark.expand});
      render();
      store.bookmarks.forEach(bookmark => bookmark.expand = false);
    }
  });
};

function handleDeleteBookmark() {
  $('main').on('click', '.js-bookmark-delete', event => {
    const bookmarkId = getItemIdFromElement(event.currentTarget);
    api.deleteBookmark(bookmarkId)
      .then(() => {
        store.findAndDelete(bookmarkId);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

function handleRatingFilterChange() {
  $('main').on('change', '.js-filter-rating', event => {
    store.rating = $(event.target).val();
    render();
  });
};

function handleBookmarkSaveClick() {
  $('main').on('click', '.js-bookmark-save', event => {
    const bookmarkId = getItemIdFromElement(event.currentTarget);
    const newDesc = $('.js-bookmark-desc-entry').val();
    const newRating = $('input[name="rating"]:checked').val();
    const newData = JSON.stringify({desc: newDesc, rating: newRating});
    const parsedNewData = JSON.parse(newData);
    api.updateBookmark(bookmarkId, newData)
      .then(() => {
        store.findAndUpdate(bookmarkId, parsedNewData);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

const bindEventListeners = () => {
  handleCloseError();
  handleNewBookmarkClick();
  handleSubmitNewBookmark();
  handleClickToExpandBookmark();
  handleDeleteBookmark();
  handleRatingFilterChange();
  handleBookmarkSaveClick();
  handleKeyPressToExpandBookmark();
};

export default {
  bindEventListeners,
  render
};