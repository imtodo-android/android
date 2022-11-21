export default function Dialog({ openDialog, dialogOpacity, openSetter, opacitySetter, answerSetter, dialoga, taskName }) {
    function closeDialog(answer) {
        answerSetter(answer);
        opacitySetter(0);
        setTimeout(() => {
            openSetter(false);
            console.log(dialoga);
        }, 250)
    }

    if(openDialog){
        return (
            <div className="alert-bg" style={{ opacity: dialogOpacity, transition: '250ms' }}>
                <div className="alert">
                    <span style={{width: '75%'}}>
                    "{taskName.length > 30 && taskName.substr(0,30) + '...' || taskName}." <br />
                    adlı görevi silmek istediğinize emin misiniz?
                    </span>
    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button onClick={() => closeDialog(dialoga + 'a')} className="primary-button">
                            Evet
                        </button>
    
                        <button onClick={() => closeDialog(dialoga + 'b')} className="primary-button" style={{ marginTop: "1rem" }}>
                            Hayır
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}