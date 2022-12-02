export default function TopBar({ deleteit }) {
    return (
        <div className="topbar">
            <button onClick={() => deleteit(true)}
                style={{ marginTop: '15px', marginLeft: '15px', cursor: 'pointer' }}
            >delete it</button>
        </div>
    )
}