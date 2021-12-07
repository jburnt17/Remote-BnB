import React from "react";
import { useParams } from "react-router-dom";

function EditSpot() {
  const { spotId } = useParams();
  return (
  <div>Hello, {spotId}</div>
  );
}

export default EditSpot;
