import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const listArr = [
  { id: 1, name:<h3>Owl Wholesales</h3> },    
  { id: 2, name: <p>123 Violet Road</p> },
  { id: 3, name: <p>Phoenix, CO 85003</p> },
  { id: 4, name: <p>USA</p> },
  { id: 5, name: <h3>Distributor No</h3> },
  { id: 6, name: <p>123 Second Street</p> },
  { id: 7, name: <p>Dis - Baldwin City, KS 66006</p> },
  { id: 8, name: <h4>Store-Heading</h4> },
  { id: 9, name: <p>Store Name</p> },
  { id: 10, name: <p>Store No</p> },
  { id: 11, name: <p>Tax No</p> },
  { id: 12, name:<p>USA</p>},
  { id: 13, name:<p>Date: 30 November 2012</p>},
  { id: 14, name: <p>Sales Order No</p> },
  { id: 15, name: <p>Sales Rep</p> },
  { id: 16, name:<h2>Invoice CIV-000676</h2> },
  { id: 17, name: <p>Inv - Baldwin City, KS 66006</p> },
  { id: 18, name: <p>Payment terms: Net 45 days</p> },
  { id: 19, name:  <p>Payment due: 14 January 2013</p> },
  { id: 20, name:  <h1>$315,479.00</h1> },
  { id: 20, name:   <p>Telephone: 0123456789</p>},
 
];

function App() {
  const [head1,setHead1] =  useState([])
  const [head2,setHead2] =  useState([])
  const [head3,setHead3] =  useState([])
  const [head4,setHead4] =  useState([])
  const [head5,setHead5] =  useState([])
  const [head6,setHead6] =  useState([])
  const [sideList, setSideList] = useState([]);
  const [headerListLeft, setHeaderListLeft] = useState([]);
  const [headerListRight, setHeaderListRight] = useState([]);
  const [headerDownLeft,setHeaderDownLeft] = useState([]);
  const [headerDownRight,setHeaderDownRight] = useState([]);

  useEffect(() => {
    getInitial();
  }, []);

  const getInitial = () => {
    setSideList(listArr);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log(over);
    
    if (!over) return;

    if (over.id === 'headerListDropzone') {
      const draggedItem = sideList.find(item => item.id === active.id);
      if (draggedItem) {
        setHeaderListLeft(prev => [
          ...prev,
          { id: `hl-${draggedItem.id}`, content: draggedItem.name }
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
     } else if (over.id === 'headerListRightDropzone') {
      const draggedItem = sideList.find(item => item.id === active.id);
      if (draggedItem) {
        setHeaderListRight(prev => [
          ...prev,
          { id: `hr-${draggedItem.id}`, content: draggedItem.name }
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }else if (over.id === 'headerListDropzoneDown') {
      const draggedItem = sideList.find(item => item.id === active.id);
      if (draggedItem) {
        setHeaderDownLeft(prev => [
          ...prev,
          { id: `dl-${draggedItem.id}`, content: draggedItem.name }
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }else if (over.id === 'headerListRightDropzoneDown') {
      const draggedItem = sideList.find(item => item.id === active.id);
      if (draggedItem) {
        setHeaderDownRight(prev => [
          ...prev,
          { id: `dr-${draggedItem.id}`, content: draggedItem.name }
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }
    else if(over.id === 'head1'){
      const draggedItem = sideList.find(item => item.id === active.id);
      const isLen = head1.length === 0
      if (draggedItem && isLen) {
        setHead1(prev => [
          ...prev,
          { id: `head1-${draggedItem.id}`, content: draggedItem.name }
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }else if(over.id === 'head2'){
      const draggedItem = sideList.find(item => item.id === active.id);
      const isLen = head2.length === 0
      if (draggedItem && isLen) {
        setHead2(prev => [
          ...prev,
          { id: `head2-${draggedItem.id}`, content: draggedItem.name }   
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }else if(over.id === 'head3'){
      const draggedItem = sideList.find(item => item.id === active.id);
      const isLen = head3.length === 0
      if (draggedItem && isLen) {
        setHead3(prev => [
          ...prev,
          { id: `head3-${draggedItem.id}`, content: draggedItem.name }   
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }else if(over.id === 'head4'){
      const draggedItem = sideList.find(item => item.id === active.id);
      const isLen = head4.length === 0
      if (draggedItem && isLen) {
        setHead4(prev => [
          ...prev,
          { id: `head4-${draggedItem.id}`, content: draggedItem.name }   
        ]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    }
     else {
      
      
       if(over.id.split('-')[0] === 'hl'){
        const oldIndex = headerListLeft.findIndex(item => item.id === active.id)
        const newIndex = headerListLeft.findIndex(item => item.id === over.id);
        setHeaderListLeft(arrayMove(headerListLeft, oldIndex, newIndex));
       }
       

       if(over.id.split('-')[0] === 'hr'){
        const oldIndex = headerListRight.findIndex(item => item.id === active.id)
        const newIndex = headerListRight.findIndex(item => item.id === over.id);
        setHeaderListRight(arrayMove(headerListRight, oldIndex, newIndex));
       }

       if(over.id.split('-')[0] === 'dl'){
        const oldIndex = headerDownLeft.findIndex(item => item.id === active.id)
        const newIndex = headerDownLeft.findIndex(item => item.id === over.id);
        setHeaderDownLeft(arrayMove(headerDownLeft, oldIndex, newIndex));
       }

       if(over.id.split('-')[0] === 'dr'){
        const oldIndex = headerDownRight.findIndex(item => item.id === active.id)
        const newIndex = headerDownRight.findIndex(item => item.id === over.id);
        setHeaderDownRight(arrayMove(headerDownRight, oldIndex, newIndex));
       }
 
 
     
      
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="drag-report">
        {/* Side List */}
        <div className="report-side">
          <ul id="todo-list">
            <SortableContext items={sideList.map(item => item.id)}>
              {sideList.map(item => (
                <DraggableItem key={item.id} id={item.id}>
                  {item.name.props?item.name.props.children:item.name}
                  
                </DraggableItem>
              ))}
            </SortableContext>
          </ul>
        </div>

        {/* Header List Dropzone with Sortable Items */}
        <div className="report-invoice-container">
          <header className="report-invoice-header">
            <div className="report-header-left">
            <DroppableZone id="head1" item={head1}>
                <SortableContext items={head1.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px", padding: '10px' }}>
                    {head1.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                    {head1.length === 0 && <span style={{color:'gray'}}>Heading</span> }
                  </ul>
                </SortableContext>
              </DroppableZone>
              <DroppableZone id="headerListDropzone">
                <SortableContext items={headerListLeft.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {headerListLeft.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
              </DroppableZone>
            </div>
            {/* <div className="report-header-left">
            <img
              src="/path-to-logo.png"
              alt="Microsoft Logo"
              className="report-logo"
            />
          </div> */}
          <div className="report-header-right">
          <DroppableZone id="head2">
                <SortableContext items={head2.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {head2.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                     {head2.length === 0 && <span style={{color:'gray'}}>Heading</span>}    
                  </ul>
                </SortableContext>
              </DroppableZone>
          <DroppableZone id="headerListRightDropzone">
                <SortableContext items={headerListRight.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {headerListRight.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
          </DroppableZone>
            {/* <h2>Invoice CIV-000676</h2>
            <p>Date: 30 November 2012</p>
            <p>Payment terms: Net 45 days</p>
            <p>Payment due: 14 January 2013</p>
            <h1>$315,479.00</h1>   */}
          </div>
          </header>
          <header className="report-invoice-header">
            <div className="report-header-left">
            <DroppableZone id="head3" item={head3}>
                <SortableContext items={head3.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px", padding: '10px' }}>
                    {head3.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                    {head3.length === 0 && <span style={{color:'gray'}}>Heading</span> }
                  </ul>
                </SortableContext>
              </DroppableZone>
              <DroppableZone id="headerListDropzoneDown">
                <SortableContext items={headerDownLeft.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {headerDownLeft.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
              </DroppableZone>
            </div>
            {/* <div className="report-header-left">
            <img
              src="/path-to-logo.png"
              alt="Microsoft Logo"
              className="report-logo"
            />
          
          </div> */}
          <div className="report-header-right">
          <DroppableZone id="head4">
                <SortableContext items={head4.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {head4.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                     {head4.length === 0 && <span style={{color:'gray'}}>Heading</span>}    
                  </ul>
                </SortableContext>
              </DroppableZone>
          <DroppableZone id="headerListRightDropzoneDown">
                <SortableContext items={headerDownRight.map(item => item.id)}>
                  <ul style={{ minHeight: '20px', minWidth:"200px",  padding: '10px' }}>
                    {headerDownRight.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
          </DroppableZone>
            {/* <h2>Invoice CIV-000676</h2>
            <p>Date: 30 November 2012</p>
            <p>Payment terms: Net 45 days</p>
            <p>Payment due: 14 January 2013</p>
            <h1>$315,479.00</h1> */}  
          </div>
          </header>






          <section className="report-table-section">
            <table className="report-invoice-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>DESCRIPTION</th>
                  <th>QUANTITY</th>
                  <th>SALES PRICE</th>
                  <th>DISCOUNT</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>D0001</td>
                  <td>Mid-Range Speaker</td>
                  <td>14</td>
                  <td>$480.00</td>
                  <td>$0.00</td>
                  <td>$6,720.00</td>
                </tr>
                <tr>
                  <td>L0001</td>
                  <td>Mid-Range Speaker 2</td>
                  <td>35</td>
                  <td>$500.00</td>
                  <td>$0.00</td>
                  <td>$17,500.00</td>
                </tr>
                <tr>
                  <td>P0001</td>
                  <td>Acoustic Foam Panel</td>
                  <td>117</td>
                  <td>$37.00</td>
                  <td>$0.00</td>
                  <td>$4,329.00</td>
                </tr>
              </tbody>
            </table>
            <div className="report-total-section">
              <p>Sales Subtotal: $315,479.00</p>
              <p>Sales Tax: $0.00</p>
              <h2>Total: $315,479.00</h2>
            </div>
          </section>
        </div>

        
      </div>

     
      
    </DndContext>
  );
}

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
}

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className='noLi'>
      {children}
    </li>
  );
}

function DroppableZone({ id, children , item }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? 'lightblue' : undefined,
  };
  console.log(isOver,item);
  
  return (
    <>
     {true&& <div ref={setNodeRef} style={style}>
      {children}
      {isOver &&item && item.length === 0 && (
        <div style={{  color: 'grey', fontStyle: 'italic',textAlign:'center' }}>
          Drop here
        </div>
      )}

    </div>}
   
    </>
   
    
  );
}

export default App;
