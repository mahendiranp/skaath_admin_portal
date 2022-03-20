import * as React from "react";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  AutocompleteInput,
  BooleanField,
  Datagrid,
  DatagridProps,
  DateField,
  DateInput,
  Identifier,
  List,
  ListContextProvider,
  ListProps,
  NullableBooleanInput,
  NumberField,
  SearchInput,
  TextField,
  TextInput,
  useGetList,
  useListContext,
  ShowButton,
} from "react-admin";
import { useMediaQuery, Divider, Tabs, Tab, Theme } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useDatagridStyles = makeStyles({
  total: { fontWeight: "bold" },
});

const tabs = [
  { id: "ordered", name: "ordered" },
  { id: "delivered", name: "delivered" },
  { id: "cancelled", name: "cancelled" },
];

const orderFilters = [
  <SearchInput source="q" alwaysOn />,
  <DateInput source="date_gte" />,
  <DateInput source="date_lte" />,
  <TextInput source="total_gte" />,
  <NullableBooleanInput source="returned" />,
];

const useGetTotals = (filterValues) => {
  const { total: totalOrdered } = useGetList(
    "commands",
    { perPage: 1, page: 1 },
    { field: "id", order: "ASC" },
    { ...filterValues, status: "ordered" }
  );
  const { total: totalDelivered } = useGetList(
    "commands",
    { perPage: 1, page: 1 },
    { field: "id", order: "ASC" },
    { ...filterValues, status: "delivered" }
  );
  const { total: totalCancelled } = useGetList(
    "commands",
    { perPage: 1, page: 1 },
    { field: "id", order: "ASC" },
    { ...filterValues, status: "cancelled" }
  );

  return {
    ordered: totalOrdered,
    delivered: totalDelivered,
    cancelled: totalCancelled,
  };
};

const TabbedDatagrid = (props) => {
  const listContext = useListContext();
  const { ids, filterValues, setFilters, displayedFilters } = listContext;
  const classes = useDatagridStyles();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [ordered, setOrdered] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const totals = useGetTotals(filterValues);

  useEffect(() => {
    if (ids && ids !== filterValues.status) {
      switch (filterValues.status) {
        case "ordered":
          setOrdered(ids);
          break;
        case "delivered":
          setDelivered(ids);
          break;
        case "cancelled":
          setCancelled(ids);
          break;
      }
    }
  }, [ids, filterValues.status]);

  const handleChange = useCallback(
    (event, value) => {
      setFilters &&
        setFilters({ ...filterValues, status: value }, displayedFilters);
    },
    [displayedFilters, filterValues, setFilters]
  );

  const selectedIds =
    filterValues.status === "ordered"
      ? ordered
      : filterValues.status === "delivered"
      ? delivered
      : cancelled;

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={
              totals[choice.name]
                ? `${choice.name} (${totals[choice.name]})`
                : choice.name
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      {isXSmall ? (
        <>Teee</>
      ) : (
        <div>
          {filterValues.status === "ordered" && (
            <ListContextProvider value={{ ...listContext, ids: ordered }}>
              <Datagrid {...props} optimized rowClick="edit">
                <DateField source="date" showTime />
                <TextField source="reference" />
                <NumberField
                  source="total"
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                  className={classes.total}
                />
              </Datagrid>
            </ListContextProvider>
          )}
          {filterValues.status === "delivered" && (
            <ListContextProvider value={{ ...listContext, ids: delivered }}>
              <Datagrid {...props} rowClick="edit">
                <DateField source="date" showTime />
                <TextField source="reference" />
                <NumberField
                  source="total"
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                  className={classes.total}
                />
                <BooleanField source="returned" />
              </Datagrid>
            </ListContextProvider>
          )}
          {filterValues.status === "cancelled" && (
            <ListContextProvider value={{ ...listContext, ids: cancelled }}>
              <Datagrid {...props} rowClick="edit">
                <DateField source="date" showTime />
                <TextField source="reference" />

                <NumberField
                  source="total"
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                  className={classes.total}
                />
                <BooleanField source="returned" />
              </Datagrid>
            </ListContextProvider>
          )}
        </div>
      )}
    </Fragment>
  );
};

const OrderList = (props) => (
  <List
    {...props}
    filterDefaultValues={{ status: "ordered" }}
    sort={{ field: "date", order: "DESC" }}
    perPage={25}
    filters={orderFilters}
  >
    <TabbedDatagrid />
  </List>
);

export default OrderList;
