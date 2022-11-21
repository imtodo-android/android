import Checkbox from "./Checkbox";
import Draggable from 'react-draggable';
import doneIcon from '../assets/done.svg';
import deleteIcon from '../assets/delete.svg';
import Dialog from './Dialog';
import { useState, useEffect } from "react";

export default function Task({ title, time, index, setTaskList, allTasks, op, reset, doneList, setDoneList }) {
    const [xPosition, setXPosition] = useState(0);
    const [taskX, setTaskX] = useState(0);
    const [dragDisable, setDragDisable] = useState(false);
    const [dialogAnswer, setDialogAnswer] = useState('c');
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogOpacity, setDialogOpacity] = useState(1);

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
        if (pos.x > 20) {
            setDragDisable(true);
            setTaskX(20);
            changeTasks(true);
        }

        else if (pos.x * -1 > 20) {
            setDragDisable(true);
            setTaskX(-20);
            setOpenDialog(true);
            setDialogOpacity(1);
        }

        else {
            setTaskX(pos.x);
            setXPosition(pos.x);
            setDragDisable(false);
        }
    }

    useEffect(() => {
        return () => {
            setDragDisable(false);
            setTaskX(0);
            setXPosition(0);
        }
    }, [reset]);

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
                        <Checkbox />
                        <div className="task-title">
                            <h1> {title.length > 40 && title.substr(0, 40) + '...' || title} </h1>
                            <p> {time} için planlandı </p>
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