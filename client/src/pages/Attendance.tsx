
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const students = [
    { id: 1, name: 'Alice Johnson', rollNo: '001', status: 'present' },
    { id: 2, name: 'Bob Smith', rollNo: '002', status: 'present' },
    { id: 3, name: 'Carol Davis', rollNo: '003', status: 'absent' },
    { id: 4, name: 'David Wilson', rollNo: '004', status: 'present' },
    { id: 5, name: 'Eva Brown', rollNo: '005', status: 'late' },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = student.status;
      return acc;
    }, {} as Record<number, string>)
  );

  const updateAttendance = (studentId: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', { class: selectedClass, date: selectedDate, attendance });
    // In real app, this would send data to backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle size={16} className="text-green-600" />;
      case 'absent': return <XCircle size={16} className="text-red-600" />;
      case 'late': return <Clock size={16} className="text-yellow-600" />;
      default: return null;
    }
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const absentCount = Object.values(attendance).filter(status => status === 'absent').length;
  const lateCount = Object.values(attendance).filter(status => status === 'late').length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
          <p className="text-gray-600">Track daily student attendance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present</p>
                  <p className="text-3xl font-bold text-green-600">{presentCount}</p>
                </div>
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Absent</p>
                  <p className="text-3xl font-bold text-red-600">{absentCount}</p>
                </div>
                <XCircle size={32} className="text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late</p>
                  <p className="text-3xl font-bold text-yellow-600">{lateCount}</p>
                </div>
                <Clock size={32} className="text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" size={24} />
              Mark Attendance
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grade-5a">Grade 5A</SelectItem>
                  <SelectItem value="grade-5b">Grade 5B</SelectItem>
                  <SelectItem value="grade-4b">Grade 4B</SelectItem>
                  <SelectItem value="grade-6a">Grade 6A</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
              <Button onClick={saveAttendance} className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2" size={16} />
                Save Attendance
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {selectedClass ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Roll No</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Student Name</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{student.rollNo}</td>
                        <td className="py-3 px-4 font-medium">{student.name}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {getStatusIcon(attendance[student.id])}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attendance[student.id])}`}>
                              {attendance[student.id]}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center space-x-2">
                            <Button
                              size="sm"
                              variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                              onClick={() => updateAttendance(student.id, 'present')}
                              className="text-xs"
                            >
                              Present
                            </Button>
                            <Button
                              size="sm"
                              variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                              onClick={() => updateAttendance(student.id, 'absent')}
                              className="text-xs"
                            >
                              Absent
                            </Button>
                            <Button
                              size="sm"
                              variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                              onClick={() => updateAttendance(student.id, 'late')}
                              className="text-xs"
                            >
                              Late
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Please select a class to mark attendance</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
