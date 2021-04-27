import styles from "../../src/App.module.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TwitterIcon from "@material-ui/icons/Twitter";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const stateAbb = {
  "None": "None",
  "Alabama": "AL",
  "Alaska": "AK",
  "American Samoa": "AS",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "District of Columbia": "DC",
  "Federated States of Micronesia": "FM",
  "Florida": "FL",
  "Georgia": "GA",
  "Guam": "GU",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Marshall Islands": "MH",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Palau": "PW",
  "Pennsylvania": "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virgin Island": "VI",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY",
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      categoryFilter: "None",
      stateFilter: "None",
      cityFilter: "",
      afterDateFilter: "",
      beforeDateFilter: "",
      tweets: this.getTweets(),
      selected: "incidents" | "tweets",
    };
    this.getTweets = this.getTweets.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    fetch("http://virtual-protest.org:8000/getreports")
      .then((res) => res.json())
      .then((res) => this.setState({ data: res }))
      .catch((err) => console.log(err));
  }

  incidentsClickHandler(evt) {
    // console.log("ibtn");
    this.setState({ selected: "incidents" });
  }

  tweetsClickHandler(evt) {
    //console.log("tbtn");
    this.setState({ selected: "tweets" });
  }

  handleFilter = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });

    var categoryFilter = this.state.categoryFilter;
    var stateFilter = this.state.stateFilter;
    var cityFilter = this.state.cityFilter;
    var afterDateFilter = this.state.afterDateFilter;
    var beforeDateFilter = this.state.beforeDateFilter;

    if (name == "categoryFilter") {
      categoryFilter = value;
    } else if (name == "stateFilter") {
      stateFilter = value;
    } else if (name == "cityFilter") {
      cityFilter = value;
    } else if (name == "afterDateFilter") {
      if (value == "") {
        afterDateFilter = "";
      } else {
        afterDateFilter = new Date(value);
      }
      this.setState({ [name]: afterDateFilter });
    } else if (name == "beforeDateFilter") {
      if (value == "") {
        beforeDateFilter = "";
      } else {
        beforeDateFilter = new Date(value);
      }
      this.setState({ [name]: beforeDateFilter });
    }

    // Category
    var categoryFilteredData = [];
    if (categoryFilter != "None") {
      for (var i = 0; i < this.state.data.length; i++) {
        if (this.state.data[i].event_category == categoryFilter) {
          categoryFilteredData.push(this.state.data[i]);
        }
      }
    } else {
      categoryFilteredData = this.state.data;
    }

    // State
    var categoryAndStateFilteredData = [];
    if (stateFilter != "None") {
      for (var i = 0; i < categoryFilteredData.length; i++) {
        if (categoryFilteredData[i].event_state == stateFilter) {
          categoryAndStateFilteredData.push(categoryFilteredData[i]);
        }
      }
    } else {
      categoryAndStateFilteredData = categoryFilteredData;
    }

    // City
    var categoryStateAndCityFilteredData = [];
    if (cityFilter != "") {
      for (var i = 0; i < categoryAndStateFilteredData.length; i++) {
        if (
          categoryAndStateFilteredData[i].event_city
            .toLowerCase()
            .includes(cityFilter.toLowerCase())
        ) {
          categoryStateAndCityFilteredData.push(
            categoryAndStateFilteredData[i]
          );
        }
      }
    } else {
      categoryStateAndCityFilteredData = categoryAndStateFilteredData;
    }

    // After Date
    var categoryStateCityAndDate1FilteredData = [];
    if (afterDateFilter != "") {
      for (var i = 0; i < categoryStateAndCityFilteredData.length; i++) {
        if (
          (new Date(categoryStateAndCityFilteredData[i].event_date)).setHours(0,0,0,0) >=
          afterDateFilter
        ) {
          categoryStateCityAndDate1FilteredData.push(
            categoryStateAndCityFilteredData[i]
          );
        }
      }
    } else {
      categoryStateCityAndDate1FilteredData = categoryStateAndCityFilteredData;
    }

    // Before Date
    var categoryStateCityDate1AndDate2FilteredData = [];
    if (beforeDateFilter != "") {
      for (var i = 0; i < categoryStateCityAndDate1FilteredData.length; i++) {
        if (
          (new Date(categoryStateCityAndDate1FilteredData[i].event_date)).setHours(0,0,0,0) <=
          beforeDateFilter
        ) {
          categoryStateCityDate1AndDate2FilteredData.push(
            categoryStateCityAndDate1FilteredData[i]
          );
        }
      }
    } else {
      categoryStateCityDate1AndDate2FilteredData = categoryStateCityAndDate1FilteredData;
    }

    this.setState({ filteredData: categoryStateCityDate1AndDate2FilteredData });
  };

  getIncidentTypes() {
    return [
      "None",
      "Police Accountability",
      "Corporate Accountability",
      "Criminal Justice Policy",
      "Education",
      "Employment Discrimination",
      "Wrongful Imprisonment",
      "Racist Advertisement",
      "Media Coverage",
      "Immigration",
      "Economic Justice",
      "Hate Crimes",
      "Vandalism",
      "Sexual Harassment",
      "Verbal Harassment",
      "Domestic Violence",
      "Physical Abuse",
      "Other",
    ];
  }

  render() {
    let dummyHashtagData = [
      { name: "#blacklivesmatter", val: 1004957 },
      { name: "#transphobia", val: 256529 },
      { name: "#racism", val: 57263 },
      { name: "#stopAAPIhate", val: 33495 },
    ];

    var types = this.getIncidentTypes();
    var states = this.getStates();
    var formData =
      this.state.categoryFilter != "None" ||
      this.state.stateFilter != "None" ||
      this.state.cityFilter != "" ||
      this.state.afterDateFilter != "" ||
      this.state.beforeDateFilter != ""
        ? this.state.filteredData
        : this.state.data;

    return (
      <div className={styles.Main}>
        <div className={styles.BannerContainer}>
          <div className={styles.BannerHeaderContainer}>
            <div className={styles.BannerHeader}>
              <div className={styles.BannerText}>
                Protest Away<span>.</span>
              </div>
              <div className={styles.BannerSloganContainer}>
                <div className={styles.BannerSloganText}>
                  <p>Make an impact from anywhere.</p>
              </div>
              <div className={styles.BannerSloganSmallTextContainer}>
              <div className={styles.BannerSloganSmallText}>
                  <p>Let's unite and fight against all forms of injustice against all communities, even from home.</p>
                  <p>On Protest Away, you can browse incidents and easily access resources to take a stand online. You can also submit incidents of your own to spread awareness so other people can help advocate for the targeted community.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.TrendingHashtagsContainer}>
            <div className={styles.HashtagContainer}>
              <div className={styles.TrendingHashtagsHeader}>
                Trending Hashtags on Twitter{" "}
              </div>
              <TwitterIcon className={styles.twitterButton} />
            </div>

            <hr className={styles.TrendingHashtagsDivider} />
            <div className={styles.TrendingHashtagsList}>
              <ul className={styles.HashtagData}>
                {dummyHashtagData.map((hashtag, i) => {
                  return (
                    <li key={i} className={styles.HashtagListEntry}>
                      <div className={styles.HashtagName}>{hashtag.name}</div>
                      <div className={styles.HashtagValue}>
                        {hashtag.val.toLocaleString() + "posts"}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.graybar}>
          <div className={styles.messageContainer}>
            <TwitterIcon className={styles.twitterButton} />
            <p>
              <strong>
                Tweet about incidents in your community using our hashtag.
              </strong>{" "}
              (i.e. #protestaway-policebrutality,
              #protestaway-workplacediscrimination)
            </p>
          </div>
        </div>

        <div className={styles.bluebar}>
          <div className={styles.messageContainer}>
            <span>
                The AAPI community urgently needs your help. <a href='/connect'>View organizations and resources</a> to digitally support the AAPI community today!
            </span>
          </div>
        </div>

        <div className={styles.TweetsAndIncidentsContainer}>
          <div className={styles.TweetsAndIncidentsNavbar}>
            {this.state.selected === "tweets" ? (
              <div className={styles.TweetsAndIncidentsButtonsContainer}>
                <div
                  onClick={() => this.incidentsClickHandler()}
                  className={styles.IncidentsButton}
                >
                  REPORTED INCIDENTS
                </div>

                <div
                  onClick={() => this.tweetsClickHandler()}
                  className={styles.TweetsButton}
                >
                  TWITTER POSTS
                </div>
              </div>
            ) : (
              <div className={styles.TweetsAndIncidentsButtonsContainer}>
                <div
                  onClick={() => this.incidentsClickHandler()}
                  className={styles.IncidentsButton}
                >
                  REPORTED INCIDENTS
                </div>

                <div
                  onClick={() => this.tweetsClickHandler()}
                  className={styles.TweetsButton}
                >
                  TWITTER POSTS
                </div>
              </div>
            )}
          </div>

          {this.state.selected === "tweets" ? (
            <div>
              <br />
              <br />
              <br />
              <br />
              <div className={styles.filters}>
                <div className={styles.singleFilter}>
                  Hashtag
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>

                <div className={styles.singleFilter}>
                  Title
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>
                  Location
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>
                  Date
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
              </div>

              <div className={styles.Container}>
                {this.state.tweets.map((item, i) => {
                  return item["tweets"]["statuses"].map((item2, i2) => {
                    var tweetObj = {
                      event_category: item["hashtag"],
                      city: item2["user"]["location"],
                      state: "",
                      event_description: item2["text"],
                      event_date: item2["created_at"],
                      link:
                        "https://twitter.com/" +
                        item2["user"]["screen_name"] +
                        "/status/" +
                        item2["id_str"],
                    };
                    return (
                      <div key={i} className={styles.Data}>
                        <ul>
                          {<li>{item["hashtag"]}</li>}
                          {<li>{''}</li>}
                          {<li>{item2["text"]}</li>}
                          {<li>{''}</li>}
                          {<li>{item2["user"]["location"]}</li>}
                          {<li>{''}</li>}
                          {<li>{moment(item2["created_at"]).format("LL")}</li>}
                          {
                            <li>
                              <Link
                                to={{
                                  pathname: "/action",
                                  data: tweetObj,
                                }}
                              >
                                <button className={styles.TakeActionButton}>
                                  <strong>Take Action</strong>
                                </button>
                              </Link>
                            </li>
                          }
                        </ul>
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.Dropdown}>
                <b>Filter by: </b>
                <label>
                  Incident&nbsp;
                  <select name="categoryFilter" onChange={this.handleFilter}>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  State&nbsp;
                  <select name="stateFilter" onChange={this.handleFilter}>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  City&nbsp;
                  <input
                    type="text"
                    placeholder="City"
                    name="cityFilter"
                    onChange={this.handleFilter}
                  />
                </label>
                <label>
                  Date range&nbsp;&nbsp;
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    name="afterDateFilter"
                    onChange={this.handleFilter}
                  />
                  &nbsp;to&nbsp;&nbsp;
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    name="beforeDateFilter"
                    onChange={this.handleFilter}
                  />
                </label>
              </div>
              <div className={styles.filters}>
                <div className={styles.singleFilter}>
                  Event
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>

                <div className={styles.singleFilter}>
                  Date
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>
                  Incident Type
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>
                  Communities
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>
                  Location
                  <ArrowDropDownIcon className={styles.Arrow} />
                </div>
                <div className={styles.singleFilter}>

                </div>
              </div>
              <div className={styles.Container}>
                {formData.map((item, i) => {
                  return (
                    <div key={i} className={styles.Data}>
                      <ul>
                        {<li>{item.event_title}</li>}
                        {<li>{moment(item.event_date).format("ll")}</li>}
                        {<li>{item.event_category}</li>}
                        {<li>{item.communities.join(', ')}</li>}
                        {<li>{item.event_city}, {stateAbb[item.event_state]}</li>
                        }
                        {
                          <li>
                            <Link
                              to={{
                                pathname: "/action",
                                data: item,
                              }}
                            >
                              <button className={styles.TakeActionButton}>
                                <strong>Take Action</strong>
                              </button>
                            </Link>
                          </li>
                        }
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  getTweets() {
    // TweetJS.com - Display your tweets on your website using Javascript alone
    // Copyright 2019 Infinite Loop Development Ltd - InfiniteLoop.ie
    // Do not remove this notice.

    var TweetJs = {
      ListTweetsOnUserTimeline: function(screenName, callback) {
        TweetJs._callApi(
          {
            Action: "ListTweetsOnUserTimeline",
            ScreenName: screenName,
          },
          callback
        );
      },
      Search: function(query, callback) {
        TweetJs._callApi(
          {
            Action: "Search",
            Query: query,
          },
          callback
        );
      },
      _callApi: function(request, callback) {
        var xhr = new XMLHttpRequest();
        URL = "https://www.tweetjs.com/API.aspx";
        xhr.open("POST", URL);
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            callback(JSON.parse(xhr.response));
          }
        };
        xhr.send(JSON.stringify(request));
      },
    };

    var hashtags = [
      "#blacklivesmatter",
      "#racism",
      "#policebrutality",
      "#protest",
      "#georgefloyd",
      "#tellblackstories",
      "#blacktechtwitter",
      "#saytheirnames",
      "#nojusticenopeace",
      "#stopaapihate"
    ];
    // Mapping from hashtag to array of tweets
    var tweetsMap = [];

    hashtags.forEach(getTweets);

    function getTweets(value, index, array) {
      TweetJs.Search(value, function(data) {
        tweetsMap.push({ hashtag: value, tweets: data });
        //console.log(data);
      });
    }

    return tweetsMap;
  }

  getStates() {
    return [
      "None",
      "Alabama",
      "Alaska",
      "American Samoa",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Federated States of Micronesia",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Marshall Islands",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Northern Mariana Islands",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Palau",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virgin Island",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];
  }
}

export default Home;
