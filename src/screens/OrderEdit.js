import * as React from "react";
import {
  BooleanInput,
  DateField,
  Edit,
  EditProps,
  FormWithRedirect,
  Labeled,
  ReferenceField,
  SelectInput,
  TextField,
  Toolbar,
  useTranslate,
} from "react-admin";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Totals from "../components/Totals";

const OrderTitle = ({ record }) => {
  const translate = useTranslate();
  return record ? <span>Order</span> : null;
};

const useEditStyles = makeStyles({
  root: { alignItems: "flex-start" },
});

const CustomerDetails = ({ record }) => {
  return (
    <Box>
      <Typography>Hello</Typography>
    </Box>
  );
};

const CustomerAddress = ({ record }) => {
  console.log(record);
  return (
    <Box>
      <Typography>Hello</Typography>
    </Box>
  );
};

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const OrderForm = (props) => {
  const translate = useTranslate();
  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <Box maxWidth="50em">
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Order
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <Labeled source="date" resource="orders">
                        <DateField
                          source="date"
                          resource="orders"
                          record={formProps.record}
                        />
                      </Labeled>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Labeled source="reference" resource="orders">
                        <TextField
                          source="reference"
                          resource="orders"
                          record={formProps.record}
                        />
                      </Labeled>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                      <SelectInput
                        resource="orders"
                        source="status"
                        choices={[
                          {
                            id: "delivered",
                            name: "delivered",
                          },
                          {
                            id: "ordered",
                            name: "ordered",
                          },
                          {
                            id: "cancelled",
                            name: "cancelled",
                          },
                          {
                            id: "unknown",
                            name: "unknown",
                            disabled: true,
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Box mt={2}>
                        <BooleanInput
                          row={true}
                          resource="orders"
                          source="returned"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Spacer />

                  <Typography variant="h6" gutterBottom>
                    Shipping Address
                    <ReferenceField
                      source="customer_id"
                      resource="customers"
                      reference="customers"
                      basePath="/customers"
                      record={formProps.record}
                      link={false}
                    >
                      <CustomerDetails />
                    </ReferenceField>
                  </Typography>
                  <ReferenceField
                    source="customer_id"
                    resource="customers"
                    reference="customers"
                    basePath="/customers"
                    record={formProps.record}
                    link={false}
                  >
                    <CustomerAddress />
                  </ReferenceField>
                </Grid>
              </Grid>
              <Spacer />

              <Typography variant="h6" gutterBottom>
                Items
              </Typography>
              <Box>Box</Box>
              <Spacer />

              <Typography variant="h6" gutterBottom>
                Totals
              </Typography>
              <Box>
                <Totals record={formProps.record} />
              </Box>
            </CardContent>
            <Toolbar
              record={formProps.record}
              basePath={formProps.basePath}
              undoable={true}
              invalid={formProps.invalid}
              handleSubmit={formProps.handleSubmit}
              saving={formProps.saving}
              resource="commands"
            />
          </Card>
        </Box>
      )}
    />
  );
};
const OrderEdit = (props) => {
  const classes = useEditStyles();
  return (
    <Edit title={<OrderTitle />} classes={classes} {...props} component="div">
      <OrderForm />
    </Edit>
  );
};

export default OrderEdit;
