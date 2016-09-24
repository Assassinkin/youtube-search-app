import _ from 'lodash' ;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';



const API_KEY = 'AIzaSyD5EqFMNQ2q32EHyW72D77QayVQ_FPLMIc';




// Create a new component. This component should produce some html
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Psyco-M');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY,term: term}, (videos) => {
      //this.setState({videos});
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }


  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)},800);
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo =>this.setState({selectedVideo})} videos={this.state.videos}/>
      </div>)
  }
}

//Take this component's geenrated HTML and put it on the page (in the dom)
ReactDOM.render(<App/>, document.querySelector('.container'));
