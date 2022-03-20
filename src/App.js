import React, { useEffect, useState } from "react";
import { Admin, Resource, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./screens/UserList";
import { ProductList, ProductEdit, ProductCreate } from "./screens/ProductList";
import Dashboard from "./screens/Dashboard";
import authProvider from "./screens/authProvider";
import dataProvider from "./screens/productProvider";

import PostIcon from "@material-ui/icons/Book";
//import UserIcon from "@material-ui/icons/Group";

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
      <Resource
        name="products"
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
    </Admin>
  );
};

export default App;
