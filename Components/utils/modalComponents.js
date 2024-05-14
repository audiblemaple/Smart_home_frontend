import {GridItem, GridView} from "../Styles";
import {Pressable} from "react-native";
import {Octicons} from "@expo/vector-icons";
import React from "react";

export const lightOptions = (
	<GridView>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
	</GridView>
);

export const genericModalContents = (
	<GridView>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
		<GridItem >
			<Pressable onPress={() => {console.log("clicked")}} onPressIn={() => {console.log("clicked")}} >
				<Octicons name="home" size={50}></Octicons>
			</Pressable>
		</GridItem>
	</GridView>
);