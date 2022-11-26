import './styles/main.css'
import { View } from 'react-native';
import Task from './components/Task';
import ListTitle from './components/ListTitle';
import Create from './components/create';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [firstTasks, setFirstTasks] = useState([])
  const [tasks, setTasks] = useState([]);
  const [reset, setReset] = useState(0);
  const [doneTasks, setDoneTasks] = useState([]);
  const [openCount, setOpenCount] = useState(0);

  const getTasks = async () => {
    const al = await AsyncStorage.getItem('@tasks');
    if (al !== undefined) {
      return JSON.parse(al);
    }
    return undefined;
  }

  useEffect(() => {
    getTasks().then((r) => {
      setFirstTasks([...r]);
    })
  }, []);

  useEffect(() => {
    if (openCount < 2) {
      getTasks().then((r) => {
        if (r == undefined) {
          return console.log('anani sikeyim galtasaray');
        }

        else {
          setTasks([...r]);
        }
      })
      setOpenCount(openCount + 1)
    }
    else {
      let change = []
      tasks.map((tazk) => {
        if (tazk.opacity === 0) {
          return;
        }
        change.push(tazk);
      });

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
          zIndex: '9999999999999999999999999999'
        }
      }
    >
      {tasks.length > 0 &&
        <ListTitle title="Görevlerin" />
      }

      {tasks.length > 0 &&
        tasks.map((task, index) => {
          return <Task key={index} op={task.opacity} title={task.title} time={task.time} index={task.id} allTasks={tasks} setTaskList={setFirstTasks} reset={reset}
            doneList={doneTasks} setDoneList={setDoneTasks} />
        })
      }

      <button className="fab" onClick={() => {
        alert(true);
      }}>
        +
      </button>
    </View>
  );
}