import * as React from "react";
import classnames from "classnames";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FieldProps, useTranslate } from "react-admin";

const useStyles = makeStyles({
  container: { minWidth: "35em" },
  rightAlignedCell: { textAlign: "right" },
  boldCell: { fontWeight: "bold" },
});

const Totals = (props) => {
  const { record } = props;
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <Table className={classes.container}>
      <TableBody>
        <TableRow>
          <TableCell>SUM</TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.total_ex_taxes.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>delivery</TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.delivery_fees.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            taxes (
            {record?.tax_rate.toLocaleString(undefined, {
              style: "percent",
            })}
            )
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.taxes.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.boldCell}>Total</TableCell>
          <TableCell
            className={classnames(classes.boldCell, classes.rightAlignedCell)}
          >
            {record?.total.toLocaleString(undefined, {
              style: "currency",
              currency: "USD",
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Totals;
