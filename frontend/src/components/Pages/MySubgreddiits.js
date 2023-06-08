import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';

import { useNavigate } from 'react-router-dom';

const MySubgreddiits = () => {
  const [subgreddiits, setSubgreddiits] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [],
    bannedWords: [],
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchSubgreddiits = async () => {
      try {
        const response = await api.get('/api/subgreddiit/listmy');
        setSubgreddiits(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubgreddiits();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const res = await api.post('/api/subgreddiit/create', formData);
      console.log(res.data);
      setSubgreddiits([...subgreddiits, res.data]);
      setEditMode(false);
    } catch (error) {
      console.error("error", error.response.data.errors[0].msg);
    }
  };

  const handleDelete = async (subgreddiitId) => {
    try {
      const res = await api.delete(`/api/subgreddiit/delete/${subgreddiitId}`);
      console.log(res.data);
      setSubgreddiits(subgreddiits.filter(subgreddiit => subgreddiit._id !== subgreddiitId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input type="text" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
          Description:
          <input type="text" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
          Tags (separated by commas):
          <input type="text" value={formData.tags.join(', ')} onChange={(event) => setFormData({ ...formData, tags: event.target.value.split(', ') })} />
          Banned Words (separated by commas):
          <input type="text" value={formData.bannedWords.join(', ')} onChange={(event) => setFormData({ ...formData, bannedWords: event.target.value.split(', ') })} />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };

  const renderSubgreddiits = () => {
    return subgreddiits.map((subgreddiit) => (
      <div key={subgreddiit._id} style={{ backgroundColor: '#F0F0F0', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{subgreddiit.name}</h3>
          <button style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }} onClick={() => handleDelete(subgreddiit._id)}>Delete</button>
        </div>
        <p style={{ margin: 0 }}>Description: {subgreddiit.description}</p>
        <div style={{ display: 'block', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
          <p style={{ margin: 0 }}>Banned words: {subgreddiit.bannedWords.join(', ')}</p>
          <p style={{ margin: 0 }}>No. of posts: {subgreddiit.posts.length}</p>
          <p style={{ margin: 0 }}>No. of users: {subgreddiit.users.filter(user => user.status === 'moderator').length}</p>
        </div>
        <button style={{ backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', marginTop: '5px' }} onClick={() => navigate('/subgreddiit/' + subgreddiit._id)}>Open</button>
      </div>

    ));
  };

  return (
    <>
      <div>
        {editMode ? renderForm() : <button onClick={() => setEditMode(true)}>Create Subgreddiit</button>}
      </div>

      <div>
        <h2>My Subgreddiits</h2>
        {renderSubgreddiits()}
      </div>
    </>
  );
};

export default MySubgreddiits;
