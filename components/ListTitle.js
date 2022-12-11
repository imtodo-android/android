export default function ListTitle({ title }) {
    return (
        <div
            style={
                { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }
            }>
            <div className="list-title" style={{marginTop:'2rem'}}> {title} </div>
        </div>
    );
}
