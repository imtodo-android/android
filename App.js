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
  const [openz, setOpenz] = useState(0);
  const getTasks = async () => {
    const al = await AsyncStorage.getItem('@tasks');
    if (al !== undefined) {
      return JSON.parse(al);
    }
    return undefined;
  }

  useEffect(() => {
    if (openCount === 2) {
      getTasks().then((r) => {
        if (r == undefined) {
          return;
        }

        else {
          setFirstTasks([...r]);
          console.log(firstTasks);
        }
      })
    }
  }, [openz])

  useEffect(() => {
    getTasks().then((r) => {
      if (r == undefined) {
        return;
      }

      else {
        setFirstTasks([...r]);
        setTasks([...r]);
      }
    })
  }, []);

  useEffect(() => {
    if (openCount < 2) {
      getTasks().then((r) => {
        if (r == undefined) {
          return;
        }

        else {
          setTasks([...r]);
        }
      })
      setOpenCount(openCount + 1)
    }

    else {
      let change = []
      firstTasks.map((tazk) => {
        if (tazk.opacity === 0) {
          return;
        }
        console.log(tazk);
        change.push(tazk);
      });

      console.log(change)
      
      setTimeout(() => {
        setTasks(change);
        AsyncStorage.setItem('@tasks', JSON.stringify(change));
        setReset(reset + 1);  
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
          justifyContent: tasks.length === 0 ? 'center' : '',
          height: tasks.length === 0 ? '100%' : 'auto',
          position: tasks.length === 0 ? 'absolute;top:0;left:0;' : '',
          paddingBottom: '2rem'
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

      {
        tasks.length === 0 &&
        <div style={{
          textAlign: 'center'
        }}>
          Henüz bir görev oluşturmamışssın 😳 <br />
          "+" <br />
          butonuna basarak bir görev oluşturabilirsin!
        </div>
      }

      <Create open={openz} setOpen={setOpenz} />
    </View>
  );
}