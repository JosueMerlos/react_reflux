import Reflux from 'reflux';
import $ from 'jquery';
import ImageActions from '../actions/ImageActions';

var ImageStore = Reflux.createStore({
  listenables: [ImageActions],
  imagelist: [],
  url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json',
  init: function() {
    this.fetchList();
  },
  fetchList: function() {
    let tags = [ 'meme', 'cats', 'food', 'nature', 'cities', 'blue', 'dog', 'studio', 'love', 'friend' ];
    let randomTag = tags[Math.floor(Math.random()*tags.length)];
    console.log(randomTag);
    $.ajax({
      url: `${this.url}&tag=${randomTag}`,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrFeed',
      cache: false,
      context: this,
      success: function(data) {
        this.imageList = data.items;
        this.trigger(this.imageList);
      }
    })
  }
});

export default ImageStore;