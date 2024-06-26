import Input from "./Input"
import { useRef } from "react";
import Modal from "./Modal";


const NewProject = ({onAdd, onCancle})=>{
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const handleSaveClick = ()=>{
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === ''){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        })
    }


    return(
        <>
        <Modal ref={modal} buttonCaption="Okay">
            <h2 className='text-xl font-bold text-stone-700 mt-4 my-4'>Invalid Input</h2>
            <p className='text-stone-600 mb-4'>Oops... looks like you forgot to enter a value.</p>
            <p className='text-stone-600 mb-4'>Please make sure you provide a valid input value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancle}>Cancel</button>
                </li>
                <li>
                    <button onClick={handleSaveClick} className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md">
                        Save
                    </button>
                </li>
            </menu>
            <div>
                <Input type='text' ref={title} label='Title'/>
                <Input ref={description} label='Description' textArea />
                <Input type='date' ref={dueDate} label='Due Date' />
            </div>
        </div>
        </>
    )
}

export default NewProject;