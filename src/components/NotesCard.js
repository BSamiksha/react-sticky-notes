import React, { useContext, useEffect, useRef, useState } from 'react';
import DeleteButton from './DeleteButton';
import { db } from '../appwrite/databases';
import { setNewOffset, autoGrow, setZIndex, bodyParse } from '../utils';
import Spinner from '../icons/Spinner';
import { NoteContext } from '../context/NoteContext';

const NotesCard = ({ note }) => {
    const body = bodyParse(note.body);
    // const position = JSON.parse(note.position);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const textAreaRef = useRef(null);
    let mouseStartPoint = {x : 0, y : 0};
    let cardRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);
    const {setSelectedNote} = useContext(NoteContext);

    useEffect((() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current)
    }), []);

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            setZIndex(cardRef.current);
            mouseStartPoint.x = e.clientX;
            mouseStartPoint.y = e.clientY;
            
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
            setZIndex(cardRef.current);
            setSelectedNote(note);
        }
    }

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x : mouseStartPoint.x - e.clientX,
            y: mouseStartPoint.y - e.clientY
        }
        
        mouseStartPoint.x = e.clientX;
        mouseStartPoint.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

        setPosition(newPosition);
    }

    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData('position', newPosition);
        // db.notes.update(note.$id, {position: JSON.stringify(newPosition)})
    }

    const saveData = async (key, value) => {
        const payload = {[key]: JSON.stringify(value)}

        try {
            await db.notes.update(note.$id, payload)
        }catch(error) {
            console.error(error);
        }
        setSaving(false);
    };

    const handleKeyUp = () => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
        keyUpTimer.current = setTimeout(() => {
            saveData('body', textAreaRef.current.value)
        }, 2000);
    }

    return (
        <div ref={cardRef} className='card' style={{
            backgroundColor: colors.colorBody,
            left: `${position.x}px`,
            top: `${position.y}px`}}>
            <div 
            onMouseDown={mouseDown}
            className='card-header'
            style={{backgroundColor: colors.colorHeader}}>
                <DeleteButton noteId={note.$id} />
                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={colors.colorText} />
                            <span style={{ color: colors.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>
            <div className='card-body'>
                <textarea
                onKeyUp={handleKeyUp}
                onInput={() => {
                    autoGrow(textAreaRef);
                }}
                onFocus={() => {
                    setZIndex(cardRef.current);
                    setSelectedNote(note);
                }}
                ref={textAreaRef} 
                style={{color: colors.colorText}}
                defaultValue={body} />
            </div>
        </div>
    )
}

export default NotesCard
