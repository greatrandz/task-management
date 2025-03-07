import React from 'react';
import { View, FlatList, Modal, TouchableOpacity, Pressable, Platform } from 'react-native';
import { DataTable, IconButton, Dialog, Portal, Button, Text, TextInput, PaperProvider } from 'react-native-paper';
import DashboardHeader from './DashboardHeader';
import useStyles from './Styles'
import { useDashboardContext } from './DashboardProvider';
import { Task } from '@App/models'
const right = Platform.OS === 'web' ? 0 : 15

import { useDeviceSize, DEVICE_SIZES } from "rn-responsive-styles";

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
    const styles = useStyles()
    const device_size = useDeviceSize();
    const [page, setPage] = React.useState(0);
    const [pressedRowId, setPressedRowId] = React.useState<string | null>(null);
    const { tasks, selectedTask, onSaveTask, onDeleteTaskItem,
        createModalVisible, onShowCreateModal, onHideCreateModal,
        deleteModalVisible, onShowDeleteModal, onHideDeleteModal, 
    } = useDashboardContext()
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
        if (createModalVisible && selectedTask) {
            setName(selectedTask.name)
            setDescription(selectedTask.description)
            setStatus(selectedTask.status)
        }
        else if (!createModalVisible) {
            setName("")
            setDescription("")
            setStatus("")
        }
    }, [selectedTask, createModalVisible])

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
                        <TouchableOpacity onPress={() => onShowCreateModal(item)}>
                            <IconButton
                                style={{ right }}
                                icon="pencil"
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onShowDeleteModal(item)}>
                            <IconButton
                                style={{ right }}
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
                <Modal animationType={'fade'} visible={createModalVisible || deleteModalVisible} transparent >
                    <Dialog  style={modalDialogStyle} visible={createModalVisible} onDismiss={onHideCreateModal}>
                        <Dialog.Title>{selectedTask ? `Update` : `Create New`} Task</Dialog.Title>
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
                            <Button onPress={() => onSaveTask({ ...selectedTask,  name,  description, status, })}>
                                Save
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                    <Dialog style={modalDialogStyle} visible={deleteModalVisible} onDismiss={onHideDeleteModal}>
                        <Dialog.Title>Delete Task</Dialog.Title>
                        <Dialog.Content>
                            <Text>Are you sure you want to delete this task? {selectedTask?.name ?? ""}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={onHideDeleteModal}>Cancel</Button>
                            <Button onPress={() => onDeleteTaskItem(selectedTask)}>Delete</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Modal>
            </PaperProvider>
        </View>
    );
};

export default Dashboard;