import React from "react";
import Clock from "react-live-clock";

import AnimatedWeatherIcon from "./components/AnimatedWeather";
import Forcast from "./Forcast";
import loader from "./images/WeatherIcons.gif";
import { dateBuilder, getPosition, getWeatherByCoordinate } from "./utils";

const ONE_MINUTE_IN_MS = 60 * 1000;

export class Weather extends React.Component {
  state = {
    coords: {
      latitude: undefined,
      longitude: undefined,
    },
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    timerID: undefined,
  };

  async updateWeather() {
    const weather = await getWeatherByCoordinate(this.state.coords);
    const timerID = setTimeout(this.updateWeather, 10 * ONE_MINUTE_IN_MS);
    return this.setState({ ...this.state, timerID, ...weather });
  }

  async componentDidMount() {
    if (!navigator.geolocation) {
      return alert("Geolocation not available");
    }

    let position;

    try {
      position = await getPosition();
    } catch (err) {
      position = { coords: { latitude: 28.67, longitude: 77.22 } };
      alert(
        "You have disabled location service. Allow 'This APP' to access your location. " +
          "Your current location will be used for calculating Real time weather."
      );
    }

    return this.setState((prevState) => ({ ...prevState, coords: position.coords }), this.updateWeather);
  }

  componentWillUnmount() {
    return clearTimeout(this.state.timerID);
  }

  render() {
    if (!this.state.temperatureC) {
      return (
        <React.Fragment>
          <img alt="loader" src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>Detecting your location</h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used for calculating Real time weather.
          </h3>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="city">
          <div className="title">
            <h2>{this.state.city}</h2>
            <h3>{this.state.country}</h3>
          </div>
          <AnimatedWeatherIcon className="mb-icon" icon={this.state.icon} title={this.state.main} />
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {this.state.temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <Forcast icon={this.state.icon} weather={this.state.main} />
      </React.Fragment>
    );
  }
}

export default Weather;
