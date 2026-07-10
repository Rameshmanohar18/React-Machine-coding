const useNode = () => {
  const insertNode = (tree, commentId, item) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });
      return tree;
    }

    const updatedItems = tree.items.map((node) =>
      insertNode(node, commentId, item)
    );
    return { ...tree, items: updatedItems };
  };

  return { insertNode };
};

export default useNode;
