import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from './redux/studentsSlice';
import { Table } from 'antd';

function App() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const studentsStatus = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);

  useEffect(() => {
    if (studentsStatus === 'idle') {
      dispatch(fetchStudents());
    }
  }, [studentsStatus, dispatch]);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  ];

  let content;

  if (studentsStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (studentsStatus === 'succeeded') {
    content = <Table dataSource={students} columns={columns} rowKey="id" />;
  } else if (studentsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
}

export default App;
