import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Alert, View, Modal, TouchableOpacity } from 'react-native';
import { DataTable, IconButton, Dialog, Portal, Button, Text, TextInput, PaperProvider } from 'react-native-paper';
import useStyles from './Styles';
import UsersProvider from './UsersProvider';

import { useDeviceSize, DEVICE_SIZES } from "rn-responsive-styles";

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com' },
  { id: '5', name: 'David Wilson', email: 'david@example.com' },
  { id: '6', name: 'Olivia Lee', email: 'olivia@example.com' },
  { id: '7', name: 'Sophia Clark', email: 'sophia@example.com' },
  { id: '8', name: 'Lucas Walker', email: 'lucas@example.com' },
  { id: '9', name: 'Charlotte Johnson', email: 'charlotte@example.com' },
  { id: '10', name: 'Ethan White', email: 'ethan@example.com' },
];

const UserTable = () => {
    const styles = useStyles();
    const device_size = useDeviceSize();
    const [userList, setUserList] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const itemsPerPage = 10;
    const modalDialogStyle: any = (DEVICE_SIZES.XS === device_size || DEVICE_SIZES.SM === device_size) ? {
         marginBottom: '40%'
    } : { marginLeft: '35%', ...styles.modalDialog}

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setNewName(user.name);
        setNewEmail(user.email);
        setEditModalVisible(true);
    };

    const handleSaveEdit = () => {
        if (newName && newEmail) {
            const updatedUserList = userList.map(user =>
                user.id === selectedUser.id ? { ...user, name: newName, email: newEmail } : user
            );
            setUserList(updatedUserList);
            setEditModalVisible(false);
        } else {
            Alert.alert('Error', 'Please fill in both name and email');
        }
    };

    const handleDelete = (id: string) => {
        setSelectedUserId(id);
        setDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (selectedUserId) {
          setUserList(userList.filter(user => user.id !== selectedUserId));
          setDeleteModalVisible(false);
        }
    };
    
    const cancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const totalPages = Math.ceil(userList.length / itemsPerPage);
    const paginatedData = userList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <UsersProvider>
                <SafeAreaView style={styles.container}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title>Email</DataTable.Title>
                                <DataTable.Title style={styles.actionsHeader}>Actions</DataTable.Title>
                            </DataTable.Header>

                            <FlatList
                                data={paginatedData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <DataTable.Row key={item.id}>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        <DataTable.Cell>{item.email}</DataTable.Cell>
                                        <DataTable.Cell style={styles.actionsCell}>
                                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                                <IconButton
                                                    icon="pencil"
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                                <IconButton
                                                    icon="delete"
                                                    size={20}
                                                />
                                            </TouchableOpacity>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            />
                        </DataTable>

                        <View style={styles.pagination}>
                            <IconButton
                                icon="chevron-left"
                                size={24}
                                onPress={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            <Text style={styles.pageText}>
                                Page {currentPage} of {totalPages}
                            </Text>
                            <IconButton
                                icon="chevron-right"
                                size={24}
                                onPress={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </View>
                    </View>

                    {/* Edit Modal */}

                    <PaperProvider>
                        <Modal animationType={'fade'} visible={editModalVisible || deleteModalVisible } transparent >
                            <Dialog  style={modalDialogStyle} visible={editModalVisible} onDismiss={() => setEditModalVisible(false)}>
                                <Dialog.Title>Edit User</Dialog.Title>
                                <Dialog.Content>
                                    <TextInput
                                        label="Name"
                                        value={newName}
                                        onChangeText={setNewName}
                                        style={{}}
                                    />
                                    <TextInput
                                        label="Email"
                                        value={newEmail}
                                        onChangeText={setNewEmail}
                                        style={{ }}
                                    />
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => setEditModalVisible(false)}>Cancel</Button>
                                    <Button onPress={handleSaveEdit}>Save</Button>
                                </Dialog.Actions>
                            </Dialog>
                            <Dialog style={modalDialogStyle} visible={deleteModalVisible} onDismiss={cancelDelete}>
                                <Dialog.Title>Delete User</Dialog.Title>
                                <Dialog.Content>
                                    <Text>Are you sure you want to delete this user?</Text>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={cancelDelete}>Cancel</Button>
                                    <Button onPress={confirmDelete}>OK</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Modal>
                    </PaperProvider>
                </SafeAreaView>
        </UsersProvider>
    );
};

export default UserTable;
