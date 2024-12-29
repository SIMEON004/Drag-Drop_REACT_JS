import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const listArr = [
  { id: 1, name: 'Company Name 1' },
  { id: 2, name: 'Company Name 2' },
  { id: 3, name: 'Company Name 3' }
];

function App() {
  const [sideList, setSideList] = useState([]);
  const [headerListLeft, setHeaderListLeft] = useState([]);

  useEffect(() => {
    getInitial();
  }, []);

  const getInitial = () => {
    setSideList(listArr);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id === 'headerListDropzone') {
      const draggedItem = sideList.find(item => item.id === active.id);
      if (draggedItem) {
        setHeaderListLeft(prev => [...prev, { id: `item-${draggedItem.id}`, content: draggedItem.name }]);
        setSideList(prev => prev.filter(item => item.id !== active.id));
      }
    } else {
      const oldIndex = headerListLeft.findIndex(item => item.id === active.id);
      const newIndex = headerListLeft.findIndex(item => item.id === over.id);
      setHeaderListLeft(arrayMove(headerListLeft, oldIndex, newIndex));
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
                  {item.name}
                </DraggableItem>
              ))}
            </SortableContext>
          </ul>
        </div>

        {/* Header List Dropzone with Sortable Items */}
        <div className="report-invoice-container">
          <header className="report-invoice-header">
            <div className="report-header-left">
              <DroppableZone id="headerListDropzone">
                <SortableContext items={headerListLeft.map(item => item.id)}>
                  <ul>
                    {headerListLeft.map(item => (
                      <SortableItem key={item.id} id={item.id}>
                        {item.content}
                      </SortableItem>
                    ))}
                  </ul>
                </SortableContext>
              </DroppableZone>
            </div>
          </header>
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
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
}

function DroppableZone({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? 'lightblue' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export default App;
