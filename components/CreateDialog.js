import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'

export default function CreateDialog({ show }) {
    const [opacity, setOpacity] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!show) {
            setOpacity(0);
            setTimeout(() => {
                setVisible(false)
            }, 250)
            console.log('hola senorita');
        }

        else {
            setOpacity(1);
            setVisible(true)
        }
    }, [show]);

    const [selected, setSelected] = useState([]);

    const data = [
        { key: '1', value: 'Ocak'},
        { key: '2', value: 'Şubat' },
        { key: '3', value: 'Mart' },
        { key: '4', value: 'Nisan' },
        { key: '5', value: 'Mayıs'},
        { key: '6', value: 'Haziran' },
        { key: '7', value: 'Temmuz' },
        { key: '8', value: 'Ağustos' },
        { key: '9', value: 'Eylül' },
        { key: '10', value: 'Ekim' },
        { key: '11', value: 'Kasım' },
        { key: '12', value: 'Aralık' },
    ]


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
                            width:'90%'
                        }}>

                            <h1 style={{ width: '90%', textAlign: 'start', marginTop: '4rem' }} className="title">Görevinin bitiş ayı</h1>

                            <SelectList
                                setSelected={(val) => setSelected(val)}
                                data={data}
                                save="value"
                                label="Categories"
                                inputStyles={{color: '#87b2f8', borderColor: '#87b2f8'}}
                                dropdownTextStyles={{ color: '#87b2f8' }}
                                search={false}
                                defaultOption={{key:'1', value: 'Ocak'}}
                            />
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