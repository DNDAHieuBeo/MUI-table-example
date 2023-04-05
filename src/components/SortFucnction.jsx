export const sortById = (data, sortOrder, setData, setSortOrder) => {
  const sortedData = [...data].sort((a, b) => {
    return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
  });
  setData(sortedData);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

export const sortByName = (data, sortOrder, setData, setSortOrder) => {
  const sortedData = [...data].sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });
  setData(sortedData);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

export const sortByAge = (data, sortOrder, setData, setSortOrder) => {
  const sortedData = [...data].sort((a, b) => {
    return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
  });
  setData(sortedData);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};

export const sortByEmail =(data,sortOrder,setData,setSortOrder) => {
  const sortedData =[...data].sort((a,b)=>{
    return sortOrder === "asc"
    ? a.email.localeCompare(b.email)
    : b.email.localeCompare(a.email);
  })
  setData(sortedData);
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
}
