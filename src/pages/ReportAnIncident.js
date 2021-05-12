import styles from "../../src/App.module.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import coc from "./coc.png";
import AAAJ from "./AAAJ.png"
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import reportstyles from "../../src/Report.module.scss";
import ProgressBar from "../pages/ProgressBar";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: [],
      event_title: "",
      event_city: "",
      event_state: "",
      event_category: "",
      event_date: new Date(),
      event_description: "",
      your_name: "Anonymous",
      your_email: "",
      your_city: "",
      your_state: "",
      your_phone: "",
      victim_name: "",
      victim_gender: "",
      victim_race: "",
      victim_age: "",
      victim_details: "",
      offender_name: "",
      offender_gender: "",
      offender_race: "",
      offender_age: "",
      offender_details: "",
      other_details: "",
      was_reported: null,
      reported_to: "",
      has_news_coverage: null,
      news_coverage_details: "",
      files: [],
      submitted: false,
      share_to_org: false,
      id: uuidv4(),
      victim_id: uuidv4(),
      offender_id: uuidv4()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getStates = this.getStates.bind(this);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleDateChange = (date) => {
    this.setState({ event_date: date });
  };

  handleFileChange = (event) => {
    this.setState({ files: event.target.files });
  };

  handleSubmit(event) {
    event.preventDefault();

    // check if fields are empty
    var missingFields = false;
    var errorMessage = "Please fill out the following mandatory field(s): ";

    if (this.state.event_city == "") {
      missingFields = true;
      errorMessage += "City, ";
    }
    if (this.state.event_state == "") {
      missingFields = true;
      errorMessage += "State, ";
    }
    if (this.state.event_category == "") {
      missingFields = true;
      errorMessage += "Type of Incident, ";
    }
    if (this.state.event_date == "") {
      missingFields = true;
      errorMessage += "Incident Date, ";
    }
    if (this.state.event_title == "") {
      missingFields = true;
      errorMessage += "Title";
    }

    if (errorMessage.endsWith(", ")) {
      errorMessage.substring(0, errorMessage.length - 2);
    }

    if (!missingFields) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_category: this.state.event_category,
          event_date: this.state.event_date,
          event_state: this.state.event_state,
          event_city: this.state.event_city,
          event_description: this.state.event_description,
          event_title: this.state.event_title,
          communities: this.state.communities,
          your_name: this.state.your_name,
          your_email: this.state.your_email,
          your_phone: this.state.your_phone,
          your_city: this.state.your_city,
          your_state: this.state.your_state,
          id: this.state.id,
          victim_name: this.state.victim_name,
          victim_gender: this.state.victim_gender,
          victim_race: this.state.victim_race,
          victim_age: this.state.victim_age,
          victim_details: this.state.victim_details,
          victim_id: this.state.victim_id,
          offender_name: this.state.offender_name,
          offender_gender: this.state.offender_gender,
          offender_race: this.state.offender_race,
          offender_age: this.state.offender_age,
          offender_details: this.state.offender_details,
          offender_id: this.state.offender_id,
          other_details: this.state.other_details,
          was_reported: this.state.was_reported,
          reported_to: this.state.reported_to,
          has_news_coverage: this.state.has_news_coverage,
          news_coverage_details: this.state.news_coverage_details,
          upload: this.state.upload,
        }),
      };
      fetch("http://virtual-protest.org:8000/submitform", requestOptions)
        .then((res) => console.log(res))
        .then((data) => this.setState({ submitted: true }));
    } else {
      alert(errorMessage);
    }
  }

  render() {
    var types = incidentTypes;
    var states = this.getStates();
    var communities = communitiesList;
    var submitted = this.state.submitted;
    var formData = {
      event_category: this.state.event_category,
      city: this.state.city,
      state: this.state.state,
      event_date: this.state.event_date.toString(),
      event_description: this.state.event_description,
    };
    var sharedToOrg = this.state.share_to_org;

    return !submitted ? (
      <div className={reportstyles.floatContainer}>
        <div className={reportstyles.sideBar}>hello</div>
        <div className={reportstyles.formstyle}>
          <div className={reportstyles.HeaderContainer}>
            <h1 className={reportstyles.Header}>Report an Incident</h1>

            <div className={reportstyles.HorizontalLine}></div>
          </div>

          <h1 className={styles.Details}>INCIDENT DETAILS</h1>

          <form onSubmit={this.handleSubmit}>
            <div className={styles.incidentContainer}>
              <div className={styles.incidentGroup}>
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Incident Name</strong>{" "}
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <input
                    name="event_title"
                    type="text"
                    maxlength="100"
                    placeholder="Name this incident"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />

                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong> Location of Incident</strong>
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <div className={reportstyles.Location}>
                    <input
                      name="event_city"
                      type="text"
                      placeholder="City"
                      onChange={this.handleChange}
                    />
                    <select name="event_state" onChange={this.handleChange}>
                      <option value="">State</option>
                      {states.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <br />
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Type of Incident </strong>
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <select name="event_category" onChange={this.handleChange}>
                    <option value="">Select an incident</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <br />
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Communities/Issues of Incident </strong>
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <Select
                    name="communities"
                    className={reportstyles.multiSelect}
                    multiple
                    disableUnderline
                    value={this.state.communities}
                    onChange={this.handleChange}
                    input={<Input />}
                    renderValue={(selected) => (selected).join(", ")}
                    MenuProps={MenuProps}
                  >
                    {communities.map((community) => (
                      <MenuItem key={community} value={community}>
                        <Checkbox checked={this.state.communities.indexOf(community) > -1} />
                        <ListItemText primary={community} />
                      </MenuItem>
                    ))}
                  </Select>
                </label>
                <br />
                <br />
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Date of Incident</strong>{" "}
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <DatePicker
                    selected={this.state.event_date}
                    onChange={this.handleDateChange}
                    maxDate={new Date()}
                  />
                </label>
                <br />
                <br />
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Description of Incident</strong> <br />
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <textarea
                    name="event_description"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
              </div>
              <div className={styles.incidentGroupTwo}>
                {/* new group here */}

                <label>
                  <strong>
                    Have you seen any news coverage of this incident?
                  </strong>
                  <br />
                  <br />
                  <input type="radio" id="yes" name="has_news_coverage" value={true} onChange={this.handleChange}></input>
                <label for="yes">Yes</label>
                <input type="radio" id="no" name="has_news_coverage" value={false} onChange={this.handleChange}></input>
                <label for="no">No</label><br/>
                </label>
                <br />
                <br />
                <label>
                  <strong>If so, what department</strong>
                  <br />
                  <br />
                  <input
                    name="reported_to"
                    type="text"
                    placeholder="Ex: LAPD"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Have you reported this to law enforcement?</strong>
                  <br />
                  <br />
                  <input type="radio" id="yes" name="was_reported" value={true} onChange={this.handleChange}></input>
                <label for="yes">Yes</label>
                <input type="radio" id="no" name="was_reported" value={false} onChange={this.handleChange}></input>
                <label for="no">No</label><br/>
                </label>
                <br />
                <br />
                <label>
                  <strong>If so, where? Please add a link if possible.</strong>
                  <br />
                  <br />
                  <textarea
                    name="new_coverage_details"
                    placeholder="Ex: I’ve only seen this incident covered in the local news in my small town and would like to see it broadcasted elsewhere."
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <div className={reportstyles.videoUploadContainer}>
                  <div>
                    <label>
                      <strong>Upload Image or Video</strong>
                      <small>(Optional)</small>
                      <br />
                      <input type="file" onChange={this.handleFileChange} />
                    </label>
                    <br />
                    <br />

                    <br />
                    <br />

                    <br />

                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.victimOffenderContainer}>
              <div className={styles.victimGroup}>
                <h1 className={styles.DetailsVictim}> VICTIM(S) DETAILS</h1>
                <label>
                  <strong>Victim Name</strong>
                  <br />
                  <input name="victim_name" type="text" onChange={this.handleChange} />
                </label>
                <br />
                <br />
                <label>
                  <strong>Victim Gender</strong>
                  <br />
                  <input
                    name="victim_gender"
                    type="text"
                    placeholder="Female, male, non-binary"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Victim Race</strong>
                  <br />
                  <input name="victim_race" type="text" onChange={this.handleChange} />
                </label>
                <br />
                <br />
                <label>
                  <strong>Victim Age Range</strong>
                  <br />
                  <input
                    name="victim_age"
                    type="text"
                    placeholder="What is the victim’s approximate age? Ex. 25-35"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Other Details</strong> <br />
                  <textarea
                    name="victim_details"
                    placeholder="What other details can you recall of the victim?"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              {/* offender details */}
              <div className={styles.offenderGroup}>
                <h1 className={styles.OffenderVictim}> OFFENDER(S) DETAILS</h1>
                <label>
                  <strong>Offender Name</strong>
                  <br />
                  <input
                    name="offender_name"
                    type="text"
                    placeholder="What was the person(s) or organization’s name?"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Offender Gender</strong>
                  <br />
                  <input
                    name="offender_gender"
                    type="text"
                    placeholder="Female, male, non-binary"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Offender Race</strong>
                  <br />
                  <input name="offender_race" type="text" onChange={this.handleChange} />
                </label>
                <br />
                <br />
                <label>
                  <strong>Offender Age Range</strong>
                  <br />
                  <input
                    name="offender_age"
                    type="text"
                    placeholder="What is the victim’s approximate age? Ex. 25-35"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Other Details</strong> <br />
                  <textarea
                    name="offender_details"
                    placeholder="What other details can you recall of the offender, such as tattoos, clothing, scarring, birthmarks, etc?"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
            <br />

            <br />


            <h1 className={styles.Details}>YOUR DETAILS</h1>
            {/* details container */}
            <div className={styles.detailsContainer}>
              <div className={styles.detailGroupMain}>
                <label>
                  <strong>Your Name</strong>
                  <br />
                  <input
                    name="your_name"
                    type="text"
                    placeholder="John Doe"
                    onChange={this.handleChange}
                  />
                </label>
                <br />

                <br />
                <label>
                  <strong>Your Phone</strong>
                  <br />
                  <input
                    name="your_phone"
                    type="text"
                    placeholder="123 456 7890"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <label>
                  <strong>Your Location</strong>
                  <br />
                  <div className={reportstyles.Location}>
                    <input
                      name="your_city"
                      type="text"
                      placeholder="City"
                      onChange={this.handleChange}
                    />
                    <select name="your_state" onChange={this.handleChange}>
                      <option value="">State</option>
                      {states.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <br />
                <label>
                  <div className={reportstyles.requiredContainer}>
                    <strong>Your Email</strong>
                    <div className={reportstyles.required}>*</div>
                  </div>
                  <input
                    name="your_email"
                    type="email"
                    placeholder="john.doe@gmail.com"
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <br />
                <br />
                <br />
              </div>
              <br />
              <br />

              <div className={styles.detailGroup}>
                <label>
                  <strong>
                    What else do you want to know about this incident?
                  </strong>{" "}
                  <br />
                  <textarea
                    name="other_details"
                    placeholder="What other details do-- you want to include that we haven’t asked for?"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
            <br />
            <div className={styles.submitContainer}>
              <div className={styles.submitChild}>
                <input
                  name="share_to_org"
                  type="checkbox"
                  onChange={this.handleChange}
                />
                <span>
                  Send my incident and contact information to a local
                  organization
                </span>

                <br />
                <br />
                <input type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    ) : sharedToOrg ? (
      <div className={reportstyles.aftersubmit}>
        <h1 className={styles.Header}>Connect with Help</h1>
        <p>
          <b>Thank you for reporting this incident</b>
        </p>
        <p>
          {" "}
          The incident has been shared with the civic organizations listed
          below.
        </p>
        {this.state.communities[0] === "Black Americans" ? (
                  <div className={styles.FormIcons}>
                  <img src={coc} height={93} width={93} />
                <div>
                  <strong>Color of Change</strong>
                  <p>Location: Oakland, CA</p>
                  <p>
                    <a href={"https://colorofchange.org/"} target="_blank">
                      Visit Website
                    </a>
                  </p>
                </div>
                </div>
        ) : ("")}
                {this.state.communities[0] === "Asian Americans/Pacific Islanders" ? (
                  <div className={styles.FormIcons}>
                  <img src={AAAJ} height={93} width={93} />
                <div>
                  <strong>Asian Americans Advancing Justice</strong>
                  <p>
                    <a href={"https://www.advancingjustice-aajc.org/"} target="_blank">
                      Visit Website
                    </a>
                  </p>
                </div>
                </div>
        ) : ("")}

        {
          <Link
            to={{
              pathname: "/action",
              data: formData,
            }}
          >
            <button className={reportstyles.TakeActionButton}>
              Take Action
            </button>
          </Link>
        }
      </div>
    ) : (
      <div className={reportstyles.aftersubmit}>
        <h1 className={styles.Header}>Connect with Help</h1>
        <p>
          <b>Thank you for reporting this incident</b>
        </p>
        <p>
          {" "}
          You may contact the civic organizations listed below to take action.
        </p>
        {this.state.communities[0] === "Black Americans" ? (
                  <div className={styles.FormIcons}>
                  <img src={coc} height={93} width={93} />
                <div>
                  <strong>Color of Change</strong>
                  <p>Location: Oakland, CA</p>
                  <p>
                    <a href={"https://colorofchange.org/"} target="_blank">
                      Visit Website
                    </a>
                  </p>
                </div>
                </div>
        ) : ("")}
                {this.state.communities[0] === "Asian Americans/Pacific Islanders" ? (
                  <div className={styles.FormIcons}>
                  <img src={AAAJ} height={93} width={93} />
                <div>
                  <strong>Asian Americans Advancing Justice</strong>
                  <p>
                    <a href={"https://www.advancingjustice-aajc.org/"} target="_blank">
                      Visit Website
                    </a>
                  </p>
                </div>
                </div>
        ) : ("")}
        {
          <Link
            to={{
              pathname: "/action",
              data: formData,
            }}
          >
            <button className={reportstyles.TakeActionButton}>
              Take Action
            </button>
          </Link>
        }
      </div>
    );
  }

  getStates() {
    return [
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

export let incidentTypes = [
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
      "Sexual Assault",
      "Domestic Violence",
      "Physical Abuse",
      "Physical Assault",
      "Verbal Harrassment",
      "Shunning",
      "Civil Rights Violation",
      "Workplace Discrimination",
      "Refusal of Service",
      "Online Harrassment",
      "Other",
    ];

export let communitiesList = [
      "Asian Americans/Pacific Islanders",
      "Black Americans",
      "Whites",
      "Police Reform",
      "Mental Health",
      "LGBTQIA+",
      "Immigration",
      "Disabilities",
      "Islam",
      "Judaism",
      "Hispanic",
      "Environmentalism",
      "Civic Engagement",
      "Voting",
      "Native Americans",
      "Women",
      "Men",
      "Social Class",
      "Intersectional",
      "Criminal Justice",
      "Children's Rights",
      "Education",
    ];

export default Report;
