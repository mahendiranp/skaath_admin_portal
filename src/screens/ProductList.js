import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  SelectField,
  ImageInput,
  ImageField,
  required,
  BooleanInput,
  NumberInput,
} from "react-admin";

const productFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="products" allowEmpty>
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const category = [
  { id: "fruits", name: "Fruits" },
  { id: "vegtables", name: "Vegtables" },
];

const quanityType = [
  { id: "kg", name: "Kilogram" },
  { id: "gram", name: "Gram" },
  { id: "single", name: "Single" },
  { id: "pack", name: "Pack" },
];

export const ProductList = (props) => (
  <List filters={productFilters} {...props}>
    <Datagrid>
      <TextField label="Name" source="productName" />
      <TextField label="Category" source="productCategory" />
      <TextField label="Price" source="eksaathPrice" />
      <TextField label="MPR" source="mrpPerQuanity" />
      <TextField label="Stock" source="availableItems" />
      <TextField
        source="quanityType"
        label="Available Items"
        validate={[required()]}
      />
      <EditButton source="id" />
    </Datagrid>
  </List>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="productName" />
      <TextInput source="description" />
      <TextInput source="eksaathPrice" />
      <TextInput source="mrpPerQuanity" />
      <TextInput source="quanityType" />
      <SelectInput
        source="quanityType"
        label="Quanity Type"
        choices={quanityType}
        validate={[required()]}
      />
      <SelectInput
        source="productCategory"
        label="Product Category"
        choices={category}
        validate={[required()]}
        options={{ maximumFractionDigits: 2 }}
      />
      <NumberInput
        source="availableItems"
        label="Available Items"
        validate={[required()]}
      />
      <ImageInput source="thumbImage" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput
        source="productName"
        label="Product Name"
        validate={[required()]}
      />
      <TextInput
        source="description"
        label="Description"
        validate={[required()]}
      />
      <TextInput
        source="eksaathPrice"
        label="eksaath Price"
        validate={[required()]}
      />
      <TextInput
        source="mrpPerQuanity"
        label="MRP Per Quanity"
        validate={[required()]}
      />
      <NumberInput
        source="availableItems"
        label="Available Items"
        validate={[required()]}
        options={{ maximumFractionDigits: 2 }}
      />
      <SelectInput
        source="quanityType"
        label="Quanity Type"
        choices={quanityType}
        validate={[required()]}
      />
      <SelectInput
        source="productCategory"
        label="Product Category"
        choices={category}
        validate={[required()]}
      />
      <BooleanInput label="Out of Stock" source="outofStock" />

      <ImageInput source="thumbImage" label="Related pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
