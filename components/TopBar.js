import done from '../assets/done.svg';
import deleteIcon from '../assets/delete.svg';


export default function TopBar({ doneit, count }) {
    return (
        <div className="topbar">
            <h1 style={{ position: 'fixed', left: '1rem', fontSize: '12px', lineHeight: '15px', fontWeight: 'normal', color: '#fafafa' }}>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{count}</span> tane görev seçildi
            </h1>

            <div style={{ marginRight: '1rem', rowGap: '2rem' }}>
                <button onClick={() => doneit(true)}
                    style={{ border: '0', background: 'transparent', cursor: 'pointer' }}
                >
                    <img src={done} height="12" />
                </button>

                <button onClick={() => doneit('delete')}
                    style={{ border: '0', background: 'transparent', cursor: 'pointer' }}
                >
                    <img src={deleteIcon} height="12" />
                </button>
            </div>
        </div>
    )
}