import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
export default function CreateDialog({ show }) {
    const [opacity, setOpacity] = useState(0);
    const [visible, setVisible] = useState(false);
    const [dialogOpenCount, setDialogOpenCount] = useState(0)

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

    const date = new Date();


    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [maxDay, setMaxDay] = useState(1);
    // new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    useEffect(() => {
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth() + 1);
    }, [visible])

    useEffect(() => {
        let theMonths = [];
        for (let i = 0; i < 12; i++) {
            if (selectedYear === date.getFullYear()) {
                if (i === date.getMonth()) {
                    setMaxDay(i);
                }

                if (i >= date.getMonth()) {
                    theMonths.push(data[i]);
                }
            }
            else {
                theMonths = data;
            }
        }
        setMonths(theMonths);
        setDialogOpenCount(dialogOpenCount + 1);
    }, [selectedYear]);

    let tDate = new Date().getDate();

    useEffect(() => {
        let theDays = [];

        let mDay = new Date(selectedYear, maxDay, 0).getDate()

        for (let iv = 1; iv < new Date(selectedYear, mDay, 0).getDate(); iv++) {
            if (selectedYear === date.getFullYear()) {
                if (iv >= tDate) {
                    theDays.push({ id: iv, value: iv });
                }

            }
            else {
                theDays.push({ id: iv, value: iv });
            }

        }
        setDays(theDays);
    }, [selectedMonth])

    const data = [
        { key: '1', value: 'Ocak' },
        { key: '2', value: 'Şubat' },
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
                    opacity: opacity
                }}>
                    <div className="alert h-75">

                        <h1 style={{ width: '90%', textAlign: 'start', marginTop: '4rem' }} className="title">✨ harika görevinin ismi ✨</h1>

                        <input
                            style={{
                                marginTop: '0.5  rem'
                            }}
                            type="text" className="input" placeholder="görevinin ismi" />

                        <div style={{
                            marginTop: '2rem',
                            width: '90%'
                        }}>

                            <h1 style={{ width: '90%', textAlign: 'start', marginTop: '4rem' }} className="title">Görevinin bitiş günü</h1>

                            <SelectList
                                setSelected={(val) => setSelectedMonth(val)}
                                data={days}
                                save="value"
                                label="Günler"
                                inputStyles={{ color: '#212121' }}
                                dropdownTextStyles={{ color: '#212121' }}
                                search={false}
                                defaultOption={{ key: '12', value: 30 }}
                            />

                            <h1 style={{ width: '90%', textAlign: 'start', marginTop: '4rem' }} className="title">Görevinin bitiş ayı</h1>

                            <SelectList
                                setSelected={(val) => setSelectedMonth(val)}
                                data={months}
                                save="value"
                                label="Aylar"
                                inputStyles={{ color: '#212121' }}
                                dropdownTextStyles={{ color: '#212121' }}
                                search={false}
                                defaultOption={{ key: '12', value: data[date.getMonth()].value }}
                            />

                            <h1 style={{ width: '90%', textAlign: 'start', marginTop: '4rem' }} className="title">Görevinin bitiş yılı</h1>

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

                            <div style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                <button style={{ textAlign: 'start', marginTop: '4rem' }} className="button">Görevini ekle</button>
                            </div>

                        </div>

                        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                            ...
                        </div> */}
                    </div>
                </div>
            }
        </div>
    )
}