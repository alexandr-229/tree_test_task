import { useRef, useState } from 'react';
import { Wrapper } from './components/Wrapper';
import { Sidebar } from './components/Sidebar';
import { TreeConstructor } from './tree';
import { Tree, TreeWrapperRef } from './types/tree';

const treeConstructor = new TreeConstructor();

const App = () => {
  const [tree, setTree] = useState<Tree>(treeConstructor.tree);
  const [zoom, setZoom] = useState<number>(100);

  const wrapperRef = useRef<TreeWrapperRef>(null);

  const addItem = (title: string, parentId: number) => {
    treeConstructor.addItem(title, parentId);
    setTree(treeConstructor.tree);
  };

  const deleteItem = (id: number) => {
    treeConstructor.deleteItem(id);
    setTree({...treeConstructor.tree});
  };

  const editItem = (id: number, title: string) => {
    treeConstructor.editItem(id, title);
    setTree(treeConstructor.tree);
  };

  const forceTreeRerender = () => {
    setTree(treeConstructor.tree);
  };

  const onCenter = () => {
    wrapperRef.current?.onCenter();
  };

  return (
    <div>
      <Sidebar zoom={zoom} setZoom={setZoom} onCenter={onCenter} />
      <Wrapper
        ref={wrapperRef}
        tree={tree}
        zoom={zoom}
        onAdd={addItem}
        onDelete={deleteItem}
        onEdit={editItem}
        forceRerender={forceTreeRerender}
      />
    </div>
  );
}

export default App;
