import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {Conversation} from "@/Config/Types";

interface Props {
    conversations(conversation: Conversation): void
}

export const ConversationsList: React.FunctionComponent<Props> = function({ conversations }) => {

}
