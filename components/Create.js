import CreateDialog from './CreateDialog';
import { useState, useEffect } from 'react';
export default function Create() {
    const [showCreatePage, setShowCreatePage] = useState(false);

    return (
        <div>
            <button className="fab" onClick={() => {
                setShowCreatePage(true);
            }}>
                +
            </button>

            <CreateDialog show={showCreatePage} setShow={setShowCreatePage} />
        </div>
    )
}