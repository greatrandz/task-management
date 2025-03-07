import React from 'react';
import { View, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native';
import { DataTable, IconButton, Dialog, Portal, Button, Text, TextInput, PaperProvider } from 'react-native-paper';
import DashboardHeader from './DashboardHeader';
import useStyles from './Styles'
import { useDashboardContext } from './DashboardProvider';
import { Task } from '@App/models'

import { useDeviceSize, DEVICE_SIZES } from "rn-responsive-styles";

const ITEMS_PER_PAGE = 10;

// const tasks = [
//     { id: '1', title: 'Complete React Native Tutorial', description: 'Finish the basic React Native course on Udemy', status: 'completed' },
//     { id: '2', title: 'Finish Design for App', description: 'Create final designs for the new app interface', status: 'pending' },
//     { id: '3', title: 'Update Project Documentation', description: 'Add more details to the README file and wiki', status: 'completed' },
//     { id: '4', title: 'Bug Fixing', description: 'Fix login issue in the app', status: 'pending' },
//     { id: '5', title: 'Write Unit Tests', description: 'Write unit tests for task management module', status: 'pending' },
//     { id: '6', title: 'Write Unit Tests', description: 'Write unit tests for task management module', status: 'pending' },
//     { id: '7', title: 'Bug Fixing', description: 'Fix login issue in the app', status: 'pending' },
//     { id: '8', title: 'Finish Design for App', description: 'Create final designs for the new app interface', status: 'pending' },
//     { id: '9', title: 'Complete React Native Tutorial', description: 'Finish the basic React Native course on Udemy', status: 'completed' },
//     { id: '10', title: 'Update Project Documentation', description: 'Add more details to the README file and wiki', status: 'completed' },
// ];

const Dashboard = () => {
    const styles = useStyles()
    const device_size = useDeviceSize();
    const [page, setPage] = React.useState(0);
    const [pressedRowId, setPressedRowId] = React.useState<string | null>(null);
    const { tasks, createModalVisible,  onCreateNewTask, onHideCreateModal } = useDashboardContext()
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState('');
    
    // Calculate the items to be displayed based on the page and items per page
    const paginatedData = tasks.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
    const paginateLabel = `${page * ITEMS_PER_PAGE + 1}-${Math.min((page + 1) * ITEMS_PER_PAGE, tasks.length)} of ${tasks.length}`
    const modalDialogStyle: any = (DEVICE_SIZES.XS === device_size || DEVICE_SIZES.SM === device_size) ? {
         marginBottom: '40%'
    } : { marginLeft: '35%', ...styles.modalDialog}

    // Clear Inputs
    React.useEffect(() => {
        if (!createModalVisible) {
            setName("")
            setDescription("")
            setStatus("")
        }
    }, [createModalVisible])

    // Function to render each task in the list
    const renderTask = ({ item }: { item: Task }) => {
        return (
            <DataTable.Row key={item.id}>
                <Pressable onHoverIn={() => setPressedRowId(`${item.id}`)} onHoverOut={() => setPressedRowId(null)}
                            style={{  ...styles.taskRow,  backgroundColor: pressedRowId === item.id ? '#e0e0e0' : 'transparent', }}
                            onPress={() => {}}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.description}</DataTable.Cell>
                    <DataTable.Cell>{item.status}</DataTable.Cell>
                    <DataTable.Cell style={styles.actionsCell}>
                        <TouchableOpacity onPress={() => { }}>
                            <IconButton
                                icon="pencil"
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <IconButton
                                icon="delete"
                                size={20}
                            />
                        </TouchableOpacity>
                    </DataTable.Cell>
                </Pressable>
            </DataTable.Row>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }} 
                ListHeaderComponent={(
                    <>
                        <DashboardHeader />
                        <DataTable.Header>
                            <DataTable.Title>Task</DataTable.Title>
                            <DataTable.Title>Description</DataTable.Title>
                            <DataTable.Title>Status</DataTable.Title>
                            <DataTable.Title style={styles.actionsHeader}>Actions</DataTable.Title>
                        </DataTable.Header>
                    </>
                )}
                ListFooterComponent={(
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(tasks.length / ITEMS_PER_PAGE)}
                        onPageChange={setPage}
                        label={paginateLabel}
                    />
                )}
                ListFooterComponentStyle={{ paddingBottom: 80 }}
                data={paginatedData}
                renderItem={renderTask}
                keyExtractor={(item) => `${item.id}`}
            />

            <PaperProvider>
                <Modal animationType={'fade'} visible={createModalVisible} transparent >
                    <Dialog  style={modalDialogStyle} visible={createModalVisible} onDismiss={onHideCreateModal}>
                        <Dialog.Title>Create New Task</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Task Name"
                                value={name}
                                onChangeText={setName}
                                style={{}}
                            />
                            <TextInput
                                label="Task Description"
                                value={description}
                                onChangeText={setDescription}
                                style={{}}
                            />
                            <TextInput
                                label="Status"
                                value={status}
                                onChangeText={setStatus}
                                style={{}}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onHideCreateModal}>Cancel</Button>
                            <Button onPress={() => onCreateNewTask({  name,  description, status, })}>
                                Save
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Modal>
            </PaperProvider>
        </View>
    );
};

export default Dashboard;