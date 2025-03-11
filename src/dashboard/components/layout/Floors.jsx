import React from "react";

const Floors = ({ a, b }) => {
  const get_floor = (floor_val) => {
    let floor = floor_val + "th Floor";

    switch (floor_val) {
      case -1:
        floor = "Basement";
        break;
      case 0:
        floor = "Ground Floor";
        break;
      case 1:
        floor = "First Floor";
        break;
      case 2:
        floor = "2nd Floor";
        break;
      case 3:
        floor = "3rd Floor";
        break;
      case -2:
        floor = "2nd Floor (Basement)";
        break;
      case -3:
        floor = "3rd Floor (Basement)";
        break;
    }

    if (floor_val < -3) {
      floor = floor + " (Under Ground)";
    }

    return floor;
  };

  return (
    <div>
      <div>
        Location A = {get_floor(a)}
        {b !== null && (
          <>
            <br />
            Location B = {get_floor(b)}
          </>
        )}
      </div>
    </div>
  );
};

export default Floors;
