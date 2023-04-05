export const handleDeletePerson = (id,data,setData) => {
    const index = data.findIndex((person) => person.id === id);
    if (index !== -1) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };