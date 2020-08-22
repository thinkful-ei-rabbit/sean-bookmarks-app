'use_strict';

import $ from 'jquery';
import api from './api';
import store from './store';

function generateBookmarkAddForm(){
  return `
    <form id="add-bookmark-form" class="add-bookmark-form">
      <div class="even-flex">
        <fieldset>
          <legend>title</legend>
          <input type="text" name="title" class="js-bookmark-title-entry" placeholder="Enter Bookmark Name" required />
        </fieldset>
        <fieldset>
          <legend>url</legend>
          <input type="text" name="url" class="js-bookmark-url-entry" placeholder="Enter URL" required />
        </fieldset>
      </div>
      <div class="even-flex">
        <fieldset>
          <legend>description</legend>
          <textarea name="desc" class="bookmark-description" cols="100" rows="5" placeholder="Say something about the site" required></textarea>
        </fieldset>
      </div>
      <div class="rating even-flex">
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" required/>
          <span class="icon">*</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" />
          <span class="icon">*</span>
          <span class="icon">*</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" />
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>   
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" />
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>
        </label>
        <label>
          <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" />
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>
          <span class="icon">*</span>
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  `;
};

function generateBookmarkElement(bookmark){
  if (bookmark.rating >= store.rating) {
    if (!bookmark.expand) {
      return `
        <li class="js-bookmark-item" data-item-id="${bookmark.id}">
          <div class="top-half" tabindex=0>
            <h2>${bookmark.title}</h2>
          </div>
          <div class="bottom-half">
            <div class="rating even-flex">
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="1" ${bookmark.rating === 1 ? 'checked' : '' } required/>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="2" ${bookmark.rating === 2 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="3" ${bookmark.rating === 3 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>   
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="4" ${bookmark.rating === 4 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating-${bookmark.id}" class="js-bookmark-rating-entry" value="5" ${bookmark.rating === 5 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
            </div>
          </div>
        </li>
      `;
    } else {
      return `
        <li class="js-bookmark-item" data-item-id="${bookmark.id}">
          <div class="top-half" tabindex=0>
            <h2>${bookmark.title}</h2>
          </div>
          <div>
            <form class="js-edit-desc">
              <textarea name="desc" class="bookmark-description" cols="100" rows="5" required>${bookmark.desc}</textarea>
            </form>
          </div>
          <div class="bottom-half appart-flex">
            <div class="rating left-side">
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="1" ${bookmark.rating === 1 ? 'checked' : '' } required/>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="2" ${bookmark.rating === 2 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="3" ${bookmark.rating === 3 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>   
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="4" ${bookmark.rating === 4 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
              <label>
                <input type="radio" name="rating" class="js-bookmark-rating-entry" value="5" ${bookmark.rating === 5 ? 'checked' : '' } />
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
                <span class="icon">*</span>
              </label>
            </div>
            <div class="even-flex right-side">
              <a class="button delete-visit js-bookmark-delete">Delete Site</a> 
              <a class="btn delete-visit" target="_blank" href="${bookmark.url}">Go to Site</a>
            </div>
          </div>
        </li>
      `;
    }
  } else {
    return '';
  }
}

/*
154 was <i class="fas fa-dumpster-fire js-bookmark-delete"></i> 
155 was <i class="far fa-check-square js-bookmark-accept-change"></i> 
*/

function generateAddBookmarkButton(){
  if(!store.addNewBookmark) {
    return 'add bookmark';
  } else {
    return 'cancel';
  }
}

function generateBookmarkListString(bookmarkList){
  const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  return bookmarks.join('');
}

function render(){
  renderError();
  if (store.addNewBookmark) {
    $('.add-bookmark').html(generateBookmarkAddForm());
  } else {
    $('.add-bookmark').empty();
  }
  let bookmarks = [...store.bookmarks];
  // render the shopping list in the DOM
  const bookmarkListString = generateBookmarkListString(bookmarks);
  // insert that HTML into the DOM
  $('.js-add-bookmark').html(generateAddBookmarkButton());
  $('#js-bookmark-list').html(bookmarkListString);
}

function generateError(message){
  return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
}

function renderError(){
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
}

function handleCloseError(){
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
}

function handleAddNewBookmarkClick(){
  $('.js-add-bookmark').click(() => {
    store.toggleAddNewBookmark();
    render();
  });
}

function handleSubmitNewBookmark(){
  $('.add-bookmark').on('submit', '.add-bookmark-form', e => {
    e.preventDefault();
    let newBookmarkData = $(e.target).serializeJson();
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
}

function getItemIdFromElement(item){
  return $(item)
    .closest('.js-bookmark-item')
    .data('item-id');
}

function handleClickToExpandBookmark(){
  $('#js-bookmark-list').on('click', '.top-half', e => {
    const id = getItemIdFromElement(e.currentTarget);
    const bookmark = store.findById(id);
    store.findAndUpdate(id, {expand: !bookmark.expand});
    render();
  });
}

function handleDeleteBookmark(){
  $('#js-bookmark-list').on('click', '.js-bookmark-delete', e => {
    const id = getItemIdFromElement(e.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

function handleRatingFilterChange(){
  $('.js-filter-rating').change((e) => {
    let val = $(e.target).val();
    store.rating = val;
    render();
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
  handleAddNewBookmarkClick();
  handleSubmitNewBookmark();
  handleClickToExpandBookmark();
  handleDeleteBookmark();
  handleRatingFilterChange();
};

export default {
  bindEventListeners,
  render
};

// 116 was  <input type=button" value="&#10003;" />