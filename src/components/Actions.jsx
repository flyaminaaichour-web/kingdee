
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const Actions = () => {
  const [actions, setActions] = useState([
    { id: 1, description: 'Review Q1 financial reports', status: 'Pending', dueDate: '2024-09-30' },
    { id: 2, description: 'Follow up on compliance training for new hires', status: 'Completed', dueDate: '2024-08-15' },
    { id: 3, description: 'Prepare for external audit meeting', status: 'In Progress', dueDate: '2024-10-10' },
  ]);
  const [newAction, setNewAction] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const handleAddAction = () => {
    if (newAction.trim() !== '' && newDueDate.trim() !== '') {
      setActions([
        ...actions,
        { id: actions.length + 1, description: newAction, status: 'Pending', dueDate: newDueDate },
      ]);
      setNewAction('');
      setNewDueDate('');
    } else {
      alert('Please enter both action description and due date.');
    }
  };

  const handleDeleteAction = (id) => {
    setActions(actions.filter(action => action.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Audit Actions</h2>

      {/* Add New Action Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Add New Action</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Action description"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              className="flex-grow"
            />
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-48"
            />
            <Button onClick={handleAddAction}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Action
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions List Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Existing Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <p className="text-gray-500">No actions found.</p>
          ) : (
            <div className="space-y-4">
              {actions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
                  <div>
                    <p className="font-medium text-lg">{action.description}</p>
                    <p className="text-sm text-gray-500">Status: {action.status} | Due: {action.dueDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteAction(action.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Actions;


