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
  const [justDone, setJustDone] = useState(0);
  const [page, setPage] = useState('tasks');
  const [fullDoneTasks, setAllDoneTasks] = useState([{ title: 'sa' }, { title: 'sa' }])

  const getTasks = async () => {
    const al = await AsyncStorage.getItem('@tasks');
    if (al !== undefined) {
      return JSON.parse(al);
    }
    return undefined;
  }

  useEffect(() => {
    if (justDone === 'delete') {
      console.log('hei!')
      setRefreshTheTasks(refreshDaTasks + 1);
      setDeleteable('delete');
      setTimeout(() => {
        setDeleteable(false);
        setJustDone(-1);
      }, 1)
    }

    if (justDone > 0) {
      setRefreshTheTasks(refreshDaTasks + 1);
      setDeleteable(true)
      setTimeout(() => {
        setDeleteable(false);
        setJustDone(-1);
      }, 1)

    }
  }, [justDone]);

  console.log(doneTasks);

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
    const al = AsyncStorage.getItem('@donetasks');
    if (al !== undefined) {
      al.then((r) => {
        setAllDoneTasks(JSON.parse(r));
      })
    }
  }, [page])

  useEffect(() => {
    if (doneTasks.length > 0) {
      let newDoneTasks = []

      const doneT = AsyncStorage.getItem('@donetasks');

      if (doneT !== undefined) {
        doneT.then((myR) => {
          newDoneTasks = JSON.parse(myR);

          doneTasks.map((theTask) => {
            newDoneTasks.push(theTask);
          });

          const filteredDoneTasks = [...new Set(newDoneTasks)];

          AsyncStorage.setItem('@donetasks', JSON.stringify(filteredDoneTasks));
        })
      }
    }
  }, [doneTasks])

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

  function doneTaskForIDK(doneTaskzzz) {
    return (
      <div className="task">
        <div className="task-title">
          <h1 style={{ marginLeft: '1rem' }}> {doneTaskzzz.title.length > 40 && doneTaskzzz.title.substr(0, 39) + '...' || doneTaskzzz.title}</h1>
          <p>
          </p>
        </div>
      </div>
    )
  }

  return (
    <View
      style={
        {
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: tasks.length === 0 && page === 'tasks' ? 'center' : '',
          height: tasks.length === 0 && page === 'tasks' ? '100%' : 'auto',
          position: tasks.length === 0 && page === 'tasks' ? 'absolute;top:0;left:0;' : '',
          paddingBottom: '2rem'
        }
      }
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: '1rem',
        width: 'calc(100% * 7/9)',
        fontSize: '12px'
      }}>
        <span style={{
          marginRight: '1rem', cursor: 'pointer',
          color: page === 'tasks' ? '#87b2f8' : '', transition: '250ms'
        }} onClick={() => { setPage('tasks') }}>Görevlerin</span>
        <span style={{
          cursor: 'pointer', color: page === 'done tasks' ? '#87b2f8' : '', transition: '250ms'
        }} onClick={() => { setPage('done tasks') }}>Bitirdiğin Görevlerin</span>

        <div style={{
          width: page === 'tasks' ? '61.17px' : '116.28px', height: '2px', borderRadius: '100px', background: '#87b2f8',
          position: 'absolute', bottom: '0', transform: page === 'done tasks' ? 'translateX(78px)' : '',
          transition: '250ms'
        }}></div>
      </div>

      {page === 'tasks' && selected.length > 0 && justDone > -1 && <TopBar count={selected.length} doneit={setJustDone} />}

      {page === 'done tasks' &&
        <div style={{ marginTop: '4rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 'calc(100% * 7/9)',
          }}>
            {
              fullDoneTasks.length > 0 && fullDoneTasks.map((doneTask) => (
                <div className="task">
                  <div className="task-title">
                    <h1 style={{ marginLeft: '1rem' }}> {doneTask.title.length > 40 && doneTask.title.substr(0, 39) + '...' || doneTask.title}</h1>
                    <p>
                      Tamamlandı
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      }

      {page === 'tasks' && tasks.length > 0 &&
        <ListTitle title="Görevlerin" />
      }

      {
        tasks.length > 0 && page === 'tasks' &&
        tasks.map((task, index) => {
          return <Task key={index} op={task.opacity} title={task.title} time={task.time} index={task.id} allTasks={tasks} setTaskList={setFirstTasks} reset={reset}
            doneList={doneTasks} setDoneList={setDoneTasks} setSelected={setSelected} irx={index} selected={selected} changeIt={refreshDaTasks} deleteable={deleteable} />
        })
      }

      {
        tasks.length === 0 && page === 'tasks' &&
        <div style={{
          textAlign: 'center'
        }}>
          Henüz bir görev oluşturmamışssın 😳 <br />
          "+" <br />
          butonuna basarak bir görev oluşturabilirsin!
        </div>
      }

      <Create open={openz} setOpen={setOpenz} />
    </View >
  );
}
