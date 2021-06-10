/**
 * React Native SQLite Demo
 * Copyright (c) 2018-2020 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import { Database } from '@/Config/Database/DatabaseManager'
import { Conversation, Recipient, Message } from '@/Config/Types'
import { ListItem } from "../types/ListItem"

// A (naive!) in-memory implementation of the Database interface.
let conversations = [] as Conversation[]
let conversationIdIndex = 0

let recipients = [] as Recipient[]
let recipientIdIndex = 0

let messages = [] as Message[]
// Map where each key represents the conversation_id
type MessageMap = { [id: number]: Message[] }
let messageMap: MessageMap = {}
let messageIdIndex = 0

async function createConversation(conversation: Conversation): Promise<void> {
    const newConversation: Conversation = conversation
    messageMap = { ...messageMap, [newConversation.id]: [] }
}

async function createList(newListTitle: string) {
    const newList: List = { title: newListTitle, id: listIdIndex++ };
    listItemsMap = { ...listItemsMap, [newList.id]: [] };
    lists = [...lists, newList];
}

async function addListItem(text: string, list: List) {
    const newListItem: ListItem = { text, done: false, id: listItemIdIndex++, listId: list.id };
    const listItemsForList = listItemsMap[list.id];
    const updatedListItemsForList = [...listItemsForList, newListItem];
    listItemsMap = { ...listItemsMap, [list.id]: updatedListItemsForList };
}

async function getAllLists(): Promise<List[]> {
    return lists;
}

async function getListItems(list: List, doneItemsLast: boolean): Promise<ListItem[]> {
    console.log("List:", list, "List items:", listItemsMap[list.id]);
    return listItemsMap[list.id];
}

async function updateListItem(listItem: ListItem): Promise<void> {
    if (listItem.listId !== undefined) {
        const listItemsForList = listItemsMap[listItem.listId];
        const updatedListItemsForList = listItemsForList.map((currentItem) => {
            if (currentItem.id === listItem.id) {
                return listItem;
            } else {
                return currentItem;
            }
        });
        // Update state
        listItemsMap = { ...listItemsMap, [listItem.listId]: updatedListItemsForList };
    }
}

async function deleteList(listToDelete: List): Promise<void> {
    lists = lists.filter((list) => list.id !== listToDelete.id);
}

export const inMemoryDatabase: Database = {
    createList,
    addListItem,
    getAllLists,
    getListItems,
    updateListItem,
    deleteList,
};
