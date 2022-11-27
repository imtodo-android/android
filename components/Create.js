import CreateDialog from './CreateDialog';
import { useState, useEffect } from 'react';
export default function Create({ open, setOpen }) {
    const [showCreatePage, setShowCreatePage] = useState(false);

    return (
        <div>
            <button className="fab" onClick={() => {
                setShowCreatePage(true);
            }}>
                +
            </button>

            <CreateDialog show={showCreatePage} setShow={setShowCreatePage} open={open} setOpen={setOpen} />
        </div>
    )
}