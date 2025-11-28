import { useMemo, useState } from 'react';

const KycVerification = () => {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const kycApplications = [
    {
      id: 1,
      vendorName: 'BookStore Pro',
      email: 'contact@bookstorepro.com',
      submittedDate: '2024-01-20',
      status: 'Pending',
      daysPending: 3,
      slaStatus: 'on_track', // on_track, at_risk, overdue
      documents: {
        businessLicense: 'uploaded',
        taxCertificate: 'uploaded',
        identityProof: 'uploaded',
      },
    },
    {
      id: 2,
      vendorName: 'Literary Hub',
      email: 'info@literaryhub.com',
      submittedDate: '2024-01-22',
      status: 'Pending',
      daysPending: 1,
      slaStatus: 'on_track',
      documents: {
        businessLicense: 'uploaded',
        taxCertificate: 'uploaded',
        identityProof: 'missing',
      },
    },
    {
      id: 3,
      vendorName: 'ReadMore Books',
      email: 'hello@readmore.com',
      submittedDate: '2024-01-18',
      status: 'Approved',
      daysPending: 0,
      slaStatus: 'completed',
      approvedDate: '2024-01-19',
      processingTime: 1,
      documents: {
        businessLicense: 'verified',
        taxCertificate: 'verified',
        identityProof: 'verified',
      },
    },
    {
      id: 4,
      vendorName: 'Novel Corner',
      email: 'support@novelcorner.com',
      submittedDate: '2024-01-15',
      status: 'Rejected',
      daysPending: 0,
      slaStatus: 'completed',
      documents: {
        businessLicense: 'rejected',
        taxCertificate: 'uploaded',
        identityProof: 'uploaded',
      },
      rejectionReason: 'Business license expired',
    },
    {
      id: 5,
      vendorName: 'Book World',
      email: 'admin@bookworld.com',
      submittedDate: '2024-01-10',
      status: 'Pending',
      daysPending: 13,
      slaStatus: 'overdue', // Over 10 days
      documents: {
        businessLicense: 'uploaded',
        taxCertificate: 'uploaded',
        identityProof: 'uploaded',
      },
    },
  ];

  const filteredApplications = useMemo(() => {
    let filtered = kycApplications;
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(app => 
        app.vendorName.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [filterStatus, searchTerm]);

  const kycStats = useMemo(() => {
    const pending = kycApplications.filter(a => a.status === 'Pending').length;
    const overdue = kycApplications.filter(a => a.slaStatus === 'overdue').length;
    const atRisk = kycApplications.filter(a => a.slaStatus === 'at_risk').length;
    const avgProcessingTime = kycApplications
      .filter(a => a.processingTime)
      .reduce((sum, a) => sum + a.processingTime, 0) / 
      kycApplications.filter(a => a.processingTime).length || 0;
    
    return { pending, overdue, atRisk, avgProcessingTime: Math.round(avgProcessingTime * 10) / 10 };
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getDocumentStatus = (status) => {
    const styles = {
      uploaded: 'text-blue-600',
      verified: 'text-green-600',
      missing: 'text-red-600',
      rejected: 'text-red-600',
    };
    return styles[status] || 'text-gray-600';
  };

  const getSlaBadge = (slaStatus) => {
    const styles = {
      on_track: 'bg-green-100 text-green-700',
      at_risk: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return styles[slaStatus] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>
          <p className="text-gray-600">Review and verify vendor KYC documents</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search vendor or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
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

      {/* KYC Stats & SLA Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending Reviews</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{kycStats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4">
          <p className="text-sm text-gray-500">Overdue (SLA)</p>
          <p className="text-2xl font-semibold text-red-600 mt-1">{kycStats.overdue}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-4">
          <p className="text-sm text-gray-500">At Risk</p>
          <p className="text-2xl font-semibold text-yellow-600 mt-1">{kycStats.atRisk}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Avg Processing Time</p>
          <p className="text-2xl font-semibold text-blue-600 mt-1">{kycStats.avgProcessingTime} days</p>
        </div>
      </div>

      {/* SLA Alert Banner */}
      {kycStats.overdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-800">SLA Alert: {kycStats.overdue} KYC application(s) overdue</p>
            <p className="text-xs text-red-600">Applications pending for more than 10 days require immediate attention</p>
          </div>
        </div>
      )}

      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No KYC applications found matching your criteria.</p>
          {(searchTerm || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{application.vendorName}</h3>
                <p className="text-sm text-gray-600">{application.email}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-500">Submitted: {application.submittedDate}</p>
                  {application.status === 'Pending' && (
                    <span className="text-xs text-gray-500">
                      • {application.daysPending} day{application.daysPending !== 1 ? 's' : ''} pending
                    </span>
                  )}
                  {application.processingTime && (
                    <span className="text-xs text-blue-600">
                      • Processed in {application.processingTime} day{application.processingTime !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(application.status)}`}>
                  {application.status}
                </span>
                {application.slaStatus && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSlaBadge(application.slaStatus)}`}>
                    {application.slaStatus === 'on_track' ? 'On Track' :
                     application.slaStatus === 'at_risk' ? 'At Risk' :
                     application.slaStatus === 'overdue' ? 'Overdue' : 'Completed'}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Document Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Business License</span>
                  <span className={`text-xs font-semibold ${getDocumentStatus(application.documents.businessLicense)}`}>
                    {application.documents.businessLicense}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Tax Certificate</span>
                  <span className={`text-xs font-semibold ${getDocumentStatus(application.documents.taxCertificate)}`}>
                    {application.documents.taxCertificate}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Identity Proof</span>
                  <span className={`text-xs font-semibold ${getDocumentStatus(application.documents.identityProof)}`}>
                    {application.documents.identityProof}
                  </span>
                </div>
              </div>
            </div>

            {application.rejectionReason && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <span className="font-semibold">Rejection Reason:</span> {application.rejectionReason}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium">
                View Documents
              </button>
              {application.status === 'Pending' && (
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
        ))}
        </div>
      )}
    </div>
  );
};

export default KycVerification;

