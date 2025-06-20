
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserCheck, Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@school.com', 
      phone: '+1 234-567-8901',
      subjects: ['Mathematics', 'Physics'], 
      classes: ['Grade 5A', 'Grade 6A'], 
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      email: 'michael.chen@school.com', 
      phone: '+1 234-567-8902',
      subjects: ['English', 'Literature'], 
      classes: ['Grade 4B', 'Grade 5B'], 
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Emily Davis', 
      email: 'emily.davis@school.com', 
      phone: '+1 234-567-8903',
      subjects: ['Science', 'Biology'], 
      classes: ['Grade 6A'], 
      status: 'Active' 
    },
    { 
      id: 4, 
      name: 'Robert Wilson', 
      email: 'robert.wilson@school.com', 
      phone: '+1 234-567-8904',
      subjects: ['History', 'Geography'], 
      classes: ['Grade 5A', 'Grade 5B'], 
      status: 'On Leave' 
    },
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Management</h1>
          <p className="text-gray-600">Manage teaching staff and their assignments</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2" size={24} />
                Teachers ({filteredTeachers.length})
              </CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2" size={16} />
                Add Teacher
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search teachers by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{teacher.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          teacher.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2" />
                        {teacher.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2" />
                        {teacher.phone}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subject, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Classes</h4>
                      <div className="flex flex-wrap gap-1">
                        {teacher.classes.map((cls, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teachers;
