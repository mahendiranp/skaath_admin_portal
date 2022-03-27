import React, { useEffect, useState } from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import { UserList } from "./screens/UserList";
import { ProductList, ProductEdit, ProductCreate } from "./screens/ProductList";
import OrderList from "./screens/OrderList";

import OrderEdit from "./screens/OrderEdit";
import Dashboard from "./screens/Dashboard";
import authProvider from "./screens/authProvider";
import dataProvider from "./screens/productProvider";

import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

//const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => {
  if (!dataProvider) {
    return null; // or a loading page, whatever
  }
  return (
    <Admin
      authProvider={authProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider}
    >
      <Resource name="users" />
      <Resource
        name="product"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        icon={PostIcon}
      />
      {/* <Resource
        name="users"
        list={UserList}
        edit={EditGuesser}
        icon={UserIcon}
      /> */}
      <Resource
        name="order"
        list={OrderList}
        edit={OrderEdit}
        icon={UserIcon}
      />
      <Resource name="customers" />
    </Admin>
  );
};

export default App;
