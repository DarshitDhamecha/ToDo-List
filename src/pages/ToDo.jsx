import React, { useEffect, useState } from 'react'
import "../../src/assets/todolist.css"


const getLocalItems = () => {
    let list = localStorage.getItem('List');
    return list ? JSON.parse(list) : [];
};

export default function ToDo() {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);




    const addItem = () => {
        if (!inputData) {
            alert('Please fill in the data');
        } else if (inputData && !toggleBtn) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData };
                    }
                    return elem;
                })
            );
            setToggleBtn(true);
            setInputData('');
            setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData };
            setItems([...items, allInputData]);
            setInputData('');
        }
    };

    // delete the item

    const deleteItem = (index) => {
        // console.log(id, "delete")
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updateditems);
    };

    // edit item
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setToggleBtn(false);

        setInputData(newEditItem.name);

        setIsEditItem(id);
    };

    // remove all item
    const removeAll = () => {
        setItems([]);
    };

    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className='w-100 bs-color vh-100 d-flex justify-content-center text-center'>
                <div className='bs-width h-fit bs-blur mt-5 main-content'>
                    <div className='mb-5'>
                        <h3>Add Your List Here</h3>
                        <div className='w-100'>
                            <div className='bs-underline mx-auto'></div>
                        </div>
                    </div>
                    <div className='d-flex gap-3'>
                        <input
                            type="text"
                            className='w-100 px-3 add-input'
                            placeholder='Enter Your List'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {toggleBtn ? (
                            <button className='btn btn-outline-secondary d-flex gap-3' title='Add Item' onClick={addItem}>
                                Add <span><i className="fas fa-plus"></i></span>
                            </button>
                        ) : (
                            <button className='btn btn-outline-secondary d-flex gap-3' title='Update Item' onClick={addItem}>
                                Edit <span><i className="far fa-edit"></i></span>
                            </button>
                        )}
                    </div>
                    <div>
                        {items.map((elem) => {
                            return (
                                <div key={elem.id} className='radius d-flex bs-details px-3 py-1 align-items-center mt-3 w-100 justify-content-between'>
                                    <p className='m-0 text-white d-flex flex-wrap fs-5'>{elem.name}</p>
                                    <div className='d-flex gap-3'>
                                        <i className="far fa-edit fs-5 text-white" title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                        <i className="fas fa-trash fs-5 text-danger" title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-outline-danger btn-sm' onClick={removeAll}>REMOVE All</button>
                    </div>
                </div>
            </div>
        </>
    )
}
