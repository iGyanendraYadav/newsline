import React, { Component } from 'react'
import NewsItem from './NewsItem'
//import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';


export class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize : 15,
    category :"general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }
  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    

    constructor(props){
        super(props);
        
        //console.log("Hello, This is constructor from News Component.[News.js]")
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            //totalResults : 0
        }

      document.title = `NewsLine - ${this.capitalizeFirstLetter(this.props.category)}`;


    }



    async updateNews() {
      
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb35f21906740658397b4e8beee26a6&page=${this.state.page}&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults});


    }
     
    async componentDidMount() {
      {/*
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb35f21906740658397b4e8beee26a6&page=1&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults});
    */}
      this.updateNews();
    }

    handlePrevClick = async () => {
      {/*
      console.log("Previous");

      if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb35f21906740658397b4e8beee26a6&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
          page : this.state.page - 1,
          articles : parsedData.articles
  
        })
      } */}
      this.setState({page : this.state.page - 1});
      this.updateNews();
    }

    handleNextClick = async () => {
      {/*
      console.log("Next");

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb35f21906740658397b4e8beee26a6&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page : this.state.page + 1,
        articles : parsedData.articles

      })
    */}
    this.setState({page : this.state.page + 1});
    this.updateNews();
    }

    fetchMoreData = async () => {
      this.setState({page : this.state.page + 1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fcb35f21906740658397b4e8beee26a6&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults});


    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin : "10px 0px", marginTop : "70px"}}>NewsLine - {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/*<Spinner/> */}


{/*
      <InfiniteScroll 
      dataLength = {this.state.articles.length}
      next = {this.fetchMoreData}
      hasMore = {this.state.articles.length !== this.state.totalResults}
      loader = {<h4 className="text-center">Loading ...</h4>}
      >  
      </InfiniteScroll>
      
    */}       
      
       

        <div className="row">
        {this.state.articles.map((element)=>{
          return  <div className="col-md-4" key={element.url}>
                   <NewsItem title={element.title ? element.title.slice(0,55) : ""} description={element.description ? element.description.slice(0,65) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                   </div>

         }
       )
     }


      <InfiniteScroll 
      dataLength = {this.state.articles.length}
      next = {this.fetchMoreData}
      hasMore = {this.state.articles.length !== this.state.totalResults}
      loader = {<h4 className="text-center">Loading</h4>}
      >  
      </InfiniteScroll>

        
      

          {/*
           <div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
           <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
           </div> 
    */}
        </div>


        

        
        


       
      </div>
    )
  }
}



export default News
