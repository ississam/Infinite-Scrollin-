import React, { Component } from "react";
import axios from "axios";
import "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.dateDiff = this.dateDiff.bind(this);
  }

  state = {
    gitlist: [],
    per: 2,
    page: 1,
    totalPages: null,
    scrolling: false,
  };

//--------------------function keep creation date of repository and calculate the number of days
  dateDiff(createDate) {
    let date1 = new Date(createDate);
    let date2 = new Date();
    let jours = Math.floor(
      (Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) -
        Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    return "Submited  " + jours + "  days ago";
  }
  //--------------------function keep creation date of repository and calculate the number of days


///////------------------ fetch API data
  componentWillMount() {
    this.loadList();
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handelScroll(e);
    });
  }
///////------------------ fetch API data


//----------------------------keep mesures of row and manage  scroll event

  handelScroll = (e) => {
    const { scrolling, totalPages, page } = this.state;
    if (scrolling) return;
    if (totalPages <= page) return;
    const lastLi = document.querySelector("div.container > div:last-child");
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    var bottomOffset = 20;
    if (pageOffset > lastLiOffset - bottomOffset) this.loadMore();
  };
//----------------------------keep mesures of row and manage handel scroll event



//----------------------------Load new rows after scrolling
  loadList = () => {
    const { per, page, gitlist } = this.state;
    const url = `https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc&page=${page}`;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          gitlist: [...gitlist, ...res.data.items],
          totalPages: 10,
          scrolling: false,
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  loadMore = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        scrolling: true,
      }),
      this.loadList
    );
  //----------------------------Load new rows after scrolling
};



  render() {
    return (
      <>
        {/* ---------------commenter pour utiliser scroll */}
        <div className="card center-block shadow">
          <div className="card-header">
            <h6 className="m-0 font-weight-bold">
              The most starred Github repo
            </h6>
          </div>
        </div>

        {/*-------------------- Rows of repository details */}
        {this.state.gitlist.map((items) => (
          <div
            key={items.id}
            className="container card border-bottom-danger mt-3 mb-5"
          >
            <div className="row">
              <div className="col-sm-2">
                <h6 className="center-text">{items.owner.login}</h6>
                <img
                  className="d-block w-100 h-80 image-border"
                  src={items.owner.avatar_url}
                  alt
                />
              </div>
              <div className="col-sm-9">
                <div className="card-block">
                  <h4>Repository name : {items.name}</h4>
                  <h6>Description:</h6>{" "}
                  {items.description == null
                    ? "Aucune description disponible pour ce repositoy"
                    : items.description}
                  <hr></hr>
                  <span className="mr-3 badge badge-warning">
                    {items.stargazers_count} Stars
                  </span>
                  <span className="badge badge-success mr-3">
                    {items.open_issues_count} Issues
                  </span>
                  <p>{this.dateDiff(items.created_at)} </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
}
