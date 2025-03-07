import React from 'react';
import { View } from 'react-native';
import { Button, Card, Title, Paragraph, IconButton } from 'react-native-paper';
import useStyles from './Styles'
import { useDashboardContext } from './DashboardProvider';

const DashboardHeader = () => {
    const styles = useStyles()
    const { tasks, completedTasks, pendingTasks, developmentTasks, onShowCreateModal } = useDashboardContext()

    return (
        <>
            <Card style={styles.card}>
                <Card.Content>
                <Title style={styles.cardTitle}>Task Overview</Title>
                <Paragraph>Manage your tasks and track progress</Paragraph>
                <Button mode="contained" onPress={() => onShowCreateModal(null)} style={styles.button}>Create New Task</Button>
                </Card.Content>
            </Card>

            {/* Cards with Icons */}
            <View style={styles.gridContainer}>
                <Card style={[styles.gridCard, styles.iconCardContent]}>
                    <IconButton
                        icon="check-circle"
                        //   color="#4caf50"
                        size={30}
                        />
                    <Title>Completed Tasks</Title>
                    <Paragraph>{completedTasks.length} Tasks</Paragraph>
                </Card>

                <Card style={[styles.gridCard, styles.iconCardContent]}>
                    <IconButton
                        icon="clock"
                        //   color="#ffa500"
                        size={30}
                        />
                    <Title>Pending Tasks</Title>
                    <Paragraph>{pendingTasks.length} Tasks</Paragraph>
                </Card>

                <Card style={[styles.gridCard, styles.iconCardContent]}>
                    <IconButton
                        icon="calendar"
                        //   color="#e91e63"
                        size={30}
                        />
                    <Title>Development Tasks</Title>
                    <Paragraph>{developmentTasks.length} Tasks</Paragraph>
                </Card>

                <Card style={[styles.gridCard, styles.iconCardContent]}>
                    <IconButton
                        icon="bell"
                        //   color="#2196f3"
                        size={30}
                        />
                    <Title>Notifications</Title>
                    <Paragraph>0 New Alerts</Paragraph>
                </Card>
            </View>
        </>
    );
};

// const styles = StyleSheet.create({
  
// });

export default DashboardHeader;