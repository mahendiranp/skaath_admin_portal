import * as React from "react";
import { ReferenceField, ReferenceFieldProps } from "react-admin";

const CustomerReferenceField = (props) => (
  <ReferenceField source="customer_id" reference="customers" {...props}>
    Name
  </ReferenceField>
);

CustomerReferenceField.defaultProps = {
  source: "customer_id",
  addLabel: true,
};

export default CustomerReferenceField;
