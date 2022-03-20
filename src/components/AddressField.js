import * as React from "react";
import { FieldProps } from "react-admin";

const AddressField = ({ record }) =>
  record ? (
    <span>
      {record.address}, {record.city}, {record.stateAbbr} {record.zipcode}
    </span>
  ) : null;

export default AddressField;
