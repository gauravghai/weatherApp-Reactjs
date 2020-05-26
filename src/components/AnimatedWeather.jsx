import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export const AnimatedWeatherIcon = ({ icon, title, className }) => (
  <div className={className}>
    <ReactAnimatedWeather icon={icon} color="white" size={112} animate={true} />
    {title && <p>{title}</p>}
  </div>
);

export default AnimatedWeatherIcon;
