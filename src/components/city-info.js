import React from 'react';

const CityInfo = (props) => {
  console.log(props.info.name);
  return (
    <div style={{ color: "#000" }} >
      {props.info.name}
    </div>
  );
}

export default CityInfo;