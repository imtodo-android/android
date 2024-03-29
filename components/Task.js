import Checkbox from "./Checkbox";
import Draggable from 'react-draggable';
import doneIcon from '../assets/done.svg';
import deleteIcon from '../assets/delete.svg';
import Dialog from './Dialog';
import { useState, useEffect } from "react";

export default function Task({ title, time, index, setTaskList, allTasks, op, reset, doneList, setDoneList, changeIt, setSelected, irx, selected, deleteable }) {
    const [xPosition, setXPosition] = useState(0);
    const [taskX, setTaskX] = useState(0);
    const [dragDisable, setDragDisable] = useState(false);
    const [dialogAnswer, setDialogAnswer] = useState('c');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogOpacity, setDialogOpacity] = useState(1);
    const [lastPosition, setLastPosition] = useState(0);

    function changeTasks(isDone) {
        let allTaskLocal = []
        allTasks.map((tazk) => {
            if (tazk.id == index) {
                if (isDone) {
                    setDoneList([...doneList, tazk]);
                }
                let taskk = tazk;
                taskk.opacity = 0;
                return allTaskLocal.push(taskk);
            }
            allTaskLocal.push(tazk);
        })
        setTaskList(allTaskLocal);
    }

    function getAnswerFromDialog(answer) {
        if (answer[answer.length - 1] === 'a') {
            changeTasks(false);
        }
        setDragDisable(false);
        setTaskX(0);
        setXPosition(0);
        setDialogAnswer(answer);
    }

    function trackPosition(pos) {
        if (lastPosition <= 20 && pos.x > 20) {
            setDragDisable(true);
            setTaskX(20);
            setXPosition(20);
            setLastPosition(21);
            setTimeout(() => {
                changeTasks(true);
                return false;
            }, 100)
        }

        else if (pos.x * -1 > 20) {
            setDragDisable(true);
            setTaskX(-20);
            setOpenDialog(true);
            setDialogOpacity(1);
        }

        else {
            if (pos.x > 20) {
                setTaskX(20);
                setXPosition(20);
                setLastPosition(21);
                setDragDisable(true);
            }

            else {
                setTaskX(pos.x);
                setXPosition(pos.x);
                setDragDisable(false);
            }
        }
        setLastPosition(pos.x);
    }

    useEffect(() => {
        return () => {
            setDragDisable(false);
            setTaskX(0);
            setXPosition(0);
        }
    }, [reset]);


    useEffect(() => {
        if (deleteable === 'delete') {
            selected.map((num) => {
                if (num === irx) {
                    return changeTasks();
                }
            })
        }

        else if (deleteable === true) {
            selected.map((num) => {
                if (num === irx) {
                    return changeTasks(true);
                }
            })
        }
    }, [changeIt])

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            transition: '250ms',
            opacity: op
        }}>
            <Draggable
                position={{ x: xPosition, y: 0 }}
                style={{
                    transition: '250ms'
                }}
                disabled={dragDisable} axis="x" onDrag={(e, data) => trackPosition(data)} onStop={() => { if (xPosition < 20) { setXPosition(0); setTaskX(0); } }}>
                <div style={{
                    width: "calc(100% * 7/9)",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: '250ms'
                }}>

                    {taskX > 0 && <div className="swipe done" style={{ width: taskX, transition: '250ms' }}><img src={doneIcon} width="10" height="10" /></div>}
                    <div className="task" style={{ position: taskX === 20 && 'absolute;left:20px;' || '' }}>
                        <Checkbox setSelected={setSelected} irx={irx} selected={selected} />
                        <div className="task-title">
                            <h1> {title.length > 40 && title.substr(0, 39) + '...' || title} </h1>
                            <p>
                                {time.day !== '' ?
                                    `${time.day} ${time.month} ${time.year} için planlandı`
                                    :
                                    `bir zaman belirlenmedi`
                                }
                            </p>
                        </div>
                    </div>
                    {taskX < 0 && <div className="swipe delete" style={{ width: taskX * -1, transition: '250ms' }}><img src={deleteIcon} width="10" height="10" /></div>}
                </div>
            </Draggable>

            <Dialog openDialog={openDialog} dialogOpacity={dialogOpacity} openSetter={setOpenDialog} opacitySetter={setDialogOpacity} answerSetter={getAnswerFromDialog}
                dialoga={dialogAnswer} taskName={title} />
        </div>
    )
}