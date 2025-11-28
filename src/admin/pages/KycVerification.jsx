import { useState } from 'react';

const KycVerification = () => {
  const [filterStatus, setFilterStatus] = useState('pending');

  const kycApplications = [
    {
      id: 1,
      vendorName: 'BookStore Pro',
      email: 'contact@bookstorepro.com',
      submittedDate: '2024-01-20',
      status: 'Pending',
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
      documents: {
        businessLicense: 'rejected',
        taxCertificate: 'uploaded',
        identityProof: 'uploaded',
      },
      rejectionReason: 'Business license expired',
    },
  ];

  const filteredApplications = filterStatus === 'all'
    ? kycApplications
    : kycApplications.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>
          <p className="text-gray-600">Review and verify vendor KYC documents</p>
        </div>
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

      <div className="grid grid-cols-1 gap-6">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{application.vendorName}</h3>
                <p className="text-sm text-gray-600">{application.email}</p>
                <p className="text-xs text-gray-500 mt-1">Submitted: {application.submittedDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(application.status)}`}>
                  {application.status}
                </span>
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
    </div>
  );
};

export default KycVerification;

