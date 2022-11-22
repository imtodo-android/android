import './styles/main.css'
import { View } from 'react-native';
import Task from './components/Task'
import ListTitle from './components/ListTitle'
import Create from './components/create';
import { useState, useEffect } from 'react';

export default function App() {

  const [firstTasks, setFirstTasks] = useState([
    {
      title: 'Togg satın al',
      time: '6 aralık 2022, 06:54',
      id: '0',
      opacity: 1
    },
    {
      title: 'DAHA fazla Togg satın al',
      time: '7 aralık 2022, 06:54',
      id: '1',
      opacity: 1
    },
    {
      title: 'DAHA DAHA fazla Togg satın al',
      time: '8 aralık 2022, 06:54',
      id: '2',
      opacity: 1
    },

    {
      title: 'DAHA DAHA DAHA DAHA DAHA DAHA fazla Togg satın al',
      time: '8 aralık 2022, 06:54',
      id: '3',
      opacity: 1
    }
  ])

  const [tasks, setTasks] = useState(firstTasks);
  const [reset, setReset] = useState(0);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    return () => {
      let change = []

      tasks.map((tazk) => {
        if (tazk.opacity === 0) {
          return;
        }
        change.push(tazk);
      })

      setTimeout(() => {
        setTasks(change);
        setReset(reset + 1)
      }, 250);
    }
  }, [firstTasks]);

  useEffect(() => {
    setReset(reset + 1);
  }, [doneTasks])

  return (
    <View
      style={
        {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }
      }
    >
      <ListTitle title="Görevlerin" />

      {
        tasks.map((task, index) => {
          return <Task key={index} op={task.opacity} title={task.title} time={task.time} index={task.id} allTasks={tasks} setTaskList={setFirstTasks} reset={reset}
            doneList={doneTasks} setDoneList={setDoneTasks} />
        })
      }

      <Create />
    </View>
  );
}