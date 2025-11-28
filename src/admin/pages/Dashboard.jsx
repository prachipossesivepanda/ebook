import { ROLES } from '../constants/roles';
import { buildRoleRoute } from '../utils/navigation';
import { useRoleContext } from '../hooks/useRoleContext';

const Dashboard = () => {
  const {
    session,
    role,
    isOwner,
    isPlatformSubadmin,
    isUniversityTeam,
  } = useRoleContext();
  const baseRoute = buildRoleRoute(role, '');

  const isUniversity = isUniversityTeam;

  const ownerStats = [
    { label: 'Total Universities', value: '1,234', change: '+12%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Total Orders', value: '5,678', change: '+8%', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Total Revenue', value: '$125,430', change: '+15%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Pending KYC', value: '23', change: '-5%', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  const universityStats = [
    { label: 'Monthly Orders', value: '312', change: '+14%', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Gross Revenue', value: '$18,750', change: '+9%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Catalog Health', value: '98%', change: '+3%', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { label: 'Payout Status', value: 'On Track', change: '+$4,120', icon: 'M5 12h14M5 12l4-4m-4 4l4 4' },
  ];

  const stats = isUniversity ? universityStats : ownerStats;

  const ownerAlerts = [
    { id: 'alert-1', type: 'kyc', title: 'KYC Overdue', detail: '5 applications pending >10 days', action: 'Review KYC', href: '/owner/kyc-verification', severity: 'high' },
    { id: 'alert-2', type: 'university', title: 'New University Onboarding', detail: '3 universities awaiting approval', action: 'Review Queue', href: '/owner/vendor-onboarding', severity: 'medium' },
    { id: 'alert-3', type: 'compliance', title: 'SLA Alert', detail: '2 universities approaching SLA threshold', action: 'View Details', href: '/owner/vendors', severity: 'medium' },
  ];

  const recentUniversities = [
    { id: 1, name: 'BookStore Pro', email: 'contact@bookstorepro.com', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Literary Hub', email: 'info@literaryhub.com', status: 'Pending', joinDate: '2024-01-20' },
    { id: 3, name: 'ReadMore Books', email: 'hello@readmore.com', status: 'Active', joinDate: '2024-01-18' },
    { id: 4, name: 'Novel Corner', email: 'support@novelcorner.com', status: 'Suspended', joinDate: '2024-01-10' },
  ];

  const universityTeam = [
    { id: 'sub-1', name: 'Sophia Garcia', role: 'Store Manager', permissions: ['Orders', 'Catalog'], lastActive: '2h ago', email: 'sophia@bookworld.com' },
    { id: 'sub-2', name: 'Marcus Lee', role: 'Content Lead', permissions: ['Catalog', 'Content'], lastActive: '5m ago', email: 'marcus@bookworld.com' },
    { id: 'sub-3', name: 'Priya Shah', role: 'Operations', permissions: ['Orders', 'Payouts'], lastActive: '1d ago', email: 'priya@bookworld.com' },
  ];

  const recentOrders = [
    { id: 'ORD-001', university: 'BookStore Pro', customer: 'John Doe', amount: '$45.99', status: 'Delivered', date: '2024-01-22' },
    { id: 'ORD-002', university: 'Literary Hub', customer: 'Jane Smith', amount: '$89.50', status: 'Processing', date: '2024-01-22' },
    { id: 'ORD-003', university: 'ReadMore Books', customer: 'Bob Johnson', amount: '$32.00', status: 'Pending', date: '2024-01-21' },
  ];

  const universityOpsAlerts = [
    { id: 'alert-1', title: 'Inventory Alert', detail: '5 SKUs below threshold', action: 'Review Catalog' },
    { id: 'alert-2', title: 'Payout Reminder', detail: '$4,120 scheduled for Feb 02', action: 'View Schedule' },
    { id: 'alert-3', title: 'Content Review', detail: '3 submissions pending approval', action: 'Open Queue' },
  ];

  const quickActions = isUniversity
    ? [
        { label: 'Add Product', href: `${baseRoute}/catalog`, icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
        { label: 'Review Orders', href: `${baseRoute}/orders`, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
        { label: 'Team Access', href: `${baseRoute}/subadmins`, icon: 'M12 4.354a4 4 0 110 5.292' },
        { label: 'Payouts', href: `${baseRoute}/commission`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2' },
      ]
    : [
        { label: 'Onboard University', href: '/owner/vendor-onboarding', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
        { label: 'Verify KYC', href: '/owner/kyc-verification', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944' },
        { label: 'Manage Admins', href: '/owner/sub-admins', icon: 'M12 4.354a4 4 0 110 5.292' },
        { label: 'Commission Rules', href: '/owner/commission', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2' },
      ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back, {session?.user?.name || 'Admin'}
        </h2>
        <p className="text-gray-600">
          {isOwner && 'Platform Owner Workspace – orchestrate universities and revenue'}
          {isPlatformSubadmin && 'Subadmin Workspace – execute assigned workflows'}
          {isUniversity && 'University Control Center – monitor enrollments, catalogs, payouts'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const iconBgColors = [
            'bg-blue-50',
            'bg-slate-50',
            'bg-emerald-50',
            'bg-amber-50',
          ];
          const iconColors = [
            'text-blue-600',
            'text-slate-600',
            'text-emerald-600',
            'text-amber-600',
          ];
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 p-6 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${iconBgColors[index]} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-6 h-6 ${iconColors[index]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vendors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{isUniversity ? 'Team Activity' : 'Recent Universities'}</h3>
            <a href={isUniversity ? `${baseRoute}/subadmins` : '/owner/vendors'} className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="space-y-3">
            {isUniversity
              ? universityTeam.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {member.role}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{member.lastActive}</p>
                    </div>
                  </div>
                ))
              : recentUniversities.map((university) => (
                  <div key={university.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {university.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{university.name}</p>
                        <p className="text-sm text-gray-600">{university.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                        university.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                        university.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {university.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{university.joinDate}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <a href={`${baseRoute}/orders`} className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.university} • {order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-xs text-gray-500">{isUniversity ? 'University operations' : 'Platform controls'}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <a key={action.label} href={action.href} className="group p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center border border-gray-200 hover:border-gray-300">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">{action.label}</p>
            </a>
          ))}
        </div>
      </div>

      {isUniversity && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">University Operations Alerts</h3>
            <a href={`${baseRoute}/analytics`} className="text-sm text-slate-600 hover:text-slate-900">Open analytics</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {universityOpsAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-600 mt-1">{alert.detail}</p>
                <button className="mt-3 text-xs font-semibold text-slate-700 hover:text-slate-900">
                  {alert.action} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isUniversity && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Platform Alerts & Notifications</h3>
            <a href="/owner/kyc-verification" className="text-sm text-slate-600 hover:text-slate-900">View all</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ownerAlerts.map((alert) => (
              <a
                key={alert.id}
                href={alert.href}
                className={`p-4 rounded-lg border transition-colors ${
                  alert.severity === 'high'
                    ? 'border-red-200 bg-red-50 hover:bg-red-100'
                    : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {alert.severity === 'high' && (
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  <p className={`text-sm font-semibold ${alert.severity === 'high' ? 'text-red-900' : 'text-amber-900'}`}>
                    {alert.title}
                  </p>
                </div>
                <p className={`text-sm ${alert.severity === 'high' ? 'text-red-700' : 'text-amber-700'}`}>
                  {alert.detail}
                </p>
                <p className="mt-3 text-xs font-semibold text-slate-700">
                  {alert.action} →
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

