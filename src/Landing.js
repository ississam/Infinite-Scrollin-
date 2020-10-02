import React, { Component } from "react";
import axios from 'axios';
import './Landing.css';


export default class Landing extends Component {

 state = {
    gitlist: [],

};
  componentDidMount() {
    axios.get(`https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc`)
      .then(res => {
        // const liste = res.data.items;
        // console.log('liste', res.data.items);
        this.setState({gitlist:res.data.items});
        // console.log('liste2', this.state.liste)
      })
     
  }

  render() {
    return (
      <>

<div className="card center-block shadow">
  <div className="card-header">
    <h6 className="m-0 font-weight-bold">The most starred Github repo</h6>
</div>
</div>

  {/*-------------------- user 1 */}
  {this.state.gitlist.map(listgit =>
  <div className="container card border-bottom-danger mt-3 mb-5">
    <div className="row">
    {/* {this.liste.map((item) => ( key={item.id}  ))} */}
   
      <div className="col-sm-2">
     <h6 className="center-text">{listgit.owner.login}</h6> 
        <img className="d-block w-100 h-80 image-border" src={listgit.owner.avatar_url} alt />
       
      </div>
      <div className="col-sm-9">
        <div className="card-block">
          <h4>{listgit.name}</h4>
          <p>{listgit.description}</p>
          <span className="mr-3 badge badge-warning">{listgit.stargazers_count} Stars</span>
          <span className="badge badge-success mr-3">{listgit.open_issues_count} Issues</span>
         
          Submiter 30 days ago  
        </div>
        
      </div>
  
    </div>
  </div>
)} ;
        </>
    
    );
  }
}
