
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, BookOpen, Calendar, LogOut, GraduationCap } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (!role || !email) {
      navigate('/');
      return;
    }
    
    setUserRole(role);
    setUserEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const stats = [
    { title: 'Total Students', value: '1,247', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Teachers', value: '86', icon: UserCheck, color: 'bg-green-500' },
    { title: 'Active Classes', value: '24', icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Present Today', value: '1,156', icon: Calendar, color: 'bg-orange-500' },
  ];

  const recentActivities = [
    { action: 'New student registered', time: '2 minutes ago', type: 'student' },
    { action: 'Attendance marked for Grade 5A', time: '15 minutes ago', type: 'attendance' },
    { action: 'Teacher Sarah Johnson added', time: '1 hour ago', type: 'teacher' },
    { action: 'Math class scheduled', time: '2 hours ago', type: 'class' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userEmail}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                {userRole}
              </span>
              <Button variant="outline" onClick={handleLogout} size="sm">
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2" size={16} />
                  Add Student
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="mr-2" size={16} />
                  Add Teacher
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2" size={16} />
                  Create Class
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2" size={16} />
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
