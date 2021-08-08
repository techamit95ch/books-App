import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Select, Divider, HStack, FormControl, CheckIcon } from "native-base";

const FiterAuth = ({ setFilterAuthor, authors, filterAuthor,searchAuthor }) => {
  return (
    <>
      <Divider />
      <FormControl style={{ margin: 10, marginLeft:30,  width: 200,justifyContent: "center"}} >
        <FormControl.Label >Select Item</FormControl.Label>
        <Select
          p={2}
          minWidth={200}
          placeholder="Author"
          onValueChange={(itemValue) => {
            setFilterAuthor(itemValue);
            searchAuthor(itemValue);
          }}
          selectedValue={filterAuthor}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
          }}
          variant={'filled'}
        >
          <Select.Item label="Select Author" value="none" disabled />
          <Select.Item label="All" value="All" />
          {authors.map((author) => (
            <Select.Item label={author} value={author} />
          ))}
        </Select>
      </FormControl>
      <Divider />
    </>
  );
};

export default FiterAuth;

const styles = StyleSheet.create({});
