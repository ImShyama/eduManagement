
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Plus, Search, Users, UserCheck, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const classes = [
    {
      id: 1,
      name: 'Grade 5A',
      teacher: 'Sarah Johnson',
      students: 28,
      subjects: ['Mathematics', 'English', 'Science', 'History'],
      schedule: 'Mon-Fri 8:00 AM - 2:00 PM',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Grade 5B',
      teacher: 'Michael Chen',
      students: 25,
      subjects: ['Mathematics', 'English', 'Science', 'Geography'],
      schedule: 'Mon-Fri 8:00 AM - 2:00 PM',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Grade 4B',
      teacher: 'Emily Davis',
      students: 30,
      subjects: ['Mathematics', 'English', 'Science', 'Art'],
      schedule: 'Mon-Fri 8:30 AM - 1:30 PM',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Grade 6A',
      teacher: 'Robert Wilson',
      students: 22,
      subjects: ['Advanced Math', 'Physics', 'Chemistry', 'Biology'],
      schedule: 'Mon-Fri 9:00 AM - 3:00 PM',
      status: 'Active'
    },
  ];

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Management</h1>
          <p className="text-gray-600">Organize classes, subjects, and schedules</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2" size={24} />
                Classes ({filteredClasses.length})
              </CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2" size={16} />
                Create Class
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search classes by name or teacher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredClasses.map((cls) => (
                <Card key={cls.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{cls.name}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {cls.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Teacher */}
                      <div className="flex items-center text-gray-600">
                        <UserCheck size={16} className="mr-2" />
                        <span className="text-sm">Class Teacher: <strong>{cls.teacher}</strong></span>
                      </div>

                      {/* Students Count */}
                      <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-2" />
                        <span className="text-sm">{cls.students} Students Enrolled</span>
                      </div>

                      {/* Schedule */}
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm">{cls.schedule}</span>
                      </div>

                      {/* Subjects */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Subjects</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {cls.subjects.map((subject, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4 border-t">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit Class
                        </Button>
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

export default Classes;
