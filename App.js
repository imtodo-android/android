import './styles/main.css'
import { View } from 'react-native';
import Task from './components/Task';
import ListTitle from './components/ListTitle';
import Create from './components/create';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from './components/TopBar';

export default function App() {
  const [selected, setSelected] = useState([])
  const [firstTasks, setFirstTasks] = useState([])
  const [tasks, setTasks] = useState([]);
  const [reset, setReset] = useState(0);
  const [doneTasks, setDoneTasks] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [openz, setOpenz] = useState(0);
  const [refreshDaTasks, setRefreshTheTasks] = useState(0);
  const [deleteable, setDeleteable] = useState(false);
  const [justDeleted, setJustDeleted] = useState(0);

  const getTasks = async () => {
    const al = await AsyncStorage.getItem('@tasks');
    if (al !== undefined) {
      return JSON.parse(al);
    }
    return undefined;
  }

  useEffect(() => {
    if (justDeleted > 0) {
      setRefreshTheTasks(refreshDaTasks + 1);
      setDeleteable(true)
      setTimeout(() => {
        setDeleteable(false);
        setJustDeleted(-1);
      }, 1)
    }
  }, [justDeleted]);

  useEffect(() => {
    if (openCount === 2) {
      getTasks().then((r) => {
        if (r == undefined) {
          return;
        }

        else {
          setFirstTasks([...r]);
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
        change.push(tazk);
      });

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
      {selected.length > 0 && justDeleted > -1 && <TopBar count={selected.length} deleteit={setJustDeleted} />}

      {tasks.length > 0 &&
        <ListTitle title="Görevlerin" />
      }

      {tasks.length > 0 &&
        tasks.map((task, index) => {
          return <Task key={index} op={task.opacity} title={task.title} time={task.time} index={task.id} allTasks={tasks} setTaskList={setFirstTasks} reset={reset}
            doneList={doneTasks} setDoneList={setDoneTasks} setSelected={setSelected} irx={index} selected={selected} changeIt={refreshDaTasks} deleteable={deleteable} />
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