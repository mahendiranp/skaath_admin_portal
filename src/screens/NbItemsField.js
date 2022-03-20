import * as React from "react";
import { FunctionField, FieldProps } from "react-admin";

const render = (record) => record && record.basket.length;

const NbItemsField = ({ record }) => (
  <FunctionField record={record} render={render} />
);

export default NbItemsField;
