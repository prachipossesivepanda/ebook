import { useState } from 'react';

const ContentApproval = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('pending');

  const pendingContent = [
    {
      id: 1,
      type: 'Book',
      title: 'New Mystery Novel',
      vendor: 'BookStore Pro',
      submittedDate: '2024-01-22',
      status: 'Pending',
      description: 'A thrilling mystery novel with unexpected twists',
      coverImage: '📚',
    },
    {
      id: 2,
      type: 'Book',
      title: 'Science Guide 2024',
      vendor: 'Book World',
      submittedDate: '2024-01-21',
      status: 'Pending',
      description: 'Comprehensive guide to modern science',
      coverImage: '🔬',
    },
    {
      id: 3,
      type: 'Book Update',
      title: 'Updated Edition - Learning Math',
      vendor: 'ReadMore Books',
      submittedDate: '2024-01-20',
      status: 'Pending',
      description: 'Updated content with new chapters',
      coverImage: '📖',
    },
    {
      id: 4,
      type: 'Book',
      title: 'Children Adventure',
      vendor: 'Literary Hub',
      submittedDate: '2024-01-19',
      status: 'Approved',
      description: 'Fun adventure story for children',
      coverImage: '🧒',
    },
  ];

  const filteredContent = pendingContent.filter(item => {
    const matchesType = filterType === 'all' || item.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesType && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Content Approval</h2>
          <p className="text-gray-600">Review and approve vendor content submissions</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="book">New Book</option>
            <option value="update">Book Update</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover Image */}
              <div className="w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                {item.coverImage}
              </div>

              {/* Content Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                        {item.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">Vendor: {item.vendor}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {item.submittedDate}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{item.description}</p>

                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium">
                    Review Details
                  </button>
                  {item.status === 'Pending' && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentApproval;

