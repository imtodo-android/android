import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import done from '../assets/done.svg';

export default function CreateDialog({ show, setShow }) {
    const date = new Date();

    const [opacity, setOpacity] = useState(0);
    const [visible, setVisible] = useState(false);
    const [dialogOpenCount, setDialogOpenCount] = useState(0);
    const [showSelects, setShowSelects] = useState(false);
    const [selectOpacity, setSelectOpacity] = useState(0);
    const [checked, setChecked] = useState(false);
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [maxDay, setMaxDay] = useState(1);
    const [selectedDay, setSelectedDay] = useState(30);
    const [title, setTitle] = useState('')
    const [iHateReactNative, setIHateReactNative] = useState(0);

    useEffect(() => {
        if (showSelects) {
            setIHateReactNative(iHateReactNative + 1);
        }
    }, [showSelects])

    useEffect(() => {
        if (!show) {
            setOpacity(0);
            setTimeout(() => {
                setVisible(false)
            }, 250)
        }

        else {
            setOpacity(1);
            setVisible(true)
        }
    }, [show]);

    function protocolThreeProtectThePilot() {
        setShow(false);
    }

    const protocolTwoUpholdTheMission = async () => {
        let allTasks = []
        let year = selectedYear == '1' ? date.getFullYear() : selectedYear;

        const value = await AsyncStorage.getItem('@tasks')

        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
            allTasks.push(...parsedValue);
        }

        const theTask = {
            title: title,
            time: { day: showSelects ? selectedDay : '', month: showSelects ? selectedMonth : '', year: showSelects ? year : '' },
            id: Array.isArray(parsedValue) ? parsedValue.length : 0
        }

        allTasks.push(theTask);

        const setT = JSON.stringify(allTasks);
        try {
            await AsyncStorage.setItem('@tasks', setT)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth() + 1);
    }, [visible])

    const data = [
        { key: '1', value: 'Ocak', },
        { key: '2', value: 'Şubat', },
        { key: '3', value: 'Mart' },
        { key: '4', value: 'Nisan' },
        { key: '5', value: 'Mayıs' },
        { key: '6', value: 'Haziran' },
        { key: '7', value: 'Temmuz' },
        { key: '8', value: 'Ağustos' },
        { key: '9', value: 'Eylül' },
        { key: '10', value: 'Ekim' },
        { key: '11', value: 'Kasım' },
        { key: '12', value: 'Aralık' },
    ];

    useEffect(() => {
        let theMonths = [];
        for (let i = 0; i < 12; i++) {
            if (selectedYear === date.getFullYear() || selectedYear === '1') {
                if (i === date.getMonth()) {
                    setMaxDay(i);
                }

                if (i >= date.getMonth()) {
                    theMonths.push(data[i]);
                }
            }
        }

        if (!showSelects) {
            setMonths(theMonths);
        }

        else {
            if (selectedYear > date.getFullYear()) {
                return setMonths(data);
            }
            if (iHateReactNative === 1) {
                return;
            }
            setMonths(theMonths);
        }

        setDialogOpenCount(dialogOpenCount + 1);
    }, [selectedYear]);

    let tDate = new Date().getDate();

    useEffect(() => {
        let theDays = [];

        let m = selectedMonth;

        if (!parseInt(m)) {
            for (let key in data) {
                if (selectedMonth === data[key].value) {
                    m = parseInt(key) + 1;
                }
            }
        }

        setTimeout(() => {
            let mDay = new Date(selectedYear, m, 0).getDate();
            mDay++;

            for (let iv = 1; iv < mDay; iv++) {
                if (selectedYear === date.getFullYear() && m == date.getMonth() + 1) {
                    if (iv >= tDate) {
                        theDays.push({ id: iv, value: iv });
                    }
                }

                else {
                    theDays.push({ id: iv, value: iv });
                }
            }

            if (!showSelects) {
                setDays(theDays);
            }

            else {
                if (theDays.length > 0) {
                    if (iHateReactNative === 1) {
                        return setIHateReactNative(2);
                    }

                    setDays(theDays);
                }
            }
        })
    }, [selectedMonth]);

    const [years, setYears] = useState([
        { key: '1', value: date.getFullYear() },
        { key: '2', value: date.getFullYear() + 1 },
        { key: '3', value: date.getFullYear() + 2 },
        { key: '4', value: date.getFullYear() + 3 },
        { key: '5', value: date.getFullYear() + 4 },
    ]);

    return (
        <div className={visible && 'just-center-it'}>
            {
                visible &&
                <div className="alert-bg" style={{
                    opacity: opacity,
                    transition: '250ms'
                }}>
                    <div className="alert h-75">
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'end', width: '90%' }}>
                            <button className="alert-close" onClick={() => protocolThreeProtectThePilot()}>
                                <span style={{
                                    transform: 'rotate(45deg)',
                                    color: '#fafafa'
                                }}>+</span>
                            </button>
                        </div>

                        <h1 style={{ width: '90%', textAlign: 'start', marginTop: '3rem' }} className="title">✨ harika görevinin ismi ✨</h1>

                        <input
                            style={{
                                marginTop: '0.5rem'
                            }}
                            onChange={
                                (e) => {
                                    setTitle(e.target.value);
                                }
                            }
                            type="text" className="input" placeholder="görevinin ismi(zorunlu)" required />

                        <div style={{
                            marginTop: '1.5rem',
                            width: '90%'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                                <button
                                    onClick={() => {
                                        setChecked(!checked);
                                        if (showSelects) {
                                            setSelectOpacity(0);
                                            setTimeout(() => {
                                                setShowSelects(false);
                                            }, 250);
                                        }
                                        else {
                                            setShowSelects(true);
                                            setTimeout(() => {
                                                setSelectOpacity(1);
                                            })
                                        }
                                    }}
                                    className={`chkbox ${checked && 'chckd'}`}>
                                    <img src={done} width="15" />
                                </button>

                                <span
                                    style={{ color: '#212121', marginLeft: '0.5rem' }}
                                >
                                    zaman belirlemeyi {checked && 'kapat' || 'aç'}
                                </span>
                            </div>
                        </div>

                        {
                            showSelects &&
                            <div style={{
                                width: '90%',
                                transition: '250ms',
                                opacity: selectOpacity
                            }}>

                                <h1 style={{ width: '90%', textAlign: 'start', marginTop: '2rem' }} className="title">Görevinin bitiş günü</h1>

                                <SelectList
                                    setSelected={(val) => setSelectedDay(val)}
                                    data={days}
                                    save="value"
                                    label="Günler"
                                    inputStyles={{ color: '#212121' }}
                                    dropdownTextStyles={{ color: '#212121' }}
                                    search={false}
                                    defaultOption={{ key: '12', value: date.getDate() }}
                                />

                                <h1 style={{ width: '90%', textAlign: 'start', marginTop: '2rem' }} className="title">Görevinin bitiş ayı</h1>

                                <SelectList
                                    setSelected={(val) => setSelectedMonth(val)}
                                    data={months}
                                    save="value"
                                    label="Aylar"
                                    inputStyles={{ color: '#212121' }}
                                    dropdownTextStyles={{ color: '#212121' }}
                                    search={false}
                                    defaultOption={{ key: data[date.getMonth()].key, value: data[date.getMonth()].value }}
                                />

                                <h1 style={{ width: '90%', textAlign: 'start', marginTop: '2rem' }} className="title">Görevinin bitiş yılı</h1>

                                <SelectList
                                    setSelected={(val) => setSelectedYear(val)}
                                    data={years}
                                    save="value"
                                    label="Yıllar"
                                    inputStyles={{ color: '#212121', borderColor: '#212121' }}
                                    dropdownTextStyles={{ color: '#212121' }}
                                    search={false}
                                    defaultOption={{ key: '1', value: years[0].value }}
                                />
                            </div>
                        }

                        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                            <button disabled={title == '' ? true : false}
                                onClick={() => {
                                    protocolTwoUpholdTheMission();
                                }}
                                style={{ textAlign: 'start', marginTop: '2rem' }} className="button">
                                Görevini ekle
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}